以下是关于“点餐”微信小程序的项目初始化开发文档整理：

---

## 项目初始化开发文档

### 项目说明
本项目提供完整的项目源码，数据通过服务器端（PHP + MySQL 开发环境）获取，配套资源中包含环境搭建文档和接口文档供参考。

### 初始化步骤

#### 1. 创建项目
在微信开发者工具中创建新的微信小程序项目：
- **项目名称**：点餐
- **模板选择**：不使用模板

---

#### 2. 配置页面
在项目的 `app.json` 文件中，添加页面配置：
```json
"pages": [
  "pages/index/index",
  "pages/list/list",
  "pages/order/checkout/checkout",
  "pages/order/detail/detail",
  "pages/order/list/list",
  "pages/record/record"
]
```
**页面说明**：
- 商家首页：`pages/index/index`
- 菜单列表页：`pages/list/list`
- 订单确认页：`pages/order/checkout/checkout`
- 订单详情页：`pages/order/detail/detail`
- 订单列表页：`pages/order/list/list`
- 消费记录页：`pages/record/record`

---

#### 3. 配置导航栏
在 `app.json` 文件的 `window` 属性中，设置导航栏样式：
```json
"window": {
  "backgroundTextStyle": "light",
  "navigationBarBackgroundColor": "#FF9C35",
  "navigationBarTitleText": "美食屋",
  "navigationBarTextStyle": "white"
}
```
**导航栏配置说明**：
- **下拉加载提示样式**：`backgroundTextStyle`
- **导航栏背景颜色**：`navigationBarBackgroundColor`
- **导航栏标题文字**：`navigationBarTitleText`
- **导航栏标题文字颜色**：`navigationBarTextStyle`

---

#### 4. 复制素材
从配套资源中找到以下文件并复制到项目中：
- **公共样式文件**：`app.wxss`
- **图片素材**：`images` 文件夹
- **购物车动画代码**：`utils/shopcartAnimate.js`
- **解析 Cookie 工具**：`utils/decodeCookie.js`

项目目录结构完成后如下图所示：
```
项目目录/
├── app.js
├── app.json
├── app.wxss
├── images/
├── pages/
│   ├── index/
│   ├── list/
│   ├── order/
│   ├── record/
├── utils/
    ├── shopcartAnimate.js
    ├── decodeCookie.js
```

---

#### 5. 配置标签栏
在 `app.json` 文件中，添加 `tabBar` 配置项：
```json
"tabBar": {
  "color": "#8a8a8a",
  "selectedColor": "#FF9C35",
  "borderStyle": "black",
  "list": [
    {
      "selectedIconPath": "images/home_s.png",
      "iconPath": "images/home.png",
      "pagePath": "pages/index/index",
      "text": "首页"
    },
    {
      "selectedIconPath": "images/order_s.png",
      "iconPath": "images/order.png",
      "pagePath": "pages/order/list/list",
      "text": "订单"
    },
    {
      "selectedIconPath": "images/user_s.png",
      "iconPath": "images/user.png",
      "pagePath": "pages/record/record",
      "text": "我的"
    }
  ]
}
```
**标签栏配置说明**：
- **默认颜色**：`color`
- **选中时颜色**：`selectedColor`
- **标签栏边框颜色**：`borderStyle`
- **标签项配置**：
  - `selectedIconPath`：选中时图标路径
  - `iconPath`：未选中时图标路径
  - `pagePath`：页面路径
  - `text`：按钮文字

---

### 效果展示
1. **页面顶部导航栏**  
   配置完成后，导航栏效果如图所示：
   - 背景颜色：橙色（`#FF9C35`）
   - 标题文字：白色

2. **页面底部标签栏**  
   标签栏效果如图所示：
   - 包含“首页”、“订单”、“我的”三个选项
   - 默认灰色，选中时橙色高亮

---

至此，“点餐”微信小程序项目初始化完成。
以下是关于 **【任务6-2】封装网络请求** 的开发文档整理：

---

## 【任务6-2】封装网络请求开发文档

### 任务背景
本项目中多个页面（如商家首页、菜单列表页、订单详情页等）需要从服务器获取数据。为了减少重复代码、提高代码的可复用性，将对网络请求的代码进行封装，统一处理请求和响应。

---

### 实现步骤

#### 1. 保存接口地址

在 `utils` 文件夹中新建 `config.js` 文件，用于存储公共的接口地址，方便后期维护和修改：
```javascript
module.exports = {
  baseUrl: 'http://127.0.0.1/api'
};
```
**说明**：
- `baseUrl` 是 URL 的公共部分，通过 `module.exports` 暴露供其他模块使用。

---

#### 2. 封装网络请求函数

在 `utils` 文件夹中新建 `fetch.js` 文件，封装网络请求逻辑：
```javascript
const config = require('./config.js');

module.exports = function (path, data, method) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.baseUrl + path,
      method: method,
      data: data,
      success: res => {
        if (res.statusCode !== 200) {
          fail('服务器异常', reject);
          return;
        }
        if (res.data.code === 0) {
          fail(res.data.msg, reject);
          return;
        }
        resolve(res.data);
      },
      fail: () => {
        fail('加载数据失败', reject);
      }
    });
  });
};

// 请求失败时弹出提示框
function fail(title, callback) {
  wx.hideLoading();
  wx.showModal({
    title: '提示',
    content: title,
    confirmText: '重试',
    success: res => {
      if (res.confirm) {
        callback();
      }
    }
  });
}
```
**说明**：
1. 使用 `Promise` 封装异步操作，统一处理请求成功与失败的逻辑。
2. 自动拼接 `baseUrl` 和接口路径 `path`。
3. `success` 回调中：
   - 判断 `statusCode` 是否为 `200`，若不是提示“服务器异常”。
   - 判断 `res.data.code` 是否为 `0`，若是提示错误信息。
4. 请求失败时，调用 `fail()` 方法，弹出提示框，并支持重试操作。

---

#### 3. 全局引入网络请求函数

在 `app.js` 中引入封装的 `fetch.js` 文件，便于全局使用：
```javascript
App({
  fetch: require('./utils/fetch.js')
});
```

---

#### 4. 调用网络请求函数

在需要使用网络请求的页面（如商家首页）中调用封装的函数：
```javascript
const app = getApp();
const fetch = app.fetch;

Page({
  onLoad: function () {
    wx.showLoading({
      title: '努力加载中',
      mask: true
    });

    fetch('/food/index', {}, 'GET').then(data => {
      wx.hideLoading();
      console.log(data);
    }, () => {
      wx.hideLoading();
      console.log('请求失败');
    });
  }
});
```
**说明**：
- 使用 `fetch(path, data, method)` 发起请求。
- 调用 `wx.showLoading()` 显示加载提示。
- 通过 `then()` 处理请求成功与失败：
  - 请求成功：隐藏加载提示，并输出返回的数据。
  - 请求失败：隐藏加载提示，并提示“请求失败”。

---

### 测试网络请求

#### 1. 请求成功
在微信开发者工具的本地设置中，勾选 **“不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书”** 选项。  
运行代码后，若接口 `/food/index` 返回数据正常，将在控制台打印数据。

#### 2. 请求失败
将 `utils/config.js` 文件中的 `baseUrl` 修改为无效地址（如 `http://localhost/api`），运行代码后，会弹出“加载数据失败”的提示框。

#### 3. 模拟重试操作
在 `utils/fetch.js` 文件中，使用 `fail()` 方法弹出提示框。点击提示框的“重试”按钮后，将重新发起网络请求。

---

### 请求成功的特殊处理

当 `wx.request()` 返回的 `statusCode` 为 `200` 时，也可能存在业务层错误。需根据返回的 `code` 值进一步判断：
- `code === 0`：表示业务操作失败，需要提示用户具体的错误信息。
- `code === 1`：表示业务操作成功，可以正常处理返回数据。

修改 `fetch.js` 文件中 `success` 回调函数：
```javascript
success: res => {
  if (res.statusCode !== 200) {
    fail('服务器异常', reject);
    return;
  }
  if (res.data.code === 0) {
    fail(res.data.msg, reject);
    return;
  }
  resolve(res.data);
}
```

---

### 效果展示

1. **请求成功**
   - 页面正常加载，数据渲染成功。
   - 控制台打印服务器返回的数据。

2. **请求失败**
   - 弹出提示框，提示“加载数据失败”。
   - 点击“重试”按钮后，重新发起请求。

3. **服务器异常**
   - 弹出提示框，提示“服务器异常”。

4. **业务层错误**
   - 弹出提示框，提示服务器返回的具体错误信息。

---

至此，网络请求封装功能已完成开发与测试。
以下是【任务6-3】用户登录的开发文档整理：

---

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
以下是【任务6-4】商家首页的开发文档整理：

---

# **任务6-4 商家首页开发文档**

## **任务分析**
商家首页由三个主要部分组成：
1. **轮播图区域**：显示多张轮播图片。
2. **中间区域**：包含“开启点餐之旅”按钮和最新消息展示。
3. **底部区域**：显示分类图片。

点击“开启点餐之旅”按钮可以跳转到菜单列表页。

---

## **任务实现**

### **1. 加载商家首页数据**

#### **步骤**
1. 在 `pages/index/index.js` 文件中通过服务器接口加载首页数据。
2. 数据包括轮播图 (`swiper`)、广告图 (`ad`)、分类图 (`category`)。
3. 确保网络请求在用户登录成功后再发起。

#### **代码实现**

##### **定义页面数据**
```javascript
data: {
  swiper: [],
  ad: '',
  category: []
}
```

##### **延迟加载数据**
在 `onLoad()` 中定义回调函数，并延迟执行网络请求：
```javascript
onLoad: function () {
  var callback = () => {
    wx.showLoading({
      title: '努力加载中',
      mask: true
    });

    this.fetch('/food/index').then(data => {
      wx.hideLoading();
      this.setData({
        swiper: data.img_swiper,
        ad: data.img_ad,
        category: data.img_category
      });
      console.log(this.data.swiper, this.data.ad, this.data.category);
    });
  };

  if (app.userLoginReady) {
    callback();
  } else {
    app.userLoginReadyCallback = callback;
  }
}
```

##### **用户登录回调处理**
在 `app.js` 中：
```javascript
userLoginReady: false,
userLoginReadyCallback: null,

onUserLoginReady: function () {
  wx.hideLoading();
  if (this.userLoginReadyCallback) {
    this.userLoginReadyCallback();
  }
  this.userLoginReady = true;
}
```

---

### **2. 实现商家首页的轮播图区域**

#### **步骤**
1. 使用 `swiper` 组件显示轮播图。
2. 设置组件的样式。

#### **代码实现**

##### **页面结构**
在 `pages/index/index.wxml`：
```html
<swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
  <block wx:for="{{swiper}}" wx:key="*this">
    <swiper-item>
      <image src="{{item}}" />
    </swiper-item>
  </block>
</swiper>
```

##### **页面样式**
在 `pages/index/index.wxss`：
```css
.swiper {
  height: 350rpx;
}

.swiper image {
  width: 100%;
  height: 100%;
}
```

---

### **3. 实现商家首页的中间区域**

#### **步骤**
1. 开发“开启点餐之旅”按钮和最新消息展示。
2. 编写页面跳转逻辑。

#### **代码实现**

##### **页面结构**
在 `pages/index/index.wxml`：
```html
<view class="menu-bar">
  <view class="menu-block" bindtap="start">
    <view class="menu-start">开启点餐之旅→</view>
  </view>
</view>
<view class="ad-box">
  <image src="{{ad}}" class="ad-image" />
</view>
```

##### **页面样式**
在 `pages/index/index.wxss`：
```css
.menu-bar {
  display: flex;
  margin-top: 20rpx;
}

.menu-block {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.menu-start {
  text-align: center;
  font-size: 38rpx;
  color: #fff;
  padding: 16rpx 80rpx;
  background: #ff9c35;
  border-radius: 80rpx;
}

.ad-box {
  margin-top: 20rpx;
  width: 100%;
  text-align: center;
}

.ad-image {
  width: 710rpx;
  height: 336rpx;
}
```

##### **页面跳转**
在 `pages/index/index.js`：
```javascript
start: function () {
  wx.navigateTo({
    url: '/pages/list/list'
  });
}
```

---

### **4. 实现商家首页的底部区域**

#### **步骤**
1. 显示分类图，支持多行排列。
2. 设置分类图的样式。

#### **代码实现**

##### **页面结构**
在 `pages/index/index.wxml`：
```html
<view class="bottom-box">
  <view class="bottom-pic" wx:for="{{category}}" wx:key="index">
    <image src="{{item}}" class="bottom-image" />
  </view>
</view>
```

##### **页面样式**
在 `pages/index/index.wxss`：
```css
.bottom-box {
  margin: 20rpx 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20rpx;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.bottom-pic {
  width: 49%;
  display: inline-block;
}

.bottom-image {
  width: 100%;
  height: 170rpx;
}
```

---

## **最终效果**
1. 商家首页包含轮播图、中间区域和底部区域。
2. 数据动态加载，支持用户登录后自动刷新。
3. 页面效果完整，实现了设计图中的要求。

页面效果如图 6-8 所示。
整理完成的开发文档如下：

---

## 【任务6-5】菜单列表页开发文档

### **任务分析**
在商家首页点击“开启订餐之旅”按钮后跳转到菜单列表页。该页面分为以下区域：
1. **折扣信息区域**：显示商家折扣活动信息。
2. **菜单列表区域**：
   - **菜单栏区域**：左侧菜单分类。
   - **商品列表区域**：右侧展示具体商品。
3. **购物车区域**：因实现复杂，将在后续任务中讲解。

### **实现步骤**
#### 1. 加载菜单列表页数据
在 `pages/list/list.js` 文件中编写数据加载逻辑：
```javascript
const app = getApp();
const fetch = app.fetch;

Page({
  data: {
    foodList: [],    // 保存分类和商品信息
    promotion: {},   // 保存优惠券信息
  },
  onLoad: function () {
    wx.showLoading({ title: '努力加载中' });
    fetch('/food/list').then(data => {
      wx.hideLoading();
      this.setData({
        foodList: data.list,
        promotion: data.promotion[0],
      });
    }, () => {
      this.onLoad();
    });
  },
});
```
**说明**：
- `foodList`：用于保存菜单分类及商品信息。
- `promotion`：保存优惠信息，包括满减金额。
- 使用 `setData()` 方法将数据保存到 `data` 中。

---

#### 2. 实现折扣信息区域
##### **页面结构**
`pages/list/list.wxml` 文件：
```xml
<view class="discount">
  <text class="discount-txt">减</text>
  满{{promotion.full}}元减{{promotion.reduce}}元（在线支付专享）
</view>
```
##### **样式定义**
`pages/list/list.wxss` 文件：
```css
.discount {
  width: 100%;
  height: 70rpx;
  line-height: 70rpx;
  background: #fef9e6;
  font-size: 28rpx;
  text-align: center;
  color: #999;
}
.discount-txt {
  color: #fff;
  padding: 5rpx 10rpx;
  background: red;
  margin-right: 15rpx;
}
```

---

#### 3. 实现菜单列表区域
##### **整体区域**
###### **页面结构**
```xml
<view class="content">
  <!-- 左侧菜单栏 -->
  <scroll-view class="category" scroll-y>
    <view wx:for="{{foodList}}" wx:key="id" class="category-item">
      <view class="category-name">{{item.name}}</view>
    </view>
  </scroll-view>

  <!-- 右侧商品列表 -->
  <scroll-view class="food" scroll-y>
    <block wx:for="{{foodList}}" wx:key="id" wx:for-item="category">
      <view class="food-category">{{category.name}}</view>
      <view class="food-item" wx:for="{{category.food}}" wx:key="id" wx:for-item="food">
        <view class="food-item-pic">
          <image mode="widthFix" src="{{food.image_url}}" />
        </view>
        <view class="food-item-info">
          <view>{{food.name}}</view>
          <view class="food-item-price">{{priceFormat(food.price)}}</view>
        </view>
        <view class="food-item-opt">
          <i class="iconfont"></i>
        </view>
      </view>
    </block>
  </scroll-view>
</view>
```
###### **样式定义**
```css
.content {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.category {
  width: 202rpx;
  height: 100%;
  background: #fcfcfc;
}
.category-item {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
}
.food {
  flex: 1;
}
.food-category {
  font-size: 24rpx;
  background: #f3f4f6;
  padding: 10rpx;
  color: #ff9c35;
}
.food-item {
  display: flex;
  margin: 40rpx 20rpx;
}
.food-item-pic {
  width: 94rpx;
  height: 94rpx;
  margin-right: 20rpx;
}
.food-item-info {
  flex: 1;
  font-size: 30rpx;
}
.food-item-price {
  color: #f05a86;
  margin-top: 14rpx;
}
```
##### **金额处理**
在 `pages/list/list.wxml` 文件底部定义金额格式化函数：
```xml
<wxs module="priceFormat">
  module.exports = function (price) {
    return '￥' + parseFloat(price);
  };
</wxs>
```

---

#### 4. 实现左侧菜单点击滚动右侧商品列表
##### **点击菜单项**
`pages/list/list.js` 文件中：
```javascript
tapCategory: function (e) {
  const index = e.currentTarget.dataset.index;
  this.disableNextScroll = true;
  this.setData({
    activeIndex: index,
    tapIndex: index,
  });
},
```
##### **商品列表绑定滚动事件**
```xml
<scroll-view class="food" scroll-y scroll-into-view="category_{{tapIndex}}" scroll-with-animation bindscroll="onFoodScroll">
```

##### **滚动事件处理**
```javascript
onFoodScroll: function (e) {
  const scrollTop = e.detail.scrollTop;
  let activeIndex = 0;
  categoryPosition.forEach((item, i) => {
    if (scrollTop >= item) {
      activeIndex = i;
    }
  });
  if (activeIndex !== this.data.activeIndex) {
    this.setData({ activeIndex });
  }
},
```

##### **分类高度计算**
在 `onLoad` 方法中：
```javascript
const query = wx.createSelectorQuery();
query.select('.food').boundingClientRect(rect => {
  top = rect.top;
  height = rect.height;
});
query.selectAll('.food-category').boundingClientRect(res => {
  res.forEach(rect => {
    categoryPosition.push(rect.top - top - height / 3);
  });
});
query.exec();
```

---

#### 5. 实现右侧商品列表滚动激活左侧菜单项
通过对 `scrollTop` 值与 `categoryPosition` 中的高度对比，动态激活左侧菜单项。为防止点击左侧菜单项触发滚动，增加 `disableNextScroll` 属性进行控制。

---

### **页面效果**
完成以上步骤后，菜单列表页的页面效果如下：
1. 折扣信息区域显示折扣活动。
2. 点击左侧菜单项，右侧商品列表滚动到对应分类。
3. 滚动右侧商品列表时，左侧菜单项动态激活。

--- 
### 任务6-6：购物车电商项目开发文档

#### 任务分析
在电商项目中，购物车位于商品列表页面底部，拥有以下功能：
1. 当购物车内商品数量为0时，购物车图标为灰色且不可点击。
2. 当购物车中有商品时，图标右上角显示商品数量，并且图标变为可点击状态，点击后可展开购物车，显示商品信息，并支持数量的增加或减少。
3. 动态计算购物车内所有商品的总价。

#### 任务实现

##### 1. 实现底部购物车区域

**步骤1：定义初始数据**
在 `pages/list/list.js` 文件的 `data` 中定义初始数据：
```javascript
data: {
  cartPrice: 0,  // 购物车总价格
  cartNumber: 0, // 购物车总数量
}
```

**步骤2：编写底部购物车区域的页面结构**
在 `pages/list/list.wxml` 文件的菜单列表区域下方添加购物车区域的页面结构：
```xml
<view class="operate">
  <view class="operate-shopcart">
    <i class="iconfont operate-shopcart-icon {{ cartNumber > 0 ? 'operate-shopcart-icon-activity' : '' }}">
      <span wx:if="{{ cartNumber > 0 }}">{{ cartNumber }}</span>
    </i>
    <view class="operate-shopcart-empty" wx:if="{{ cartNumber == 0 }}">购物车是空的</view>
    <view class="operate-shopcart-price" wx:else>
      <block wx:if="{{ cartPrice >= promotion.k }}">
        <view>{{ priceFormat(cartPrice - promotion.v) }}</view>
        <text>{{ priceFormat(cartPrice) }}</text>
      </block>
      <view wx:else>{{ priceFormat(cartPrice) }}</view>
    </view>
  </view>
  <view class="operate-submit {{ cartNumber !== 0 ? 'operate-submit-activity' : '' }}">选好了</view>
</view>
```

**步骤3：编写购物车区域样式**
在 `pages/list/list.wxss` 中添加底部购物车区域样式：
```css
.operate {
  height: 110rpx;
  display: flex;
}
.operate-shopcart {
  display: flex;
  width: 74%;
  padding: 10rpx;
  background: #353535;
}
.operate-submit {
  width: 26%;
  font-size: 30rpx;
  background: #eee;
  color: #aaa;
  text-align: center;
  line-height: 110rpx;
}
.operate-submit-activity {
  background: #ff9c35;
  color: #fff;
}
```

**步骤4：编写购物车图标样式**
```css
.operate-shopcart-icon {
  font-size: 80rpx;
  color: #87888e;
  margin-left: 20rpx;
  position: relative;
}
.operate-shopcart-icon:before {
  content: "\e73c";
}
.operate-shopcart-icon-activity {
  color: #ff9c35;
}
```

**步骤5：编写购物车为空的样式**
```css
.operate-shopcart-empty {
  color: #a9a9a9;
  line-height: 58rpx;
  font-size: 30rpx;
  margin-left: 20rpx;
}
```

##### 2. 实现添加商品到购物车

**步骤1：定义购物车数据**
在 `pages/list/list.js` 中定义 `cartList` 属性保存购物车商品：
```javascript
cartList: [],
```

**步骤2：修改商品列表按钮，绑定 `addToCart` 事件**
在商品列表区域的按钮中绑定 `tap` 事件：
```xml
<i class="iconfont" data-category_index="{{ category_index }}" data-index="{{ index }}" bindtap="addToCart"></i>
```

**步骤3：实现 `addToCart` 函数**
```javascript
addToCart: function(e) {
  const index = e.currentTarget.dataset.index;
  const category_index = e.currentTarget.dataset.category_index;
  const food = this.data.foodList[category_index].food[index];
  const cartList = this.data.cartList;

  if (cartList[index]) {
    ++cartList[index].number;
  } else {
    cartList[index] = {
      id: food.id,
      name: food.name,
      price: parseFloat(food.price),
      number: 1,
    };
  }

  this.setData({
    cartList,
    cartPrice: this.data.cartPrice + cartList[index].price,
    cartNumber: this.data.cartNumber + 1
  });
}
```

**步骤4：编写商品数量样式**
```css
.operate-shopcart-icon > span {
  padding: 2rpx 14rpx;
  border-radius: 50%;
  background: red;
  color: white;
  font-size: 28rpx;
  position: absolute;
  top: 0px;
  right: -10rpx;
  text-align: center;
}
```

**步骤5：编写商品价格样式**
```css
.operate-shopcart-price {
  display: flex;
}
.operate-shopcart-price > view {
  font-size: 40rpx;
  line-height: 88rpx;
  margin-left: 25rpx;
  color: #fff;
}
.operate-shopcart-price > text {
  font-size: 24rpx;
  line-height: 92rpx;
  margin-left: 15rpx;
  color: #aaa;
  text-decoration: line-through;
}
```

##### 3. 实现小球动画效果

**步骤1：引入动画模块**
在 `pages/list/list.js` 的开头引入购物车动画模块：
```javascript
const shopcartAnimate = require(.../utils/shopcartAnimate.js);
```

**步骤2：获取节点信息**
在 `onLoad` 方法中获取购物车图标节点信息：
```javascript
onLoad: function() {
  this.shopcartAnimate = shopcartAnimate('.operate-shopcart-icon', this);
}
```

**步骤3：修改 `addToCart` 函数，添加动画**
```javascript
addToCart: function(e) {
  // 其他代码
  this.shopcartAnimate.start(e);
}
```

**步骤4：编写小球的页面结构**
```xml
<view class="operate">
  <view class="operate-shopcart-ball" hidden="{{ !cartBall.show }}" style="left: {{ cartBall.x }}px; top: {{ cartBall.y }}px;"></view>
</view>
```

**步骤5：编写小球样式**
```css
.operate-shopcart-ball {
  width: 36rpx;
  height: 36rpx;
  position: fixed;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  background: #ff9c35;
}
```

##### 4. 实现满减优惠信息区域

**步骤1：编写满减优惠信息的页面结构**
```xml
<view class="promotion">
  <label wx:if="{{ promotion.k - cartPrice > 0 }}">满 {{ promotion.k }} 元立减 {{ promotion.v }} 元，还差 {{ promotion.k - cartPrice }} 元</label>
  <label wx:else>已满 {{ promotion.k }} 元可减 {{ promotion.v }} 元</label>
</view>
```

**步骤2：编写满减优惠信息区域样式**
```css
.promotion {
  padding: 7rpx 0 9rpx;
  background: #ffcd9b;
  color: #fff7ec;
  font-size: 28rpx;
  text-align: center;
}
```

##### 5. 实现购物车界面区域

**步骤1：定义购物车显示状态**
在 `pages/list/list.js` 中定义 `showCart` 属性：
```javascript
showCart: false,
```

**步骤2：绑定购物车图标点击事件**
```xml
<view class="operate-shopcart" bindtap="showCartList"></view>
```

**步骤3：编写 `showCartList` 方法**
```javascript
showCartList: function() {
  if (this.data.cartNumber > 0) {
    this.setData({
      showCart: !this.data.showCart
    });
  }
}
```

**步骤4：编写购物车界面结构和样式**
在 `pages/list/list.wxml` 和 `pages/list/list.wxss` 文件中编写购物车界面的页面结构和样式，具体参考购物车商品列表区域的样式配置。

通过上述步骤，可以实现一个完整的购物车功能，包括添加商品、展示商品、数量修改、优惠展示、购物车展开和小球动画效果等功能。
### 任务6-7 订单确认页开发文档整理

#### 任务分析
在用户选择商品并点击“选好了”按钮后，系统跳转到订单确认页。在该页面，系统需要请求订单接口，获取商品订单数据并渲染订单列表。页面展示基本订单信息，并允许用户添加备注。页面右下角有一个“去支付”按钮，点击后跳转至订单详情页。以下是实现过程。

### 任务实现

#### 1. 跳转到订单确认页
1. **绑定事件**：在页面的 `wxml` 文件中，绑定“选好了”按钮的 `tap` 事件，触发跳转。
   ```xml
   <view class="submit" bindtap="order">选好了</view>
   ```

2. **实现跳转逻辑**：
   在 `js` 文件中添加 `order` 函数，发送 POST 请求给 `/food/order` 接口，传递商品 `id` 和数量，接口返回 `order_id`，并跳转到订单确认页面。
   ```javascript
   order: function() {
     if (this.data.cartNumber === 0) {
       return;
     }
     wx.showLoading({ title: '正在生成订单' });
     fetch('/food/order', {
       order: this.data.cartList
     }, 'POST').then(data => {
       wx.navigateTo({
         url: '/pages/order/checkout/checkout?order_id=' + data.order_id
       });
     }).catch(() => {
       this.order();
     });
   }
   ```

3. **配置订单确认页**：
   在 `checkout.json` 文件中，设置订单确认页的导航栏标题：
   ```json
   {
     "navigationBarTitleText": "订单确认"
   }
   ```

#### 2. 加载订单确认页数据
1. **获取订单数据**：在 `checkout.js` 文件中，通过 `onLoad` 方法请求订单数据并渲染。
   ```javascript
   onLoad: function(options) {
     wx.showLoading({ title: '努力加载中' });
     fetch('/food/order', { id: options.order_id }).then(data => {
       this.setData(data);
       wx.hideLoading();
     }).catch(() => {
       this.onLoad(options);
     });
   }
   ```

#### 3. 页面结构和样式
1. **页面结构**：在 `checkout.wxml` 文件中，编写页面结构，包括标题、订单信息、备注区域和支付区域。
   ```xml
   <view class="content">
     <!-- 标题 -->
     <view class="content-title">请确认您的订单</view>
     <!-- 订单信息 -->
     <view class="order"></view>
     <!-- 备注 -->
     <view class="content-comment"></view>
   </view>
   <!-- 支付 -->
   <view class="operate"></view>
   ```

2. **页面样式**：在 `checkout.wxss` 文件中，编写页面样式，使用 Flex 布局，设置各部分的样式。
   ```css
   .content {
     display: flex;
     flex-direction: column;
     height: 100%;
     background: #f8f8f8;
   }
   .content-title {
     height: 80rpx;
     line-height: 80rpx;
     font-size: 28rpx;
     background: white;
     padding: 0 10rpx;
   }
   ```

#### 4. 订单信息区域
1. **订单商品列表**：在 `checkout.wxml` 中使用 `wx:for` 渲染订单商品。
   ```xml
   <view class="order-item" wx:for="{{order_food}}" wx:key="id">
     <view class="order-item-left">
       <image class="order-item-image" mode="widthFix" src="{{item.image_url}}" />
       <view>
         <view class="order-item-name">{{item.name}}</view>
         <view class="order-item-number">x {{item.number}}</view>
       </view>
     </view>
     <view class="order-item-price">{{priceFormat(item.price * item.number)}}</view>
   </view>
   ```

2. **满减信息区域**：显示满减优惠，如果有的话。
   ```xml
   <view class="order-item" wx:if="{{checkPromotion(promotion)}}">
     <view class="order-item-left">
       <i class="order-promotion-icon">减</i> 满减优惠
     </view>
     <view class="order-promotion-price">-{{priceFormat(promotion)}}</view>
   </view>
   ```

3. **小计区域**：显示订单总价格。
   ```xml
   <view class="order-item">
     <view class="order-item-left">小计</view>
     <view class="order-total-price">{{priceFormat(price)}}</view>
   </view>
   ```

#### 5. 备注区域
1. **备注输入框**：在 `checkout.wxml` 中添加一个文本输入框，允许用户添加备注。
   ```xml
   <view class="content-comment">
     <label>备注</label>
     <textarea placeholder="如有其他要求，请输入备注" bindinput="inputComment"></textarea>
   </view>
   ```

2. **备注样式**：为备注区域设置样式。
   ```css
   .content-comment {
     padding: 10rpx 30rpx 20rpx;
     background: white;
     margin-top: 20rpx;
   }
   .content-comment > label {
     font-size: 32rpx;
     color: #a3a3a3;
   }
   .content-comment > textarea {
     width: 95%;
     font-size: 24rpx;
     background: #f2f2f2;
     padding: 20rpx;
     height: 160rpx;
     margin-top: 10rpx;
   }
   ```

3. **保存备注信息**：在 `checkout.js` 中，处理备注输入的事件。
   ```javascript
   inputComment: function(e) {
     this.comment = e.detail.value;
   }
   ```

#### 6. 支付区域
1. **支付按钮**：在 `checkout.wxml` 中添加一个支付按钮。
   ```xml
   <view class="operate">
     <view class="operate-info">合计: {{priceFormat(price)}}</view>
     <view class="operate-submit" bindtap="pay">去支付</view>
   </view>
   ```

2. **支付样式**：为支付区域设置样式。
   ```css
   .operate {
     height: 110rpx;
     display: flex;
   }
   .operate-info {
     width: 74%;
     background: #353535;
     color: #fff;
     line-height: 110rpx;
     padding-left: 40rpx;
   }
   .operate-submit {
     width: 26%;
     font-size: 30rpx;
     text-align: center;
     line-height: 110rpx;
     background: #ff9c35;
     color: #fff;
   }
   ```

3. **支付逻辑**：在 `checkout.js` 中添加 `pay` 函数，提交订单和支付请求。
   ```javascript
   pay: function() {
     var id = this.data.id;
     wx.showLoading({ title: '正在支付' });
     fetch('/food/order', {
       id: id,
       comment: this.comment
     }, 'POST').then(() => {
       return fetch('/food/pay', { id: id }, 'POST');
     }).then(() => {
       wx.hideLoading();
       wx.showToast({
         title: '支付成功',
         icon: 'success',
         duration: 2000,
         success: () => {
           wx.navigateTo({ url: '/pages/order/detail/detail?order_id=' + id });
         }
       });
     }).catch(() => {
       this.pay();
     });
   }
   ```

#### 7. 订单详情页配置
在 `detail.json` 文件中，配置订单详情页的导航栏标题。
```json
{
  "navigationBarTitleText": "订单详情"
}
```

---

### 总结
以上步骤详细描述了订单确认页的实现过程，包括页面跳转、数据加载、页面结构、样式设置、备注功能和支付功能等。
6-8### 开发文档：订单详情页

#### 任务分析
订单详情页是在用户确认商品信息后，点击“去支付”按钮跳转到的页面。该页面需要展示以下信息：
- 取餐号
- 订单详情
- 订单号码
- 下单时间
- 付款时间

#### 任务实现

##### 1. 加载订单详情页数据

在 `pages/order/detail.js` 文件中编写订单详情页的逻辑：

```javascript
const app = getApp();
const fetch = app.fetch;

Page({
  data: {},
  onLoad: function(options) {
    var id = options.order_id;
    wx.showLoading({
      title: '努力加载中',
    });
    fetch('/food/order', { id }).then(data => {
      this.setData(data);
      wx.hideLoading();
    }, () => {
      this.onLoad(options); // 如果请求失败，重新加载页面
    });
  },
  onUnload: function() {
    wx.reLaunch({
      url: '/pages/order/list/list', // 返回订单列表页面
    });
  }
});
```

- 第10-16行代码用于加载订单详情数据。
- 第18-21行代码用于处理返回按钮点击，跳转到订单列表页面，避免返回到订单确认页重新支付。

##### 2. 实现取餐信息区域

在 `pages/order/detail/detail.wxml` 文件中编写取餐信息区域的页面结构：

```xml
<view class="top">
  <view class="card" wx:if="{{taken}}">
    <view class="card-title">收餐号</view>
    <view class="card-content">
      <view class="card-info">
        <text class="card-code">{{code}}</text>
        <text class="card-info-r">正在精心制作中…</text>
      </view>
      <view class="card-comment" wx:if="{{comment}}">注: {{comment}}</view>
      <view class="card-tips">美食制作中，尽快为您服务</view>
    </view>
  </view>
</view>
```

- 第2-12行代码定义了取餐卡片区域，通过 `wx:if` 控制卡片显示状态。
- 第9行通过 `wx:if` 控制备注区域的显示。

在 `pages/order/detail/detail.wxss` 文件中添加取餐信息区域的样式：

```css
.card {
  margin: 20rpx auto;
  width: 85%;
  background: #fef9f4;
  display: flex;
  font-size: 30rpx;
}

.card-title {
  width: 28rpx;
  padding: 30rpx;
  background: #de5f4b;
  border-left: 1rpx solid #de5f4b;
  font-size: 28rpx;
  color: #fff;
  display: flex;
  align-items: center;
}

.card-content {
  flex: 1;
  margin-left: 50rpx;
}

.card-info {
  margin-top: 10rpx;
}

.card-code {
  font-size: 60rpx;
  margin-right: 40rpx;
}

.card-info-r {
  font-size: 24rpx;
  color: #ff9c35;
}

.card-comment {
  color: #de5f4b;
  font-weight: 600;
  margin-top: 5rpx;
}

.card-tips {
  color: #a2a1a0;
  margin: 10rpx 0 20rpx;
  font-size: 24rpx;
}
```

##### 3. 实现订单详情区域

复制 `pages/order/checkout/checkout.wxml` 文件中的订单信息区域结构，直接应用到 `pages/order/detail/detail.wxml` 中：

```xml
<view class="order">
  <!-- 订单详情区域 -->
</view>
```

相应的样式也可以从 `checkout.wxss` 复制到 `detail.wxss` 文件中。

##### 4. 实现订单信息区域

在 `pages/order/detail/detail.wxml` 文件中编写订单信息区域的页面结构：

```xml
<view class="list">
  <view>
    <text>订单号码</text>
    <view>{{sn}}</view>
  </view>
  <view>
    <text>下单时间</text>
    <view>{{create_time}}</view>
  </view>
  <view>
    <text>付款时间</text>
    <view>{{pay_time}}</view>
  </view>
  <view wx:if="{{is_taken}}">
    <text>取餐时间</text>
    <view>{{taken_time}}</view>
  </view>
  <view wx:if="{{is_taken}}">
    取餐号（{{code}}）您已取餐
  </view>
</view>
```

##### 样式（`pages/order/detail/detail.wxss`）

```css
.list {
  background: #fff;
  margin-top: 20rpx;
}

.list > view {
  font-size: 30rpx;
  color: #d1d1d1;
  padding: 20rpx;
  border-bottom: 1rpx #e3e3e3 solid;
  display: flex;
}

.list > view > view {
  color: black;
  margin-left: 20rpx;
}

.tips {
  width: 80%;
  text-align: center;
  margin: 20rpx auto 40rpx;
  padding: 12rpx 20rpx;
  background: #ff9c35;
  color: #fff;
  font-size: 36rpx;
}
```

- 第10行代码设置 `Flex` 布局，使订单号码、下单时间、付款时间区域的内部 `view` 元素横向排列。

#### 总结

通过以上步骤，完成了订单详情页的开发，页面效果如图6-23所示。
6-9### 订单列表页开发文档

#### **任务分析**
订单列表页展示用户的所有订单信息，包括订单时间、总价及取餐状态。功能详情：
1. **订单详情跳转**：点击“查看详情”按钮，跳转至订单详情页。
2. **页面入口**：
   - 底部标签栏的“订单”标签。
   - 订单支付成功后点击左上角返回按钮。
3. **页面效果**：图示参考图6-24。

---

### **任务实现**

#### 1. **加载订单列表页数据**

##### **封装数据请求方法**

在 `pages/order/list/list.js` 文件中封装 `loadData()` 方法：
```javascript
const app = getApp();
const fetch = app.fetch;

Page({
  data: {
    is_last: true,
    order: [],
    last_id: 0,
    row: 10,
  },

  loadData: function (options) {
    wx.showNavigationBarLoading();
    fetch('/food/orderlist', {
      last_id: options.last_id,
      row: this.data.row,
    }).then(data => {
      this.setData({
        order: [...this.data.order, ...data.list],
        is_last: data.list.length < this.data.row,
        last_id: data.last_id,
      });
      options.success(data);
    }).catch(() => {
      options.fail();
    }).finally(() => {
      wx.hideNavigationBarLoading();
    });
  }
});
```

##### **页面加载数据**
在 `onLoad()` 函数中调用 `loadData()` 方法：
```javascript
onLoad: function () {
  wx.showLoading({ title: '加载中...' });
  this.loadData({
    last_id: 0,
    success: data => {
      this.setData({ order: data.list });
    },
    fail: () => this.onLoad(),
  });
  wx.hideLoading();
}
```

---

#### 2. **订单列表页的页面结构**

在 `pages/order/list/list.wxml` 文件中定义页面结构：
```xml
<view class="list">
  <view class="list-empty" wx:if="{{order.length === 0}}">您还没有下过订单</view>
  <view class="list-item" wx:for="{{order}}" wx:key="id">
    <view class="list-item-l">
      <view class="list-item-t">下单时间：{{formatDate(item.create_time)}}</view>
      <view class="list-item-name">{{item.first_food_name}}</view>
      <view>等{{item.number}}件商品 <text class="list-item-price">{{priceFormat(item.price)}}</text></view>
    </view>
    <view class="list-item-r">
      <view bindtap="detail" data-id="{{item.id}}" class="list-item-detail">查看详情</view>
      <view wx:if="{{item.is_taken}}" class="list-item-taken list-item-taken-yes">已取餐</view>
      <view wx:else class="list-item-taken list-item-taken-no">未取餐</view>
    </view>
  </view>
  <view class="list-item-last" wx:if="{{is_last}}">已经到底啦</view>
  <view class="list-item-last" wx:else>加载中...</view>
</view>
```

##### **辅助工具**
- **价格格式化模块：**
```xml
<wxs module="priceFormat">
module.exports = function(price) {
  return '￥' + parseFloat(price).toFixed(2);
};
</wxs>
```

- **时间格式化模块：**
```xml
<wxs module="formatDate">
module.exports = function(time) {
  var date = new Date(time);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
</wxs>
```

---

#### 3. **订单列表页样式**

在 `pages/order/list/list.wxss` 文件中定义样式：

- **列表样式**
```css
.list-item {
  display: flex;
  padding: 20rpx;
  border-bottom: 1rpx solid #ececec;
  color: #999;
  font-size: 26rpx;
}
.list-item:last-child {
  border-bottom: 0;
}
```

- **取餐状态样式**
```css
.list-item-taken {
  font-size: 24rpx;
  padding: 17rpx 10rpx;
}
.list-item-taken-yes {
  background: #d2d2d2;
  color: #999;
}
.list-item-taken-no {
  background: #ffd161;
  color: #fff;
}
```

- **空列表提示**
```css
.list-empty {
  margin-top: 80rpx;
  text-align: center;
}
```

---

#### 4. **下拉刷新功能**

- **开启下拉刷新**
在 `pages/order/list/list.json` 文件中添加：
```json
{
  "enablePullDownRefresh": true
}
```

- **下拉刷新逻辑**
```javascript
onPullDownRefresh: function () {
  wx.showLoading({ title: '加载中...' });
  this.loadData({
    last_id: 0,
    success: data => {
      this.setData({ order: data.list });
      wx.stopPullDownRefresh();
    },
    fail: () => this.onLoad(),
  });
  wx.hideLoading();
}
```

---

#### 5. **上拉触底加载**

- **逻辑实现**
```javascript
onReachBottom: function () {
  if (this.data.is_last) return;
  this.loadData({
    last_id: this.data.last_id,
    success: data => {
      this.setData({ order: [...this.data.order, ...data.list] });
    },
    fail: () => this.onReachBottom(),
  });
}
```

---

#### 6. **跳转订单详情页**

- **绑定事件**
在按钮中绑定点击事件：
```xml
<view bindtap="detail" data-id="{{item.id}}" class="list-item-detail">查看详情</view>
```

- **跳转逻辑**
```javascript
detail: function (e) {
  const id = e.currentTarget.dataset.id;
  wx.navigateTo({ url: `/pages/order/detail/detail?order_id=${id}` });
}
```

---

### **开发总结**
至此，订单列表页的主要功能，包括数据加载、页面渲染、上下拉交互以及跳转详情页，均已完成。页面效果与图6-24一致。
6-10## 开发文档：消费记录页

### 任务分析
消费记录页为标签页，点击底部标签栏中的“我的”标签项可以跳转到消费记录页。消费记录页用于展示用户的消费记录信息，包括用户的下单时间、订单总价格等。

页面效果如下图所示：

---

### 任务实现

#### 1. 加载消费记录页数据
在 `pages/record/record.js` 文件中编写消费记录页的页面逻辑，请求数据并渲染页面。

**代码实现**：
```javascript
const defaultAvatar = '/images/avatar.png';
const app = getApp();
const fetch = app.fetch;

Page({
  data: {
    avatarUrl: defaultAvatar
  },
  onLoad: function () {
    wx.showLoading({
      title: '努力加载中…'
    });
    fetch('/food/record').then(data => {
      wx.hideLoading();
      this.setData(data);
    });
  },
  onChooseAvatar: function (e) {
    const { avatarUrl } = e.detail;
    this.setData({ avatarUrl });
  }
});
```

#### 2. 实现消费记录页的页面结构
在 `pages/record/record.wxml` 文件中编写页面结构。

**代码实现**：
```xml
<view class="head">
  <button class="avatar-wrapper" open-type="chooseAvatar" bindchooseavatar="onChooseAvatar">
    <image class="avatar" src="{{ avatarUrl }}" />
  </button>
</view>

<view class="content">
  <view class="list-title">消费记录</view>
  <view class="list-item" wx:for="{{ list }}" wx:key="id">
    <view class="list-item-l">
      <view>消费</view>
      <view class="list-item-time">{{ item.payTime }}</view>
    </view>
    <view class="list-item-r">
      <text>{{ priceFormat(item.price) }}</text>
    </view>
  </view>
</view>

<wxs module="priceFormat">
module.exports = function(price) {
  return '￥' + parseFloat(price);
};
</wxs>
```

#### 3. 配置导航栏
在 `pages/record/record.json` 文件中配置导航栏。

**代码实现**：
```json
{
  "navigationBarTitleText": "消费记录"
}
```

#### 4. 实现消费记录页的页面样式
在 `pages/record/record.wxss` 文件中编写页面样式。

**头部区域样式**：
```css
page {
  background-color: #f8f8f8;
  font-size: 32rpx;
}

.head {
  width: 100%;
  background-color: #7982a3;
  height: 400rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-wrapper {
  width: 160rpx;
  height: 160rpx;
  padding: 0;
  background: none;
  border-radius: 50%;
}

.avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
}
```

**列表区域样式**：
```css
.list-title {
  background-color: #fff;
  padding: 16rpx 0;
  text-align: center;
}

.list-item {
  display: flex;
  padding: 42rpx 20rpx;
  border-bottom: 1rpx solid #ececec;
}

.list-item-l {
  flex: 1;
}

.list-item-r {
  line-height: 76rpx;
}

.list-item-r > text {
  color: #f7982a;
  font-weight: 600;
  font-size: 32rpx;
}

.list-item-time {
  margin-top: 10rpx;
  font-size: 26rpx;
  color: #999;
}
```

#### 5. 获取头像
在 `pages/record/record.js` 文件中实现头像选择功能。

**代码实现**：
```javascript
onChooseAvatar: function (e) {
  const { avatarUrl } = e.detail;
  this.setData({ avatarUrl });
}
```

### 开发总结
完成上述代码后，消费记录页的功能和样式均已实现，最终页面效果如下图所示：
- 消费记录列表按时间和金额展示。
- 用户可以自定义头像。


