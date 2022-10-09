import { IApi } from '@umijs/max';

export default (api: IApi) => {
  const { REACT_APP_ENV } = process.env;

  const configDefaults: Record<string, any> = {
    define: {
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: '',
      REACT_APP_ENV: REACT_APP_ENV || false,
    },
    ...api.userConfig,
  };

  api.modifyConfig((memo: any) => {
    Object.keys(configDefaults).forEach((key) => {
      memo[key] = configDefaults[key];
    });
    return memo;
  });
};
