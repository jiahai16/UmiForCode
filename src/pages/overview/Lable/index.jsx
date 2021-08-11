import LableHeader from './LableHeader'
import LableLi from './LableLi'
import style from './index.less'

export default function Lable({ name, taskData }) {
  return (
    <div className={style.lableWrap}>
      <LableHeader headerTxt={name}></LableHeader>
      <div className={style.lableBody}>
        {taskData &&
          taskData.map((li) => {
            return <LableLi {...li}></LableLi>
          })}
      </div>
    </div>
  )
}
