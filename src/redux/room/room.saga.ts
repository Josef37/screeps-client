
import { put, takeLatest } from 'typed-redux-saga'
import Socket from '../../api/socket'
import { authSuccess, subscribe } from '../socket/socket.slice'

function * subscribeToRoom () {
  const socket = yield Socket.getInstance()
  if (!socket) return
  /** @todo remove hard-coded values, replace with user input */
  const channelName = 'room:W7N7'
  yield socket.subscribeChannel({ name: channelName })
  yield * put(subscribe({ name: channelName }))
}

export default function * roomSaga () {
  yield * takeLatest(authSuccess, subscribeToRoom)
}
