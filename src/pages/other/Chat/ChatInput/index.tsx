import style from './index.less'
import { Comment, Avatar, Form, Input, Button } from 'antd'
import classNames from 'classnames'

const { TextArea } = Input
export default function ChatInput() {
  return (
    <div className={classNames(style.wrap, 'ant-chat-wrap')}>
      <TextArea
        placeholder="在这发射！(≧∀≦)ゞ"
        autoSize={{ minRows: 4, maxRows: 4 }}
        className={style.input}
      />
      <Button type="primary" className={style.sendBtn}>
        发送
      </Button>
    </div>
  )
}
