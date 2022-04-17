// import mockjs from 'mockjs';

export default {
  // 支持值为 Object 和 Array
  'GET /api/client/login': {
    success: true,
    errorMessage: 'if login fail, this message will show!',
    data: {
      name: '王x',
      age: 12,
    },
  },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req: any, res: any) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },
};
