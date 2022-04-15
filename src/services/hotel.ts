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

type postDiscussBody = {
  share: {
    id: number | string
  }
  discuss: {
    detail: string
  }
}

type getDiscussBody = {
  share: {
    id: number | string
  }
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

export const postDiscuss = (data: postDiscussBody) => {
  return request('/core-api/hostel/discuss', { method: 'post', data })
}

export const getDiscuss = (data: getDiscussBody) => {
  return request('/core-api/hostel/discuss/query', { method: 'post', data })
}

export const Like = (data: { shareId: number }) => {
  return request('/core-api/hostel/admire', { method: 'post', data })
}

export const Star = (data: { shareId: number }) => {
  return request('/core-api/hostel/follow', { method: 'post', data })
}

