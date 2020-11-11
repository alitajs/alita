import { IRoute } from 'umi';

interface Error {
  componentStack?: string;
  error?: string;
  [key: string]: any;
}

/**
 * 插件编译时配置
 */
export interface LayoutConfig {
  name?: string;
  logo?: string;
  theme?: string;
  locale?: any; // same with locale plugin
  showBreadcrumb?: boolean; // TODO 面包屑功能暂不支持
  layoutComponent?: Record<string, string>; // 自定义主题
}

/**
 * 插件运行时配置
 */
export interface ILayoutRuntimeConfig {
  /** 导航用户退出的逻辑 默认不做处理 */
  logout?: (initialState: any) => void;

  // TODO IMPORT initinfo  type from init plugin
  /** 自定义导航头右上角 ，有默认 UI, 接受 initialState & 修改 initialState 的方法 */
  rightRender?: (
    initialState: any,
    setInitialState: any,
    runtimeLayout: ILayoutRuntimeConfig,
  ) => React.ReactNode;

  errorBoundary?: {
    /** 发生错误后的回调（可做一些错误日志上报，打点等） */
    onError?: (error: Error, info: any) => void;
    /** 发生错误后展示的组件，接受 error */
    ErrorComponent?: (error: Error) => React.ReactElement<any>;
  };
}

export interface IRouteMenuConfig {
  /** 当前菜单名 */
  name: string;
  /** antd 的 icon name 和 url */
  icon?: string;
  /** 在菜单中隐藏他的子项 */
  hideChildren?: boolean;
  /** 默认为false 在菜单中只隐藏此项，子项往上提，仍旧展示 */
  flatMenu?: boolean;
  [key: string]: any;
}

export interface IRouteLayoutConfig {
  /** 默认 false */
  hideMenu?: boolean;
  /** 默认 false */
  hideNav?: boolean;
  /** 默认 false */
  hideFooter?: boolean;
  [key: string]: any;
}

/**
 * 路由配置
 */
export interface IBestAFSRoute extends IRoute {
  /** 权限：https://yuque.antfin-inc.com/bigfish/best_afs/nxuhgb */
  access?: string;

  /** 当前页面的面包屑是否隐藏 */
  showBreadcrumb?: boolean;

  /** 默认为 false，在菜单中隐藏此项包括子项 */
  menu?: false | IRouteMenuConfig;

  /** 默认为 true ，是否显示 Layout */
  layout?: boolean | IRouteLayoutConfig;
}

export interface TechMenuItem {
  title: string | React.ReactNode;
  icon: string;
  link: string | React.ReactNode;
  children?: TechMenuItem[];
  externalLink: boolean;
}
