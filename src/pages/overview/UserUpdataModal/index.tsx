import { Modal, Button, Form, Input, Avatar, Tag } from 'antd'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'
import TagItem from './TagItem'

import style from './index.less'
import { useState } from 'react'
import { useIntl } from 'umi'
import AvaImg from './AvaImg'
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
  const { formatMessage } = useIntl()

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
          name="username"
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
          <Button type="link">更改用户名，密码，邮箱等..</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
