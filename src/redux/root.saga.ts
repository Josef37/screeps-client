import { all, call } from 'typed-redux-saga'
import roomSaga from './room/room.saga'
import socketSaga from './socket/socket.saga'

export default function * rootSaga () {
  yield * all([
    call(roomSaga),
    call(socketSaga)
  ])
}
