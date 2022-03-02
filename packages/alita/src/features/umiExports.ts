import { winPath } from '@umijs/utils';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { AlitaApi } from '../types';

// TODO: hack 临时用, umi 里肯定会有导出类型的方法
export default function (api: AlitaApi) {
  // push @@/exports.ts
  api.onGenerateFiles({
    fn: async () => {
      if (!existsSync(join(api.paths.absTmpPath, 'exports.ts'))) {
        console.error('exports.ts no find');
        return;
      }
      const exportsStr = readFileSync(
        join(api.paths.absTmpPath, 'exports.ts'),
        'utf-8',
      );
      const exports = [];

      // plugins
      const plugins = readdirSync(api.paths.absTmpPath).filter((file) => {
        if (
          file.startsWith('plugin-') &&
          (existsSync(join(api.paths.absTmpPath, file, 'index.ts')) ||
            existsSync(join(api.paths.absTmpPath, file, 'index.tsx')))
        ) {
          return true;
        }
      });
      // plugins types.ts
      exports.push('// plugins types.ts');

      for (const plugin of plugins) {
        let file: string;
        if (!existsSync(join(api.paths.absTmpPath, plugin, 'types.d.ts'))) {
          continue;
        }
        file = winPath(join(api.paths.absTmpPath, plugin, 'types.d'));
        exports.push(`export * from '${file}';`);
      }

      api.writeTmpFile({
        noPluginDir: true,
        path: 'exports.ts',
        content: exportsStr + exports.join('\n'),
      });
    },
    // 最后执行，要在 umi 写完 exports.ts 之后执行
    // umi 编写  exports.ts stage 也是 Infinity，所以顺序是按加载顺序执行的，这个插件再更后面
    stage: Infinity,
  });
}
