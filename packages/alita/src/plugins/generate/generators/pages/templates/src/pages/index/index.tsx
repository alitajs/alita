import { connect } from 'dva';
import React, { Component } from 'react';
<% if (isTypeScript) { %>
import { <%= componentName %>ModelState, ConnectProps } from '@/models/connect';
<% } %>
import styles from './index.less';
<% if (isTypeScript) { %>
interface PageProps extends ConnectProps {
  <%= name %>: <%= componentName %>ModelState;
}

interface PageState {}
<% } %>
@connect(({ <%= name %> }) => ({ <%= name %> }))
class Page extends Component<% if (isTypeScript) { %><PageProps, PageState> <% } %>{
  state<% if (isTypeScript) { %>: PageState <% } %> = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
  }

  render() {
    const {
      <%= name %>: { name },
    } = this.props;
    return <div className={styles.userCenter}>Hello {name}</div>;
  }
}

export default Page;
