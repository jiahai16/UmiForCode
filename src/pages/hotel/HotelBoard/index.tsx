import CrownOutlined from '@ant-design/icons/lib/icons/CrownOutlined'
import { Tabs } from 'antd'
import Board from './Board'
import style from './index.less'

const { TabPane } = Tabs

const HotelBoard: React.FC<any> = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" centered size="large">
        <TabPane
          tab={
            <span>
              <CrownOutlined />
              总积分
            </span>
          }
          key="overview"
        ><Board /></TabPane>
        <TabPane tab="月排名" key="month">987987</TabPane>
        <TabPane tab="周排名" key="week"></TabPane>
      </Tabs>
    </div>
  )
}

export default HotelBoard
