import { connect } from 'dva';
import React, { FC, useEffect } from 'react';

import { ListModelState, ConnectProps } from '@/models/connect';

import styles from './index.less';

interface PageProps extends ConnectProps {
  list: ListModelState;
}

const ListPage: FC<PageProps> = ({ list, dispatch }) => {
  useEffect(() => {
    dispatch!({
      type: 'list/query',
    });
  }, []);
  const { name } = list;
  return <div className={styles.center}>Hello {name}</div>;
};

export default connect(({ list }: { list: ListModelState }) => ({ list }))(ListPage);
