import { Input, Button, Form } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import classNames from 'classnames'

import style from '../index.less'
import { useState } from 'react'

export default function SignUp() {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [checkBtnText, setCheckBtnText] = useState<string>('发送验证码')
  const [form] = Form.useForm()

  const handleOk = () => {
    let a = 60
    setConfirmLoading(true)
    const timer = setInterval(() => {
      setCheckBtnText(`${a}秒`)
      a -= 1
    }, 1000)
    setTimeout(() => {
      clearInterval(timer)
      setCheckBtnText('发送验证码')
      setConfirmLoading(false)
    }, 60000)
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={style.signUpForm}>
      <Form name="register" onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
        <h2 className={style.formTitle}>注 册!</h2>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '交白卷可不行' }]}
        >
          <Input className={style.input} placeholder="用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '交白卷可不行!' }]}
        >
          <Input.Password
            className={style.input}
            placeholder="密码 >_<"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: '交白卷可不行！！' }]}
        >
          <Input className={style.input} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="emailCheckCode"
          rules={[{ required: true, message: '交白卷可不行！！!' }]}
        >
          <div className={style.emailWrap}>
            <Input className={style.checkInput} placeholder="验证码" />
            <Button className={style.submitCheckBtn} onClick={handleOk} loading={confirmLoading}>{checkBtnText}</Button>
          </div>
        </Form.Item>

        <Form.Item>
          <Button className={style.submitBtn} htmlType="submit">
            立即注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
