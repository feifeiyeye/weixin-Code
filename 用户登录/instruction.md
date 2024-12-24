一个微信小程序-用户登录
# “用户登录”小程序开发文档

## 1. 准备工作

在开发本案例前，需要先完成一些准备工作，主要包括创建项目、配置导航栏、复制素材和启动服务器。具体步骤如下。

### 1.1 创建项目

在微信开发者工具中创建一个新的微信小程序项目，项目名称为“用户登录”，模板选择“不使用模板”。

### 1.2 配置导航栏

在 `pages/index/index.json` 文件中配置页面导航栏，具体代码如下。

```json
{
  "navigationBarTitleText": "用户登录"
}
```

上述代码中配置了导航栏标题为“用户登录”。“用户登录”导航栏的效果如图 5-13 所示。

### 1.3 复制素材

从本书配套资源中找到本案例，复制以下素材到本项目中：

- `pages/index/index.wxss`文件，该文件中保存了本项目的页面样式素材。
- `images`文件夹，该文件夹保存了本项目所用的素材。

上述步骤操作完成后，“用户登录”微信小程序的目录结构如图 5-14 所示。

### 1.4 启动服务器

从本书配套资源中找到本案例的源代码，进入“服务器端”文件夹。该文件夹下的内容为 Node.js 本地 HTTP 服务器程序。打开代码文件，找到下列配置项，并填写您自己的 AppID 和 AppSecret：

```javascript
const wx = {
  appid: '填写自己的appid',
  secret: '填写自己的appsecret'
};
```

打开命令提示窗口，切换工作目录到“服务器端”目录下，然后执行如下命令，启动服务器。

```bash
node index.js
```

至此，准备工作已经全部完成。

---

## 2. 实现用户登录

### 2.1 定义全局数据

在 `app.js` 文件中，通过 `globalData` 定义全局数据：

```javascript
App({
  globalData: {
    token: null // 保存 token
  }
});
```

### 2.2 小程序启动时自动登录

在 `app.js` 中完善 `onLaunch` 函数，实现登录功能：

```javascript
onLaunch: function () {
  this.login();
},

login: function () {
  wx.login({
    success: res => {
      console.log('login code:', res.code);
      wx.request({
        url: 'http://127.0.0.1:3000/login',
        method: 'POST',
        data: { code: res.code },
        success: res => {
          console.log('token:', res.data.token);
          this.globalData.token = res.data.token;
          wx.setStorage({
            key: 'token',
            data: res.data.token
          });
        }
      });
    }
  });
}
```

上述代码使用 `wx.login` 获取登录凭证 `code`，并通过 `wx.request` 将 `code` 发送给服务器，获取并保存服务器返回的 `token`。

### 2.3 添加设置

在微信开发者工具的本地设置中，勾选“不校验合法域名、Web-view 业务域名、TLS 版本以及 HTTPS 证书”。

---

## 3. 检查用户是否已经登录

开发中，小程序已经保存过 `token`，在次启动时，需先检查 `token`：

```javascript
checkLogin: function (callback) {
  let token = this.globalData.token;

  if (!token) {
    token = wx.getStorageSync('token');
    if (token) {
      this.globalData.token = token;
    } else {
      callback({ is_login: false });
      return;
    }
  }

  wx.request({
    url: 'http://127.0.0.1:3000/checklogin',
    data: { token: token },
    success: res => {
      callback({ is_login: res.data.is_login });
    }
  });
},

onLaunch: function () {
  this.checkLogin(res => {
    console.log('is_login:', res.is_login);
    if (!res.is_login) {
      this.login();
    }
  });
}
```

---

## 4. 获取用户积分

在小程序页面中添加按钮，实现积分查询：

### 4.1 WXML 代码

```html
<button bindtap="credit">获取用户的积分</button>
```

### 4.2 JS 代码

```javascript
const app = getApp();

Page({
  credit: function () {
    wx.request({
      url: 'http://127.0.0.1:3000/credit',
      data: { token: app.globalData.token },
      success: res => {
        console.log(res.data);
      }
    });
  }
});
```

保存代码后，运行程序，点击按钮即可查看积分。

---

## 5. 获取用户头像和昵称

通过用户选择头像和输入昵称，实现相关功能：

### 5.1 WXML 代码

```html
<button class="avatar-wrapper" open-type="chooseAvatar" bindchooseavatar="onChooseAvatar">
  <image class="avatar" src="{{avatarUrl}}" />
</button>
<input type="text" class="nickname" placeholder="请输入昵称" />
```

### 5.2 JS 代码

```javascript
const defaultAvatar = '/images/avatar.png';

Page({
  data: {
    avatarUrl: defaultAvatar
  },

  onChooseAvatar: function (e) {
    console.log(e);
    const { avatarUrl } = e.detail;
    this.setData({ avatarUrl });
  }
});
```

保存代码后，运行程序，测试是否可以正确获取用户头像和昵称。

---

至此，“用户登录”微信小程序已经完成开发。

