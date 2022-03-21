import { ReactNode, useState } from 'react'
import { Avatar, Tag, Input, Image, Button } from 'antd'
import style from './index.less'
import UserUpdataModal from 'overview/UserUpdataModal'
import { connect, useIntl } from 'umi'

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
        <Avatar
          size={128}
          shape="square"
          icon={
            <Image
              src={user?.user.img}
              fallback={require('@/assets/fallimg.png')}
              preview={false}
            />
          }
        />
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
