import React from 'react';

// TODO: 更合理的创建 key 值
const createKey = (item: any, index: number) => {
  if (item?.id) return item.id;
  if (item?.key) return item.key;
  return index;
};

interface ForProps {
  each: any[];
  fallback?: React.ReactElement;
  children: (item: any, index: number) => React.ReactElement;
}
/**
 * creates a list elements from a list
 *
 * it receives a map function as its child that receives a list element and an accessor with the index and returns a JSX-Element; if the list is empty, an optional fallback is returned:
 * ```typescript
 * <For each={items} fallback={<div>No items</div>}>
 *   {(item, index) => <div data-index={index()}>{item}</div>}
 * </For>
 * ```
 */
const For: React.FC<ForProps> = (props) => {
  const { each = [], fallback, children } = props;
  if (each.length === 0 && fallback) return fallback;
  return (
    <>
      {each?.map((i, index) => {
        const child = children(i, createKey(i, index));
        if (child.key) return child;
        // 如果忘记写 key ，就帮他写一下。
        return React.cloneElement(child, {
          key: child.key || index,
          ['data-key']: child.key || index,
        });
      })}
    </>
  );
};

export default For;
