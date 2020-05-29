import React, { FC, useEffect } from 'react';
import { IndexModelState, ConnectProps, connect, useIntl, useModel } from 'alita';
import styles from './index.less';

interface PageProps extends ConnectProps {
  index: IndexModelState;
}

const IndexPage: FC<PageProps> = ({ index, dispatch }) => {
  const intl = useIntl();
  const { access, setLayoutConfig, setAccess } = useModel('@@accessLayout');

  if (access.canAdmin) {
    console.log('access.canAdmin');
  }
  const { name } = index;
  useEffect(() => {
    setLayoutConfig({
      title: 'PageSetDemo',
    });
    dispatch!({
      type: 'index/query',
    });
  }, []);
  return (
    <div className={styles.center} onClick={() => setAccess({ canAdmin: false })}>
      {intl.formatMessage(
        {
          id: 'WELCOME_WORLD',
          defaultMessage: '你好，旅行者',
        },
        {
          name: '旅行者',
        },
      )}
      {name}
    </div>
  );
};

export default connect(({ index }: { index: IndexModelState }) => ({ index }))(IndexPage);
