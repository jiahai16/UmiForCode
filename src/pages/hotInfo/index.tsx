import { useEffect, useState } from 'react'
import { getNewsList } from 'services/news'
import { Empty } from 'antd'
import Card from './Card'
import style from './index.less'

const HotInfo: React.FC = () => {
  const [hotspot, setHotspot] = useState([])
  const getHotspot = async () => {
    try {
      const res = await getNewsList()
      if (res.code === 200) setHotspot(res.data)
    } catch (error) {}
  }
  useEffect(() => {
    getHotspot()
  }, [])
  return (
    <div className={style.wrap}>
      {hotspot.length > 0 ? (
        hotspot.map((e, idx) => <Card key={idx} data={e} />)
      ) : (
        <Empty />
      )}
    </div>
  )
}

export default HotInfo
