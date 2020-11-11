import React from 'react';
// @ts-ignore
import allIcons from './icons';

export interface MenuDataItem {
  children?: MenuDataItem[];
  routes?: MenuDataItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  locale?: string;
  name?: string;
  key?: string;
  path?: string;
  [key: string]: any;
}
function toHump(name: string) {
  return name.replace(/\-(\w)/g, function(all, letter) {
    return letter.toUpperCase();
  });
}

function formatter(data: MenuDataItem[]): MenuDataItem[] {
  if (!Array.isArray(data)) {
    return data;
  }
  (data || []).forEach((item = { path: '/' }) => {
    // 兼容旧的写法 menu:{icon:""}
    const icon = item.icon ? item.icon : item.menu ? item.menu.icon : '';
    if (icon && typeof icon === "string") {
      const v4IconName = toHump(icon.replace(icon[0], icon[0].toUpperCase()));
      const NewIcon = allIcons[icon] || allIcons[`${v4IconName}Outlined`];
      if (NewIcon) {
        try {
          if (item.icon)
            item.icon = React.createElement(NewIcon);
          if (item.menu)
            item.menu.icon = React.createElement(NewIcon);
        } catch (error) {
          console.log(error);
        }
      }
    }
    if (item.routes || item.children) {
      const children = formatter(item.routes || item.children);
      // Reduce memory usage
      item.children = children;
    }
  });
  return data;
}

export function patchRoutes({ routes }) {
  formatter(routes);
}
