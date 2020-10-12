import _ from 'lodash'
import merge from './merge'

describe('merging diffs', () => {
  it('adds new objects', () => {
    const oldData = [] as any[]
    const newData = [{ _id: 'justNew' }]
    expectMergeToBeCorrect(oldData, newData)
  })

  it('deletes old objects', () => {
    const oldData = [{ _id: 'justOld' }]
    const newData = [] as any[]
    expectMergeToBeCorrect(oldData, newData)
  })

  it('deletes old and adds new objects', () => {
    const oldData = [{ _id: 'justOld' }]
    const newData = [{ _id: 'justNew' }]
    expectMergeToBeCorrect(oldData, newData)
  })

  it('merges second level props', () => {
    const oldData = [{ _id: 'same', foo: { bar: 1, old: false } }]
    const newData = [{ _id: 'same', foo: { bar: 2, new: true } }]
    expectMergeToBeCorrect(oldData, newData)
  })

  it('works with array', () => {
    const oldData = [{ _id: 'same', foo: [1, 2, 3, 4] }]
    const newData = [{ _id: 'same', foo: [2, 3] }]
    expectMergeToBeCorrect(oldData, newData)
  })

  it('works on deeper nested diffs', () => {
    const oldData = [{ _id: 'same', foo: { bar: { baz: true } } }]
    const newData = [{ _id: 'same', foo: { bar: { baz: false } } }]
    expectMergeToBeCorrect(oldData, newData)
  })
})

function expectMergeToBeCorrect (oldData: any, newData: any) {
  const oldIndex = getIndex(oldData)
  const newIndex = getIndex(newData)
  const diff = getDiff(oldData, newData)
  const merged = merge(oldIndex, diff)
  expect(merged).toEqual(newIndex)
}

/**
 * These functions are copied from `@screeps/common/index.js`.
 * They are a mess, but I added some comments to get the idea.
 */

function getIndex (data: any): any { // same as _.keyBy(data, '_id')
  var index: any = {}
  _.forEach(data, (obj) => { index[obj._id] = obj })
  return index
}

function getDiff (oldData: any, newData: any) {
  var result = {} as any
  var oldIndex = getIndex(oldData)
  var newIndex = getIndex(newData)

  _.forEach(oldData, (obj) => { // go through all object pairs (paired by _id)
    if (newIndex[obj._id]) {
      var newObj = newIndex[obj._id]
      var objDiff = result[obj._id] = {} as any
      for (var key in obj) { // iterate all old object properties
        if (_.isUndefined(newObj[key])) { // when the key doesn't exist anymore, return null
          objDiff[key] = null
        } else if ((typeof obj[key]) !== (typeof newObj[key]) || (obj[key] && !newObj[key])) { // different types or new value got falsey (from truthy)
          objDiff[key] = newObj[key] // fully replace it
        } else if (_.isObject(obj[key])) { // if both properties are objects (I think this would have been a good place for recursion)
          objDiff[key] = {}

          for (var subkey in obj[key]) { // Replace all properties that differ
            if (!_.isEqual(obj[key][subkey], newObj[key][subkey])) {
              objDiff[key][subkey] = newObj[key][subkey]
            }
          }
          for (subkey in newObj[key]) { // Add all properties, that weren't there before
            if (_.isUndefined(obj[key][subkey])) {
              objDiff[key][subkey] = newObj[key][subkey]
            }
          }
          if (!_.size(objDiff[key])) { // If there was no difference, drop it
            delete result[obj._id][key]
          }
        } else if (!_.isEqual(obj[key], newObj[key])) { // if they are not objects but different...
          objDiff[key] = newObj[key] // fully replace it!
        }
      }
      for (key in newObj) { // Set all new properties (that were not defined before)
        if (_.isUndefined(obj[key])) {
          objDiff[key] = newObj[key]
        }
      }
      if (!_.size(objDiff)) { // Don't send objects without diff
        delete result[obj._id]
      }
    } else { // If the object with _id got deleted, return null
      result[obj._id] = null
    }
  })

  _.forEach(newData, (obj) => { // Add all objects, that are new
    if (!oldIndex[obj._id]) {
      result[obj._id] = obj
    }
  })

  return result
};
