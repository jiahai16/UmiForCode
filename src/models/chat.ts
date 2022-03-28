/**
 * reducers中方法的名字不可和effects中方法名相同，会产生错误
 */

 interface stateProps {
  authList?: Array<any>
  user?: any
}

export default {
  namespace: 'chat',
  state: {
    user: {},
  },
  reducers: {
    // 同步函数
    handleUserInfo(state: stateProps, data: any) {
      const { payload } = data
      state.user = payload.user
    },
  },
  effects: {
    // 异步函数
    *updateUserInfo({ payload }, { put }) {
      yield put({ type: 'handleUserInfo', payload })
    },
  }
}
