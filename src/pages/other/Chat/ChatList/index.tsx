import { MutableRefObject, useEffect, useRef, useState } from 'react'
import Myself from '../ChatSingle/Myself'
import OtherByName from '../ChatSingle/OtherByName'
import style from './index.less'

type chatListIProp = {
  data: messageBody[]
  receiveFC: () => void
}
export default function ChatList({ data, receiveFC }: chatListIProp) {
  const list: MutableRefObject<any> = useRef(null)
  const ReceiveRef: MutableRefObject<any> = useRef(null)
  const localUser = JSON.parse(localStorage.getItem('user') as string)

  const handleReciveClick = () => {
    receiveFC && receiveFC()
    ReceiveRef.current.style.display = 'none'
  }

  useEffect(() => {
    list.current.scrollTop = list?.current?.scrollHeight
  }, [data])

  return (
    <div className={style.wrap} ref={list}>
      <div className={style.getReceive} ref={ReceiveRef} onClick={handleReciveClick}>
        查看历史记录
      </div>
      {data.map((e, idx) =>
        e.user.userId === localUser.userId ? (
          <div className={style.row} key={idx}>
            <Myself message={e} key={idx} />
          </div>
        ) : (
          <div className={style.row} key={idx}>
            <OtherByName message={e} key={idx} />
          </div>
        )
      )}
    </div>
  )
}
