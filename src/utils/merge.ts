/**
 * This util merges values back received from the WebSocket.
 *
 * The function to compute the difference is found in `@screeps/common/index.js:getDiff`
 * It's a mess, but I added some tests to make sure the behavoir is right.
 */

import _ from 'lodash'

const symbolForDeleted = Symbol('deleted')

export default function merge <T> (oldIndex: Record<string, T> = {}, diff: Record<string, T> = {}): Record<string, T> {
  diff = replaceDeletedEntriesWithSymbol(diff)
  const merged = _.merge(oldIndex, diff)
  return deleteSymbolEntries(merged)
}

// Everything undefined or null counts as deleted
function replaceDeletedEntriesWithSymbol (value: any): any {
  if (_.isNil(value)) return symbolForDeleted
  if (_.isArray(value)) return value.map(replaceDeletedEntriesWithSymbol)
  if (_.isObject(value)) return _.mapValues(value, replaceDeletedEntriesWithSymbol)
  return value
}

function deleteSymbolEntries (value: any): any {
  if (_.isArray(value)) return value.filter(v => symbolForDeleted !== v).map(deleteSymbolEntries)
  if (_.isObject(value)) return _.mapValues(_.pickBy(value, v => symbolForDeleted !== v), deleteSymbolEntries)
  return value
}
