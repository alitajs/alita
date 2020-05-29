import React, { FC } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export interface CurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
}

export interface AvatarDropdownProps {
  currentUser?: CurrentUser;
  menuItemList?: React.ReactNode[];
  onMenuClick?: () => void;
  hideLogout?: boolean;
}
const AvatarDropdown: FC<AvatarDropdownProps> = ({
  currentUser,
  menuItemList = [],
  onMenuClick,
  hideLogout = false,
}) => {
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menuItemList.map((item) => item)}
      {!hideLogout && (
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      )}
    </Menu>
  );
  return currentUser && currentUser.name ? (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={styles.name}>{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  ) : (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );
};

export default AvatarDropdown;
