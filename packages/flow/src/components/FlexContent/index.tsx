import React from 'react';
// import './index.less';

interface FlexContentProps {
  /**
   * @description 自定义样式
   * @default ''
   */
  classname?: string;
  /**
   * @description 背景颜色
   * @default ''
   */
  backgroundColor?: string;
  /**
   * @description 布局方向
   * @default 'column'
   */
  flexDirection?: 'column' | 'row';
  /**
   * @description 内容滚动配置
   * @default 'scroll'
   */
  overflow?: string;
}

const FlexContent: React.FC<FlexContentProps> = (props) => {
  const {
    backgroundColor = '',
    flexDirection = 'column',
    overflow = 'scroll',
    children,
    classname = '',
  } = props;
  const childs = React.Children.toArray(children);
  return (
    <div
      className={`${classname}`}
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor,
        flexDirection,
        overflow,
      }}
    >
      {!!childs &&
        childs.map((child: any, index: number) => {
          return React.cloneElement(child, { ...child.props, key: index });
        })}
    </div>
  );
};

export default FlexContent;
