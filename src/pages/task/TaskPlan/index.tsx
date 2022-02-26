import { Button } from 'antd'
import { useState } from 'react'
import NewPlanDrawer from './NewPlanDrawer'
import style from './index.less'
import Lable from './Lable'
import TaskList from './TaskList'
import { useIntl } from 'umi'

const TaskForNow: React.FC = () => {
  const [isPlanDrawerVisble, setPlanDrawerVisble] = useState<boolean>(false)
  const [planType, setPlanType] = useState<string>('today')
  const { formatMessage } = useIntl()

  const handleNewPlanClick = (type: string): void => {
    switch (type) {
      case 'today':
        setPlanType('TODAY_PLAN')
        break
      case 'long':
        setPlanType('LONG_PLAN')
        break
      case 'countdown':
        setPlanType('COUNTDOWN_PLAN')
    }
    setPlanDrawerVisble(true)
  }

  const handleNewPlanClose = (): void => {
    setPlanDrawerVisble(false)
  }

  return (
    <div>
      <div className={style.top}>
        <Lable
          title={formatMessage({ id: 'taskplan.进行中的长期任务' })}
          count="1"
        />
        <Lable
          title={formatMessage({ id: 'taskplan.倒计时中的任务' })}
          count="1"
        />
      </div>
      <div className={style.mid}>
        <Button type="primary" onClick={() => handleNewPlanClick('today')}>
          {formatMessage({ id: 'taskplan.新建今日计划' })}
        </Button>
        <Button
          type="primary"
          onClick={() => handleNewPlanClick('long')}
          style={{ marginLeft: 20 }}
        >
          {formatMessage({ id: 'taskplan.新建长期计划' })}
        </Button>
        <Button
          type="primary"
          onClick={() => handleNewPlanClick('countdown')}
          style={{ marginLeft: 20 }}
        >
          {formatMessage({ id: 'taskplan.新建倒计时任务' })}
        </Button>
      </div>
      <div className={style.foot}>
        <TaskList />
      </div>
      <NewPlanDrawer
        visible={isPlanDrawerVisble}
        onClose={handleNewPlanClose}
        planType={planType}
      />
    </div>
  )
}

export default TaskForNow
