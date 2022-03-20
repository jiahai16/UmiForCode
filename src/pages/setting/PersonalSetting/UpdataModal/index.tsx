import { Modal, Button, Form, Input, Avatar, Tag } from 'antd'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'

import style from './index.less'
import { useState } from 'react'
import { useIntl } from 'umi'
import Title from 'antd/lib/skeleton/Title'
type IModal = {
  visible: boolean
  onHandleOk: () => void
  onHandleCancel: () => void
  title: string
}
export default function UserUpdataModal({
  visible,
  onHandleOk,
  onHandleCancel,
  title
}: IModal) {
  const [form] = Form.useForm()
  const [avaImgData, setAvaImgData] = useState<string>('default')
  const { formatMessage } = useIntl()

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
      title={title}
      visible={visible}
      onOk={onFinish}
      onCancel={handleCancel}
    >
      {title === '更改用户名' && (
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          {...formItemLayout}
        >
          <Form.Item
            name="username"
            label={formatMessage({ id: 'overview.编辑资料.用户名' })}
            rules={[
              {
                required: true,
                message: `${formatMessage({
                  id: 'overview.编辑资料.用户名.校验'
                })}`
              }
            ]}
          >
            <Input
              placeholder={formatMessage({ id: 'input.请输入' })}
              maxLength={8}
              showCount
            />
          </Form.Item>
        </Form>
      )}
      {title === '更改密码' && (
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          {...formItemLayout}
        >
          <Form.Item
            name="oldPassword"
            label={formatMessage({ id: 'overview.编辑资料.旧密码' })}
            rules={[
              {
                required: true,
                message: `${formatMessage({
                  id: 'overview.编辑资料.旧密码.校验'
                })}`
              }
            ]}
          >
            <Input.Password
              placeholder={formatMessage({ id: 'input.请输入' })}
              maxLength={16}
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label={formatMessage({ id: 'overview.编辑资料.新密码' })}
            rules={[
              {
                required: true,
                message: `${formatMessage({
                  id: 'overview.编辑资料.新密码.校验'
                })}`
              }
            ]}
          >
            <Input.Password
              placeholder={formatMessage({ id: 'input.请输入' })}
              maxLength={16}
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}
