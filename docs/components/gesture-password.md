---
title: '手势密码'
---

# Gesture Password (手势密码)

<img height="300" src="https://user-images.githubusercontent.com/11746742/68995608-735b4a00-08ca-11ea-8402-2d5229beaceb.png"></img>

## install

```bash
// npm
npm install @alitajs/gesture-password-react --save

// yarn
yarn add @alitajs/gesture-password-react
```

## usage

```ts
import React from 'react';
import GesturePassword from '@alitajs/gesture-password-react';

export default () => {
  const config = {
    width: 375,
    height: 300,
    onChange: (data: any) => console.log(data), // get gesture password
  };

  return <GesturePassword {...config} />;
};
```
