import { request } from 'umi'

type shareBody = {
  share: {
    title: string
    details: string
    isDiscuss: number
  }
  img: string
}

export const getRankList = () => {
  return request('/core-api/hostel/rank/query', { method: 'get' })
}

export const postShare = (data: shareBody) => {
  return request('/core-api/hostel/share', { method: 'post', data })
}
