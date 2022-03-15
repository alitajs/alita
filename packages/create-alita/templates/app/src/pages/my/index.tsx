import { useRequest } from 'alita';
import type { FC } from 'react';
import React from 'react';
import styles from './index.less';
import { query } from './service';

interface MyPageProps {}

const MyPage: FC<MyPageProps> = () => {
  const { data } = useRequest(query);
  return <div className={styles.center}>Hello {data?.text}</div>;
};

export default MyPage;
