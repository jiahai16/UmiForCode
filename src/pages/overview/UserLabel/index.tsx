import { ReactNode, useState } from 'react'
import { Avatar, Tag, Input, Tooltip, Button } from 'antd'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'
import style from './index.less'
import UserUpdataModal from 'overview/UserUpdataModal'

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

export default function UserLable() {
  const [isUpdataModalVisible, setIsUpdataModalVisible] =
    useState<boolean>(false)

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
      <Tag color={tagColor[Math.floor(Math.random() * 8)]}>{e}</Tag>
    ))
  }

  return (
    <div className={style.userlable}>
      <div className={style.userlableLeft}>
        <Avatar size={128} shape="square" icon={<UserOutlined />} />
        <div className={style.userDetail}>
          <h3>Noob-Builder-JD</h3>
          <p>Level : 301</p>
          <p>Job : null</p>
          <p>
            Tag : <span>{randerTags(tagData)}</span>
          </p>
        </div>
      </div>
      <div className={style.userlableRight}>
        <Button type="dashed" onClick={handleClickUpdata}>
          编辑资料
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
