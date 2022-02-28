import { Collapse, List, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { getTaskList } from 'services/task'
import { task, taskGetParams, todayPlan } from 'task/type'
import style from './index.less'

const { Panel } = Collapse

const initParams: taskGetParams = {
  userId: 1,
  type: 'LONG_PLAN',
  queryType: 'HISTORY_PLAN'
}

const Long: React.FC<any> = () => {
  const [todayTask, setTodayTask] = useState<todayPlan>([])

  const initData = async () => {
    const res = await getTaskList(initParams)
    if (res && res.code === 200) {
      setTodayTask(res.data)
    }
  }

  useEffect(() => {
    initData()
    return () => {}
  }, [])

  const renderPanel = (data: any) => {
    return data?.map((e: todayPlan, idx: any) => (
      <Panel header={<>{e.createTime.slice(0, 10)}</>} key={e.id}>
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
    <div>
      <Collapse>{renderPanel(todayTask)}</Collapse>
    </div>
  )
}

export default Long
