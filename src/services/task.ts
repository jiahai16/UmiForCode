import { taskGetParams } from 'task/type'
import { request } from 'umi'

export const getTodayTaskList = () => {
  return request('/api/tasks', { method: 'get' })
}

export const getTodayHistoryList = (params: taskGetParams) => {
  return request('/core-api/task/plan', { method: 'get', params })
}
