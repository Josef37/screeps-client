import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import merge from '../../utils/merge'
import { message } from '../socket/socket.slice'

const roomAdapter = createEntityAdapter<Room>({
  selectId: room => room.name
})

const roomSlice = createSlice({
  name: 'room',
  initialState: roomAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(message, (state, { payload: { channelName, data } }) => {
      const match = channelName.match(/room:(?<name>.*)/)
      if (!match) return
      const roomName = match.groups!.name
      const currentData = roomAdapter.getSelectors().selectById(state, roomName)
      const newData = currentData ? mergeRooms(currentData, data) : { ...data, name: roomName }
      roomAdapter.upsertOne(state, newData)
    })
    /** @todo listen to unsubscribe: remove room entity */
  }
})

function mergeRooms (currentRoom: Room, diff: RoomDiff): Room {
  const { gameTime } = diff
  const { name } = currentRoom
  const users = merge(currentRoom.users, diff.users)
  const objects = merge(currentRoom.objects, diff.objects)
  return { name, gameTime, users, objects }
}

export default roomSlice.reducer
