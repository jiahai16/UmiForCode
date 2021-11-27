import { history } from 'umi'
import style from './index.less'

export default function LoginPage() {
  const insertValue = () => {
    localStorage.setItem('login', 'true')
    history.push('/overview')
  }
  return (
    <div>
      <div> 请在localStorage中添加login：true</div>
      <button onClick={insertValue}>点击注入灵魂即可登录！</button>
    </div>
  )
}
