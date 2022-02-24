import style from './index.less'
import { Tooltip } from 'antd'
import { Radar } from '@ant-design/plots'
import {
  QuestionCircleOutlined,
  TrophyOutlined,
  LikeOutlined
} from '@ant-design/icons'

export default function UserPerformanceData() {
  const data = [
    {
      name: '任务',
      star: 10371
    },
    {
      name: '分享',
      star: 7380
    },
    {
      name: '登录',
      star: 17414
    }
  ]
  const config = {
    data: data.map((d) => ({ ...d, star: Math.sqrt(d.star) })),
    xField: 'name',
    yField: 'star',
    appendPadding: [0, 10, 0, 10],
    meta: {
      star: {
        alias: 'star 数量',
        min: 0,
        nice: true,
        formatter: (v) => Number(v).toFixed(2)
      }
    },
    xAxis: {
      tickLine: null
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: 'rgba(0, 0, 0, 0.04)'
      }
    },
    // 开启辅助点
    point: {
      size: 2
    },
    area: {}
  }
  return (
    <div className={style.wrap}>
      <h1 className={style.title}>
        表现总结{' '}
        <Tooltip
          color={'#FFF'}
          overlayInnerStyle={{ color: '#18191c' }}
          placement="right"
          title={
            '为你提供三十天内的数据表现！帮助你更好的自我定位，找到努力的方向，每日24点更新数据.'
          }
        >
          <QuestionCircleOutlined />
        </Tooltip>
      </h1>

      <p className={style.subTitle}>
        <TrophyOutlined />
        恭喜！你的各项表现正在提升中哦，继续努力，期待你的成长！
      </p>
      <div className={style.flexBox}>
        <div className={style.radarWrap}>
          <Radar {...config} />
        </div>
        <div className={style.radarCard}>
          {data.map((e) => (
            <div className={style.item} key={e.name}>
              <div className={style.itemTitle}>{e.name}:</div>
              <div className={style.itemDetail}>
                <LikeOutlined />
                你的{e.name}为<span className={style.textNum}>{e.star}</span>
                ，表现不错哦！
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
