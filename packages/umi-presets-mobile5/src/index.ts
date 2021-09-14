import { IApi } from '@umijs/types';

export default function (api: IApi) {
  let plugins = [
    require.resolve('@alitajs/hd'),
    require.resolve('@alitajs/keep-alive'),
    require.resolve('@alitajs/layout'),
    require.resolve('@alitajs/plugin-dva"'),
    require.resolve('@alitajs/plugin-antd-mobile'),
    require.resolve('@umijs/plugin-esbuild'),
    require.resolve('@umijs/plugin-helmet'),
    require.resolve('@umijs/plugin-request')
  ];

  return {
    plugins,
  };
}
