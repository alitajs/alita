import { useRequest } from 'ahooks';
import {
  extend,
  OnionMiddleware,
  RequestInterceptor,
  RequestMethod,
  RequestOptionsInit,
  RequestOptionsWithoutResponse,
  RequestOptionsWithResponse,
  RequestResponse,
  ResponseInterceptor,
} from 'umi-request';

export interface RequestConfig extends RequestOptionsInit {
  middlewares?: OnionMiddleware[];
  requestInterceptors?: RequestInterceptor[];
  responseInterceptors?: ResponseInterceptor[];
}

let requestMethodInstance: RequestMethod;
let requestConfig: RequestConfig = {};

const getRequestMethod = () => {
  if (requestMethodInstance) {
    // request method 已经示例化
    return requestMethodInstance;
  }
  requestMethodInstance = extend({
    ...requestConfig,
  });

  // Add user custom middlewares
  const customMiddlewares = requestConfig.middlewares || [];
  customMiddlewares.forEach((mw) => {
    requestMethodInstance.use(mw);
  });

  // Add user custom interceptors
  const requestInterceptors = requestConfig.requestInterceptors || [];
  const responseInterceptors = requestConfig.responseInterceptors || [];
  requestInterceptors.map((ri) => {
    requestMethodInstance.interceptors.request.use(ri);
  });
  responseInterceptors.map((ri) => {
    requestMethodInstance.interceptors.response.use(ri);
  });

  return requestMethodInstance;
};

interface RequestMethodInUmi<R = false> {
  <T = any>(
    url: string,
    options: RequestOptionsWithResponse & { skipErrorHandler?: boolean },
  ): Promise<RequestResponse<T>>;
  <T = any>(
    url: string,
    options: RequestOptionsWithoutResponse & { skipErrorHandler?: boolean },
  ): Promise<T>;
  <T = any>(
    url: string,
    options?: RequestOptionsInit & { skipErrorHandler?: boolean },
  ): R extends true ? Promise<RequestResponse<T>> : Promise<T>;
}

const request: RequestMethodInUmi = (url: string, options?: any) => {
  const requestMethod = getRequestMethod();
  return requestMethod(url, options);
};

const setRequestConfig = (config: RequestConfig) => {
  requestConfig = config;
};

const getRequestConfig = () => {
  return requestConfig;
};

export { request, useRequest, setRequestConfig, getRequestConfig };
