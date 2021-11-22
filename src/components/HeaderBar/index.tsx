import React from 'react'
import { Avatar, Popover, Input } from 'antd'
const { Search } = Input
import style from './index.less'

const HeaderBar: React.FC = () =>{
  const onSearch = (value: string) => console.log(value)

  return (
    <div className={style.wrap}>
      <Search
        placeholder="牛皮程序员修炼指南？"
        onSearch={onSearch}
        enterButton
        style={{
          marginLeft: '20px',
          width: '25%',
        }}
      />
    </div>
  )
}

export default HeaderBar
