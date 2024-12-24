## 开发文档：消费记录页

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

