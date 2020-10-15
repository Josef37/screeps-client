import { select, takeLatest, call, takeEvery } from 'typed-redux-saga'
import { signinSuccess } from '../auth/auth.slice'
import { RootState } from '../root.reducer'
import Socket from '../../api/socket'
import { subscribe, unsubscribe } from './socket.slice'
import { PayloadAction } from '@reduxjs/toolkit'

function * initSocket () {
  const { serverUrl, token } = yield * select((state: RootState) => state.auth)
  if (!token) return
  yield Socket.setInstance(`${serverUrl}/socket`, token)
}

function * handleSubscribe ({ payload: channel }: PayloadAction<Channel>) {
  const socket = yield * call([Socket, 'getInstance'])
  if (!socket) return
  yield socket.subscribeChannel(channel)
}

function * handleUnsubscribe ({ payload: channel }: PayloadAction<Channel>) {
  const socket = yield * call([Socket, 'getInstance'])
  if (!socket) return
  yield socket.unsubscribeChannel(channel)
}

export default function * socketSaga () {
  yield * takeLatest(signinSuccess, initSocket)
  yield * takeEvery(subscribe, handleSubscribe)
  yield * takeEvery(unsubscribe, handleUnsubscribe)
}
