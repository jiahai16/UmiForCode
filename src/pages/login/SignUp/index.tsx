import { Input, Button, Form, message } from 'antd'
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  FrownTwoTone,
  SmileTwoTone,
  MehTwoTone
} from '@ant-design/icons'
import classNames from 'classnames'

import style from '../index.less'
import { useState } from 'react'
import { useIntl } from 'umi'
import { checkRepeatStatus, sendEmailFunc, signUpFunc } from 'services/user'
type IModal = {
  changeLoginState: () => void
}
export default function SignUp({ changeLoginState }: IModal) {
  const { formatMessage } = useIntl()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [checkNameStatus, setCheckNameStatus] = useState<string>('default')
  const [checkEmailStatus, setCheckEmailStatus] = useState<string>('default')
  const [checkBtnText, setCheckBtnText] = useState<string>(
    `${formatMessage({ id: 'login.注册.邮箱验证按钮' })}`
  )
  const [form] = Form.useForm()

  const checkStatusMap = new Map([
    ['default', <MehTwoTone />],
    ['true', <SmileTwoTone twoToneColor="green" />],
    ['false', <FrownTwoTone twoToneColor="red" />]
  ])

  const handleSendEmail = () => {
    if (form.getFieldsValue().email) {
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
  }

  const checkNameRepeat = async (value: any) => {
    try {
      const res = await checkRepeatStatus({
        user: { name: value.target.value }
      })
      if (res.code === 200 && res.data === true) {
        setCheckNameStatus('true')
      } else {
        setCheckNameStatus('false')
      }
    } catch (error) {}
  }

  const checkEmailRepeat = async (value: any) => {
    try {
      const res = await checkRepeatStatus({
        user: { email: value.target.value }
      })
      if (res.code === 200 && res.data === true) {
        setCheckEmailStatus('true')
      } else {
        setCheckEmailStatus('false')
      }
    } catch (error) {}
  }

  const sendEmail = async () => {
    const email = form.getFieldsValue().email
    try {
      const { code } = await sendEmailFunc({ email: email })
      if (code === 200) message.success('发送成功，去查看邮箱吧！')
    } catch (error) {}
  }

  const handleSignUpClick = async () => {
    const checkCode = form.getFieldsValue().code
    const user = { ...form.getFieldsValue() }
    try {
      const { code } = await signUpFunc({ user: user, code: checkCode })
      if (code === 200) {
        message.success('恭喜注册成功！去登录吧')
        changeLoginState && changeLoginState()
        form.resetFields()
      }
    } catch (error) {}
  }

  const onFinish = (values: any) => {
    handleSignUpClick()
  }

  const onFinishFailed = (errorInfo: any) => {
    message.warning('注册格式有误哦！')
  }
  return (
    <div className={style.signUpForm}>
      <Form
        name="register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <h2 className={style.formTitle}>
          {formatMessage({ id: 'login.注册.标题' })}
        </h2>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: `${formatMessage({
                id: 'login.注册.用户名输入框.校验'
              })}`
            },
            {
              pattern: /^[\s\u4e00-\u9fa5a-z0-9_-]{0,}$/,
              message: `${formatMessage({
                id: 'login.注册.用户名输入框.校验.非法字符'
              })}`
            }
          ]}
        >
          <Input
            className={style.input}
            placeholder={formatMessage({ id: 'login.注册.用户名' })}
            prefix={
              checkStatusMap.has(checkNameStatus)
                ? checkStatusMap.get(checkNameStatus)
                : ''
            }
            maxLength={8}
            onBlur={checkNameRepeat}
            showCount
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: `${formatMessage({ id: 'login.注册.密码输入框.校验' })}`
            }
          ]}
        >
          <Input.Password
            className={style.input}
            placeholder={formatMessage({ id: 'login.注册.密码' })}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            maxLength={16}
          />
        </Form.Item>
        <Form.Item
          name="email"
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
            className={style.input}
            placeholder={formatMessage({ id: 'login.注册.邮箱' })}
            prefix={
              checkStatusMap.has(checkEmailStatus)
                ? checkStatusMap.get(checkEmailStatus)
                : ''
            }
            onBlur={checkEmailRepeat}
          />
        </Form.Item>
        <Form.Item
          name="code"
          rules={[
            {
              required: true,
              message: `${formatMessage({ id: 'login.注册.邮箱.校验' })}`
            }
          ]}
        >
          <div className={style.emailWrap}>
            <Input
              className={style.checkInput}
              placeholder={formatMessage({ id: 'login.注册.邮箱验证码' })}
            />
            <Button
              className={style.submitCheckBtn}
              onClick={handleSendEmail}
              loading={confirmLoading}
            >
              {checkBtnText}
            </Button>
          </div>
        </Form.Item>

        <Form.Item>
          <Button className={style.submitBtn} htmlType="submit">
            {formatMessage({ id: 'login.注册.按钮' })}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
