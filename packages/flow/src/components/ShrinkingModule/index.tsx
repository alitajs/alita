import React from 'react';

interface ShrinkingModuleProps {
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
   * @description 布局排列方向
   * @default 'column'
   */
  flexDirection?: 'column' | 'row';
  /**
   * @description 内容滚动配置
   * @default 'hidden'
   */
  overflow?: string;
}

const ShrinkingModule: React.FC<ShrinkingModuleProps> = (props) => {
  const {
    backgroundColor = '',
    flexDirection = 'column',
    overflow = 'hidden',
    children,
    classname = '',
  } = props;
  const childs = React.Children.toArray(children);
  return (
    <div
      className={`${classname}`}
      style={{
        display: 'flex',
        flexShrink: 0,
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

export default ShrinkingModule;
