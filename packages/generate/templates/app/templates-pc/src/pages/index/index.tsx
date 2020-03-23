import React, { FC, useEffect } from 'react';
import { IndexModelState, ConnectProps, connect, useIntl } from 'alita';
import styles from './index.less';

interface PageProps extends ConnectProps {
  index: IndexModelState;
}

const IndexPage: FC<PageProps> = ({ index, dispatch }) => {
  const intl = useIntl();
  useEffect(() => {
    dispatch!({
      type: 'index/query',
    });
  }, []);
  return (
    <div className={styles.center}>
      {intl.formatMessage(
        {
          id: 'WELCOME_WORLD',
          defaultMessage: '你好，旅行者',
        },
        {
          name: '旅行者',
        },
      )}
    </div>
  );
};

export default connect(({ index }: { index: IndexModelState }) => ({ index }))(IndexPage);
