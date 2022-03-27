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
        <Timeline.Item label="2022-02-15">沉迷APEX了</Timeline.Item>
        <Timeline.Item label="2022-02-23">个人数据页面开发</Timeline.Item>
        <Timeline.Item label="2022-03-03">排行榜开发完成</Timeline.Item>
        <Timeline.Item label="2022-03-07">任务计划创建编辑删除完成</Timeline.Item>
        <Timeline.Item label="2022-03-11">学习路线页面功能完成</Timeline.Item>
        <Timeline.Item label="2022-03-15">导图分享功能完成</Timeline.Item>
        <Timeline.Item label="2022-03-xx">🥺</Timeline.Item>
        <Timeline.Item label="2022-03-20">路线图评论功能完成</Timeline.Item>
        <Timeline.Item label="2022-03-27">聊天室视图完成</Timeline.Item>
      </Timeline>
    </div>
  )
}
