import { RequestConfig } from 'umi';
import errorHandler from "utils/error-handle"

export const request: RequestConfig = {
  timeout: 100000,
  // prefix: process.env.NODE_ENV === "production" ? '' : 'api/',
  credentials: 'include',
  errorHandler,
  // 自定义端口规范
  errorConfig: {
    adaptor: res => {
      return {
        success: res.code == 200,
        data: res.data,
        errorCode: res.code,
        errorMessage: res.msg,
      };
    },
  },
  middlewares: []
}