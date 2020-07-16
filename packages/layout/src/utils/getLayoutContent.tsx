export default (
  path: string,
  hasKeepAlive: boolean,
) => `import React from 'react';
import { ApplyPluginsType } from 'umi';
import { plugin } from '../core/umiExports';

export default (props) => {
  const layoutConfig = plugin.applyPlugins({
    key: 'mobileLayout',
    type: ApplyPluginsType.modify,
    initialValue: {},
  }) || {};
  return React.createElement(require('${path}').default, {
    layoutConfig,
    hasKeepAlive: ${hasKeepAlive},
    ...props
  })
}
`;
