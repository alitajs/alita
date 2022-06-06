import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';
import { IApi } from 'umi';

export default (api: IApi) => {
  api.onBuildComplete(({ err }) => {
    //@ts-ignore
    if (!err && !existsSync(join(api.paths.absOutputPath!, '404.html'))) {
      // 如果没有 404 则复制一下 index
      setTimeout(() => {
        copyFileSync(
          join(api.paths.absOutputPath!, 'index.html'),
          join(api.paths.absOutputPath!, '404.html'),
        );
      }, 500);
    }
  });
};
