import { Button, Divider, Switch } from 'antd'
import 'moment/locale/zh-cn'
import { useEffect, useState } from 'react'
import { queryUser } from 'services/user'
import { useIntl } from 'umi'
import style from './index.less'
import UpdataModal from './UpdataModal'

const PersonalSetting: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [reqType, setReqType] = useState<string>('')
  const [isUpdataModalVisible, setIsUpdataModalVisible] =
    useState<boolean>(false)
  const { formatMessage } = useIntl()
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user') as string)
  )
  const changeDisable = () => {}

  const handleClickUpdata = (title: string, reqType: string): void => {
    setTitle(() => title)
    setReqType(() => reqType)
    setIsUpdataModalVisible(true)
  }

  const handleUpdataCancel = (): void => {
    setIsUpdataModalVisible(false)
  }

  const getUserInfo = async () => {
    try {
      const res = await queryUser()
      if (res?.code === 200) {
        setUser(res.data)
      }
    } catch (error) {}
  }

  const handleUpdataOk = (): void => {
    getUserInfo()
    setIsUpdataModalVisible(false)
  }

  return (
    <div className={style.wrap}>
      <div className={style.item}>
        <h1>😉 用户名称：{user?.name}</h1>
        <Button
          onClick={() => handleClickUpdata('更改用户名', 'CHANGE_USER_NAME')}
        >
          更改用户名
        </Button>
      </div>
      <Divider />
      <div className={style.item}>
        <h1>🤪 密码：*******</h1>
        <Button
          onClick={() => handleClickUpdata('更改密码', 'CHANGE_USER_PASSWORD')}
        >
          更改密码
        </Button>
      </div>
      <Divider />

      <div className={style.item}>
        <h1>🥰 邮箱：{user?.email}</h1>
        <Button
          onClick={() => handleClickUpdata('更改邮箱', 'CHANGE_USER_EMAIL')}
        >
          更改邮箱
        </Button>
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
        reqType={reqType}
        title={title}
        visible={isUpdataModalVisible}
        onHandleOk={handleUpdataOk}
        onHandleCancel={handleUpdataCancel}
      />
    </div>
  )
}

export default PersonalSetting
