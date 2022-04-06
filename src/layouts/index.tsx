import { Layout, Result, Button, ConfigProvider } from 'antd'
import { IRouteProps, history, useIntl, connect } from 'umi'
import SiderBar from 'SiderBar'
import 'style/index.less' // 全局样式引入
import style from './index.less'
import { pageRoutes } from '@/../config/routes'
import enUS from 'antd/lib/locale/en_US'
import zhCN from 'antd/lib/locale/zh_CN'
import HeaderBar from 'HeaderBar'
import { useCallback, useEffect, useState } from 'react'
import { queryUser } from 'services/user'
import useLocalStorageState from 'utils/useLocalStorageState/useLocalStorageState'

const { Header, Content, Footer } = Layout

function LayoutPage({ children, dispatch }: IRouteProps) {
  //const [locale, setLocale] = useState(zhCN)
  const [isLogin, setIsLogin, { removeItem, isPersistent }] =
    useLocalStorageState('login', {
      defaultValue: false
    })
  const loadUserInfo = useCallback(
    (data) => {
      dispatch({
        type: 'user/updateUserInfo',
        payload: {
          user: { ...data }
        }
      })
    },
    [dispatch]
  )
  const getUserInfo = async () => {
    try {
      const res = await queryUser()
      if (res?.code === 200) {
        loadUserInfo(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
        setIsLogin(true)
      } else {
        removeItem()
      }
    } catch (error) {}
  }

  function isLoginAccess(access: string, isLogin: boolean) {
    const accessRouter = ['/overview', '/task/task-plan', '/task/task-history','/other/other-chat' ,'/setting/personal-settings']
    if (isLogin) return true
    return !accessRouter.includes(access)
  }

  function renderChildren(props: IRouteProps) {
    const routerURL = history.location.pathname
    const { formatMessage } = useIntl()

    const pageRoutesJSON = JSON.stringify(pageRoutes)
    if (!pageRoutesJSON.includes(routerURL)) {
      return (
        <div className={style.antResultWrap}>
          <Result
            icon={
              <img
                style={{ width: 300 }}
                src={require('@/assets/ikigai-cat-putting-up-a-404-error-sign-1.png')}
              />
            }
            subTitle={formatMessage({ id: '404.标题' })}
            extra={
              <Button type="primary" onClick={() => history.go(-1)}>
                {formatMessage({ id: '404.返回按钮' })}
              </Button>
            }
          />
        </div>
      )
    }

    if (!isLoginAccess(routerURL, isLogin)) {
      return (
        <div className={style.antResultWrap}>
          <Result
            title="403"
            icon={
              <img
                style={{ width: 300 }}
                src={require('@/assets/ikigai-black-maneki-neko-with-figurine-and-houseplant.png')}
              />
            }
            subTitle={formatMessage({ id: '403.标题' })}
            extra={
              <Button type="primary" onClick={() => history.push('/login')}>
                {formatMessage({ id: '403.返回按钮' })}
              </Button>
            }
          />
        </div>
      )
    }

    localStorage.setItem('routerURL', routerURL)
    return <>{props.children}</>
  }
  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    //<ConfigProvider locale={locale}>
    <Layout style={{ minHeight: '100vh' }}>
      <SiderBar></SiderBar>
      <Layout className={style.siteLayout}>
        <Header className={style.siteLayoutHeader} style={{ padding: 0 }}>
          <HeaderBar />
        </Header>
        <Content className={style.content}>
          <div className={style.contentBody}>
            {renderChildren({ children })}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <a href="#">KKO</a> Design ©2021 Power by XJH
        </Footer>
      </Layout>
    </Layout>
    // </ConfigProvider>
  )
}

export default connect(({ user }) => ({ user }))(LayoutPage)
