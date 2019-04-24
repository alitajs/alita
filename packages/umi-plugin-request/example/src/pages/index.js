import React, { Component } from 'react';
import request from 'alita-request';
import styles from './index.css';

class Page extends Component {
  state = {};

  componentWillMount(){
    request('/api/abc')
  }
  render() {

    return <div className={styles.userCenter}>12312
     </div>;
  }
}

export default Page;
