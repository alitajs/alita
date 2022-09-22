# 请求API

请求 API 是内置 `plugin-request` 插件提供的。

## request

`request` 接收两个参数，第一个参数是 `url`，第二个参数是请求的 `options`，`options` 定义示例如下所示：

```ts
{
  // 'method' 是创建请求时使用的方法
  method: 'get', // default

  // 'params' 是即将于请求一起发送的 URL 参数，参数会自动 encode 后添加到 URL 中
  // 类型需为 Object 对象或者 URLSearchParams 对象
  params: { id: 1 },

  // 'paramsSerializer' 开发者可通过该函数对 params 做序列化（注意：此时传入的 params 为合并了 extends 中 params 参数的对象，如果传入的是 URLSearchParams 对象会转化为 Object 对象
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' })
  },

  // 'data' 作为请求主体被发送的数据
  // 适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: { name: 'Mike' },

  // 'headers' 请求头
  headers: { 'Content-Type': 'multipart/form-data' },

  // 'timeout' 指定请求超时的毫秒数（0 表示无超时时间）
  // 如果请求超过了 'timeout' 时间，请求将被中断并抛出请求异常
  timeout: 1000,

  // ’prefix‘ 前缀，统一设置 url 前缀
  // ( e.g. request('/user/save', { prefix: '/api/v1' }) => request('/api/v1/user/save') )
  prefix: '',

  // ’suffix‘ 后缀，统一设置 url 后缀
  // ( e.g. request('/api/v1/user/save', { suffix: '.json'}) => request('/api/v1/user/save.json') )
  suffix: '',

  // 'credentials' 发送带凭据的请求
  // 为了让浏览器发送包含凭据的请求（即使是跨域源），需要设置 credentials: 'include'
  // 如果只想在请求URL与调用脚本位于同一起源处时发送凭据，请添加credentials: 'same-origin'
  // 要改为确保浏览器不在请求中包含凭据，请使用credentials: 'omit'
  credentials: 'same-origin', // default

  // ’useCache‘ 是否使用缓存，当值为 true 时，GET 请求在 ttl 毫秒内将被缓存，缓存策略唯一 key 为 url + params + method 组合
  useCache: false, // default

  // ’ttl‘ 缓存时长（毫秒）， 0 为不过期
  ttl: 60000,

  // 'maxCache' 最大缓存数， 0 为无限制
  maxCache: 0,

  // 根据协议规范， GET 请求用于获取、查询服务端数据，在数据更新频率不频繁的情况下做必要的缓存能减少服务端的压力，因为缓存策略是默认对 GET 请求做缓存，但对于一些特殊场景需要缓存其他类型请求的响应数据时，我们提供 validateCache 供用户自定义何时需要进行缓存， key 依旧为 url + params + method
  validateCache: (url, options) => { return options.method.toLowerCase() === 'get' },

  // 'requestType' 当 data 为对象或者数组时， umi-request 会根据 requestType 动态添加 headers 和设置 body（可传入 headers 覆盖 Accept 和 Content-Type 头部属性）:
  // 1. requestType === 'json' 时, (默认为 json )
  // options.headers = {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json;charset=UTF-8',
  //   ...options.headers,
  // }
  // options.body = JSON.stringify(data)
  // 2. requestType === 'form' 时，
  // options.headers = {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  //   ...options.headers,
  // };
  // options.body = query-string.stringify(data);
  // 3. 其他 requestType
  // options.headers = {
  //   Accept: 'application/json',
  //   ...options.headers,
  // };
  // options.body = data;
  requestType: 'json', // default

  // ’parseResponse‘ 是否对请求返回的 Response 对象做格式、状态码解析
  parseResponse: true, // default

  // ’charset‘ 当服务端返回的数据编码类型为 gbk 时可使用该参数，umi-request 会按 gbk 编码做解析，避免得到乱码, 默认为 utf8
  // 当 parseResponse 值为 false 时该参数无效
  charset: 'gbk',

  // 'responseType': 如何解析返回的数据，当 parseResponse 值为 false 时该参数无效
  // 默认为 'json', 对返回结果进行 Response.text().then( d => JSON.parse(d) ) 解析
  // 其他(text, blob, arrayBuffer, formData), 做 Response[responseType]() 解析
  responseType: 'json', // default

  // 'throwErrIfParseFail': 当 responseType 为 json 但 JSON.parse(data) fail 时，是否抛出异常。默认不抛出异常而返回 Response.text() 后的结果，如需要抛出异常，可设置 throwErrIfParseFail 为 true
  throwErrIfParseFail: false, // default

  // 'getResponse': 是否获取源 Response， 返回结果将包含一层： { data, response }
  getResponse: false,// default

  // 'errorHandler' 统一的异常处理，供开发者对请求发生的异常做统一处理，详细使用请参考下方的错误处理文档
  errorHandler: function(error) { /* 异常处理 */ },

  // 'cancelToken' 取消请求的 Token，详细使用请参考下方取消请求文档
  cancelToken: null,
}
```

更多 `options` 具体参考 [umi-request](https://github.com/umijs/umi-request)。


示例：

get 请求。

```ts
import { request } from 'alita';

export async function query(params): Promise<any> {
  return request(
    '/api/hello',
    { 
      method: 'get',
      params,
    }
  );
};

// 调用
query({id:123})
  .then((res: any) =>{
    console.log(res);
  })
  .catch((error: any) =>{
    console.log(error);
  });
```

post 请求。

```ts
import { request } from 'alita';

export async function query(data): Promise<any> {
  return request(
    '/api/hello',
    { 
      method: 'data',
      data,
    }
  );
};

// 调用
query({id:123})
  .then((res: any) =>{
    console.log(res);
  })
  .catch((error: any) =>{
    console.log(error);
  });
```

单独设置请求头。

```ts
import { request } from 'alita';

export async function query(data): Promise<any> {
  return request(
    '/api/hello',
    { 
      method: 'data',
      data,
      headers: {
        'APP-ID': data?.id,
      },
    }
  );
}

// 调用
query({id:123});
```

更多用法参考 [umi-request](https://github.com/umijs/umi-request)。

## useRequest 

`useRequest` 是从 [@ahooksjs/use-request](https://ahooks.js.org/zh-CN/hooks/async) 引入的。

是一个强大的的异步数据管理的 Hooks，具有以下能力：

* 自动请求/手动请求
* 轮询
* 防抖
* 节流
* 屏幕聚焦重新请求
* 错误重试
* loading delay
* SWR(stale-while-revalidate)
* 缓存

`useRequest` 的第一个参数是一个异步函数，在组件初次加载时，会自动触发该函数执行。同时自动管理该异步函数的 loading , data , error 等状态。

示例：

```ts
import { useRequest , request } from 'alita';
 
export default () => {
  const { data, error, loading } = useRequest(() => {
    return request(
      '/api/hello',
      { 
        method: 'data',
        data,
      }
    );
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

`useRequest` 的第二个参数是 `options`，其类型定义如下：

```ts
interface Options<TData, TParams extends any[]> {
  manual?: boolean;// 手动触发。
  onBefore?: (params: TParams) => void;// 请求之前触发。
  onSuccess?: (data: TData, params: TParams) => void;// 请求成功触发。
  onError?: (e: Error, params: TParams) => void;// 请求失败触发。
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;// 请求完成触发。
  defaultParams?: TParams; // 默认参数
  refreshDeps?: DependencyList;// 依赖更新，其依赖改变后，会重新触发请求。
  refreshDepsAction?: () => void;// 
  loadingDelay?: number;// 可以延迟 loading 变成 true 的时间，有效防止闪烁。
  pollingInterval?: number;// 进入轮询模式，useRequest 会定时触发 service 执行。
  pollingErrorRetryCount?: number;// 轮询错误重试次数。如果设置为 -1，则无限次
  pollingWhenHidden?: boolean;// 页面隐藏时，是否继续轮询。
  refreshOnWindowFocus?: boolean;// 在浏览器窗口 refocus 和 revisible 时，会重新发起请求。
  focusTimespan?: number;// 在浏览器窗口 refocus 和 revisible 时，会重新发起请的时间间隔。
  debounceWait?: number;// 防抖等待时间, 单位为毫秒。
  debounceLeading?: boolean;// 在延迟开始前执行调用。
  debounceTrailing?: boolean;// 在延迟结束后执行调用。
  debounceMaxWait?: number;// 允许被延迟的最大值。
  throttleWait?: number;// 节流等待时间, 单位为毫秒。
  throttleLeading?: boolean;// 在节流开始前执行调用。
  throttleTrailing?: boolean;// 在节流结束后执行调用。
  cacheKey?: string;// 请求唯一标识。如果设置了 cacheKey，我们会启用缓存机制。同一个 cacheKey 的数据全局同步。
  cacheTime?: number;// 设置缓存数据回收时间。默认缓存数据 5 分钟后回收，如果设置为 -1, 则表示缓存数据永不过期。
  staleTime?: number;// 缓存数据保持新鲜时间。在该时间间隔内，认为数据是新鲜的，不会重新发请求，如果设置为 -1，则表示数据永远新鲜。
  setCache?: (data: CachedData<TData, TParams>) => void;// 自定义设置缓存。
  getCache?: (params: TParams) => CachedData<TData, TParams> | undefined;// 自定义读取缓存。
  retryCount?: number;// 错误重试次数。如果设置为 -1，则无限次重试。
  retryInterval?: number;// 重试时间间隔，单位为毫秒。
  ready?: boolean;// 手动模式下，当前请求是否准备好了。
}
```
