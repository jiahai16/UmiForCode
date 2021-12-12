import { Timeline } from 'antd'
import style from './index.less'

export default function About() {
  return (
    <div className={style.wrap}>
      <Timeline mode={'left'} pending="疯狂打码中...">
        <Timeline.Item label="2021-11-21">项目init</Timeline.Item>
        <Timeline.Item label="2021-12-12">今日计划页面搭建完成</Timeline.Item>
        
      </Timeline>
    </div>
  )
}
