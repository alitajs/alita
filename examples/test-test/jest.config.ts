import { Config, configUmiAlias, createConfig } from 'alita/test';

const jestConfig = createConfig({
  target: 'browser',
});

export default async () => {
  return (await configUmiAlias({
    ...jestConfig,
  })) as Config.InitialOptions;
};
