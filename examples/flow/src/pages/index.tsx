import { FillContainer, FlexContent, ShrinkingModule } from '@alita/flow';
import React from 'react';
import './global.less';

/**
 * 生成一个随机数组 用来模拟图表数据变化
 * @param n 数组的长度
 * @param max 数组的最大值
 * @returns {Array} 一个指定长度的随机数组
 */
const getRandomArr = (n: number, max = 31) => {
  let maxNum = max;
  //大于数组长度时，取数组长度
  if (n > 31) n = 31;
  let number = [];
  while (n) {
    //随机数的选取方法31为所需的数组长度
    let num = Math.floor(Math.random() * maxNum) + 2;
    //数组查重的方法
    if (number.indexOf(num) < 0) {
      number.push(num);
      n--;
    }
  }
  return number;
};

const RainbowColor = [
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'purple',
];

const DemoPage: React.FC = () => {
  const renderAtr = getRandomArr(12);
  return (
    <FillContainer>
      <ShrinkingModule backgroundColor="blue">
        <div>header</div>
      </ShrinkingModule>
      <FlexContent>
        {renderAtr.map((num, index) => (
          <ShrinkingModule key={num} backgroundColor={RainbowColor[index % 7]}>
            <div>{RainbowColor[index % 7]}</div>
          </ShrinkingModule>
        ))}
      </FlexContent>
      <ShrinkingModule backgroundColor="red">
        <div>footer</div>
      </ShrinkingModule>
    </FillContainer>
  );
};

export default DemoPage;
