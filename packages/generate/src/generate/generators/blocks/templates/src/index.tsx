import { connect } from 'dva';
import React, { Component } from 'react';

import { BLOCK_NAME_CAMEL_CASEModelState, ConnectProps } from './connect';

import styles from './index.less';

interface PageProps extends ConnectProps {
  BLOCK_NAME_CAMEL_CASE: BLOCK_NAME_CAMEL_CASEModelState;
}

interface PageState {}

@connect(({ BLOCK_NAME_CAMEL_CASE }) => ({ BLOCK_NAME_CAMEL_CASE }))
class Page extends Component<PageProps, PageState> {
  state: PageState  = {};

  render() {
    const {
      BLOCK_NAME_CAMEL_CASE: { name },
    } = this.props;
    return <div className={styles.userCenter}>Hello {name}</div>;
  }
}

export default Page;
