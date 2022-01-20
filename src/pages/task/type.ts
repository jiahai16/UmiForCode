import { DrawerProps } from 'antd'
import { planTypeEnum, queryPlanEnum, taskStatusEnum } from './enum'



export type initDrawerProps = DrawerProps & {
  planType: string
  visible: boolean
  onClose?: () => void
}
export interface taskLable {
  title: string
  name: string
  count: string | number
}

export type taskGetParams = {
  pid?: number
  tid?: number
  userId: number
  planName?: string
  status?: taskStatusEnum | string
  type?: planTypeEnum | string
  queryType: queryPlanEnum | string
  queryTime?: string
}

export type taskPostParams = {
  name: string
  type: string | planTypeEnum
  userId: number
  tasks: task 
  timeLen?: number 
}

export type taskPutParams = {
  id: number
  name: string
  type: string | planTypeEnum
  userId: number
  tasks: task 
  timeLen?: number 
}

export type task = {
  id?: number
  name: string
  content: string
  createTime?: string
  planId?: number
  status: taskStatusEnum | string
  userId: number
}

export type todayPlan = {
  id: number
  name: string
  type: planTypeEnum | string
  timeLen: number
  userId: number
  createTime: string
  endTime: string
  tasks: task[]
}
