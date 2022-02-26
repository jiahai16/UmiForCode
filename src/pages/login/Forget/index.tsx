import { Modal, Button, Form, Input } from 'antd'

import style from '../index.less'
import { useState } from 'react'
import { useIntl } from 'umi'
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
  const { formatMessage } = useIntl()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [checkBtnText, setCheckBtnText] = useState<string>(`${formatMessage({ id: 'login.找回密码.邮箱验证按钮' })}`)
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
      setCheckBtnText(`${a}s`)
      a -= 1
    }, 1000)
    setTimeout(() => {
      clearInterval(timer)
      setCheckBtnText(`${formatMessage({ id: 'login.找回密码.邮箱验证按钮' })}`)
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
      title={formatMessage({ id: 'login.找回密码.标题' })}
      visible={visible}
      onOk={onFinish}
      width="50%"
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
          label={formatMessage({ id: 'login.找回密码.初始邮箱' })}
          rules={[{ required: true, message: '名字忘了吗？' }]}
        >
          <Input placeholder={formatMessage({ id: 'input.请输入' })} />
        </Form.Item>
        <Form.Item
          name="emailCheckCode"
          label={formatMessage({ id: 'login.找回密码.邮箱验证' })}
          rules={[{ required: true, message: '交白卷可不行！！!' }]}
        >
          <div className={style.emailWrap}>
            <Input placeholder={formatMessage({ id: 'input.请输入' })} />
            <Button type="primary" onClick={handleOk} loading={confirmLoading}>
              {checkBtnText}
            </Button>
          </div>
        </Form.Item>
        <Form.Item
          name="password"
          label={formatMessage({ id: 'login.找回密码.新密码' })}
          rules={[{ required: true, message: '名字忘了吗？限制长度 0-16 位' }]}
        >
          <Input.Password
            placeholder={formatMessage({ id: 'input.请输入' })}
            showCount
            maxLength={16}
          />
        </Form.Item>
        <Form.Item
          name="checkPassWord"
          label={formatMessage({ id: 'login.找回密码.密码确认' })}
          rules={[{ required: true, message: '名字忘了吗？' }]}
        >
          <Input.Password
            placeholder={formatMessage({ id: 'input.请输入' })}
            maxLength={16}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
