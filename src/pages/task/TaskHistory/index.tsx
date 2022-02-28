import { Tabs } from 'antd'
import Today from './Today'
import Long from './Long'
import CountDown from './CountDown'
import style from './index.less'
import { useIntl } from 'umi'

const { TabPane } = Tabs

const TaskHistory: React.FC<any> = () => {
  const { formatMessage } = useIntl()

  return (
    <div className={style.wrap}>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab={formatMessage({ id: 'taskplan.今日任务' })} key="today">
          <Today />
        </TabPane>
        <TabPane tab={formatMessage({ id: 'taskplan.长期任务' })} key="longtask">
          <Long />
        </TabPane>
        <TabPane tab={formatMessage({ id: 'taskplan.倒计时任务' })} key="countdown">
          <CountDown />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default TaskHistory
