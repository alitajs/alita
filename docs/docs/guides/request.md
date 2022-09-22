# 请求

基于 [umi-request](https://github.com/umijs/umi-request) 和 [ahooks](http://ahooks.js.org/hooks) 的 `useRequest` 提供了一套统一的网络请求和错误处理方案。

## 启用方式

默认启用。

## 介绍

错误处理是所有项目都会遇到的问题，我们约定了一个接口格式规范如下：

```typescript
interface ErrorInfoStructure {
  success: boolean; // if request is success
  data?: any; // response data
  errorCode?: string; // code for errorType
  errorMessage?: string; // message display to user 
}
```

后端接口规范不满足的情况下你可以通过配置 `errorConfig.adaptor` 来做适配。当 `success` 返回是 `false` 的情况我们会按照 `showType` 和 `errorMessage` 来做统一的错误提示，同时抛出一个异常。

抛出的异常的格式为：

```typescript
interface RequestError extends Error {
  data?: any; // 这里是后端返回的原始数据
  info?: ErrorInfoStructure;
}
```

另外你可以通过 `Error.name` 是否是 `BizError` 来判断是否是因为 `success` 为 `false` 抛出的错误。

## 配置

### 构建时配置

当前支持的构建时配置如下：

```typescript
export default {
  request: {
    dataField: 'data',
  },
};
```

#### dataField

* Type: `string`

`dataField` 对应接口统一格式中的数据字段，比如接口如果统一的规范是 `{ success: boolean, data: any}` ，那么就不需要配置，这样你通过 `useRequest` 消费的时候会生成一个默认的 `formatResult`，直接返回 `data` 中的数据，方便使用。如果你的后端接口不符合这个规范，可以自行配置 `dataField` 。配置为 `''` （空字符串）的时候不做处理。

### 运行时配置

在 `src/app.ts` 中你可以配置一些运行时的配置项来实现部分自定义需求。示例配置如下：

```typescript
import { RequestConfig } from 'alita';

export const request: RequestConfig = {
  timeout: 1000,
  middlewares: [],
  prefix: '/api',
  method: 'get',
  errorHandler: (error) => {
    // 集中处理错误
    console.log(11111111);
    console.log(error);
  },
  requestInterceptors: [],
  responseInterceptors: [],
};
```

该配置返回一个对象。除了`middlewares` 以外其它配置都是直接透传 [umi-request](https://github.com/umijs/umi-request) 的全局配置。

#### middlewares

umi-request 提供[中间件机制](https://github.com/umijs/umi-request#middleware)，之前是通过 `request.use(middleware)` 的方式引入，现在可以通过 `request.middlewares` 进行配置。

```typescript
export const request = {
  middlewares: [
    async function middlewareA(ctx, next) {
      console.log('A before');
      await next();
      console.log('A after');
    },
    async function middlewareB(ctx, next) {
      console.log('B before');
      await next();
      console.log('B after');
    }
  ]
}
```

#### requestInterceptors

该配置接收一个数组，数组的每一项为一个 request 拦截器。等同于 umi-request 的 `request.interceptors.request.use()`。具体见 umi-request 的[拦截器文档](https://github.com/umijs/umi-request#interceptor)。

#### responseInterceptors

该配置接收一个数组，数组的每一项为一个 response 拦截器。等同于 umi-request 的 `request.interceptors.response.use()`。具体见 umi-request 的[拦截器文档](https://github.com/umijs/umi-request#interceptor)。

## API

### useRequest

该插件内置了 [@ahooksjs/use-request](https://ahooks.js.org/zh-CN/hooks/async)，你可以在组件内通过该 Hook 简单便捷的消费数据。示例如下：

```typescript
import { useRequest } from 'alita';

export default () => {
  const { data, error, loading } = useRequest(() => {
    return services.getUserList('/api/test');
  });
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return <div>{data.name}</div>;
};
```

更多配置你可以参考  [@ahooksjs/use-request](https://ahooks.js.org/zh-CN/hooks/async) 的文档。

你也可以查看知乎专栏文章[《useRequest- 蚂蚁中台标准请求 Hooks》](https://zhuanlan.zhihu.com/p/106796295)了解 useRequest。

### request

通过 `import { request } from 'alita';` 你可以使用内置的请求方法。 `request` 接收两个参数，第一个参数是 `url`，第二个参数是请求的 `options`。`options` 具体格式参考 [umi-request](https://github.com/umijs/umi-request)。

`request` 的大部分用法等同于 `umi-request`。

### RequestConfig

这是一个 TypeScript 定义，它可以帮助你更好的配置运行时配置。

```typescript
import { RequestConfig } from 'alita';

export const request: RequestConfig = {};
```
