import { IApi } from 'umi';
import createPageGenerator from './generate/pages';
import createAppGenerator from './generate/app';

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
