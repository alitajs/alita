import React, { useEffect } from 'react';
import { ConnectRC, GlobalModelState, connect, AccessLayout } from 'alita';
import { HeaderSearch, AvatarDropdown, SelectLang, NoticeIconView } from '@/components';
import { LanguageItem } from '@/components/SelectLang';
import { NoticeItem } from '@/components/NoticeIconView';
import logo from '../assets/logo.png';
import styles from './index.less';

const headSearchDataList = [
  {
    label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
    value: 'umi ui',
  },
  {
    label: <a href="next.ant.design">Ant Design</a>,
    value: 'Ant Design',
  },
  {
    label: <a href="https://protable.ant.design/">Pro Table</a>,
    value: 'Pro Table',
  },
  {
    label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
    value: 'Pro Layout',
  },
];
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
  notices?: NoticeItem[];
}

const RightContent: React.SFC<RightContentProps> = (props) => {
  const { theme = 'dark', layout = 'sidemenu', language, headSearchData, notices = [] } = props;
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
      <AvatarDropdown
        currentUser={{
          name: 'Serati Ma',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          userid: '00000001',
        }}
      />
      <SelectLang className={styles.action} language={language} />
    </div>
  );
};
interface PageProps {
  global: GlobalModelState;
}

const BasicLayout: ConnectRC<PageProps> = ({ dispatch, global, ...other }) => {
  const { menu } = global;
  useEffect(() => {
    dispatch!({
      type: 'global/menu',
    });
    dispatch!({
      type: 'global/fetchNotices',
    });
  }, []);

  const language = [
    {
      key: 'zh-CN',
      label: '简体中文',
      icon: '🇨🇳',
    },
    {
      key: 'en-US',
      label: 'English',
      icon: '🇺🇸',
    },
  ];
  const { notices } = global;
  return (
    <AccessLayout
      title="Demo"
      initState={{
        currentUser: {
          access: 'admin',
        },
      }}
      logo={logo}
      menuData={menu}
      rightContentRender={() => (
        <RightContent headSearchData={headSearchDataList} language={language} notices={notices} />
      )}
      {...other}
    ></AccessLayout>
  );
};

export default connect(({ global }: { global: GlobalModelState }) => ({
  global,
  notices: global.notices,
}))(BasicLayout);
