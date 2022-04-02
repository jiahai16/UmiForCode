import { message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import ChatInput from './ChatInput'
import ChatList from './ChatList'
import style from './index.less'
import UserList from './UserList'

const localUser = JSON.parse(localStorage.getItem('user') as string)
let lockReconnect = false //避免重复连接
const wsUrl: string = `ws://101.43.25.47:8230/chat/${localUser?.userId}`
let ws: WebSocket
let tt: NodeJS.Timeout
const pingMessage = {
  user: {
    ...localUser
  },
  message: 'PING',
  type: 2
}
function createWebSocket() {
  try {
    ws = new WebSocket(wsUrl)
    init()
  } catch (e) {
    reconnect(wsUrl)
  }
}
function init() {
  ws.onclose = () => {
    reconnect(wsUrl)
  }
  ws.onopen = () => {
    heartCheck.start()
  }
  ws.onerror = () => {
    message.error('发生异常了')
    reconnect(wsUrl)
  }
}

function reconnect(url: string) {
  if (lockReconnect) {
    return
  }
  lockReconnect = true
  //没连接上会一直重连，设置延迟避免请求过多
  tt && clearTimeout(tt)
  tt = setTimeout(function () {
    createWebSocket()
    lockReconnect = false
  }, 4000)
}
//心跳检测
var heartCheck = {
  timeout: 3000,
  timeoutObj: null,
  serverTimeoutObj: null,
  start: function () {
    var self = this
    this.timeoutObj && clearTimeout(this.timeoutObj)
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
    this.timeoutObj = setTimeout(function () {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      ws.send(JSON.stringify(pingMessage))
      self.serverTimeoutObj = setTimeout(function () {
        ws.close()
        // createWebSocket();
      }, self.timeout)
    }, this.timeout)
  }
}
createWebSocket()

export default function Chat() {
  const [chatList, setChatList] = useState<messageBody[]>([])

  ws.onmessage = (evt) => {
    heartCheck.start()
    const newMessage: messageBody = JSON.parse(evt.data)
    if (newMessage.type === 0) {
      setChatList([...chatList, newMessage])
    } else if (newMessage.type === 1) console.log(newMessage)
  }

  const sendMessage = useCallback(
    (value: string) => {
      const message = {
        user: {
          ...localUser
        },
        message: value,
        type: 0
      }
      ws.send(JSON.stringify(message))
      if (message.type === 0) {
        setChatList([...chatList, message])
      }
    },
    [chatList]
  )

  useEffect(() => {
    return () => {
      ws.close()
    }
  }, [])

  return (
    <div className={style.wrap}>
      <div className={style.chatWrap}>
        <div className={style.chatHeader}>
          <h1>我是一个title (22)</h1>
        </div>
        <div className={style.chatContent}>
          <div className={style.chatLeft}>
            <div className={style.chatLeftContent}>
              <ChatList data={chatList} />
            </div>
            <div className={style.chatLeftFooter}>
              <ChatInput sendFc={sendMessage} />
            </div>
          </div>
          <div className={style.chatRight}>
            <UserList />
          </div>
        </div>
      </div>
    </div>
  )
}
