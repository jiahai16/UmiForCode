import { history, useIntl } from 'umi'
import { Layout, Input, Button } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import classNames from 'classnames'

const { Header, Footer, Content } = Layout
import style from './index.less'
import { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Forget from './Forget'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [isForgetModalVisible, setIsForgetModalVisible] =
    useState<boolean>(false)
  const { formatMessage } = useIntl()

  const handleClickForget = (): void => {
    setIsForgetModalVisible(true)
  }

  const handleForgetCancel = (): void => {
    setIsForgetModalVisible(false)
  }

  const handleForgetOk = (): void => {
    setIsForgetModalVisible(false)
  }

  const changeLoginState = (): void => {
    setIsLogin(!isLogin)
  }

  const handleGoHome = () => {
    history.push('/hotInfo')
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
          <SignIn isForget={handleClickForget} />
          <SignUp changeLoginState={changeLoginState} />
        </div>
        <div className={style.descWarp}>
          <div className={classNames(style.descWarpItem, style.signUpDesc)}>
            <div className={style.content}>
              <h2 className={style.contentTitle}>
                {formatMessage({ id: 'login.注册.子标题' })}
              </h2>
              <button className={style.signUpBtn} onClick={changeLoginState}>
                {formatMessage({ id: 'login.注册' })}
              </button>
            </div>
            <img src={require('@/assets/bao-come-back-later-1.png')} alt="" />
          </div>
          <div className={classNames(style.descWarpItem, style.signInDesc)}>
            <div className={style.content}>
              <h2 className={style.contentTitle}>
                {formatMessage({ id: 'login.登录.子标题' })}
              </h2>
              <button className={style.signInBtn} onClick={changeLoginState}>
                {formatMessage({ id: 'login.登录' })}
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
      <Forget
        visible={isForgetModalVisible}
        onHandleCancel={handleForgetCancel}
        onHandleOk={handleForgetOk}
      />
    </Layout>
  )
}
