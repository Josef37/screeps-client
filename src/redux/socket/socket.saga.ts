import { all, call, select, takeEvery } from 'redux-saga/effects'
import { signinSuccess } from '../auth/auth.slice'
import { RootState } from '../root.reducer'
import Socket from '../../api/socket'

function * initSocket () {
  const { serverUrl, token } = yield select((state: RootState) => state.auth)
  // Make a new socket connection (close any existing)
  yield Socket.setInstance(`${serverUrl}/socket`, token)
}

function * onSigninSuccess () {
  yield takeEvery(signinSuccess, initSocket)
}

export default function * socketSaga () {
  yield all([
    call(onSigninSuccess)
  ])
}
