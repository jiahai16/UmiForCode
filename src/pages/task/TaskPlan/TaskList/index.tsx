import { Collapse, List, Typography } from 'antd'
import { getTaskList } from 'services/task'
import { useEffect, useState } from 'react'
import { todayPlan, task } from '../../type'
import { EditOutlined } from '@ant-design/icons'
import style from './index.less'

const { Panel } = Collapse

const TaskList: React.FC<any> = (props) => {
  const [todayTaskData, setTodayTaskData] = useState<todayPlan>()

  const initData = async () => {
    const res = await getTaskList()
    if (res && res.code === 200) {
      setTodayTaskData(res.data)
    }
  }

  const handleTaskUpdata = (value: any) => {
    console.log(value)
    value.status === 0 ? 1 : 0
  }

  useEffect(() => {
    initData()
  }, [])

  return (
    <div className={style.wrap}>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="今日任务" key="1" style={{ padding: '0' }}>
          <h3>
            {todayTaskData?.name} <EditOutlined />
          </h3>
          <List
            bordered
            dataSource={todayTaskData?.tasks}
            renderItem={(item: task) => (
              <List.Item
                actions={[
                  <a
                    className={item.status === 'UN_FINISH_TASK' ? style.contentNormal : style.contentCompleted}
                    onClick={() => handleTaskUpdata(item)}
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
        <Panel header="倒计时中的任务" key="2"></Panel>
        <Panel header="进行中的长期任务" key="3"></Panel>
      </Collapse>
    </div>
  )
}

export default TaskList
