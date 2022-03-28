import style from './index.less'
import { List, Avatar } from 'antd'

const data = [
  {
    title: '爹'
  },
  {
    title: 'JSON居然不是字符串'
  }
]
import classNames from 'classnames'

const renderList = (data) => {
  return data.map((e, idx) => (
    <div className={style.userWrap} key={idx}>
      <div className={style.avaImg}>
        <Avatar src="https://joeschmoe.io/api/v1/random" shape="square" />
      </div>
      <div className={style.name}>
        <a>{e.title}</a>
      </div>
    </div>
  ))
}

export default function UserList() {
  return <div className={style.wrap}>{renderList(data)}</div>
}
