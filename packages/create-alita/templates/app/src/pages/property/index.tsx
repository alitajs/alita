import { useRequest } from 'alita';
import type { FC } from 'react';
import styles from './index.css';
import { query } from './service';

const PropertyPage: FC = () => {
  const { data } = useRequest(query);
  return <div className={styles.center}>Hello {data?.text}</div>;
};

export default PropertyPage;
