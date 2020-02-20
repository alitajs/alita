import { join } from 'path';
import { Service } from 'umi';

const fixtures = join(__dirname, 'fixtures');

test('native', async () => {
  const cwd = join(fixtures, 'native');
  const service = new Service({
    cwd,
    plugins: [
      require.resolve('./index.ts')
    ],
  });
  await service.init();
  expect(service.userConfig!.native).toEqual([]);
});
