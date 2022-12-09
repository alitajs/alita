import { defineConfig } from 'alita';

export default defineConfig({
  appType: 'pc',
  // for ie
  // legacyBuild: false,
  moment2dayjs: false,
  // @ts-ignore
  // for ie
  // headScripts: [
  //   'https://unpkg.com/react@18.1.0/umd/react.production.min.js',
  //   'https://unpkg.com/react-dom@18.1.0/umd/react-dom.production.min.js',
  // ],
  // for ie
  // externals: { react: 'React', 'react-dom': 'ReactDOM' },
  // @ts-ignore
  dva: false,
  // @ts-ignore
  model: false,
});
