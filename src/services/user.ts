import { request } from 'umi'

type loginBody = {
  account: string
  password: string
  email?: string
}
type registerBody = {
  account: string
  password: string
  email: string
  code: string
  img: string
}

export const signInFunc = (data: loginBody) => {
  return request('/core-api/user/login', { method: 'post', data })
}

export const signUpFunc = (data: registerBody) => {
  return request('/core-api/user/register', { method: 'post', data })
}

export const sendEmailFunc = (data: any) => {
  return request('/core-api/user/send-email', { method: 'post', data })
}

export const changePassword = (data: string) => {
  return request('/core-api/user/send-email', { method: 'post', data })
}
