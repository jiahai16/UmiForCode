import style from './index.less'
import { Tooltip } from 'antd'
import { Radar } from '@ant-design/plots'
import {
  QuestionCircleOutlined,
  TrophyOutlined,
  LikeOutlined
} from '@ant-design/icons'
import { useIntl } from 'umi'

export default function UserPerformanceData() {
  const { formatMessage } = useIntl()

  const data = [
    {
      name: `${formatMessage({ id: 'overview.表现总结.任务' })}`,
      star: 10371
    },
    {
      name: `${formatMessage({ id: 'overview.表现总结.分享' })}`,
      star: 7380
    },
    {
      name: `${formatMessage({ id: 'overview.表现总结.登录' })}`,
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
        {formatMessage({ id: 'overview.表现总结' })}{' '}
        <Tooltip
          color={'#FFF'}
          overlayInnerStyle={{ color: '#18191c' }}
          placement="right"
          title={formatMessage({ id: 'overview.表现总结.提示' })}
        >
          <QuestionCircleOutlined />
        </Tooltip>
      </h1>

      <p className={style.subTitle}>
        <TrophyOutlined />
        {formatMessage({ id: 'overview.表现总结.子标题' })}
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
                {formatMessage({ id: `overview.表现总结.${e.name}.子标题.前` })}
                <span className={style.textNum}>{e.star}</span>
                {formatMessage({ id: `overview.表现总结.${e.name}.子标题.后` })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
