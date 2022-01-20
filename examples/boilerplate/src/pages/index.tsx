import { query } from '@/services/api';
import { ErrorBoundary, For, Match, Show, Switch } from '@alita/flow';
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
import './global.less';
// @ts-ignore
import styles from './index.less';

interface HomePageProps extends ConnectProps {
  index: IndexModelState;
}

const HomePage: React.FC<HomePageProps> = ({ index, dispatch }) => {
  const { data, loading } = useRequest(query);
  const [input, setInput] = useState();
  const [abc, setabc] = useState([1, 2, 3]);
  const { name } = index;
  console.log('HomePage render');
  return (
    <div
      className={styles.title}
      x-class={[
        'foo',
        {
          bar: true,
          active: true,
        },
      ]}
    >
      <h2>请求到的数据是：</h2>
      <ErrorBoundary
        fallback={({ error, componentStack, resetError }) => (
          <div>
            Error: {error.toString()}
            <button
              onClick={() => {
                console.log(componentStack);
                // setabc([1, 2, 3]);
                resetError();
              }}
            >
              重置错误
            </button>
            <details>Stack:{componentStack?.toString()}</details>
          </div>
        )}
      >
        <For each={abc}>{(item, index) => <div>2222{item}</div>}</For>
      </ErrorBoundary>
      <Switch fallback={<div>none!!!</div>}>
        <Match when={true}>
          <div>123</div>
        </Match>
        <Match when={true}>
          <div>456</div>
        </Match>
        <Match when={false}>
          <div>789</div>
        </Match>
      </Switch>
      <Show when={!!input} fallback={<div>你快输入点啥！</div>}>
        <div>hahahah,来啦</div>
      </Show>
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
