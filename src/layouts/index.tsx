import { Layout, Result, Button, ConfigProvider } from 'antd'
import { IRouteProps, Redirect, history } from 'umi'
import SiderBar from 'SiderBar'
import 'style/index.less' // 全局样式引入
import style from './index.less'
import { hasAccess } from '@/../config/userAccess'
import { pageRoutes } from '@/../config/routes'
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import HeaderBar from 'HeaderBar'
import { useState } from 'react'

const { Header, Content, Footer } = Layout

function renderChildren(props: IRouteProps) {
  const routerURL = history.location.pathname

  // 这个根据自己判断是否登录
  const isLogin = localStorage.getItem('login') === 'true'

  if (!isLogin) {
    return <Redirect to="/login" />
  }

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
          subTitle="别找了，不存在的."
          extra={
            <Button type="primary" onClick={() => history.push('/hotInfo')}>
              返回首页
            </Button>
          }
        />
      </div>
    )
  }

  if (!hasAccess(routerURL)) {
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
          subTitle="登录解锁更多姿势哦！请先登录吧～"
          extra={
            <Button type="primary" onClick={() => history.push('/login')}>
              去登录！
            </Button>
          }
        />
      </div>
    )
  }

  localStorage.setItem('routerURL', routerURL)
  return <>{props.children}</>
}

function LayoutPage({ children }: IRouteProps) {
  const [locale, setLocale] = useState(zhCN)
  return (
    <ConfigProvider locale={locale}>
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
    </ConfigProvider>
  )
}

export default LayoutPage
