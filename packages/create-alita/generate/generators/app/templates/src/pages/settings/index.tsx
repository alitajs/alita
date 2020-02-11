import { connect } from 'dva';
import React, { FC, useEffect } from 'react';

import { SettingsModelState, ConnectProps } from '@/models/connect';

import styles from './index.less';

interface PageProps extends ConnectProps {
  settings: SettingsModelState;
}

const SettingsPage: FC<PageProps> = ({ settings, dispatch }) => {
  useEffect(() => {
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
