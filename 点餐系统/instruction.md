### 订单列表页开发文档

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