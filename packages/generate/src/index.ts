import { IApi } from 'umi';
import createPageGenerator from './generate/generators/pages/index';
import createAppGenerator from './generate/generators/app/index';

export default (api: IApi) => {
  api.registerGenerator({
    key: 'pages',
    // @ts-ignore
    Generator: createPageGenerator({ api }),
  });
  api.registerGenerator({
    key: 'app',
    // @ts-ignore
    Generator: createAppGenerator({ api }),
  });
}
