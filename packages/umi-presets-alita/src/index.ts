export default function () {
  return {
    plugins: [
      // commands
      require.resolve('./plugins/commands/version/version'),
      require.resolve('./plugins/commands/cordova/cordova'),

      // bundle configs
      require.resolve('@alitajs/hd'),
      require.resolve('@alitajs/routes'),
      require.resolve('./plugins/features/appType'),
      require.resolve('./plugins/defaultConfig'),
      require.resolve('./plugins/features/complexRoute'),
    ],
  };
}
