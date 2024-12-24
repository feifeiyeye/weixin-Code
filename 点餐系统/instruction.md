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