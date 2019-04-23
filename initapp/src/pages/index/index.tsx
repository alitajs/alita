import { connect } from 'dva';
import React, { Component } from 'react';

import { IndexModelState, ConnectProps } from '@/models/connect';
import { Button } from 'antd';
import styles from './index.less';
const a = '';
interface PageProps extends ConnectProps {
  index: IndexModelState;
}

interface PageState {}

@connect(({ index }) => ({ index }))
class Page extends Component<PageProps, PageState> {
  state: PageState = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
  }
  render() {
    const {
      index: { name },
    } = this.props;
    return <div className={styles.userCenter}>Hello {name}</div>;
  }
}

export default Page;
