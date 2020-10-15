import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../root.reducer'

enum AuthState {
  None = 'None',
  Start = 'Start',
  Success = 'Success',
  Failure = 'Failure'
}

enum SocketState {
  Open = 'Open',
  Closed = 'Closed',
}

const channelsAdapter = createEntityAdapter<Channel>({
  selectId: channel => channel.channelName
})

const initialState = {
  authState: AuthState.None,
  socketState: SocketState.Closed,
  channels: channelsAdapter.getInitialState()
}

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    authStart: (state) => {
      state.authState = AuthState.Start
    },
    authSuccess: (state) => {
      state.authState = AuthState.Success
    },
    authFailure: (state) => {
      state.authState = AuthState.Failure
    },
    open: (state) => {
      state.socketState = SocketState.Open
    },
    close: (state) => {
      state.socketState = SocketState.Closed
    },
    message: (state, action: PayloadAction<SocketMessage>) => {},
    subscribe: (state, action: PayloadAction<Channel>) => {
      state.channels = channelsAdapter.addOne(state.channels, action)
    },
    unsubscribe: (state, action: PayloadAction<Channel>) => {
      state.channels = channelsAdapter.removeOne(state.channels, action.payload.channelName)
    }
  }
})

export const {
  selectById: selectChannelByName
} = channelsAdapter.getSelectors((state:RootState) => state.socket.channels)

export const {
  authStart, authSuccess, authFailure,
  open, message, close,
  subscribe, unsubscribe
} = socketSlice.actions

export default socketSlice.reducer
