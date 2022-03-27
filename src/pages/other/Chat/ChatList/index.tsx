import Myself from '../ChatSingle/Myself'
import OtherByName from '../ChatSingle/OtherByName'
import style from './index.less'

export default function ChatList() {
  return (
    <div className={style.wrap}>
      <div className={style.row}>
        <OtherByName />
      </div>
      <div className={style.row}>
        <Myself />
      </div>
      <div className={style.row}>
        <OtherByName />
      </div>
      <div className={style.row}>
        <OtherByName />
      </div>
      <div className={style.row}>
        <Myself />
      </div>
      <div className={style.row}>
        <Myself />
      </div>
      <div className={style.row}>
        <Myself />
      </div>
      <div className={style.row}>
        <Myself />
      </div>
      <div className={style.row}>
        <Myself />
      </div>
      <div className={style.row}>
        <Myself />
      </div>
      <div className={style.row}>
        <Myself />
      </div>
      <div className={style.row}>
        <Myself />
      </div>
      <div className={style.row}>
        <Myself />
      </div>
      <div className={style.row}>
        <OtherByName />
      </div>
    </div>
  )
}
