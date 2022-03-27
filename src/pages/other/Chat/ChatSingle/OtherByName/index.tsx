import { Avatar } from 'antd'
import style from './index.less'

export default function Myself() {
  return (
    <article className={style.wrap}>
        <div className={style.avaImg}>
          <Avatar src="https://joeschmoe.io/api/v1/random" shape="square" size={40}/>
        </div>
        <div className={style.name}>坏人·jiahai-test</div>
        <div className={style.content}>
          <span className={style.text}>
            我是猪
          </span>
        </div>
    </article>
  )
}
