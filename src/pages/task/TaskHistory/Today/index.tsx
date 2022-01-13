import { Collapse, List, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { getTodayHistoryList } from 'services/task'
import { taskParams, todayPlan } from 'task/type'
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
  type: 1,
  userid: 1,
  querType: 1
}

const Today: React.FC<any> = () => {
  const [todayTask, setTodayTask] = useState<todayPlan>({})

  const initData = async () => {
    const res = await getTodayHistoryList(initParams)
    if(res && res.code === 200){
      setTodayTask(res.data)
      console.log(res.data)
    }
  }


  useEffect(() => {
    initData()
    return () => {
    }
  }, [])
  
  const renderPanel = (data: any) => {
    return data.map((e, idx) => (
      <Panel header={e.date} key={idx}>
        <List
          bordered
          dataSource={e.children}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>{item.id}</Typography.Text> {item.text}
            </List.Item>
          )}
        />
      </Panel>
    ))
  }
  return (
    <div>
      <Collapse>
        {renderPanel(data)}
      </Collapse>
    </div>
  )
}

export default Today
