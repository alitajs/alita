import {
  connect,
  ConnectProps,
  setPageNavBar,
  SettingsModelState,
} from 'alita';
import { Icon } from 'antd-mobile';
import { FC, useEffect } from 'react';
import styles from './index.less';

interface PageProps extends ConnectProps {
  settings: SettingsModelState;
}

const SettingsPage: FC<PageProps> = ({ settings, dispatch, location }) => {
  const onLeftClick = () => {
    console.log('click left');
  };

  useEffect(() => {
    setPageNavBar?.({
      pagePath: location.pathname,
      navBar: {
        pageBackground: '#000000',
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

  return (
    <div className={styles.center}>
      Hello {name}
      <p>通过 `setPageNavBar` 修改背景色和右上角按钮</p>
      <pre>{`setPageNavBar?.({
      pagePath: location.pathname,
      navBar: {
        pageBackground: '#000000',
        onLeftClick,
        rightContent: [
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ],
      },
    });`}</pre>
    </div>
  );
};

export default connect(({ settings }: { settings: SettingsModelState }) => ({
  settings,
}))(SettingsPage);
