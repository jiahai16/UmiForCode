import { Tabs } from 'antd'
import Today from './Today'
import Long from './Long'
import CountDown from './CountDown'
import style from './index.less'

const { TabPane } = Tabs

const TaskHistory: React.FC<any> = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="今日计划" key="today">
          <Today />
        </TabPane>
        <TabPane tab="长期计划" key="longtask">
          <Long />
        </TabPane>
        <TabPane tab="倒计时任务" key="countdown">
          <CountDown />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default TaskHistory
