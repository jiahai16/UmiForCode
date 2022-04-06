import { message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import ChatInput from './ChatInput'
import ChatList from './ChatList'
import style from './index.less'
import UserList from './UserList'
import { getReceiveMsg } from 'services/chat'

const localUser = JSON.parse(localStorage.getItem('user') as string)
let lockReconnect = false //避免重复连接
const wsUrl: string = `ws://101.43.25.47:8230/chat/${localUser?.userId}`
let ws: WebSocket
const pingMessage = {
  user: {
    ...localUser
  },
  message: 'PING',
  type: 2
}

function createWebSocket() {
  console.log('连接')
  try {
    ws = new WebSocket(wsUrl)
  } catch (e) {}
}

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
        setChatList([...res.data, ...chatList])
      }
    } catch (error) {}
  }

  useEffect(() => {
    createWebSocket()
    console.log('1')

    ws.onmessage = (evt) => {
      //heartCheck.start()
      const newMessage: messageBody = JSON.parse(evt.data)
      if (newMessage.type === 0) {
        setChatList([...chatList, newMessage])
      } else if (newMessage.type === 1) {
        setUserList([...newMessage.onlineUser])
      }
    }
    ws.onopen = () => {
      message.success(localUser?.name + '❤️ 成功加入啦')
    }
    ws.onerror = () => {
      message.error('我敢保证,绝对是 🐻 的服务器坏了')
    }
    return () => {
      ws.close()
      console.log('断开')
      // clearInterval(timer)
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
