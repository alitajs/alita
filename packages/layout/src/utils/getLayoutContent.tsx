export default (
  path: string,
  hasKeepAlive: boolean,
  isMicroApp?:boolean,
) => `import React from 'react';
import { ApplyPluginsType } from 'umi';
import { plugin } from '../core/umiExports';
import Layout from '${path}';

export default (props) => {
  const layoutConfig = plugin.applyPlugins({
    key: 'mobileLayout',
    type: ApplyPluginsType.modify,
    initialValue: {},
  }) || {};
  return React.createElement(Layout, {
    layoutConfig,
    hasKeepAlive: ${hasKeepAlive},
    ...props,
    hideNavBar:${isMicroApp},
  })
}
`;
