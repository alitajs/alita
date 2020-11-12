import { join } from 'path';
import { rimraf } from '@umijs/utils';
import { existsSync } from 'fs';
import { copyDirectory } from './'

const fixtures = join(__dirname, '..', 'fixtures');

test('copyDirectory', async () => {
  const cwd = join(fixtures, 'normal');
  const target = join(fixtures, 'dist');

  const displayName = 'abc';
  const packageId = 'com';
  copyDirectory({
    path: cwd,
    target: target,
    displayName,
    packageId,
    isIos: true
  })
  expect(existsSync(join(target, displayName, `${displayName}.ts`))).toEqual(true);
  rimraf.sync(target);
});
