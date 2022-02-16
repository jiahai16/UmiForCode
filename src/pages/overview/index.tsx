import style from './index.less'
import UserLable from './UserLabel'
import UserPerformanceData from './UserPerformanceData'
import UserTaskData from './UserTaskData'

const OverView: React.FC = () => {
  return (
    <div>
      <UserTaskData />
      <UserLable />
      <UserPerformanceData />
    </div>
  )
}

export default OverView
