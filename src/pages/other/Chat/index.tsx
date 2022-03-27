import ChatInput from './ChatInput'
import ChatList from './ChatList'
import style from './index.less'
import UserList from './UserList'

export default function Chat() {
  return (
    <div className={style.wrap}>
      <div className={style.chatWrap}>
        <div className={style.chatHeader}>
          <h1>我是一个title (22)</h1>
        </div>
        <div className={style.chatContent}>
          <div className={style.chatLeft}>
            <div className={style.chatLeftContent}>
              <ChatList />
            </div>
            <div className={style.chatLeftFooter}>
              <ChatInput />
            </div>
          </div>
          <div className={style.chatRight}>
            <UserList />
          </div>
        </div>
      </div>
    </div>
  )
}
