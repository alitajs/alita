import { IApi } from 'umi';
import { readFileSync } from 'fs';
import { join } from 'path';

export default (api: IApi) => {
  // 生成临时文件
  api.onGenerateFiles({
    fn() {
      const exportsTpl = readFileSync(join(__dirname, 'historyAdapater.tpl'), 'utf-8');

      api.writeTmpFile({
        path: 'historyAdapater.ts',
        content: exportsTpl,
      });
    }
  })
  api.addUmiExports(() => {
    return [
      {
        exportAll: true,
        source: '../historyAdapater',
      },
    ];
  });
};
