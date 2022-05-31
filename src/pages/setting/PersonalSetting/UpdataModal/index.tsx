import { Modal, Button, Form, Input, Avatar, Tag, message } from 'antd'
import { FrownTwoTone, SmileTwoTone, MehTwoTone } from '@ant-design/icons'
import style from './index.less'
import { useState } from 'react'
import { useIntl } from 'umi'
import Title from 'antd/lib/skeleton/Title'
import {
  changeInfo,
  checkRepeatStatus,
  queryUser,
  sendEmailFunc
} from 'services/user'
type IModal = {
  visible: boolean
  onHandleOk: () => void
  onHandleCancel: () => void
  title: string
  reqType: string
}
export default function UserUpdataModal({
  visible,
  onHandleOk,
  onHandleCancel,
  title,
  reqType
}: IModal) {
  const [form] = Form.useForm()
  const [avaImgData, setAvaImgData] = useState<string>('default')
  const { formatMessage } = useIntl()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [checkBtnText, setCheckBtnText] = useState<string>(
    `${formatMessage({ id: 'login.找回密码.邮箱验证按钮' })}`
  )
  const [checkEmailStatus, setCheckEmailStatus] = useState<string>('default')

  const checkStatusMap = new Map([
    ['default', <MehTwoTone />],
    ['true', <SmileTwoTone twoToneColor="green" />],
    ['false', <FrownTwoTone twoToneColor="red" />]
  ])

  const handleSendEmail = () => {
    form.validateFields(['newEmail']).then(() => {
      if (form.getFieldsValue().newEmail) {
        sendEmail()
        let a = 60
        setConfirmLoading(true)
        const timer = setInterval(() => {
          setCheckBtnText(`${a}s`)
          a -= 1
        }, 1000)
        setTimeout(() => {
          clearInterval(timer)
          setCheckBtnText(`${formatMessage({ id: 'login.注册.邮箱验证按钮' })}`)
          setConfirmLoading(false)
        }, 60000)
      } else message.warn('请输入邮箱')
    })
  }

  const handleCheck = (value: any) => {
    form.validateFields(['email']).then(() => {
      checkEmailRepeat(value)
    })
  }

  const checkEmailRepeat = async (value: any) => {
    try {
      const res = await checkRepeatStatus({
        user: { email: value.target.value }
      })
      if (res.code === 200 && res.data === true) {
        setCheckEmailStatus('true')
      } else {
        message.warning('该邮箱已被注册！')
        setCheckEmailStatus('false')
      }
    } catch (error) {}
  }

  const sendEmail = async () => {
    const email = form.getFieldsValue().newEmail
    try {
      const { code } = await sendEmailFunc({ email: email })
      if (code === 200) message.success('发送成功，去查看邮箱吧！')
    } catch (error) {}
  }

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

  const onFinish = async () => {
    form.setFieldsValue({ ...form.getFieldsValue(), reqType: reqType })
    try {
      const { code } = await changeInfo({ ...form.getFieldsValue(true) })
      if (code === 200) {
        message.success('修改成功！')
        form.resetFields()
        onHandleOk && onHandleOk()
      }
    } catch (error) {
      throw error
    }
  }

  const onFinishFailed = (errorInfo: any) => {}

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
            name="newName"
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
      {title === '更改邮箱' && (
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          {...formItemLayout}
        >
          <Form.Item
            name="newEmail"
            label={formatMessage({ id: 'login.注册.新邮箱' })}
            rules={[
              {
                required: true,
                message: `${formatMessage({ id: 'login.注册.邮箱.校验' })}`
              },
              {
                pattern:
                  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                message: `${formatMessage({ id: 'login.注册.邮箱.校验.格式' })}`
              },

              {
                max: 50,
                message: `${formatMessage({ id: 'login.注册.邮箱.校验.长度' })}`
              }
            ]}
          >
            <Input
              placeholder={formatMessage({ id: 'input.请输入' })}
              onBlur={handleCheck}
              prefix={
                checkStatusMap.has(checkEmailStatus)
                  ? checkStatusMap.get(checkEmailStatus)
                  : ''
              }
            />
          </Form.Item>
          <Form.Item
            name="code"
            label={formatMessage({ id: 'login.找回密码.邮箱验证' })}
            rules={[{ required: true, message: '交白卷可不行！！!' }]}
          >
            <div className={style.emailWrap}>
              <Input placeholder={formatMessage({ id: 'input.请输入' })} />
              <Button
                type="primary"
                onClick={handleSendEmail}
                loading={confirmLoading}
              >
                {checkBtnText}
              </Button>
            </div>
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}
