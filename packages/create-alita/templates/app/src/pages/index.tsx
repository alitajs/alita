import { query } from '@/services/api';
import { useRequest } from 'alita';
import React, { FC } from 'react';
import styles from './index.less';

interface LifePageProps {}

const HomePage: FC<LifePageProps> = () => {
  const { data } = useRequest(query);
  return <div className={styles.center}>Hello {data?.text}</div>;
};

export default HomePage;
