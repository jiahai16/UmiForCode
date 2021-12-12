import { DrawerProps } from 'antd'
export type initDrawerProps = DrawerProps & {
  planType: string,
  visible: boolean,
  onClose?: () => void
}
export interface taskLable{
  title: string
  name: string
  count: string | number
}

enum taskStatus {
  FINISH_TASK,
  UN_FINISH_TASK
}
enum planType {
  TODAY_PLAN,
  LONG_PLAN,
  COUNTDOWN_PLAN
}

export type task = {
  id: number
  name: string,
  content: string,
  createTime: string,
  endTime: string,
  planId: number,
  status: taskStatus,
  userId: number,
}

export type todayPlan = {
  id: number,
  name: string,
  type: planType,
  createTime: string,
  tasks: task[],
}

