import { Avatar } from 'antd'
import style from './index.less'

export default function Myself() {
  return (
    <article className={style.wrap}>
      <div className={style.avaImg}>
        <Avatar
          src="https://joeschmoe.io/api/v1/random"
          shape="square"
          size={40}
        />
      </div>
      <div className={style.name}>好人·芭比</div>
      <div className={style.content}>
        <span className={style.text}>
          WebSocket WebSocket 对象提供了用于创建和管理 WebSocket
          连接，以及可以通过该连接发送和接收数据的 API。 使用 WebSocket()
          构造函数来构造一个 WebSocket 。
        </span>
      </div>
    </article>
  )
}
