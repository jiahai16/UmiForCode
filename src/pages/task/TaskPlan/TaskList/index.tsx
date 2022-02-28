import { Collapse, List, Typography } from 'antd'
import { getTaskList } from 'services/task'
import { FC, useEffect, useState } from 'react'
import { todayPlan, task, taskGetParams } from '../../type'
import { EditOutlined } from '@ant-design/icons'
import style from './index.less'
import { useIntl } from 'umi'

const { Panel } = Collapse

const initParams: taskGetParams = {
  userId: 1,
  type: 'TODAY_PLAN',
  queryType: 'ALIVE_PLAN'
}

const TaskList: React.FC<any> = (props) => {
  const [todayTaskData, setTodayTaskData] = useState<todayPlan[]>([])
  const [longTaskData, setLongTaskData] = useState<todayPlan[]>([])
  const [countDownTaskData, setCountDownTaskData] = useState<todayPlan[]>([])
  const { formatMessage } = useIntl()

  const initData = () => {
    getTask('TODAY_PLAN', setTodayTaskData)
    getTask('LONG_PLAN', setLongTaskData)
    getTask('COUNTDOWN_PLAN', setCountDownTaskData)
  }

  const getTask = async (type: string, fn: Function) => {
    initParams.type = type
    const res = await getTaskList(initParams)
    if (res && res.code === 200) {
      fn(res.data)
    }
  }

  const handleTaskUpdata = (value: any) => {
    console.log(value)
    value.status === 0 ? 1 : 0
  }

  useEffect(() => {
    initData()
  }, [])

  const renderPanel = (title: string, data: any) => {
    return data?.map((e: todayPlan, idx: any) => (
      <Panel header={title} key={e.id}>
        <h3>{e?.name}</h3>
        <List
          bordered
          dataSource={e?.tasks}
          renderItem={(item: task) => (
            <List.Item
              className={
                item?.status === 'UN_FINSH_TASK'
                  ? style.normal
                  : style.completed
              }
              actions={[
                <a
                  className={
                    item?.status === 'UN_FINSH_TASK'
                      ? style.contentNormal
                      : style.contentCompleted
                  }
                >
                  {' '}
                  {item?.content}
                </a>
              ]}
            >
              <Typography.Text mark>{item?.name}</Typography.Text>
            </List.Item>
          )}
        />
      </Panel>
    ))
  }
  return (
    <div className={style.wrap}>
      {todayTaskData?.length === 0 &&
      longTaskData?.length === 0 &&
      countDownTaskData?.length === 0 ? (
        <h1>还没有任务呢！快创建一个吧～</h1>
      ) : (
        <Collapse defaultActiveKey={['1']}>
          {renderPanel(
            `${formatMessage({ id: 'taskplan.今日任务' })}`,
            todayTaskData
          )}
          {renderPanel(
            `${formatMessage({ id: 'taskplan.进行中的长期任务' })}`,
            longTaskData
          )}
          {renderPanel(
            `${formatMessage({ id: 'taskplan.倒计时中的任务' })}`,
            countDownTaskData
          )}
        </Collapse>
      )}
    </div>
  )
}

export default TaskList
