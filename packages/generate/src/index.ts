import { IApi } from 'umi';
import createPageGenerator from './generate/pages';
import createAppGenerator from './generate/app';
import careateModelGenerator from './generate/model';

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
  api.registerGenerator({
    key: 'model',
    // @ts-ignore
    Generator: careateModelGenerator({ api }),
  });
};
