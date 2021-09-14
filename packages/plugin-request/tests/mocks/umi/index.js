exports.ApplyPluginsType = {};

exports.history = {
  push: (params) => {
    require('historyPush')(params);
  },
};

exports.plugin = {
  applyPlugins: () => {
    return require('runtimeConfig');
  },
};
