import { Collapse, List, Typography } from 'antd'
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

const Today: React.FC<any> = () => {
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
