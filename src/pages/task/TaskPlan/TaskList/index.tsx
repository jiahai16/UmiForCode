import {
  Button,
  Collapse,
  Divider,
  message,
  Select,
  Table,
  Popconfirm
} from 'antd'
import { deleteTask, getTaskList, putTaskStatus } from 'services/task'
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
  const [mounted, setMounted] = useState<boolean>(true)
  const [todayTaskData, setTodayTaskData] = useState<todayPlan[]>([])
  const [longTaskData, setLongTaskData] = useState<todayPlan[]>([])
  const [countDownTaskData, setCountDownTaskData] = useState<todayPlan[]>([])
  const { formatMessage } = useIntl()

  const columns = [
    {
      title: `${formatMessage({ id: 'taskplan.任务名' })}`,
      dataIndex: 'name'
    },
    {
      title: `${formatMessage({ id: 'taskplan.任务内容' })}`,
      dataIndex: 'content'
    },
    {
      title: `${formatMessage({ id: 'taskplan.状态' })}`,
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <Select
          defaultValue={record.status}
          style={{ width: 100 }}
          bordered={false}
          onChange={() => handleTaskUpdata(record)}
        >
          <Option value="UN_FINISH_TASK">
            {formatMessage({ id: 'taskplan.状态.未完成' })}
          </Option>
          <Option value="FINISH_TASK">
            {formatMessage({ id: 'taskplan.状态.完成' })}
          </Option>
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
      if (!mounted) return
      fn(res.data)
    }
  }

  const handleTaskUpdata = async (record: any) => {
    try {
      const { code } = await putTaskStatus({
        tId: record.id,
        status: record.status
      })
      if (code === 200) {
        message.success('恭喜完成任务！')
        initData()
      }
    } catch (error) {}
  }

  const handleDeleteClick = async (id: any) => {
    try {
      const { code } = await deleteTask({ id: id })
      if (code === 200) {
        message.success('计划删除成功～')
        initData()
      }
    } catch (error) {}
  }

  const handleEditClick = (record: any) => {
    props.handleEditPlanClick(record.type ,'edit', record)

  }

  useEffect(() => {
    initData()
    return function cleanup() {
      setMounted(false)
    }
  }, [props.isPlanDrawerVisble])

  const renderPanel = (title: string, data: any) => {
    return data?.map((e: todayPlan, idx: any) => (
      <div className={style.planWrap} key={idx}>
        <div className={style.editWrap}>
          <h3>{e?.name}</h3>
          <span>
            <Button type="link" onClick={() => handleEditClick(e)}>编辑</Button>
            <Popconfirm
              title="你确定要删除吗？该行为不可恢复."
              onConfirm={() => handleDeleteClick(e?.id)}
              okText="确定"
              cancelText="否"
            >
              <Button type="link" danger>
                删除
              </Button>
            </Popconfirm>
          </span>
        </div>
        <Table
          rowKey={(record) => `${record.id}`}
          columns={columns}
          dataSource={e?.tasks}
          size="middle"
          pagination={false}
          bordered
        />
        <Divider plain>{formatMessage({ id: 'taskplan.分割线' })}</Divider>
      </div>
    ))
  }
  return (
    <div className={style.wrap}>
      {todayTaskData?.length === 0 &&
      longTaskData?.length === 0 &&
      countDownTaskData?.length === 0 ? (
        <h1>还没有任务呢！快创建一个吧～</h1>
      ) : (
        <Collapse>
          <Panel
            header={`${formatMessage({ id: 'taskplan.今日任务' })}`}
            key={'1'}
          >
            {renderPanel(
              `${formatMessage({ id: 'taskplan.今日任务' })}`,
              todayTaskData
            )}
          </Panel>
          <Panel
            header={`${formatMessage({ id: 'taskplan.进行中的长期任务' })}`}
            key={'2'}
          >
            {renderPanel(
              `${formatMessage({ id: 'taskplan.进行中的长期任务' })}`,
              longTaskData
            )}
          </Panel>
          <Panel
            header={`${formatMessage({ id: 'taskplan.倒计时中的任务' })}`}
            key={'3'}
          >
            {renderPanel(
              `${formatMessage({ id: 'taskplan.倒计时中的任务' })}`,
              countDownTaskData
            )}
          </Panel>
        </Collapse>
      )}
    </div>
  )
}

export default TaskList
