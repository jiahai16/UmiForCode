export const userAccess = ['/']
const isLogin = localStorage.getItem('login') === 'true'

const accessRouter = ['/overview', '/task/task-plan', '/task/task-history']

export function hasAccess(access: string) {
  // return userAccess.includes(access)
  return true
}

export function isLoginAccess(access: string) {
  if (isLogin) return true
  return !accessRouter.includes(access)
}
