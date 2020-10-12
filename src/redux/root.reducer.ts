import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth/auth.slice'
import roomReducer from './room/room.slice'
import socketReducer from './socket/socket.slice'

const rootReducer = combineReducers({
  auth: authReducer,
  room: roomReducer,
  socket: socketReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
