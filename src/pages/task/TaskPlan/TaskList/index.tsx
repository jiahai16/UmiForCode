import { useRequest } from 'umi'
import { Collapse, List, Typography } from 'antd'
import { getTodayTaskList } from 'services/task'
import style from './index.less'

const { Panel } = Collapse

const TaskList: React.FC<any> = (props) => {
  const { data, error, loading } = useRequest(() =>
    getTodayTaskList()
  )
  console.log(data)
  const data1 = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ]

  function callback(key: string | string[]) {
    console.log(key)
  }
  return (
    <div className={style.wrap}>
      <Collapse defaultActiveKey={['1']} onChange={callback}>
        <Panel header="今日任务" key="1" style={{ padding: '0' }}>
          <List
            bordered
            dataSource={data1}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text mark>[ITEM]</Typography.Text> {item}
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
