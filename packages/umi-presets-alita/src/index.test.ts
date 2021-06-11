import { Service } from 'umi';
import { join } from 'path';
import cheerio from '@umijs/deps/compiled/cheerio';
import { render, cleanup } from '@testing-library/react';
import { rimraf } from '@umijs/utils';
import { readFileSync } from 'fs';

const fixtures = join(__dirname, 'fixtures');

test('default config', async () => {
  const cwd = join(fixtures, 'default-config');
  const service = new Service({
    cwd,
    presets: [require.resolve('./index')],
  });
  await service.init();
  expect(service.config!.routesExtend).toEqual({
    exclude: [
      /(?<!(index|\[index\]|404)(\.(js|jsx|ts|tsx)))$/,
      /model\.(j|t)sx?$/,
      /\.test\.(j|t)sx?$/,
      /service\.(j|t)sx?$/,
      /models\//,
      /components\//,
      /services\//,
    ],
  });
});

test('appType-h5', async () => {
  const cwd = join(fixtures, 'app-type-h5');
  const service = new Service({
    cwd,
    presets: [require.resolve('./index')],
  });
  // await service.init();
  await service.run({
    name: 'g',
    args: {
      _: ['g', 'html'],
    },
  });
  expect(service.config!.theme).toEqual({ '@hd': '2px' });

  const removeSpace = (str: string | null) =>
    str?.replace(/[\r\n]/g, '')?.replace(/\ +/g, '');
  const html = readFileSync(join(cwd, 'dist', 'index.html'), 'utf-8');
  const $ = cheerio.load(html);
  expect($('head meta[name="format-detection"]').attr('content')).toEqual(
    'telephone=no',
  );
  expect(removeSpace($('head style').eq(0).html())).toEqual(
    '*{box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;}html{width:100%;height:100%;text-size-adjust:100%;--alita-safe-area-top:env(safe-area-inset-top);--alita-safe-area-bottom:env(safe-area-inset-bottom);--alita-safe-area-left:env(safe-area-inset-left);--alita-safe-area-right:env(safe-area-inset-right);}body{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;position:fixed;top:0;right:0;bottom:0;left:0;width:100%;max-width:100%;height:100%;max-height:100%;text-rendering:optimizeLegibility;overflow:hidden;touch-action:manipulation;-webkit-user-drag:none;-ms-content-zooming:none;word-wrap:break-word;overscroll-behavior-y:none;text-size-adjust:none;}.alita-page{left:0;right:0;top:0;bottom:0;display:flex;position:absolute;flex-direction:column;justify-content:space-between;contain:layoutsizestyle;overflow:hidden;z-index:0;}',
  );
});

test('appType-pc', async () => {
  const cwd = join(fixtures, 'app-type-pc');
  const service = new Service({
    cwd,
    presets: [require.resolve('./index')],
  });
  await service.init();
  expect(service.userConfig!.appType).toEqual('pc');
});

test('complexRoute', async () => {
  const cwd = join(fixtures, 'complex-route');
  const service = new Service({
    cwd,
    presets: [require.resolve('./index')],
  });
  await service.init();
  expect(service.config!.routesExtend).toEqual({
    exclude: [
      /model\.(j|t)sx?$/,
      /\.test\.(j|t)sx?$/,
      /service\.(j|t)sx?$/,
      /models\//,
      /components\//,
      /services\//,
    ],
  });
});

test('complexRoute', async () => {
  const cwd = join(fixtures, 'complex-route');
  const service = new Service({
    cwd,
    presets: [require.resolve('./index')],
  });
  await service.init();
  expect(service.config!.routesExtend).toEqual({
    exclude: [
      /model\.(j|t)sx?$/,
      /\.test\.(j|t)sx?$/,
      /service\.(j|t)sx?$/,
      /models\//,
      /components\//,
      /services\//,
    ],
  });
});

test('mainPath', async () => {
  // @ 别名取不到，等待后续方案
  // https://github.com/alitajs/umi3-plugin-test-question
});
