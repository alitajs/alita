export const request = {
  prefix: '/api',
  method: 'get',
  errorHandler: (error) => {
    // 集中处理错误
    console.log(11111111);
    console.log(error);
  },
};

export const tabsLayout = {
  local: {
    '/': '首页',
    '/users': '用户',
    '/foo': '其他',
  },
};

// async function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
// export async function tabsLayout() {
//   await delay(500);
//   return {local:{
//     '/':'首页',
//     '/users':'用户',
//     '/foo':'其他'
//   }};
// }
