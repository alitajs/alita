import {
  CloseOutlined,
  EllipsisOutlined,
  ReloadOutlined,
  UserOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu, Tabs } from 'antd';
import React from 'react';
import { useIntl } from 'umi';
const { TabPane } = Tabs;

export const request = {
  prefix: '/api',
  method: 'get',
  errorHandler: (error) => {
    // 集中处理错误
    console.log(11111111);
    console.log(error);
  },
};

export function tabsLayout() {
  return {
    local: {
      '/': '首页',
      '/users': '用户',
      '/foo': '其他',
    },
    icon: {
      '/users': <UserOutlined />,
    },
    size: 'large',
    onTabClick: (key: string) => {
      console.log(key);
    },
  };
}

export const getCustomTabs = () => {
  return ({
    isKeep,
    keepElements,
    navigate,
    dropByCacheKey,
    dropLeftTabs,
    dropRightTabs,
    dropOtherTabs,
    refreshTab,
    closeTab,
    local,
    icons,
    activeKey,
    tabProps,
    tabNameMap,
  }: any) => {
    const intl = useIntl();
    const items = [
      {
        label: intl.formatMessage({
          id: `tabs.close.left`,
          defaultMessage: '关闭左侧',
        }),
        icon: <VerticalRightOutlined />,
        key: 'left',
      },
      {
        label: intl.formatMessage({
          id: `tabs.close.right`,
          defaultMessage: '关闭右侧',
        }),
        icon: <VerticalLeftOutlined />,
        key: 'right',
      },
      {
        label: intl.formatMessage({
          id: `tabs.close.others`,
          defaultMessage: '关闭其他',
        }),
        icon: <CloseOutlined />,
        key: 'others',
      },
      {
        type: 'divider',
      },
      {
        label: intl.formatMessage({
          id: `tabs.refresh`,
          defaultMessage: '刷新',
        }),
        icon: <ReloadOutlined />,
        key: 'refresh',
      },
    ];

    const selectAction = ({ key }) => {
      switch (key) {
        case 'left':
          dropLeftTabs(activeKey);
          break;

        case 'right':
          dropRightTabs(activeKey);
          break;

        case 'others':
          dropOtherTabs(activeKey);
          break;

        case 'refresh':
          refreshTab(activeKey);
          break;

        default:
          break;
      }
    };

    return (
      <div
        className="runtime-keep-alive-tabs-layout"
        hidden={!isKeep}
        style={{ height: '40px', marginBottom: '12px' }}
      >
        <Tabs
          tabBarExtraContent={
            <div
              style={{
                position: 'fixed',
                right: 0,
                transform: 'translateY(-50%)',
              }}
            >
              <Dropdown
                overlay={<Menu items={items} onClick={selectAction} />}
                trigger={['click']}
              >
                <Button
                  size="small"
                  icon={<EllipsisOutlined />}
                  style={{ marginRight: 12 }}
                />
              </Dropdown>
            </div>
          }
          hideAdd
          onChange={(key: string) => {
            const path = key.split(':')[0];
            const { pathname, hash, search } =
              keepElements.current[path].location;
            navigate(`${pathname}${search}${hash}`);
          }}
          renderTabBar={(props, DefaultTabBar) => (
            <div
              style={{
                position: 'fixed',
                zIndex: 1,
                padding: 0,
                width: '100%',
                background: 'white',
              }}
            >
              <DefaultTabBar
                {...props}
                style={{
                  marginBottom: 0,
                }}
              />
            </div>
          )}
          activeKey={`${activeKey}::${tabNameMap[location.pathname]}`}
          type="editable-card"
          onEdit={(key: string) => {
            // 因为下方的 key 拼接了 tabNameMap[location.pathname]
            const targetKey = key.split('::')[0];
            closeTab(targetKey);
          }}
          {...tabProps}
        >
          {Object.entries(keepElements.current).map(
            ([pathname, { name, icon, closable, children, ...other }]: any) => {
              return (
                <TabPane
                  style={{
                    paddingTop: '20px',
                  }}
                  key={`${pathname}::${tabNameMap[pathname]}`}
                  tab={
                    <>
                      {icon}
                      {name}
                    </>
                  }
                  closable={
                    Object.entries(keepElements.current).length === 1
                      ? false
                      : closable
                  }
                  {...other}
                />
              );
            },
          )}
        </Tabs>
      </div>
    );
  };
};
