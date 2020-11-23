
import React, { FC } from 'react';
import { useRequest, ConnectProps } from 'alita';
import { query } from './service';
import styles from './index.less';

interface {{{ componentName }}}PageProps extends ConnectProps {}

const {{{ componentName }}}Page: FC<{{{ componentName }}}PageProps> = () => {
  const { data } = useRequest(query);
  return <div className={styles.center}>Hello {data?.text}</div>;
};

export default {{{ componentName }}}Page;
