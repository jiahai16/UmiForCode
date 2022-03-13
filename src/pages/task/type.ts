import { DrawerProps } from 'antd'
import { planTypeEnum, queryPlanEnum, taskStatusEnum } from './enum'



export type initDrawerProps = DrawerProps & {
  planType: string
  visible: boolean
  onClose?: () => void
  record?: any
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
  id?: number | undefined
  name: string
  type: string | planTypeEnum
  createTime: string | undefined
  endTime: string | undefined
  tasks: task[] 
  timeLen?: number 
}

export type taskPutParams = {
  id?: number | undefined
  name: string
  type: string | planTypeEnum
  tasks: task[] 
  timeLen?: number 
}

export type taskStatusPutParams = {
  tId: number
  status: string
}

export type task = {
  id?: number | string
  planId?: number | string
  name: string
  content: string
  createTime?: string
  status?: taskStatusEnum | string
}

export type todayPlan = {
  id: number
  name: string
  type: planTypeEnum | string
  timeLen: number
  createTime: string
  endTime: string
  tasks: task[]
}
