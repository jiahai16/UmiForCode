import { message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import ChatInput from './ChatInput'
import ChatList from './ChatList'
import style from './index.less'
import UserList from './UserList'
import { getReceiveMsg } from 'services/chat'

const localUser = JSON.parse(localStorage.getItem('user') as string)
let lockReconnect = false //避免重复连接
const wsUrl: string = `ws://101.43.25.47/core-api/ws/chat/${localUser?.userId}`
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
  } catch (e) {
    reconnect()
  }
}

function reconnect() {
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
type heartType = {
  timeout: number //60ms
  timeoutObj: null | NodeJS.Timeout
  reset: () => void
  start: () => void
}
let heartCheck: heartType = {
  timeout: 5000, //60ms
  timeoutObj: null,
  reset: function () {
    clearTimeout(this.timeoutObj as NodeJS.Timeout)
    this.start()
  },
  start: function () {
    this.timeoutObj = setTimeout(function () {
      ws.send(JSON.stringify(pingMessage))
    }, this.timeout)
  }
}
createWebSocket()

export default function Chat() {
  const [chatList, setChatList] = useState<messageBody[]>([])
  const [userList, setUserList] = useState<user[]>([])

  const sendMessage = useCallback(
    (value: string) => {
      const Message = {
        user: {
          ...localUser
        },
        message: value,
        type: 0
      }
      if (ws.readyState === ws.CLOSED) {
        createWebSocket()
        message.error('好像掉线了？正在尝试重新连接')
      } else if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify(Message))
        if (Message.type === 0) {
          setChatList([...chatList, Message])
        }
      }
    },
    [chatList]
  )

  const getReceive = async () => {
    try {
      const res = await getReceiveMsg()
      if (res.code === 200) {
        setChatList([...res.data])
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (ws.readyState !== ws.OPEN || ws.readyState !== ws.CONNECTING) {
      createWebSocket()
    }
    ws.onopen = () => {
      message.success(localUser?.name + '❤️ 成功加入啦')
      heartCheck.start()
    }
    ws.onerror = () => {
      message.error('我敢保证,绝对是 🐻 的服务器坏了')
      reconnect()
    }
    ws.onclose = () => {
    }
    return () => {
      ws.close()
    }
  }, [])
  ws.onmessage = (evt) => {
    heartCheck.reset()
    const newMessage: messageBody = JSON.parse(evt.data)
    if (newMessage.type === 0) {
      setChatList([...chatList, newMessage])
    } else if (newMessage.type === 1) {
      setUserList([...newMessage.onlineUser])
    } else if (newMessage.type === 2) {
    }
  }

  return (
    <div className={style.wrap}>
      <div className={style.chatWrap}>
        <div className={style.chatHeader}>
          <h1>我是一个title (22)</h1>
        </div>
        <div className={style.chatContent}>
          <div className={style.chatLeft}>
            <div className={style.chatLeftContent}>
              <ChatList data={chatList} receiveFC={getReceive} />
            </div>
            <div className={style.chatLeftFooter}>
              <ChatInput sendFc={sendMessage} />
            </div>
          </div>
          <div className={style.chatRight}>
            <UserList userList={userList} />
          </div>
        </div>
      </div>
    </div>
  )
}
