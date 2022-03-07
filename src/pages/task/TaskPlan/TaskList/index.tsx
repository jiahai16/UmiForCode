import { Collapse, List, Typography, Select, Table } from 'antd'
import { getTaskList } from 'services/task'
import { FC, useEffect, useState } from 'react'
import { todayPlan, task, taskGetParams } from '../../type'
import { EditOutlined } from '@ant-design/icons'
import style from './index.less'
import { useIntl } from 'umi'

const { Panel } = Collapse
const { Option } = Select

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

  const columns = [
    {
      title: '任务名',
      dataIndex: 'name'
    },
    {
      title: '任务内容',
      dataIndex: 'content'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: any) => (
        <Select
          defaultValue={status}
          style={{ width: 100 }}
          bordered={false}
          onChange={handleTaskUpdata}
        >
          <Option value="UN_FINISH_TASK">未完成</Option>
          <Option value="FINISH_TASK">已完成</Option>
        </Select>
      )
    }
  ]

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
  }

  useEffect(() => {
    initData()
  }, [])

  const renderPanel = (title: string, data: any) => {
    return data?.map((e: todayPlan, idx: any) => (
      <Panel header={title} key={title}>
        <h3>{e?.name}</h3>
        <Table
          columns={columns}
          dataSource={e?.tasks}
          size="middle"
          pagination={false}
          bordered
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
        <Collapse
          defaultActiveKey={[`${formatMessage({ id: 'taskplan.今日任务' })}`]}
        >
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
