import { Button } from 'antd-mobile';
import React, { useState } from 'react';
import styles from './index.less';
import { sendOpenAI } from 'alita';
export default () => {
  const [message, setMessage] = useState<string | null>();
  return (
    <>
      <div className={styles['title']}>
        {message}
        <Button
          type="button"
          color="primary"
          fill="solid"
          block
          size="large"
          onClick={async () => {
            const result = await sendOpenAI('你好');
            setMessage(result.choices[0]!.message?.content);
          }}
        >
          点我向 GPT 打招呼
        </Button>
      </div>
    </>
  );
};
