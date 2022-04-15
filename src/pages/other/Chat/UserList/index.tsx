import style from './index.less'
import { List, Avatar } from 'antd'

import classNames from 'classnames'

interface IProp {
  userList: user[]
}

export default function UserList({ userList }: IProp) {
  const renderList = (data: any) => {
    return data.map((e: any, idx: any) => (
      <div className={style.userWrap} key={idx}>
        <div className={style.avaImg}>
          <Avatar
            src={e?.img ? e.img : 'https://joeschmoe.io/api/v1/random'}
            shape="square"
          />
        </div>
        <div className={style.name}>
          <a>{e?.name}</a>
        </div>
      </div>
    ))
  }
  if (userList?.length === 0) {
    return <div className={style.wrap}>还木有人来</div>
  } else return <div className={style.wrap}>{renderList(userList)}</div>
}
