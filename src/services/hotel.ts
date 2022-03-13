import { request } from 'umi'

type shareBody = {
  share: {
    title: string
    details: string
    isDiscuss: number
  }
  img: string
}

type pageParams = {
  number: number
  size: number
}

export const getRankList = () => {
  return request('/core-api/hostel/rank/query', { method: 'get' })
}

export const postShare = (data: shareBody) => {
  return request('/core-api/hostel/share', { method: 'post', data })
}

export const getShare = (data: pageParams) => {
  return request('/core-api/hostel/share/query', { method: 'post', data })
}
