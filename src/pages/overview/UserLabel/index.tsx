import React from 'react'
import { Avatar, Tag, Input, Tooltip } from 'antd'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'
import style from './index.less'

export default function UserLable() {
  return (
    <div className={style.userlable}>
      <div className={style.userlableLeft}>
        <Avatar size={128} shape="square" icon={<UserOutlined />} />
      </div>
      <div className={style.userlableRight}>
        <h3>Noob-Builder-JD</h3>
        <p>Level : 301</p>
        <p>Job : null</p>
        <p>Tag</p>
      </div>
    </div>
  )
}
