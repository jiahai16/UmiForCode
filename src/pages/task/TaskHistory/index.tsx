import { Tabs } from 'antd'
const { TabPane } = Tabs
import style from './index.less'

const TaskHistory:React.FC<any> = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="今日计划" key="today">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="长期计划" key="longtask">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="倒计时任务" key="countdown">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  )
}

export default TaskHistory
