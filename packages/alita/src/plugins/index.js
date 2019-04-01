export default function(api) {
  const { debug } = api;
  const options = api.config;

  function getId(id) {
    return `alita:${id}`;
  }

  function noop() {
    return true;
  }

  const plugins = {
    dva: () => require('umi-plugin-react/lib/plugins/dva').default,
    antd: () => require('umi-plugin-react/lib/plugins/antd').default,
    authority: () => require('./authorize').default,
  };
  console.log('hello alita1');

  Object.keys(plugins).forEach(key => {
    api.registerPlugin({
      id: getId(key),
      apply: plugins[key](),
      opts: options[key],
    });

    api._registerConfig(() => {
      return () => {
        return {
          name: key,
          validate: noop,
          onChange(newConfig) {
            api.service.restart(`${name} changed`);
          },
        };
      };
    });
  });
}
