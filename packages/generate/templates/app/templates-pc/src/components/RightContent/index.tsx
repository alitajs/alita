import React from 'react';
import Avatar from '../AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import SelectLang, { LanguageItem } from '../SelectLang';
import styles from './index.less';
import NoticeIconView, { NoticeItem } from '../NoticeIconView';

export type SiderTheme = 'light' | 'dark';
interface SearchDataItem {
  label: Element | JSX.Element;
  value: string;
}
export interface RightContentProps {
  theme?: SiderTheme;
  layout?: 'sidemenu' | 'topmenu';
  language?: LanguageItem[];
  headSearchData?: SearchDataItem[];
  currentUser?: {};
  notices?: NoticeItem[];
}

const RightContent: React.SFC<RightContentProps> = (props) => {
  const {
    theme = 'dark',
    layout = 'sidemenu',
    language,
    headSearchData,
    currentUser = {},
    notices = [],
  } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="umi ui"
        options={headSearchData}
        // onSearch={value => {
        //   //console.log('input', value);
        // }}
      />
      <NoticeIconView notices={notices} />
      <Avatar currentUser={currentUser} />
      <SelectLang className={styles.action} language={language} />
    </div>
  );
};

export default RightContent;
