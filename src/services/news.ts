import { request } from 'umi'

export const getNewsList = () => {
  return request('/core-api/hotspot/query', { method: 'get' })
}