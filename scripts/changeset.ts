import { getPackages } from '@manypkg/get-packages';
import 'zx/globals';

const root = path.join(__dirname, '../');
const changesetConfig = path.join(__dirname, '../.changeset/config.json');

const getWorkspaces = async () => getPackages(root);

const change = async () => {
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

  $`changeset`;
};

change();
