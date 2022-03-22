import { ReactNode, useEffect, useState } from 'react'
import { Avatar, Tag, Input, Image, Button } from 'antd'
import style from './index.less'
import UserUpdataModal from 'overview/UserUpdataModal'
import { connect, useIntl } from 'umi'
import { queryUser } from 'services/user'

const tagData = ['标签1', '测试标签']
const tagColor = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'green',
  'geekblue',
  'purple'
]

type user = {
  email?: string
  img?: string
  name?: string
  password?: string
  sign?: string
  tag?: string[]
  userId?: number
  loginNumber?: number
  planNumber?: number
  shareNumber?: number
}

function UserLable() {
  const [isUpdataModalVisible, setIsUpdataModalVisible] =
    useState<boolean>(false)
  const [user, setUser] = useState<user>({
    name: '啊咧',
    sign: '坏掉了',
    tag: []
  })
  const { formatMessage } = useIntl()

  useEffect(() => {
    getUserInfo()
  }, [])

  const handleClickUpdata = (): void => {
    setIsUpdataModalVisible(true)
  }

  const handleUpdataCancel = (): void => {
    setIsUpdataModalVisible(false)
    getUserInfo()
  }

  const handleUpdataOk = (): void => {
    setIsUpdataModalVisible(false)
    getUserInfo()
  }

  const getUserInfo = async () => {
    try {
      const res = await queryUser()
      if (res?.code === 200) {
        localStorage.setItem('user', JSON.stringify(res.data))
        setUser(res.data)
      }
    } catch (error) {}
  }

  const randerTags = (data: string[]) => {
    if (Array.prototype.isPrototypeOf(data)) {
      return data.map((e) => (
        <Tag key={e} color={tagColor[Math.floor(Math.random() * 8)]}>
          {e}
        </Tag>
      ))
    } else {
      return <Tag> 坏掉了</Tag>
    }
  }

  return (
    <div className={style.userlable}>
      <div className={style.userlableLeft}>
        <Avatar
          size={128}
          shape="square"
          icon={
            <Image
              src={user?.img}
              fallback={require('@/assets/fallimg.png')}
              preview={false}
            />
          }
        />
        <div className={style.userDetail}>
          <h3>{user?.name}</h3>
          <p>{formatMessage({ id: 'overview.等级' })} : 98</p>
          <p>
            {formatMessage({ id: 'overview.工作' })} :{' '}
            {user?.sign ? user?.sign : '这个人很懒'}
          </p>
          <p>
            {formatMessage({ id: 'overview.标签' })} :{' '}
            {user?.tag ? (
              <span>{randerTags(user?.tag)}</span>
            ) : (
              <span>暂无标签呢～</span>
            )}
          </p>
        </div>
      </div>
      <div className={style.userlableRight}>
        <Button type="dashed" onClick={handleClickUpdata}>
          {formatMessage({ id: 'overview.编辑资料' })}
        </Button>
      </div>
      <UserUpdataModal
        visible={isUpdataModalVisible}
        onHandleOk={handleUpdataOk}
        onHandleCancel={handleUpdataCancel}
      />
    </div>
  )
}

export default UserLable
