import { taskGetParams, taskPostParams, taskPutParams, taskStatusPutParams } from 'task/type'
import { request } from 'umi'



export const getTaskList = (params: taskGetParams) => {
  return request('/core-api/task/plan', { method: 'get', params })
}

export const postTask = (data: taskPostParams) => {
  return request('/core-api/task/plan', { method: 'post', data })
}

export const putTaskStatus = (data: taskStatusPutParams) => {
  return request('/core-api/task/status', { method: 'put', data })
}

export const putTask = (data: taskPutParams) => {
  return request('/core-api/task/plan', { method: 'put', data })
}

export const deleteTask = (id: number) => {
  return request('/core-api/task/plan', { method: 'delete', id })
}

export const getTodayTaskList = () => {
  return request('/api/tasks', { method: 'get' })
}
