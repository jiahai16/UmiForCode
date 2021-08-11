import { Layout, Result, Button } from 'antd'
import { IRouteProps, Redirect, history } from 'umi'
import SiderBar from 'SiderBar'
import 'style/index.less' // 全局样式引入
import style from './index.less'
import { hasAccess } from '@/../config/userAccess'
import { pageRoutes } from '@/../config/routes'

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
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button type="primary" onClick={() => history.push('/overview')}>返回首页</Button>}
        />
      </div>
    )
  }

  if (!hasAccess(routerURL)) {
    return (
      <div className={style.antResultWrap}>
        <Result
          status="403"
          title="403"
          subTitle="抱歉，您没有该页面的权限，请联系管理员"
          extra={<Button type="primary" onClick={() => history.push('/overview')}>返回首页</Button>}
        />
      </div>
    )
  }

  localStorage.setItem('routerURL', routerURL)
  return <>{props.children}</>
}

function LayoutPage({ children }: IRouteProps) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiderBar></SiderBar>
      <Layout className={style.siteLayout}>
        <Header className={style.siteLayoutHeader} style={{ padding: 0 }} />
        <Content className={style.content}>
          <div className={style.contentBody}>
            {renderChildren({ children })}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
