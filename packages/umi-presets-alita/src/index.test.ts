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
    '*{padding:0;margin:0;box-sizing:border-box;}html,body,#root{width:100%;}#root>div{/*StatusbarheightoniOS11.0*/padding-top:constant(safe-area-inset-top);padding-bottom:constant(safe-area-inset-bottom);/*StatusbarheightoniOS11+*/padding-top:calc(env(safe-area-inset-top)*2);padding-bottom:calc(env(safe-area-inset-bottom)*2);}.alita-layout-head{top:calc(env(safe-area-inset-top)*2)!important;}body{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-overflow-scrolling:touch;}input{border:none;outline:none;}#root{position:relative;overflow:scroll;}textarea:disabled,input:disabled{background-color:transparent;}',
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
