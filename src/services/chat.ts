import { request } from 'umi'

export const getReceiveMsg = () => {
  return request('/core-api/chat/receive-msg', { method: 'post' })
}
