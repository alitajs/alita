import { connect } from 'dva';
import React, { Component } from 'react';
import { AppModelState, ConnectProps } from '@/models/connect';
import styles from './index.less';

interface PageProps extends ConnectProps {
  app: AppModelState;
}

interface PageState {}

@connect(({ app }) => ({ app }))
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
      app: { name },
    } = this.props;
    return <div className={styles.userCenter}>Hello {name}</div>;
  }
}

export default Page;
