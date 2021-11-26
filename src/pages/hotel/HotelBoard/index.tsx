import CrownOutlined from '@ant-design/icons/lib/icons/CrownOutlined'
import { Tabs } from 'antd'
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
        ></TabPane>
        <TabPane tab="月排名" key="month"></TabPane>
        <TabPane tab="周排名" key="week"></TabPane>
      </Tabs>
    </div>
  )
}

export default HotelBoard
