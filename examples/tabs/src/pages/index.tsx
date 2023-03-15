import { closeTab } from 'alita';
import React from 'react';
import styles from './index.less';
export default () => (
  <div
    className={styles['adm-button']}
    onClick={() => {
      closeTab('/');
    }}
  >
    Hello Alita, Click Me Close This Tab!
  </div>
);
