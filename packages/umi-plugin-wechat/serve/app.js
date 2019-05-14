const express = require('express'); //express 框架
const Wechat = require('./wechat/wechat');
const config = require('./config');//引入配置文件

const app = express();//实例express框架

const wechatApp = new Wechat(config); //实例wechat 模块

//用于处理所有进入 3000 端口 get 的连接请求
app.get('/wechat', (req, res) => {
  wechatApp.auth(req, res);
});

//用于处理所有进入 3000 端口 post 的连接请求
app.post('/', (req, res) => {
  wechatApp.handleMsg(req, res);
});

//用于请求获取 access_token
app.get('/getAccessToken', (req, res) => {
  wechatApp.getAccessToken().then((data) => {
    res.send(data);
  });
});

//监听3000端口
app.listen(3000);
