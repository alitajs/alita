import React, { FC, useEffect } from 'react';
import { setPageNavBar, connect, SettingsModelState, ConnectProps } from 'alita';
import { Icon } from 'antd-mobile';

import styles from './index.less';

interface PageProps extends ConnectProps {
  settings: SettingsModelState;
}

const SettingsPage: FC<PageProps> = ({ settings, dispatch, location }) => {
  const onLeftClick = () => {
    console.log('click left');
  };
  useEffect(() => {
    setPageNavBar({
      pagePath: location.pathname,
      navBar: {
        onLeftClick,
        rightContent: [
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ],
      },
    });
    dispatch!({
      type: 'settings/query',
    });
  }, []);
  const { name } = settings;

  return <div className={styles.center}>Hello {name}</div>;
};

export default connect(({ settings }: { settings: SettingsModelState }) => ({ settings }))(
  SettingsPage,
);
