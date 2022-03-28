import Myself from '../ChatSingle/Myself'
import OtherByName from '../ChatSingle/OtherByName'
import style from './index.less'

type chatListIProp = {
  data: messageBody[]
}
export default function ChatList({ data }: chatListIProp) {
  const localUser = JSON.parse(localStorage.getItem('user') as string)

  return (
    <div className={style.wrap}>
      {data.map((e, idx) =>
        e.user.userId === localUser.userId ? (
          <div className={style.row}>
            <Myself message={e} key={idx} />
          </div>
        ) : (
          <div className={style.row}>
            <OtherByName message={e} key={idx}/>
          </div>
        )
      )}
    </div>
  )
}
