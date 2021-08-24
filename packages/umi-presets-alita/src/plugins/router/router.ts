import { IApi } from 'umi';

export default (api: IApi) => {
  api.addUmiExports(() => {
    return [
      {
        source: require.resolve(
          '../../../src/plugins/router/historyAdapater.ts',
        ),
        exportAll: true
      },
    ];
  });
};
