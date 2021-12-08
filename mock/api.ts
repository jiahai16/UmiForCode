export default {
  // 支持值为 Object 和 Array
  'GET /api/tasks': {
    code: 200,
    data: {
      id: 1,
      name: '第一次测试',
      userId: 1,
      createTime: '2021-12-07T16:00:00.000+0000',
      tasks: [
        {
          id: 1,
          name: '第一次测试',
          content: '躺平摆烂的一下午',
          planId: 1,
          userId: 1,
          createTime: '2021-12-07T16:00:00.000+0000',
          endTime: '2021-12-08T16:00:00.000+0000',
          type: 0,
          status: 0
        }
      ]
    },
    requestId: null,
    resultMsg: '当前数据已存在',
    errorStackTrace: null
  },

  // GET 可忽略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.end('ok')
  }
}
