### 开发文档：订单详情页

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