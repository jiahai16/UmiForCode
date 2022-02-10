import { Modal, Button, Form, Input } from 'antd'

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
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [checkBtnText, setCheckBtnText] = useState<string>('发送验证码')
  const [form] = Form.useForm()

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 }
    }
  }

  const handleOk = () => {
    let a = 60
    setConfirmLoading(true)
    const timer = setInterval(() => {
      setCheckBtnText(`${a}秒后重试`)
      a -= 1
    }, 1000)
    setTimeout(() => {
      clearInterval(timer)
      setCheckBtnText('发送验证码')
      setConfirmLoading(false)
    }, 60000)
  }

  const handleCancel = () => {
    onHandleCancel && onHandleCancel()
  }

  const onFinish = () => {
    form.setFieldsValue({})
    console.log('Success:', form.getFieldsValue())
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Modal
      title="找回密码"
      visible={visible}
      onOk={onFinish}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        {...formItemLayout}
      >
        <Form.Item
          name="email"
          label="初始邮箱"
          rules={[{ required: true, message: '名字忘了吗？' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="emailCheckCode"
          label="邮箱验证"
          rules={[{ required: true, message: '交白卷可不行！！!' }]}
        >
          <div className={style.emailWrap}>
            <Input placeholder="验证码" />
            <Button type="primary" onClick={handleOk} loading={confirmLoading}>
              {checkBtnText}
            </Button>
          </div>
        </Form.Item>
        <Form.Item
          name="password"
          label="新密码"
          rules={[{ required: true, message: '名字忘了吗？' }]}
        >
          <Input.Password placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="checkPassWord"
          label="密码确认"
          rules={[{ required: true, message: '名字忘了吗？' }]}
        >
          <Input.Password placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
