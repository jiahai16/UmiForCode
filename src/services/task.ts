import { taskGetParams } from 'task/type'
import { request } from 'umi'



export const getTaskList = (params: taskGetParams) => {
  return request('/core-api/task/plan', { method: 'get', params })
}

export const getTodayTaskList = () => {
  return request('/api/tasks', { method: 'get' })
}
