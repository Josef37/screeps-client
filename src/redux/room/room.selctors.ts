import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../root.reducer'
import _ from 'lodash'

const selectRoom = (state: RootState) => state.room

export const selectCreeps = createSelector(
  selectRoom,
  room => _.filter(room.objects, (object) => object.type === 'creep')
)
