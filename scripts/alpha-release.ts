import { getPackages } from '@manypkg/get-packages';
import 'zx/globals';

const root = path.join(__dirname, '../');
const changesetConfig = path.join(__dirname, '../.changeset/config.json');

const getWorkspaces = async () => getPackages(root);

const releaseAlpha = async () => {
  const ws = await getWorkspaces();
  const appNames: string[] = [];
  ws.packages.forEach((submodule) => {
    const isPrivate = submodule.packageJson?.private;
    if (isPrivate) {
      appNames.push(submodule.packageJson.name);
    }
  });

  const config = await fs.readJson(changesetConfig, { encoding: 'utf-8' });
  config.ignore = appNames;
  await fs.writeFile(changesetConfig, `${JSON.stringify(config, null, 2)}\n`, {
    encoding: 'utf-8',
  });

  console.log(
    chalk.green(`[changeset-config]: refresh config ignore list complete`),
  );

  // 确保在预发布模式
  console.log(chalk.blue(`[alpha-release]: checking pre-release mode...`));

  try {
    // 检查是否已经在预发布模式
    const preConfig = await fs.readJson(path.join(root, '.changeset/pre.json'));
    if (preConfig.tag !== 'alpha') {
      console.log(
        chalk.yellow(`[alpha-release]: switching to alpha pre-release mode...`),
      );
      await $`changeset pre exit`;
      await $`changeset pre enter alpha`;
    }
  } catch (error) {
    // 如果文件不存在，进入预发布模式
    console.log(
      chalk.yellow(`[alpha-release]: entering alpha pre-release mode...`),
    );
    await $`changeset pre enter alpha`;
  }

  console.log(chalk.green(`[alpha-release]: ready for alpha release`));
  console.log(chalk.blue(`Next steps:`));
  console.log(chalk.blue(`1. Run "npm run changeset" to add changesets`));
  console.log(
    chalk.blue(`2. Run "npm run version-packages" to version packages`),
  );
  console.log(chalk.blue(`3. Run "npm run release" to publish alpha versions`));
};

releaseAlpha();
