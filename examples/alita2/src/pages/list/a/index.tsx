import Logo from '@/assets/logo.png';
import { queryList } from '@/services/api';
import LoadMoreListView from '@alitajs/list-view';
import {
  connect,
  ConnectProps,
  dropByCacheKey,
  ListModelState,
  setPageNavBar,
} from 'alita';
import { Icon, List } from 'antd-mobile';
import { FC, useEffect } from 'react';
import styles from './index.less';

const { Item } = List;
const { Brief } = Item;

interface PageProps extends ConnectProps {
  list: ListModelState;
}

const ListPage: FC<PageProps> = ({ list, dispatch, history }) => {
  useEffect(() => {
    dispatch?.({
      type: 'list/query',
    });
    setPageNavBar?.({
      pagePath: location.pathname,
      navBar: {
        rightContent: [
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ],
      },
    });
  }, []);
  const { name } = list;

  const renderRow = (
    rowData: any,
    sectionID: string | number,
    rowID: string | number,
  ) => (
    <Item
      arrow="horizontal"
      thumb={<img src={Logo} className={styles.listIcon} />}
      multipleLine
      onClick={() => {
        dropByCacheKey('/list');
      }}
    >
      {rowData.title} <Brief>{rowID}</Brief>
    </Item>
  );
  return (
    <div>
      <div>Model Name:{name}</div>
      <div onClick={() => history.push('/list')}>Go to list</div>
      <LoadMoreListView
        height="11rem"
        isTabsPage
        requestFunc={queryList}
        renderRow={renderRow}
        requestParams={{
          abc: '123',
          token: 'alita',
          pageSize: 10,
          offset: 0,
        }}
      />
      <div style={{ fontSize: '1000px' }}>123123</div>
    </div>
  );
};

export default connect(({ list }: { list: ListModelState }) => ({ list }))(
  ListPage,
);
