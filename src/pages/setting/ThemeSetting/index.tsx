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
import { setLocale } from 'umi'
import style from './index.less'

moment.locale('en')

const ThemeSetting: React.FC = () => {
  const [localState, setLocalState] = useState<string>('zh')

  const changeLocale = (e) => {
    const localeValue = e.target.value
    setLocalState(localeValue)
    if (localeValue === 'en') {
      moment.locale('en')
      setLocale('en-US', false)
    } else {
      moment.locale('zh-cn')
      setLocale('zh-CN', false)
    }
  }

  return (
    <div>
      <Radio.Group value={localState} onChange={changeLocale}>
        <Radio.Button key="en" value={'en'}>
          English
        </Radio.Button>
        <Radio.Button key="cn" value={'zh'}>
          中文
        </Radio.Button>
      </Radio.Group>
    </div>
  )
}

export default ThemeSetting
