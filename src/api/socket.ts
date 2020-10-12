import SockJS, { MessageEvent } from 'sockjs-client'
import { authFailure, authStart, authSuccess, close, message, open } from '../redux/socket/socket.slice'
import store from '../redux/store'

export default class Socket {
  private sock: WebSocket;

  private static instance: Socket | null = null;

  private constructor (socketUrl: string, private token: string) {
    this.sock = new SockJS(socketUrl)

    this.sock.onopen = () => {
      this.authenticateSocket()
      store.dispatch(open())
    }

    this.sock.onmessage = this.onMessage

    this.sock.onclose = () => {
      store.dispatch(close())
    }
  }

  static getInstance () {
    return this.instance
  }

  static setInstance (socketUrl: string, token: string) {
    if (this.instance) {
      this.instance.sock.close()
    }
    /** @todo maybe wait for the old socket to actually close! */
    this.instance = new this(socketUrl, token)
    return this.instance
  }

  subscribeChannel ({ name }: Channel) {
    this.sock.send(`subscribe ${name}`)
  }

  unsubscribeChannel ({ name }: Channel) {
    this.sock.send(`unsubscribe ${name}`)
  }

  private authenticateSocket () {
    store.dispatch(authStart())
    this.sock.send(`auth ${this.token}`)
  }

  private onMessage = (ev: MessageEvent) => {
    const msg = ev.data
    let channelName, data
    try { [channelName, data] = JSON.parse(msg) } catch (e) {}
    /** @todo remove */
    console.log('server >>>', msg)

    if (channelName) {
      store.dispatch(message({ channelName, data }))
    } else {
      this.handleAuthMessage(msg)
    }
  }

  private handleAuthMessage = (msg:string) => {
    if (msg.match('auth failed')) {
      store.dispatch(authFailure())
    } else if (msg.match('auth ok')) {
      store.dispatch(authSuccess())
    }
  }
}
