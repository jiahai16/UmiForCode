import { Input, Button, Form, Checkbox } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import classNames from 'classnames'

import style from '../index.less'
import { useState } from 'react'
import Forget from 'login/Forget'

type SignIn = {
  isForget: () => void
}
export default function SignIn({ isForget }: SignIn) {
  const [freeLoginCheck, setFreeLoginCheck] = useState(false)
  const [form] = Form.useForm()
  const handleFreeLogin = (): void => {
    setFreeLoginCheck(!freeLoginCheck)
  }

  const onFinish = () => {
    form.setFieldsValue({
      freeLogin: freeLoginCheck
    })
    console.log('Success:', form.getFieldsValue())
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={style.signInForm}>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <h2 className={style.formTitle}>登 录</h2>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '名字忘了吗？' }]}
        >
          <Input className={style.input} placeholder="用户名 or 邮箱" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '密码不输可不行啊' }]}
        >
          <Input.Password
            className={style.input}
            placeholder="密码 >_<"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex' }}>
            <Form.Item name="freeLogin" style={{ marginBottom: 0 }}>
              <Checkbox checked={freeLoginCheck} onChange={handleFreeLogin}>
                七天免登录
              </Checkbox>
            </Form.Item>
            <Button type="link" onClick={isForget}>
              密码忘了
            </Button>
          </div>
        </Form.Item>
        <Form.Item>
          <Button className={style.submitBtn} htmlType="submit">
            立即登录
          </Button>
          <div></div>
        </Form.Item>
      </Form>
    </div>
  )
}
