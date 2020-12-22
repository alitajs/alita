
import React, { FC } from 'react';
import { useRequest } from 'alita';
import { query } from './service';
import styles from './index.less';

interface {{{ componentName }}}PageProps {}

const {{{ componentName }}}Page: FC<{{{ componentName }}}PageProps> = () => {
  const { data } = useRequest(query);
  return <div className={styles.center}>Hello {data?.text}</div>;
};

export default {{{ componentName }}}Page;
