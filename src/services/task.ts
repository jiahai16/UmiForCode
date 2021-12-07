import { request } from 'umi'

export const getTodayTaskList = () => {
  return request('/api/tasks', { method: 'get' })
}

