import { Modal, Button } from 'antd'

import style from '../index.less'
import { useState } from 'react'
type IModal = {
  visible: boolean
  onHandleOk: () => void
  onHandleCancel: () => void
}
export default function Forget({
  visible,
  onHandleOk,
  onHandleCancel
}: IModal) {
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setConfirmLoading(false)
      onHandleOk()
    }, 2000)
  }

  const handleCancel = () => {
    onHandleCancel && onHandleCancel()
  }

  return (
    <Modal
      title="找回密码"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    ></Modal>
  )
}
