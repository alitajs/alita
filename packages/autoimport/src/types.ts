export interface ILib {
  // 通常是包名
  importFrom: string;
  // 成员列表
  members?: string[];
  // 如有配置，用 obj.prop 的方式使用，比如 techui
  withObj?: string;
  // 是否是 import * as xx from 'xx'; 的方式
  namespaceImport?: string;
  // 是否是 import xx from 'xx'; 的方式
  defaultImport?: string;
}

export interface IOpts {
  withObjs: Record<string, any>;
  identifierToLib: Record<string, string>;
  defaultToLib: Record<string, string>;
  namespaceToLib: Record<string, string>;
}
