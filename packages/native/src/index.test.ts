import { join } from 'path';
import { rimraf } from '@umijs/utils';
import { existsSync } from 'fs';
import { Service } from 'umi';

const fixtures = join(__dirname, 'fixtures');

test('normal', async () => {
  const cwd = join(fixtures, 'native');
  const target = join(cwd, 'platforms');
  const service = new Service({
    cwd,
    plugins: [
      require.resolve('../../umi-presets-alita/lib/plugins/features/appType.js'),
      require.resolve('../../umi-presets-alita/lib/plugins/features/displayName.js'),
      require.resolve('../../umi-presets-alita/lib/plugins/features/packageId.js'),
      require.resolve('../lib'),
    ],
  });
  await service.run({
    name: 'platforms',
    args: {
      ios: true
    },
  });
  expect(existsSync(join(target, 'ios', 'Podfile'))).toEqual(true);
  rimraf.sync(target);
});
