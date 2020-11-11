import { join } from 'path';
import { rimraf } from '@umijs/utils';
import { existsSync } from 'fs';
import { Service } from 'umi';
import { render, fireEvent, cleanup } from '@testing-library/react';

const fixtures = join(__dirname, 'fixtures');

afterEach(cleanup);

test('normal', async () => {
  const cwd = join(fixtures, 'native');
  const target = join(cwd, 'platforms');
  const service = new Service({
    cwd,
    plugins: [require.resolve('../../umi-presets-alita/lib/plugins/features/appType.js'),
    require.resolve('../../umi-presets-alita/lib/plugins/features/displayName.js'),
    require.resolve('../../umi-presets-alita/lib/plugins/features/packageId.js'),
    require.resolve('../lib'),],
    // presets: [require.resolve('../../umi-presets-alita/lib/index')],
  });
  await service.run({
    name: 'platforms',
    args: {
      ios: true
    },
  });
  expect(existsSync(join(target, 'ios', 'Podfile'))).toEqual(true);
  expect(existsSync(join(target, 'ios', 'micro', 'Info.plist'))).toEqual(true);
  rimraf.sync(target);
});
