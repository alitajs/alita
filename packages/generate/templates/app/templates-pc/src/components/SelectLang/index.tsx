import { GlobalOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { getLocale, setLocale } from 'umi';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export interface LanguageItem {
  label: string;
  icon: string;
  key: string;
}
interface SelectLangProps {
  className?: string;
  language?: LanguageItem[];
}

const SelectLang: React.FC<SelectLangProps> = (props) => {
  const defaultLanguage = [
    {
      key: 'zh-CN',
      label: '简体中文',
      icon: '🇨🇳',
    },
    {
      key: 'zh-TW',
      label: '繁体中文',
      icon: '🇭🇰',
    },
    {
      key: 'en-US',
      label: 'English',
      icon: '🇺🇸',
    },
    {
      key: 'pt-BR',
      label: 'Português',
      icon: '🇧🇷',
    },
  ];
  const { className, language = defaultLanguage } = props;
  const selectedLang = getLocale();

  const changeLang = ({ key }: ClickParam): void => setLocale(key);

  const langMenu = (
    <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
      {language.map((locale) => (
        <Menu.Item key={locale.key}>
          <span role="img" aria-label={locale.label}>
            {locale.icon}
          </span>{' '}
          {locale.label}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight">
      <span className={classNames(styles.dropDown, className)}>
        <GlobalOutlined title="语言" />
      </span>
    </HeaderDropdown>
  );
};

export default SelectLang;
