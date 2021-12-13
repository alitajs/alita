import { useRequest } from 'alita';
import { Button, Slider } from 'antd-mobile';
import { Button as AntdButton } from 'antd-mobile-v2';
import React from 'react';
import { query } from '../services/api';
import './global.less';
// @ts-ignore
import styles from './index.less';

export default function HomePage() {
  const { data, loading } = useRequest(query);
  console.log(data);
  return (
    <div className={styles.title}>
      {loading ? 'Loading....' : JSON.stringify(data)}
      <Button type="button" color="primary" fill="solid" block size="large">
        123
      </Button>
      <Slider />
      <AntdButton>123</AntdButton>
    </div>
  );
}
