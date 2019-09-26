import { connect } from 'dva';
import React, { FC } from 'react';
<% if (isTypeScript) { %>
import { <%= componentName %>ModelState, ConnectProps } from '@/models/connect';
<% } %>
import styles from './index.less';
<% if (isTypeScript) { %>
interface PageProps extends ConnectProps {
  <%= name %>: <%= componentName %>ModelState;
}

<% } %>
const Page: FC<% if (isTypeScript) { %><PageProps> <% } %> = ({ <%= name %> }) => {
  const { name } = <%= name %>;
  return <div className={styles.center}>Hello {name}</div>;
};

export default connect(({ <%= name %> }) => ({ <%= name %> }))(Page);
