import {
  connect,
  ConnectProps,
  IndexModelState,
  setPageNavBar,
  useRequest,
} from 'alita';
import { Button, Input, List, Slider } from 'antd-mobile';
import { Button as AntdButton } from 'antd-mobile-v2';
import React, { useState } from 'react';
import { query } from '../services/api';
import './global.less';
// @ts-ignore
import styles from './index.less';

interface HomePageProps extends ConnectProps {
  index: IndexModelState;
}

const HomePage: React.FC<HomePageProps> = ({ index, dispatch }) => {
  const { data, loading } = useRequest(query);
  const [input, setInput] = useState();
  const { name } = index;

  return (
    <div className={styles.title}>
      <h2>请求到的数据是：</h2>
      {loading ? 'Loading....' : JSON.stringify(data)}
      <Button
        type="button"
        color="primary"
        fill="solid"
        block
        size="large"
        onClick={() => {
          setPageNavBar({
            pagePath: location.pathname,
            navBar: {
              pageTitle: '首页(new)',
            },
          });
        }}
      >
        点我修改首页标题
      </Button>
      <Slider />
      <AntdButton>Antd Mobile@2 Button</AntdButton>
      <h2>dva index model name:{name}</h2>
      <List
        style={{
          '--prefix-width': '6em',
          marginTop: '1rem',
        }}
      >
        <List.Item title="index model name">
          <Input placeholder="请输入内容" value={input} onChange={setInput} />
        </List.Item>
      </List>
      <Button
        type="button"
        color="primary"
        fill="solid"
        block
        size="large"
        onClick={() => {
          dispatch!({
            type: 'index/save',
            payload: { name: input },
          });
        }}
      >
        点我修改 dva name 为输入值
      </Button>
    </div>
  );
};

export default connect(({ index }: { index: IndexModelState }) => ({ index }))(
  HomePage,
);
