export default () => {
  // appType:native
  // 配置开发初始化数据，可能拼接到调试的 url 中
  // alita platforms add ios(android)
  // 检测 appType, packageId, displayName 类型合法
  // build outputPath: `platforms/${nativeIsIos ? 'ios' : 'android/app/src/main/assets'}/www`,
  // 默认加 alita native sdk？
  // 支持开发热加载
  return '@alita/native';
};
