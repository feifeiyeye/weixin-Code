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

是否需要补充其他内容？