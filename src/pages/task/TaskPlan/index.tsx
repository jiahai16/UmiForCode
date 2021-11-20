import { Button } from 'antd'
import { useState } from 'react'
import NewTaskDrawer from './NewTaskDrawer'
import style from './index.less'

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
      <Button type="primary" onClick={handleNewTaskClick}>
        Primary Button
      </Button>
      <NewTaskDrawer
        visible={isNewTaskDrawerVisble}
        onClose={handleNewTaskClose}
      />
    </div>
  )
}

export default TaskForNow
