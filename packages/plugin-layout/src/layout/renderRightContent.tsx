import React from 'react';
import { Avatar, Dropdown, Menu, Spin } from 'antd';
import { SelectLang } from 'umi';
import { LogoutOutlined } from '@ant-design/icons';
import './style.less';
import { ILayoutRuntimeConfig } from '../types/interface.d';

export default function renderRightContent(
  runtimeLayout: ILayoutRuntimeConfig,
  loading: boolean,
  initialState: any,
  setInitialState: any,
) {
  if (runtimeLayout.rightRender) {
    return runtimeLayout.rightRender(
      initialState,
      setInitialState,
      runtimeLayout,
    );
  }

  const menu = (
    <Menu className="umi-plugin-layout-menu">
      <Menu.Item
        key="logout"
        onClick={() =>
          runtimeLayout.logout && runtimeLayout?.logout(initialState)
        }
      >
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  const avatar = (
    <span className="umi-plugin-layout-action">
      <Avatar
        size="small"
        className="umi-plugin-layout-avatar"
        src={
          (initialState && initialState.avatar) ||
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
        }
        alt="avatar"
      />
      <span className="umi-plugin-layout-name">
        {initialState && initialState.name}
      </span>
    </span>
  );

  if (loading) {
    return (
      <div className="umi-plugin-layout-right">
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      </div>
    );
  }

  return (
    initialState && (
      <div className="umi-plugin-layout-right anticon">
        {runtimeLayout.logout ? (
          <Dropdown
            overlay={menu}
            overlayClassName="umi-plugin-layout-container"
          >
            {avatar}
          </Dropdown>
        ) : (
          avatar
        )}
        {SelectLang && <SelectLang />}
      </div>
    )
  );
}
