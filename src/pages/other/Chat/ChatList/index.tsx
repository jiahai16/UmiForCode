import { MutableRefObject, useEffect, useRef } from 'react'
import Myself from '../ChatSingle/Myself'
import OtherByName from '../ChatSingle/OtherByName'
import style from './index.less'

type chatListIProp = {
  data: messageBody[]
}
export default function ChatList({ data }: chatListIProp) {
  const list: MutableRefObject<any> = useRef(null)
  const localUser = JSON.parse(localStorage.getItem('user') as string)

  useEffect(() => {
    list.current.scrollTop = list?.current?.scrollHeight
  }, [data])

  return (
    <div className={style.wrap} ref={list}>
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
