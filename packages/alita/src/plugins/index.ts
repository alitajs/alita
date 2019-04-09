const path = require('path');

const defaultOptions = {
  umi: { dva: true, antd: true },
  menu: {
    build: path.resolve('.', './src/menus.json'),
  },
  authority: {
    authorize: [
      {
        guard: ['src/Authority'],
        include: /\//,
        exclude: /\/user/i,
      },
    ],
  },
};

export default function(api) {
  const { debug } = api;
  const options = api.config;
  const opts = { ...defaultOptions, ...options };
  console.log(opts);
  function getId(id) {
    return `alita:${id}`;
  }

  function noop() {
    return true;
  }
  const reactPlugin = require('umi-plugin-react').default;

  reactPlugin(api, opts.umi);

  api._registerConfig(() => {
    return () => {
      return {
        name: 'umi',
        validate: noop,
        onChange(newConfig) {
          api.service.restart(`umi config changed`);
        },
      };
    };
  });

  if (opts.pagePath) {
    api._registerConfig(() => {
      return () => {
        return {
          name: 'pagePath',
          validate: noop,
          onChange(newConfig) {
            api.service.restart(`pagePath config changed`);
          },
        };
      };
    });
    process.env.PAGES_PATH = opts.pagePath;
  }

  const plugins = {
    menu: () => require('umi-plugin-menus').default,
    authority: () => require('./authorize').default,
  };

  Object.keys(plugins).forEach(key => {
    api.registerPlugin({
      id: getId(key),
      apply: plugins[key](),
      opts: opts[key],
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
