import CrownOutlined from '@ant-design/icons/lib/icons/CrownOutlined'
import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { getRankList } from 'services/hotel'
import { useIntl } from 'umi'
import Board from './Board'
import style from './index.less'

const { TabPane } = Tabs

const HotelBoard: React.FC<any> = () => {
  const { formatMessage } = useIntl()
  const [allData, setAllData] = useState([])
  const [monthData, setMonthlData] = useState([])
  const [weekData, setWeekData] = useState([])

  const initData = async () => {
    try {
      const res = await getRankList()
      if (res.code === 200) {
        setAllData(res.data.OVER_ALL_RANK)
        setMonthlData(res.data.MONTH_RANK)
        setWeekData(res.data.WEEK_RANK)
      }
    } catch (error) {}
  }
  useEffect(() => {
    initData()
  }, [])

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
          <Board data={allData}/>
        </TabPane>
        <TabPane tab={formatMessage({ id: 'hotelBoard.月排名' })} key="month">
        <Board data={monthData}/>
          
        </TabPane>
        <TabPane
          tab={formatMessage({ id: 'hotelBoard.周排名' })}
          key="week"
        >
          <Board data={weekData}/>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default HotelBoard
