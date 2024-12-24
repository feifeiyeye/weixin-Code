以下是【任务6-3】用户登录的开发文档整理：

---

# **任务6-3 用户登录开发文档**

## **任务分析**
用户登录是对用户身份的校验，用以申请权限、调取用户数据。在本项目中：
1. 用户需登录后才能下单、查看消费记录等。
2. 小程序启动时会自动调用 `wx.login()` 方法，将 `js_code` 发送到服务器以识别用户身份。
3. 服务器通过会话技术维持登录状态，会话在用户长时间未访问时关闭。
4. 为避免重复登录，可通过 `/user/checkLogin` 接口检查会话是否有效。

---

## **任务实现**

### **1. 判断登录状态**
#### **步骤**
在小程序启动时，通过 `/user/checkLogin` 接口判断是否处于登录状态。

#### **实现代码**
在 `app.js` 的 `onLaunch()` 函数中：
```javascript
onLaunch: function () {
  wx.showLoading({
    title: '登录中',
    mask: true
  });
  
  this.fetch('/user/checkLogin').then(data => {
    if (data.isLogin) {
      // 已登录
      this.onUserLoginReady();
    } else {
      // 未登录
      this.login({
        success: () => {
          this.onUserLoginReady();
        },
        fail: () => {
          this.onLaunch();
        }
      });
    }
  });
}
```

---

### **2. 执行登录操作**
#### **步骤**
1. 调用 `wx.login()` 方法获取用户登录凭证 `code`。
2. 使用 `code` 向服务器 `/user/login` 接口发送请求，校验用户身份。

#### **实现代码**
在 `app.js` 中实现 `login()` 方法和调用逻辑：

##### **定义 `login()` 方法**
```javascript
login: function (options) {
  wx.login({
    success: res => {
      this.fetch('/user/login', { js_code: res.code })
        .then(data => {
          if (data && data.isLogin) {
            options.success();
          } else {
            wx.hideLoading();
            wx.showModal({
              title: '登录失败（请检查服务器端配置）',
              confirmText: '重试',
              success: res => {
                if (res.confirm) {
                  options.fail();
                }
              }
            });
          }
        });
    }
  });
}
```

##### **修改 `onLaunch()` 未登录的代码**
```javascript
this.login({
  success: () => {
    this.onUserLoginReady();
  },
  fail: () => {
    this.onLaunch();
  }
});
```

---

### **3. 记住登录状态**
#### **步骤**
1. 服务器返回的 `PHPSESSID`（会话标识符）保存在客户端。
2. 每次请求时，将 `PHPSESSID` 通过 `Cookie` 附带发送到服务器。

#### **实现代码**
在 `utils/fetch.js` 文件中：
##### **读取缓存中的 Cookie**
```javascript
const decodeCookie = require('./decodeCookie.js');
var sess = wx.getStorageSync('PHPSESSID');
```

##### **在 `wx.request` 中保存 Cookie**
```javascript
success: res => {
  if (res.header['Set-Cookie'] !== undefined) {
    sess = decodeCookie(res.header['Set-Cookie'])['PHPSESSID'];
    wx.setStorageSync('PHPSESSID', sess);
  }
  // 原有代码...
}
```

##### **在请求头中附加 Cookie**
```javascript
header: {
  'Cookie': sess ? 'PHPSESSID=' + sess : ''
}
```

##### **通过保存的 Cookie 判断登录状态**
在 `app.js` 中：
```javascript
this.fetch('/user/checkLogin').then(data => {
  if (data.isLogin) {
    this.onUserLoginReady();
    console.log('通过保存的 Cookie 登录成功');
  }
});
```

---

### **4. 登录成功的回调处理**
#### **步骤**
在用户登录成功后隐藏加载提示并记录状态。

#### **实现代码**
##### **定义 `onUserLoginReady()` 方法**
```javascript
onUserLoginReady: function () {
  wx.hideLoading();
  console.log('已登录');
}
```

##### **修改 `onLaunch()` 登录成功的代码**
```javascript
if (data.isLogin) {
  this.onUserLoginReady();
}
```

---

## **总结**
1. 实现了用户登录状态判断、执行登录操作以及保存会话状态的功能。
2. 通过 `PHPSESSID` 实现自动登录和会话保持，减少用户操作。
3. 在代码中通过回调和逻辑处理确保登录状态的稳定性和用户体验。

用户可通过清缓存测试登录逻辑，确保功能正常运行。