import { request } from 'umi'

export const getRankList = () => {
  return request('/core-api/hostel/rank/query', { method: 'get' })
}