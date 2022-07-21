import { Config, configUmiAlias, createConfig } from 'alita/test';

export default async () => {
  return (await configUmiAlias({
    ...createConfig({
      target: 'browser',
    }),
    setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
    // if you require some es-module npm package, please uncomment below line and insert your package name
    // transformIgnorePatterns: ['node_modules/(?!.*(lodash-es|your-es-pkg-name)/)']
    transformIgnorePatterns: [
      'node_modules/(?!.*(@umijs/renderer-react|umi/client/client/|@umijs/plugins/libs|antd-mobile/es/))',
    ],
  })) as Config.InitialOptions;
};
