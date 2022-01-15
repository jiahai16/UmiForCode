import { Collapse, List, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { getTodayHistoryList } from 'services/task'
import { task, taskParams, todayPlan } from 'task/type'
import style from './index.less'

const { Panel } = Collapse

const data = [
  {
    date: '2020-10-20',
    children: [
      { id: 1, text: 'xxxxxx' },
      { id: 2, text: 'ssssss' }
    ]
  },
  {
    date: '2020-11-20',
    children: [
      { id: 1, text: 'xxxxxx' },
      { id: 2, text: 'ssssss' }
    ]
  },
  {
    date: '2020-12-20',
    children: [
      { id: 1, text: 'xxxxxx' },
      { id: 2, text: 'ssssss' }
    ]
  },
  {
    date: '2020-13-20',
    children: [
      { id: 1, text: 'xxxxxx' },
      { id: 2, text: 'ssssss' }
    ]
  }
]

const initParams: taskParams = {
  userId: 1,
  type: 'TODAY_PLAN',
  queryType: 'HISTORY_PLAN'
}

const Today: React.FC<any> = () => {
  const [todayTask, setTodayTask] = useState<todayPlan>([])

  const initData = async () => {
    const res = await getTodayHistoryList(initParams)
    if (res && res.code === 200) {
      setTodayTask(res.data)
    }
  }

  useEffect(() => {
    initData()
    return () => {}
  }, [])

  const renderPanel = (data: any) => {
    return data.map((e: todayPlan, idx: any) => (
      <Panel
        header={
          <>
            {e.createTime.slice(0, 10)}
            ———
            <Typography.Text mark>《{e?.name}》</Typography.Text>
          </>
        }
        key={e.id}
      >
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
    <div>
      <Collapse>{renderPanel(todayTask)}</Collapse>
    </div>
  )
}

export default Today
