import { Input, Button, Form } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import classNames from 'classnames'

import style from '../index.less'
import { useState } from 'react'

export default function SignUp() {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={style.signUpForm}>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
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
            <div className={style.submitCheckBtn}>发送验证码</div>
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
