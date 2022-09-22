import { Button } from 'antd-mobile';
import React, { useState } from 'react';
import styles from './index.less';
export default () => {
  const [count, setCount] = useState(0);
  return (
    <div className={styles['adm-button']}>
      Hello Alita
      <Button
        type="button"
        color="primary"
        fill="solid"
        block
        size="large"
        onClick={() => setCount(count + 1)}
      >
        点我计数加1 {count}
      </Button>
    </div>
  );
};
