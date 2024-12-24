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