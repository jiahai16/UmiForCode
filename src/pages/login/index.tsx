import { history } from 'umi'
import { Layout } from 'antd'

const { Header, Footer, Content } = Layout
import style from './index.less'

export default function LoginPage() {
  const handleGoHome = () => {
    history.push('/overview')
  }
  const insertValue = () => {
    localStorage.setItem('login', 'true')
    history.push('/overview')
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <div className={style.siderHeader} onClick={handleGoHome}></div>
      </Header>
      <Content>
        <div className={style.wrap}>
          <h1>程序员成长榨汁机🍋</h1>
          <p>扫码登录即刻加入技术探讨！</p>
          <div className={style.codeWrap}>
            <h1 style={{ color: 'white' }}>这是一个二维码</h1>
          </div>
          <div> 请在localStorage中添加login：true</div>
          <button onClick={insertValue}>点击注入灵魂即可登录！</button>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <a href="#">KKO</a> Design ©2021 Power by XJH
      </Footer>
    </Layout>
  )
}
