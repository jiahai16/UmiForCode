import style from './index.less'
import Lable from 'overview/Lable'
import LableHeader from './Lable/LableHeader'
const taskData = [
  {
    img: '',
    count: '100',
    unit: '次',
    tips: '运行成功'
  },
  {
    img: '',
    count: '99.99',
    unit: '%',
    tips: '运行成功',
    decimals: 2
  },
  {
    img: '',
    count: '100',
    unit: '人·天',
    tips: '运行成功'
  },
  {
    img: '',
    count: '98.9',
    unit: '元',
    tips: '运行成功'
  }
]

export default function overview() {
  return (
    <div>
      {/* <TaskLable tasktitle="1111"/> */}
      <Lable taskData={taskData} name={'任务总览'} />
      <Lable taskData={taskData} name={'今日任务'} />
      <div className={style.mid}>
        <div className={style.midLeft}>
          <LableHeader headerTxt={'业务分析'} dropdown={true}/>
        </div>
        <div className={style.midRight}>
        <LableHeader headerTxt={'流程运行次数top10'}/>
        </div>
      </div>
      <div className={style.foot}>
        <LableHeader headerTxt={'BOT运行状态'} borderBottom={false}/>
      </div>
    
    </div>
  )
}
