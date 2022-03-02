export const userAccess = ['/']

export function hasAccess(access: string) {
  // return userAccess.includes(access)
  return true
}

export function isLoginAccess(access: string, isLogin: string) {
  const accessRouter = ['/overview', '/task/task-plan', '/task/task-history']
  if (isLogin) return true
  return !accessRouter.includes(access)
}
