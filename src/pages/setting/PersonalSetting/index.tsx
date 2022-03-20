import { Button, Divider, Switch } from 'antd'
import 'moment/locale/zh-cn'
import { useEffect, useState } from 'react'
import { useIntl } from 'umi'
import style from './index.less'
import UpdataModal from './UpdataModal'

const PersonalSetting: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [isUpdataModalVisible, setIsUpdataModalVisible] =
    useState<boolean>(false)
  const { formatMessage } = useIntl()
  const user = JSON.parse(localStorage.getItem('user') as string)
  const changeDisable = () => {}

  const handleClickUpdata = (title: string): void => {
    setTitle(() => title)
    setIsUpdataModalVisible(true)
  }

  const handleUpdataCancel = (): void => {
    setIsUpdataModalVisible(false)
  }

  const handleUpdataOk = (): void => {
    setIsUpdataModalVisible(false)
  }

  return (
    <div className={style.wrap}>
      <div className={style.item}>
        <h1>😉 用户名称：{user?.name}</h1>
        <Button onClick={() => handleClickUpdata('更改用户名')}>
          更改用户名
        </Button>
      </div>
      <Divider />
      <div className={style.item}>
        <h1>🤪 密码：*******</h1>
        <Button onClick={() => handleClickUpdata('更改密码')}>更改密码</Button>
      </div>
      <Divider />

      <div className={style.item}>
        <h1>🥰 邮箱：{user?.email}</h1>
        <Button onClick={() => handleClickUpdata('更改邮箱')}>更改邮箱</Button>
      </div>
      <Divider />

      <div className={style.item}>
        <h1>🤩 分享可见性</h1>
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          defaultChecked
        />
      </div>
      <UpdataModal
        title={title}
        visible={isUpdataModalVisible}
        onHandleOk={handleUpdataOk}
        onHandleCancel={handleUpdataCancel}
      />
    </div>
  )
}

export default PersonalSetting
