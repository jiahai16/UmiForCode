import { Radio } from 'antd'
import 'moment/locale/zh-cn'
import { useEffect, useState } from 'react'
import { setLocale, useIntl } from 'umi'
import style from './index.less'

const ThemeSetting: React.FC = () => {
  const { formatMessage } = useIntl()

  const [localState, setLocalState] = useState<string>('zh-CN')

  const localeValue = localStorage.getItem('NC_language')

  useEffect(() => {
    if (localeValue && localeValue === 'en-US') {
      setLocalState('en-US')
    } else if (localeValue) {
      setLocalState('zh-CN')
      localStorage.setItem('NC_language', 'zh-CN')
    }
  }, [])

  const changeLocale = (e: any) => {
    const localeValue = e.target.value
    setLocalState(localeValue)
    if (localeValue === 'en-US') {
      setLocale('en-US', false)
      localStorage.setItem('NC_language', 'en-US')
    } else if (localeValue === 'zh-CN') {
      setLocale('zh-CN', false)
      localStorage.setItem('NC_language', 'zh-CN')
    } else {
      setLocale('zh-CN', false)
      localStorage.setItem('NC_language', 'zh-CN')
    }
  }

  return (
    <div className={style.wrap}>
      <div className={style.item}>
        <h1>{formatMessage({ id: 'setting.主题设置.语言' })}：</h1>
        <Radio.Group value={localState} onChange={changeLocale}>
          <Radio.Button key="en" value={'en-US'}>
            English
          </Radio.Button>
          <Radio.Button key="cn" value={'zh-CN'}>
            中文
          </Radio.Button>
        </Radio.Group>
      </div>
      <div className={style.item}>
        <h1>{formatMessage({ id: 'setting.主题设置.颜色' })}：</h1>
        <p>还没写出来呢-。-</p>
      </div>
    </div>
  )
}

export default ThemeSetting
