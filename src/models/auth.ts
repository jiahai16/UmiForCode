/**
 * reducers中方法的名字不可和effects中方法名相同，会产生错误
 */

 export default {
    namespace: 'auth',
    state: {
      auth: null,
      isLogin: false
    },
    reducers: { // 同步函数
      updateAuth(state: Object, payload: Object) {
        state.auth = payload.auth
      },
      updateLoginStatus(state: Object, payload: Object) {
        state.isLogin = payload.isLogin
      }
    },
    // effects: { // 异步函数
    //   *add({ payload }, { put }) {
    //     yield put({ type: 'add1', payload })
    //   },
    //   *del({ payload }, { put }) {
    //     yield put({ type: 'del1', payload })
    //   }
    // }
  };