import {
  ConfigProvider,
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Popconfirm,
  Table,
  Modal,
  Button,
  Select,
  Transfer,
  Radio
} from 'antd'
import enUS from 'antd/lib/locale/en_US'
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { useState } from 'react'
import style from './index.less'

moment.locale('en')

const ThemeSetting: React.FC = () => {
  const [localState, setLocalState] = useState({ locale: enUS })

  const changeLocale = (e) => {
    const localeValue = e.target.value
    setLocalState({ locale: localeValue })
    if (!localeValue) {
      moment.locale('en')
    } else {
      moment.locale('zh-cn')
    }
  }

  return (
    <div>
      <Radio.Group value={localState} onChange={changeLocale}>
        <Radio.Button key="en" value={enUS}>
          English
        </Radio.Button>
        <Radio.Button key="cn" value={zhCN}>
          中文
        </Radio.Button>
      </Radio.Group>
    </div>
  )
}

export default ThemeSetting
