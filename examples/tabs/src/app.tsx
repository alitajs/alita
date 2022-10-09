import { Tabs } from 'antd';

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

export const tabsLayout = {
  local: {
    '/': '首页',
    '/users': '用户',
    '/foo': '其他',
  },
};

// async function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
// export async function tabsLayout() {
//   await delay(500);
//   return {local:{
//     '/':'首页',
//     '/users':'用户',
//     '/foo':'其他'
//   }};
// }

// export const getCustomTabs = () => {
//   return ({
//     isKeep,
//     keepElements,
//     navigate,
//     dropByCacheKey,
//     local,
//     activeKey,
//   }: any) => {
//     return (
//       <div className="rumtime-keep-alive-tabs-layout" hidden={!isKeep}>
//         <Tabs
//           hideAdd
//           onChange={(key: string) => {
//             navigate(key);
//           }}
//           activeKey={activeKey}
//           type="editable-card"
//           onEdit={(targetKey: string) => {
//             let newActiveKey = activeKey;
//             let lastIndex = -1;
//             const newPanel = Object.keys(keepElements.current);
//             for (let i = 0; i < newPanel.length; i++) {
//               if (newPanel[i] === targetKey) {
//                 lastIndex = i - 1;
//               }
//             }
//             const newPanes = newPanel.filter((pane) => pane !== targetKey);
//             if (newPanes.length && newActiveKey === targetKey) {
//               if (lastIndex >= 0) {
//                 newActiveKey = newPanes[lastIndex];
//               } else {
//                 newActiveKey = newPanes[0];
//               }
//             }
//             if (lastIndex === -1 && targetKey === location.pathname) {
//               message.info('至少要保留一个窗口');
//             } else {
//               dropByCacheKey(targetKey);
//               if (newActiveKey !== location.pathname) {
//                 navigate(newActiveKey);
//               }
//             }
//           }}
//         >
//           {Object.entries(keepElements.current).map(
//             ([pathname, element]: any) => (
//               <TabPane tab={`${local[pathname] || pathname}`} key={pathname} />
//             ),
//           )}
//         </Tabs>
//       </div>
//     );
//   };
// };
