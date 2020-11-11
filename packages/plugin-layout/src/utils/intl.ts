import { getIntl, getLocale } from 'umi';
import zhCN from '../locale/zh-CN';
import enUS from '../locale/en-US';

export enum LOCALES {
  'zh-CN' = '中文',
  'en-US' = 'English',
}

export enum LOCALES_ICON {
  'zh-CN' = '🇨🇳',
  'en-US' = '🇺🇸',
}

export type ILocale = keyof typeof LOCALES;

/** 处理默认 UI 的国际化函数 */
export function formatMessage({
  id,
  value = {},
}: {
  id: string;
  value?: { [key: string]: any };
}) {
  const localeMessages: { [key: string]: string } =
    getLocale() === 'zh-CN' ? zhCN : enUS;

  if (!getIntl) {
    return localeMessages[id] || id;
  }
  const intl = getIntl();

  return intl.formatMessage({ id }, value) || localeMessages[id] || id;
}
