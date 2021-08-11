import { useState, useEffect } from 'react'
import style from './index.less'
import { Select } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const { Option } = Select

export default function LableHeader({
  headerTxt,
  borderBottom = true,
  dropdown = false
}) {
  const [chooseTime, setchooseTime] = useState('近一月')

  return (
    <div
      className={`${style.lableHeader} ${borderBottom && style.borderBottom}`}
    >
      {headerTxt}
      <div className={`${!dropdown && style.dropShow}`}>
        <Select defaultValue="近一年" style={{ width: 100 }} className={style.dropdownlink} bordered={false}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </div>
    </div>
  )
}
