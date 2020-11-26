import React from 'react';
import { ConfigProvider, Modal, message } from 'antd';
import { ApplyPluginsType } from 'umi';
import { plugin } from '../core/umiExports';

export function rootContainer(container) {
  const runtimeAntd = plugin.applyPlugins({
    key: 'antd',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });

  const finalConfig = {...{{{ config }}},...runtimeAntd}

  if (finalConfig.prefixCls) {
    Modal.config({
      rootPrefixCls: finalConfig.prefixCls,
    });
    message.config({
      prefixCls: `${finalConfig.prefixCls}-message`,
    });
  }
  return React.createElement(ConfigProvider, finalConfig, container);
}
