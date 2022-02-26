import CrownOutlined from '@ant-design/icons/lib/icons/CrownOutlined'
import { Tabs } from 'antd'
import { useIntl } from 'umi'
import Board from './Board'
import style from './index.less'

const { TabPane } = Tabs

const HotelBoard: React.FC<any> = () => {
  const { formatMessage } = useIntl()

  return (
    <div>
      <Tabs defaultActiveKey="1" centered size="large">
        <TabPane
          tab={
            <span>
              <CrownOutlined />
              {formatMessage({ id: 'hotelBoard.总积分' })}
            </span>
          }
          key="overview"
        >
          <Board />
        </TabPane>
        <TabPane tab={formatMessage({ id: 'hotelBoard.月排名' })} key="month">
          987987
        </TabPane>
        <TabPane
          tab={formatMessage({ id: 'hotelBoard.周排名' })}
          key="week"
        ></TabPane>
      </Tabs>
    </div>
  )
}

export default HotelBoard
