import { message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import ChatInput from './ChatInput'
import ChatList from './ChatList'
import style from './index.less'
import UserList from './UserList'

const localUser = JSON.parse(localStorage.getItem('user') as string)
const webSocket = new WebSocket(
  `ws://101.43.25.47:8230/chat/${localUser?.userId}`
)
export default function Chat() {
  const [chatList, setChatList] = useState<messageBody[]>([])

  webSocket.onopen = () => {
    message.success('聊天室连接成功！')
  }
  webSocket.onmessage = (evt) => {
    const newMessage: messageBody = JSON.parse(evt.data)
    setChatList([...chatList, newMessage])
  }

  const sendMessage = useCallback(
    (value: string) => {
      const message = {
        user: {
          ...localUser
        },
        message: value
      }
      webSocket.send(JSON.stringify(message))

      setChatList([...chatList, message])
      //console.log(message)
    },
    [chatList]
  )

  useEffect(() => {
    return () => {
      webSocket.close()
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
