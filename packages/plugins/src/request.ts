import { logger, Mustache, winPath } from '@umijs/utils';
import { AlitaApi } from 'alita';
import { dirname } from 'path';

export default (api: AlitaApi) => {
  logger.info('Using Request Plugin');

  api.describe({
    key: 'request',
    config: {
      schema(Joi) {
        return Joi.object();
      },
    },
  });

  // TODO: 运行时配置，还不支持，先写在这里测试
  const content = Mustache.render(
    `
import { setRequestConfig } from '${winPath(
      dirname(require.resolve('@alita/request/package')),
    )}';

setRequestConfig({{{ request }}})
  `.trim(),
    {
      request: JSON.stringify(api.userConfig.request),
    },
  );
  api.addEntryCodeAhead(() => [`${content}`]);

  api.addUmiExports(() => {
    return [
      {
        specifiers: ['request', 'useRequest'],
        source: winPath(dirname(require.resolve('@alita/request/package'))),
      },
    ];
  });
};
