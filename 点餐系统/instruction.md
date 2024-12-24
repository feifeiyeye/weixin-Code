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