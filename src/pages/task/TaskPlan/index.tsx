import { Button } from 'antd'
import { useState } from 'react'
import NewTaskDrawer from './NewTaskDrawer'
import style from './index.less'
import Lable from './Lable'
import TaskList from './TaskList'

const TaskForNow: React.FC = () => {
  const [isNewTaskDrawerVisble, setIsNewTaskDrawerVisble] =
    useState<boolean>(false)

  const handleNewTaskClick = (): void => {
    setIsNewTaskDrawerVisble(true)
  }

  const handleNewTaskClose = (): void => {
    setIsNewTaskDrawerVisble(false)
  }

  return (
    <div>
      <div className={style.top}>
        <Lable title="进行中的长期任务" count="1" />
        <Lable title="倒计时中的任务" count="1" />
      </div>
      <div className={style.mid}>
        <Button type="primary" onClick={handleNewTaskClick}>
          新建今日计划
        </Button>
        <Button
          type="primary"
          onClick={handleNewTaskClick}
          style={{ marginLeft: 20 }}
        >
          新建长期计划
        </Button>
      </div>
      <div className={style.foot}>
        <TaskList />
      </div>
      <NewTaskDrawer
        visible={isNewTaskDrawerVisble}
        onClose={handleNewTaskClose}
      />
    </div>
  )
}

export default TaskForNow
