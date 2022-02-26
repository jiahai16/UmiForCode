import { Input, Button, Form, Checkbox } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import classNames from 'classnames'

import style from '../index.less'
import { useState } from 'react'
import { useIntl } from 'umi'

type SignIn = {
  isForget: () => void
}
export default function SignIn({ isForget }: SignIn) {
  const [freeLoginCheck, setFreeLoginCheck] = useState(false)
  const [form] = Form.useForm()
  const { formatMessage } = useIntl()

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
        name="login"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <h2 className={style.formTitle}>
          {formatMessage({ id: 'login.登录.标题' })}
        </h2>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: `${formatMessage({
                id: 'login.登录.用户名输入框.校验'
              })}`
            }
          ]}
        >
          <Input
            className={style.input}
            placeholder={formatMessage({ id: 'login.登录.用户名输入框' })}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: `${formatMessage({ id: 'login.登录.密码输入框.校验' })}`
            }
          ]}
        >
          <Input.Password
            className={style.input}
            placeholder={formatMessage({ id: 'login.登录.密码输入框' })}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex' }}>
            <Form.Item name="freeLogin" style={{ marginBottom: 0 }}>
              <Checkbox checked={freeLoginCheck} onChange={handleFreeLogin}>
                {formatMessage({ id: 'login.登录.七天免登录' })}
              </Checkbox>
            </Form.Item>
            <Button type="link" onClick={isForget}>
              {formatMessage({ id: 'login.登录.忘记密码' })}
            </Button>
          </div>
        </Form.Item>
        <Form.Item>
          <Button className={style.submitBtn} htmlType="submit">
            {formatMessage({ id: 'login.登录.按钮' })}
          </Button>
          <div></div>
        </Form.Item>
      </Form>
    </div>
  )
}
