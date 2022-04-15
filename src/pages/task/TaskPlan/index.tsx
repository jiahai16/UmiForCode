import { Button } from 'antd'
import { useEffect, useState } from 'react'
import NewPlanDrawer from './NewPlanDrawer'
import style from './index.less'
import Lable from './Lable'
import TaskList from './TaskList'
import { useIntl } from 'umi'

const TaskForNow: React.FC = () => {
  const [isPlanDrawerVisble, setPlanDrawerVisble] = useState<boolean>(false)
  const [planType, setPlanType] = useState<string>('today')
  const [planData, setPlanData] = useState()
  const { formatMessage } = useIntl()

  const handleNewPlanClick = (
    planType: string,
    type: string,
    record?: any
  ): void => {
    switch (planType) {
      case 'TODAY_PLAN':
        setPlanType('TODAY_PLAN')
        break
      case 'LONG_PLAN':
        setPlanType('LONG_PLAN')
        break
      case 'COUNTDOWN_PLAN':
        setPlanType('COUNTDOWN_PLAN')
    }
    if (type === 'add') {
      setPlanDrawerVisble(true)
      return
    }
    if (type === 'edit') {
      setPlanDrawerVisble(true)
      setPlanData(record)
    }
    setPlanDrawerVisble(true)
  }

  const handleNewPlanClose = (): void => {
    setPlanData(undefined)
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
        <Button
          type="primary"
          onClick={() => handleNewPlanClick('TODAY_PLAN', 'add')}
        >
          {formatMessage({ id: 'taskplan.新建今日计划' })}
        </Button>
        <Button
          type="primary"
          onClick={() => handleNewPlanClick('LONG_PLAN', 'add')}
          style={{ marginLeft: 20 }}
        >
          {formatMessage({ id: 'taskplan.新建长期计划' })}
        </Button>
        <Button
          type="primary"
          onClick={() => handleNewPlanClick('COUNTDOWN_PLAN', 'add')}
          style={{ marginLeft: 20 }}
        >
          {formatMessage({ id: 'taskplan.新建倒计时任务' })}
        </Button>
      </div>
      <div className={style.foot}>
        <TaskList isPlanDrawerVisble={isPlanDrawerVisble} handleEditPlanClick={handleNewPlanClick}/>
      </div>
      <NewPlanDrawer
        visible={isPlanDrawerVisble}
        onClose={handleNewPlanClose}
        planType={planType}
        record={planData}
      />
    </div>
  )
}

export default TaskForNow
