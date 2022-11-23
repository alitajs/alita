import { defineConfig } from 'alita';

export default defineConfig({
  locale: {
    // 如果开启 antd 需要在项目中安装 antd·
    antd: false,
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    default: 'zh-CN',
    baseSeparator: '-',
  },
});
