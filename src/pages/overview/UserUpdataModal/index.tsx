import { Modal, Button, Form, Input, Avatar, Tag } from 'antd'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'
import TagItem from './TagItem'

import style from './index.less'
import { useState } from 'react'
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
  const [avaImgData, setAvaImgData] = useState<string>('default')

  const avaMap = new Map([
    ['default', <UserOutlined />],
    [
      'man1',
      <img
        src={require('@/assets/experimental-mans-head-1.png')}
        className={style.avaImg}
        onClick={() => handleAvaChange('man1')}
      />
    ],
    [
      'woman1',
      <img
        src={require('@/assets/experimental-womans-head-1.png')}
        className={style.avaImg}
        onClick={() => handleAvaChange('woman1')}
      />
    ],
    [
      'woman2',
      <img
        src={require('@/assets/experimental-womans-head-2.png')}
        className={style.avaImg}
        onClick={() => handleAvaChange('woman2')}
      />
    ],
    [
      'woman3',
      <img
        src={require('@/assets/experimental-womans-head-3.png')}
        className={style.avaImg}
        onClick={() => handleAvaChange('woman3')}
      />
    ]
  ])

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

  const handleAvaChange = (avaKey: string) => {
    setAvaImgData(avaKey)
    form.setFieldsValue({
      avatar: avaKey
    })
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
      title="编辑资料"
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
        <Form.Item name="avatar" label="编辑头像">
          <>
            <Avatar size={128} shape="square" icon={avaMap.get(avaImgData)} />
            <div className={style.avaList}>
              <Avatar
                size={64}
                shape="square"
                icon={avaMap.get('man1')}
                style={{ background: '#81ecec' }}
              />
              <Avatar
                size={64}
                shape="square"
                icon={avaMap.get('woman1')}
                style={{ marginLeft: 14, background: '#74b9ff' }}
              />
              <Avatar
                size={64}
                shape="square"
                icon={avaMap.get('woman2')}
                style={{ marginLeft: 14, background: '#ff7675' }}
              />
              <Avatar
                size={64}
                shape="square"
                icon={avaMap.get('woman3')}
                style={{ marginLeft: 14, background: '#fd79a8' }}
              />
            </div>
          </>
        </Form.Item>
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: '名字忘了吗？' }]}
        >
          <Input placeholder="请输入" maxLength={8} showCount />
        </Form.Item>

        <Form.Item
          name="oldPassword"
          label="旧密码"
          rules={[{ required: true, message: '不可以交白卷哦？' }]}
        >
          <Input.Password placeholder="请输入" maxLength={16} />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="新密码"
          rules={[
            { required: true, message: '不可以交白卷哦？密码长度为 6-16哦！' }
          ]}
        >
          <Input.Password placeholder="请输入" maxLength={16} />
        </Form.Item>
        <Form.Item label="添加标签" name="tags">
          <TagItem setTagToForm={form.setFieldsValue}/>
        </Form.Item>
      </Form>
    </Modal>
  )
}
