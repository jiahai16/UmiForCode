import { Modal, Button, Form, Input, Avatar, Tag, message } from 'antd'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'
import TagItem from './TagItem'

import style from './index.less'
import { useEffect, useState } from 'react'
import { useIntl, history } from 'umi'
import AvaImg from './AvaImg'
import { userUpdate } from 'services/user'
type IModal = {
  visible: boolean
  onHandleOk: () => void
  onHandleCancel: () => void
}
export default function UserUpdataModal({
  visible,
  onHandleOk,
  onHandleCancel
}: IModal) {
  const [form] = Form.useForm()
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

  const userUpdateFn = async () => {
    try {
      const res = await userUpdate({
        tag: form.getFieldValue('tags'),
        user: { sign: form.getFieldValue('sign') }
      })
      if (res.code === 200) {
        message.success('更新成功！')
        onHandleOk()
      } else {
        message.error('更新失败！')
      }
    } catch (error) {}
  }

  const onFinish = () => {
    // form.setFieldsValue({})
    userUpdateFn()
    //console.log('Success:', form.getFieldsValue())
  }

  const onFinishFailed = (errorInfo: any) => {
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') as string)
    form.setFieldsValue({
      ...user,
      tags: user.tag
    })
  }, [])

  return (
    <Modal
      forceRender
      title={formatMessage({ id: 'overview.编辑资料' })}
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
        <Form.Item label={formatMessage({ id: 'overview.编辑资料.编辑头像' })}>
          <AvaImg />
        </Form.Item>
        <Form.Item
          name="sign"
          label={formatMessage({ id: 'overview.编辑资料.个性签名' })}
        >
          <Input
            placeholder={formatMessage({ id: 'input.请输入' })}
            maxLength={8}
            showCount
          />
        </Form.Item>
        <Form.Item
          label={formatMessage({ id: 'overview.编辑资料.添加标签' })}
          name="tags"
        >
          <TagItem setTagToForm={form.setFieldsValue} />
        </Form.Item>
        <Form.Item label="个人设置">
          <Button
            type="link"
            onClick={() => {
              history.push('/setting/personal-settings')
            }}
          >
            更改用户名，密码，邮箱等..
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
