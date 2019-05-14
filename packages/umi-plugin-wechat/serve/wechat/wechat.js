const crypto = require('crypto'); //引入加密模块
const https = require('https'); //引入 htts 模块
const util = require('util'); //引入 util 工具包
const fs = require('fs'); //引入 fs 模块
const urltil = require('url'); //引入 url 模块
const { parseString } = require('xml2js'); //引入xml2js包

const accessTokenJson = require('./access_token'); //引入本地存储的 access_token
const menus = require('./menus'); //引入微信菜单配置
const msg = require('./msg'); //引入消息处理模块
const CryptoGraphy = require('./cryptoGraphy'); //微信消息加解密模块


/**
 * 构建 WeChat 对象 即 js中 函数就是对象
 * @param {JSON} config 微信配置文件
 */
const WeChat = function (config) {
  //设置 WeChat 对象属性 config
  this.config = config;
  //设置 WeChat 对象属性 token
  this.token = config.token;
  //设置 WeChat 对象属性 appID
  this.appID = config.appID;
  //设置 WeChat 对象属性 appScrect
  this.appScrect = config.appScrect;
  //设置 WeChat 对象属性 apiDomain
  this.apiDomain = config.apiDomain;
  //设置 WeChat 对象属性 apiURL
  this.apiURL = config.apiURL;

  /**
   * 用于处理 https Get请求方法
   * @param {String} url 请求地址
   */
  this.requestGet = function (url) {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        const buffer = [];
        let result = "";
        //监听 data 事件
        res.on('data', (data) => {
          buffer.push(data);
        });
        //监听 数据传输完成事件
        res.on('end', () => {
          result = Buffer.concat(buffer).toString('utf-8');
          //将最后结果返回
          resolve(result);
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
  };

  /**
   * 用于处理 https Post请求方法
   * @param {String} url  请求地址
   * @param {JSON} data 提交的数据
   */
  this.requestPost = function (url, data) {
    return new Promise((resolve, reject) => {
      //解析 url 地址
      const urlData = urltil.parse(url);
      //设置 https.request  options 传入的参数对象
      const options = {
        //目标主机地址
        hostname: urlData.hostname,
        //目标地址
        path: urlData.path,
        //请求方法
        method: 'POST',
        //头部协议
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(data, 'utf-8'),
        },
      };
      const req = https.request(options, (res) => {
        const buffer = [];
        let result = '';
        //用于监听 data 事件 接收数据
        res.on('data', (data) => {
          buffer.push(data);
        });
        //用于监听 end 事件 完成数据的接收
        res.on('end', () => {
          result = Buffer.concat(buffer).toString('utf-8');
          resolve(result);
        });
      })
        //监听错误事件
        .on('error', (err) => {
          console.log(err);
          reject(err);
        });
      //传入数据
      req.write(data);
      req.end();
    });
  };
};

/**
 * 微信接入验证
 * @param {Request} req Request 对象
 * @param {Response} res Response 对象
 */
WeChat.prototype.auth = function (req, res) {
  const that = this;
  this.getAccessToken().then((data) => {
    //格式化请求连接
    const url = util.format(that.apiURL.createMenu, that.apiDomain, data);
    //使用 Post 请求创建微信菜单
    that.requestPost(url, JSON.stringify(menus)).then((data) => {
      //将结果打印
      console.log(data);
    });
  });

  //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
  const { signature } = req.query; const //微信加密签名
    { timestamp } = req.query; const //时间戳
      { nonce } = req.query; const //随机数
        { echostr } = req.query;//随机字符串

  //2.将token、timestamp、nonce三个参数进行字典序排序
  const array = [this.token, timestamp, nonce];
  array.sort();

  //3.将三个参数字符串拼接成一个字符串进行sha1加密
  const tempStr = array.join('');
  const hashCode = crypto.createHash('sha1'); //创建加密类型
  const resultCode = hashCode.update(tempStr, 'utf8').digest('hex'); //对传入的字符串进行加密

  //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  if (resultCode === signature) {
    res.send(echostr);
  } else {
    res.send('mismatch');
  }
};

/**
 * 获取微信 access_token
 */
WeChat.prototype.getAccessToken = function () {
  const that = this;
  return new Promise(((resolve, reject) => {
    //获取当前时间
    const currentTime = new Date().getTime();
    //格式化请求地址
    const url = util.format(that.apiURL.accessTokenApi, that.apiDomain, that.appID, that.appScrect);
    //判断 本地存储的 access_token 是否有效
    if (accessTokenJson.access_token === "" || accessTokenJson.expires_time < currentTime) {
      that.requestGet(url).then((data) => {
        const result = JSON.parse(data);
        if (data.indexOf("errcode") < 0) {
          accessTokenJson.access_token = result.access_token;
          // eslint-disable-next-line max-len
          accessTokenJson.expires_time = new Date().getTime() + (parseInt(result.expires_in, 10) - 200) * 1000;
          //更新本地存储的
          fs.writeFile('./wechat/access_token.json', JSON.stringify(accessTokenJson));
          //将获取后的 access_token 返回
          resolve(accessTokenJson.access_token);
        } else {
          //将错误返回
          resolve(result);
        }
      });
    } else {
      //将本地存储的 access_token 返回
      resolve(accessTokenJson.access_token);
    }
  }));
};

/**
 * 微信消息处理
 * @param {Request} req Request 对象
 * @param {Response} res Response 对象
 */
WeChat.prototype.handleMsg = function (req, res) {
  const buffer = [];
  const that = this;

  //实例微信消息加解密
  const cryptoGraphy = new CryptoGraphy(that.config, req);

  //监听 data 事件 用于接收数据
  req.on('data', (data) => {
    buffer.push(data);
  });
  //监听 end 事件 用于处理接收完成的数据
  req.on('end', () => {
    const msgXml = Buffer.concat(buffer).toString('utf-8');
    //解析xml
    parseString(msgXml, { explicitArray: false }, (err, result) => {
      if (!err) {
        result = result.xml;
        //判断消息加解密方式
        if (req.query.encrypt_type === 'aes') {
          //对加密数据解密
          result = cryptoGraphy.decryptMsg(result.Encrypt);
        }
        const toUser = result.ToUserName; //接收方微信
        const fromUser = result.FromUserName;//发送仿微信
        let reportMsg = ""; //声明回复消息的变量

        //判断消息类型
        if (result.MsgType.toLowerCase() === "event") {
          //判断事件类型
          // eslint-disable-next-line default-case
          switch (result.Event.toLowerCase()) {
            case 'subscribe':
              //回复消息
              // eslint-disable-next-line no-case-declarations
              let content = "欢迎关注 hvkcoder 公众号，一起斗图吧。回复以下数字：\n";
              content += "1.你是谁\n";
              content += "2.关于Node.js\n";
              content += "回复 “文章”  可以得到图文推送哦~\n";
              reportMsg = msg.txtMsg(fromUser, toUser, content);
              break;
            case 'click':
              // eslint-disable-next-line no-case-declarations
              const contentArr = [
                { Title: "Node.js 微信自定义菜单", Description: "使用Node.js实现自定义微信菜单", PicUrl: "http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast", Url: "http://blog.csdn.net/hvkcoder/article/details/72868520" },
                { Title: "Node.js access_token的获取、存储及更新", Description: "Node.js access_token的获取、存储及更新", PicUrl: "http://img.blog.csdn.net/20170528151333883?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast", Url: "http://blog.csdn.net/hvkcoder/article/details/72783631" },
                { Title: "Node.js 接入微信公众平台开发", Description: "Node.js 接入微信公众平台开发", PicUrl: "http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast", Url: "http://blog.csdn.net/hvkcoder/article/details/72765279" },
              ];
              //回复图文消息
              reportMsg = msg.graphicMsg(fromUser, toUser, contentArr);
              break;
          }
        } else {
          //判断消息类型为 文本消息
          // eslint-disable-next-line no-lonely-if
          if (result.MsgType.toLowerCase() === "text") {
            //根据消息内容返回消息信息
            switch (result.Content) {
              case '1':
                reportMsg = msg.txtMsg(fromUser, toUser, 'Hello ！我的英文名字叫 H-VK');
                break;
              case '2':
                reportMsg = msg.txtMsg(fromUser, toUser, 'Node.js是一个开放源代码、跨平台的JavaScript语言运行环境，采用Google开发的V8运行代码,使用事件驱动、非阻塞和异步输入输出模型等技术来提高性能，可优化应用程序的传输量和规模。这些技术通常用于数据密集的事实应用程序');
                break;
              case '文章':
                // eslint-disable-next-line no-case-declarations
                const contentArr = [
                  { Title: "Node.js 微信自定义菜单", Description: "使用Node.js实现自定义微信菜单", PicUrl: "http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast", Url: "http://blog.csdn.net/hvkcoder/article/details/72868520" },
                  { Title: "Node.js access_token的获取、存储及更新", Description: "Node.js access_token的获取、存储及更新", PicUrl: "http://img.blog.csdn.net/20170528151333883?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast", Url: "http://blog.csdn.net/hvkcoder/article/details/72783631" },
                  { Title: "Node.js 接入微信公众平台开发", Description: "Node.js 接入微信公众平台开发", PicUrl: "http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast", Url: "http://blog.csdn.net/hvkcoder/article/details/72765279" },
                ];
                //回复图文消息
                reportMsg = msg.graphicMsg(fromUser, toUser, contentArr);
                break;
              default:
                reportMsg = msg.txtMsg(fromUser, toUser, '没有这个选项哦');
                break;
            }
          }
        }
        //判断消息加解密方式，如果未加密则使用明文，对明文消息进行加密
        reportMsg = req.query.encrypt_type === 'aes' ? cryptoGraphy.encryptMsg(reportMsg) : reportMsg;
        //返回给微信服务器
        res.send(reportMsg);
      } else {
        //打印错误
        console.log(err);
      }
    });
  });
};

//暴露可供外部访问的接口
module.exports = WeChat;
