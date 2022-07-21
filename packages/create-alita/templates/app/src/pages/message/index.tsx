import { useRequest } from 'alita';
import type { FC } from 'react';
import styles from './index.css';
import { query } from './service';

const MessagePage: FC = () => {
  const { data } = useRequest(query);
  return <div className={styles.center}>Hello {data?.text}</div>;
};

export default MessagePage;
