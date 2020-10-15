import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import merge from '../../utils/merge'

const initialState: RoomState = {
  objects: {},
  users: {}
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<string>) => ({
      ...initialState,
      prevId: state.id,
      id: action.payload
    }),
    updateRoom: (state, { payload: diff }: PayloadAction<RoomDiff>) => {
      state.gameTime = diff.gameTime
      state.users = merge(state.users, diff.users)
      state.objects = merge(state.objects, diff.objects)
    },
    removeRoom: (state) => ({
      ...initialState,
      prevId: state.id
    })
  }
})

export const { setRoom, updateRoom, removeRoom } = roomSlice.actions
export default roomSlice.reducer
