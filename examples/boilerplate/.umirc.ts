export default {
  keepalive: [/users/],
  hd: {},
  mfsu: false,
  request: {
    prefix: '/api',
    method: 'get',
    errorHandler: (error) => {
      // 集中处理错误
      console.log(11111111);
      console.log(error);
    },
  },
};
