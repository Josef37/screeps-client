import { all, select, takeLatest, call } from 'typed-redux-saga'
import { signinSuccess } from '../auth/auth.slice'
import { RootState } from '../root.reducer'
import Socket from '../../api/socket'

function * initSocket () {
  const { serverUrl, token } = yield * select((state: RootState) => state.auth)
  if (!token) return
  // Make a new socket connection (close any existing)
  yield Socket.setInstance(`${serverUrl}/socket`, token)
}

function * onSigninSuccess () {
  yield * takeLatest(signinSuccess, initSocket)
}

export default function * socketSaga () {
  yield * all([
    call(onSigninSuccess)
  ])
}
