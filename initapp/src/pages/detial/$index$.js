import { connect } from 'dva';
import React, { Component } from 'react';

import styles from './index.less';

@connect(({ detial }) => ({ detial }))
class Page extends Component{
  state = {};

  render() {
    const {
      detial: { name },
    } = this.props;
    console.log(this.props);

    return <div className={styles.userCenter}>Hello {name}</div>;
  }
}

export default Page;
