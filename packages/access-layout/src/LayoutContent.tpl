import React from 'react';
import { ApplyPluginsType } from 'umi';
import { plugin } from '../core/umiExports';
import { AccessLayout } from './AccessLayout';

export default (props) => {
  const layoutConfig = plugin.applyPlugins({
    key: 'accessLayout',
    type: ApplyPluginsType.modify,
    initialValue: {},
  }) || {};
  return React.createElement(AccessLayout, {
    layoutConfig,
    ...props
  })
}
