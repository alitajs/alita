import { history } from 'alita';
import React from 'react';
import styles from './index.less';
export default () => (
  <div
    className={styles['adm-button']}
    onClick={() => {
      history.push('/users');
    }}
  >
    Hello Alita, Click Me Go To /Users!
  </div>
);
