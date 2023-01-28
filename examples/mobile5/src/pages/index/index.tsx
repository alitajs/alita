import { setPageNavBar } from 'alita';
import { Button } from 'antd-mobile-5';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
export default () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setPageNavBar({
      pagePath: '/',
      navBar: {
        style: {
          background: 'red',
        },
      },
    });
  }, []);
  return (
    <>
      <div className={styles['adm-button']}>antd mobile</div>
      <div className={styles['title']}>
        Hello 123
        {Math.random()}
        <Button
          type="button"
          color="primary"
          fill="solid"
          block
          size="large"
          onClick={() => setCount(count + 1)}
        >
          点我计数加1134 {count}
        </Button>
      </div>
    </>
  );
};
