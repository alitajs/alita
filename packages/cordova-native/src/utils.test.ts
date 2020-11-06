import { join } from 'path';
import { checkPluginInstalled, checkDependenceInstalled } from './utils';
const fixtures = join(__dirname, 'fixtures');

test('checkPluginInstalled', async () => {
  const cwd = join(fixtures, 'native');
  const installed = checkPluginInstalled(cwd, {
    name: 'camera',
    cordova: 'cordova-plugin-camera',
    ionic: '@ionic-native/camera',
  });
  expect(installed).toEqual(false);
});

test('checkDependenceInstalled', async () => {
  const cwd = join(fixtures, 'native');
  const installed = checkDependenceInstalled(cwd, '@ionic-native/core');
  expect(installed).toEqual(true);
});
