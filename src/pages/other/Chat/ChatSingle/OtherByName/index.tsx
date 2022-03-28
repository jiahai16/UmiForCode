import { Avatar } from 'antd'
import style from './index.less'
type IProp = {
  message: messageBody
}
export default function OtherByName({ message }: IProp) {
  return (
    <article className={style.wrap}>
      <div className={style.avaImg}>
        <Avatar
          src={message?.user?.img}
          shape="square"
          size={40}
        />
      </div>
      <div className={style.name}>{message?.user?.name}</div>
      <div className={style.content}>
        <span className={style.text}>
          {message?.message}
        </span>
      </div>
    </article>
  )
}