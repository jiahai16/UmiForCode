import { DrawerProps } from 'antd'
export type initDrawerProps = DrawerProps & {
  visible: boolean,
  onClose?: () => void
}
export interface taskLable{
  title: string
  name: string
  count: string | number
}

export type task = {
  id: number
  name: string,
  content: string,
  createTime: string,
  endTime: string,
  planId: number,
  status: number,
  type: number,
  userId: number,
}

export type todayPlan = {
  id: number,
  name: string,
  createTime: string,
  tasks: task[],
}