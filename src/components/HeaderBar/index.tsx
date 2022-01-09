import React from 'react'
import { Avatar, Popover, Input } from 'antd'
import { history } from 'umi'
import { UserOutlined } from '@ant-design/icons'
const { Search } = Input
import style from './index.less'

const HeaderBar: React.FC = () => {
  const onSearch = (value: string) => console.log(value)

  const handleLoginClick = () => {
    history.push('/login')
  }
  return (
    <div className={style.wrap}>
      <div className={style.searchWrap}>
        <Search
          placeholder="牛皮程序员修炼指南？"
          onSearch={onSearch}
          enterButton
          style={{
            marginLeft: '20px',
            width: '25%'
          }}
        />
      </div>
      <div onClick={handleLoginClick}>
        <Avatar
          className={style.avatar}
          shape="square"
          icon={<UserOutlined />}
        />
      </div>
    </div>
  )
}

export default HeaderBar
