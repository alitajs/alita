// ref:
// - https://umijs.org/plugins/api
import type { AlitaApi } from '@alita/types';
import { logger } from '@umijs/utils';

const locales = [
  ['APP_ROOT', '指定项目根目录'],
  ['ANALYZE', '用于分析 bundle 构成，默认关闭'],
  [
    'BABEL_POLYFILL',
    '默认会根据 targets 配置打目标浏览器的全量补丁，设置为 none 禁用内置的补丁方案',
  ],
  ['COMPRESS', '默认压缩 CSS 和 JS，值为 none 时不压缩，build 时有效'],
  ['DID_YOU_KNOW', '设置为 none 会禁用「你知道吗」提示'],
  ['FS_LOGGER', '默认会开启保存物理日志，值为 none 时不保存'],
  ['HMR', '默认开启 HMR 功能，值为 none 时关闭。'],
  ['HOST', '默认是 0.0.0.0'],
  ['PORT', '指定端口号，默认是 8000'],
  ['SOCKET_SERVER', '指定用于 HMR 的 socket 服务器。'],
  [
    'SPEED_MEASURE',
    '分析 Webpack 编译时间，支持 CONSOLE 和 JSON 两种格式，默认是 CONSOLE',
  ],
  ['UMI_ENV', '当指定 UMI_ENV 时，会额外加载指定值的配置文件'],
  ['UMI_PLUGINS', '指定 umi 命令执行时额外加载的插件的路径，使用 , 隔开'],
  ['UMI_PRESETS', '指定 umi 命令执行时额外加载插件集的路径，使用 , 隔开'],
  ['WEBPACK_FS_CACHE_DEBUG', '开启 webpack 的物理缓存 debug 日志'],
];

export default (api: AlitaApi) => {
  api.registerCommand({
    name: 'env',
    description: 'env list',
    fn: async ({ args }: any) => {
      logger.info('[ENV list] 打印所有可用的环境变量');
      console.table(locales);
    },
  });
};
