const env = {
  dev: 'http://101.43.25.47'
}

const target = env.dev

const proxy = {
  '/core-api': {
    target,
    changeOrigin: true
  },
  '/socket.io': {
    target,
    changeOrigin: true
  }
}

export default proxy
