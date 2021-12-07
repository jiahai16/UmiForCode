import { request } from 'umi'

export const getTodayTaskList = async () => {
  return await request('/api/tasks', { method: 'get' })
}

