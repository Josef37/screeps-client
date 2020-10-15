
import { PayloadAction } from '@reduxjs/toolkit'
import { put, select, takeEvery, takeLatest } from 'typed-redux-saga'
import { RootState } from '../root.reducer'
import { authSuccess, message, subscribe, unsubscribe } from '../socket/socket.slice'
import { removeRoom, setRoom, updateRoom } from './room.slice'

function getChannelName (roomId: string): string {
  return `room:${roomId}`
}

function * initRoom () {
  /** @todo don't use hard-coded value */
  yield put(setRoom('W7N7'))
}

function * setRoomSocket ({ payload: roomId } : PayloadAction<string>) {
  const channelName = getChannelName(roomId)
  yield * put(subscribe({ channelName }))
}

function * removeRoomSocket () {
  const prevRoomId = yield * select((state: RootState) => state.room.prevId)
  if (!prevRoomId) return
  const channelName = getChannelName(prevRoomId)
  yield * put(unsubscribe({ channelName }))
}

function * maybeUpdateRoom ({ payload: { channelName, data } }: PayloadAction<SocketMessage>) {
  const currentRoomId = yield * select((state: RootState) => state.room.id)
  if (!currentRoomId || channelName !== getChannelName(currentRoomId)) return
  yield * put(updateRoom(data))
}

export default function * roomSaga () {
  yield * takeLatest(authSuccess, initRoom)
  yield * takeEvery([setRoom, removeRoom], removeRoomSocket)
  yield * takeEvery(setRoom, setRoomSocket)
  yield * takeEvery(message, maybeUpdateRoom)
}
