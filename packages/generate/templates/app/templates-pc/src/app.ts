import { ResponseError, Context } from 'umi-request';

// 请求中间件 就是发起请求和响应之后需要统一操作数据就写着
// https://github.com/umijs/umi-request#example-1
const middleware = async (ctx: Context, next: any) => {
  console.log('a1');
  await next();
  console.log('a2');
};

export const request = {
  prefix: '', // 统一的请求头
  middlewares: [middleware],
  errorHandler: (error: ResponseError) => {
    // 集中处理错误
    console.log(error);
  },
};
