import { join } from 'path';
import { Service } from 'umi';

const fixtures = join(__dirname, 'fixtures');

test('native', async () => {
  const cwd = join(fixtures, 'native');
  const service = new Service({
    cwd,
    plugins: [
      require.resolve('./index.ts'),
      require.resolve(
        '../../umi-presets-alita/src/plugins/features/appType.ts',
      ),
    ],
  });
  await service.run({
    name: 'cordovanative',
    args: [],
  });
});
