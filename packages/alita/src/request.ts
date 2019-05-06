
/**
 * request 网络请求工具
 * 更详细的api文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';

const runtimeRequest = (window as any).g_plugins.mergeConfig('request') || {};

/**
 * 配置request请求时的默认参数
 */
const request = extend(runtimeRequest);

export default request;
