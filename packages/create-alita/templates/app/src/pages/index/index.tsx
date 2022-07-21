import { query } from '@/services/api';
import { useRequest } from 'alita';
import { FC } from 'react';
import styles from './index.css';

const HomePage: FC = () => {
  const { data } = useRequest(query);
  return <div className={styles.center}>Hello {data?.text}</div>;
};

export default HomePage;
