import { defineConfig } from 'alita';

export default defineConfig({
  appType: 'h5',
  keepalive: [/./],
  extendsApp: {
    root: 'root',
  },
  plugins: ['@alita/plugin-extends-app'],
  mobileLayout: true,
  legacyBuild: false,
  // mainPath:'users',
  mfsu: {},
  hash: false,
});
