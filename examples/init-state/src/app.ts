import { query } from '@/services/api';

const middleware = async (ctx, next: () => void) => {
  console.log(ctx);
  // 可以在这写一些请求前做的事情 操作ctx.req
  await next();

  // 可以在这里对响应数据做一些操作 操作ctx.res
};

export const request = {
  prefix: '/api',
  method: 'get',
  middlewares: [middleware],
  errorHandler: (error) => {
    // 集中处理错误
    console.log(11111111);
    console.log(error);
  },
};

export async function getInitialState() {
  const initialData = await query();
  console.log(initialData);
  return initialData;
}
