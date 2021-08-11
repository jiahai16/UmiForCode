import { Statistic } from 'antd'
import style from './index.less'
import CountUp from 'react-countup'

export default function LableLi({ img, count, unit, tips, decimals = 0 }) {
  const countUpProps = {
    start: 0,
    duration: 4,
    useEasing: true,
  }

  return (
    <div className={style.lableLi}>
      <div className={style.lableLeft}>img</div>
      <div className={style.lableRight}>
        <div className={style.dataText}>
          <span className={style.statisticNum}>
            <CountUp
              decimals={decimals}
              end={count}
              {...countUpProps}
              className={style.statisticNum}
            />
          </span>
          <span className={style.suffix}>{unit}</span>
        </div>
        <div className={style.tips}>{tips}</div>
      </div>
    </div>
  )
}
