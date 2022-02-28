import { ReactNode, useState } from 'react'
import { Avatar, Tag, Input, Tooltip, Button } from 'antd'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'
import style from './index.less'
import UserUpdataModal from 'overview/UserUpdataModal'
import { connect, useIntl } from 'umi'
import { IUser } from 'login/type'

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
const avaMap = new Map([
  ['default', <UserOutlined />],
  [
    'man1',
    <img
      src={require('@/assets/experimental-mans-head-1.png')}
      className={style.avaImg}
    />
  ],
  [
    'woman1',
    <img
      src={require('@/assets/experimental-womans-head-1.png')}
      className={style.avaImg}
    />
  ],
  [
    'woman2',
    <img
      src={require('@/assets/experimental-womans-head-2.png')}
      className={style.avaImg}
    />
  ],
  [
    'woman3',
    <img
      src={require('@/assets/experimental-womans-head-3.png')}
      className={style.avaImg}
    />
  ]
])

function UserLable({ user }) {
  const [isUpdataModalVisible, setIsUpdataModalVisible] =
    useState<boolean>(false)
  const { formatMessage } = useIntl()

  const handleClickUpdata = (): void => {
    setIsUpdataModalVisible(true)
  }

  const handleUpdataCancel = (): void => {
    setIsUpdataModalVisible(false)
  }

  const handleUpdataOk = (): void => {
    setIsUpdataModalVisible(false)
  }

  const randerTags = (data: string[]) => {
    return data.map((e) => (
      <Tag key={e} color={tagColor[Math.floor(Math.random() * 8)]}>
        {e}
      </Tag>
    ))
  }

  return (
    <div className={style.userlable}>
      <div className={style.userlableLeft}>
        <Avatar size={128} shape="square" icon={avaMap.get(user?.user.img)} />
        <div className={style.userDetail}>
          <h3>{user?.user.name}</h3>
          <p>{formatMessage({ id: 'overview.等级' })} : 301</p>
          <p>{formatMessage({ id: 'overview.工作' })} : null</p>
          <p>
            {formatMessage({ id: 'overview.标签' })} :{' '}
            <span>{randerTags(tagData)}</span>
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

export default connect(({ user }) => ({ user }))(UserLable)
