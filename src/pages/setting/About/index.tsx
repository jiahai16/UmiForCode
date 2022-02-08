import { Timeline } from 'antd'
import style from './index.less'

export default function About() {
  return (
    <div className={style.wrap}>
      <Timeline mode={'left'} pending="疯狂打码中...">
        <Timeline.Item label="2021-11-21">项目init</Timeline.Item>
        <Timeline.Item label="2021-12-12">今日计划页面搭建完成</Timeline.Item>
        <Timeline.Item label="2022-01-02">指南思维导图demo搭建完成</Timeline.Item>
        <Timeline.Item label="2022-01-20">思维导图功能优化</Timeline.Item>
        <Timeline.Item label="2022-02-01">过年 🧨 吃 🥟  --新年快乐</Timeline.Item>
        <Timeline.Item label="2022-02-06">登录页面开发</Timeline.Item>
        
      </Timeline>
    </div>
  )
}
