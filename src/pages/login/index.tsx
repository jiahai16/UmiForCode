import { history } from 'umi'
import { Layout, Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import classNames from 'classnames'

const { Header, Footer, Content } = Layout
import style from './index.less'
import { useState } from 'react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState<boolean>(false)

  const changeLoginState = (): void => {
    setIsLogin(!isLogin)
  }

  const handleGoHome = () => {
    history.push('/overview')
  }
  const insertValue = () => {
    localStorage.setItem('login', 'true')
    history.push('/overview')
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className={style.siteLayoutHeader}>
        <div className={style.siderHeader} onClick={handleGoHome}></div>
      </Header>
      <Content
        className={classNames(style.container, isLogin ? style.signUpMode : '')}
      >
        <div className={style.formWarp}>
          <form className={style.signInForm}>
            <h2 className={style.formTitle}>登 录</h2>
            <Input className={style.input} placeholder="用户名" />
            <Input.Password
              className={style.input}
              placeholder="密码"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <div className={style.submitBtn}>立即登录</div>
          </form>
          <form className={style.signUpForm}>
            <h2 className={style.formTitle}>注 册!</h2>
            <Input className={style.input} placeholder="用户名" />
            <Input className={style.input} placeholder="邮箱" />
            <div className={style.emailWrap}>
              <Input className={style.checkInput} placeholder="验证码" />
              <div className={style.submitCheckBtn}>发送验证码</div>
            </div>
            <Input.Password
              className={style.input}
              placeholder="密码"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <div className={style.submitBtn}>立即注册</div>
          </form>
        </div>
        <div className={style.descWarp}>
          <div className={classNames(style.descWarpItem, style.signUpDesc)}>
            <div className={style.content}>
              <h2 className={style.contentTitle}>还没有账号！立即注册一个吧</h2>
              <button className={style.signUpBtn} onClick={changeLoginState}>
                注册
              </button>
            </div>
            <img src={require('@/assets/bao-come-back-later-1.png')} alt="" />
          </div>
          <div className={classNames(style.descWarpItem, style.signInDesc)}>
            <div className={style.content}>
              <h2 className={style.contentTitle}>已有账号！直接登录吧</h2>
              <button className={style.signInBtn} onClick={changeLoginState}>
                登录
              </button>
            </div>
            <img src={require('@/assets/bao-social-network-1.png')} alt="" />
          </div>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          background: 'transparent',
          position: 'fixed',
          bottom: 0
        }}
      >
        <a href="#">KKO</a> Design ©2021 Power by XJH
      </Footer>
    </Layout>
  )
}
