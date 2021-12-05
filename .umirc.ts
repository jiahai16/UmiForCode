import { defineConfig } from 'umi'
import routes from './config/routes'
import proxy from './config/proxy'
import zhCN from 'antd/lib/locale-provider/zh_CN'

const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  title: 'ForCoder',
  favicon: '/favicon.ico',
  hash: true, //生成hash文件名
  history: {
    //hash路由
    type: 'hash'
  },
  //开启按需加载
  dynamicImport: {},
  fastRefresh: {},
  antd: {
    config: {
      locale: zhCN,
      input: {
        autoComplete: 'off'
      }
    }
  },
  analyze: {
    analyzerPort: 8888
  },
  nodeModulesTransform: {
    type: 'none'
  },
  routes,
  proxy,
  chainWebpack(config: any) {
    config.resolve.modules.merge([
      path.resolve(__dirname, 'src/components'),
      path.resolve(__dirname, 'src/pages'),
      path.resolve(__dirname, 'src'),
      'node_modules'
    ])
  },
  alias: {
    pages: 'src/pages',
    components: 'src/components'
  },
  cssLoader: {
    localsConvention: 'camelCase'
  },
  dva: {
    immer: true,
    hmr: false
  }
})
