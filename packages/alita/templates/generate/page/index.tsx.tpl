import React from 'react';
import type { FC } from 'react';
import { useRequest } from 'alita';
import { query } from './service';
import styles from './index.less';

interface {{{ name }}}PageProps {}

const {{{ name }}}Page: FC<{{{ name }}}PageProps> = () => {
  const { data } = useRequest(query);
  return <div className={styles.center}>Hello {data?.text}</div>;
};

export default {{{ name }}}Page;
