

---

## **开发文档：查看附近美食餐厅微信小程序**

---

### **1. 准备工作**

#### **1.1 创建项目**
在微信开发者工具中创建一个新的微信小程序项目：
- **项目名称**：查看附近美食餐厅  
- **模板**：不使用模板

#### **1.2 配置页面**
在 `app.json` 文件中添加页面配置：
```json
"pages": [
  "pages/map/map",
  "pages/coupon/coupon"
]
```

#### **1.3 配置导航栏**
为页面配置导航栏：

**页面：`pages/map/map.json`**
```json
{
  "navigationBarTitleText": "查看附近美食餐厅",
  "navigationBarBackgroundColor": "#d9362c",
  "navigationBarTextStyle": "white"
}
```

**页面：`pages/coupon/coupon.json`**
```json
{
  "navigationBarTitleText": "优惠券",
  "navigationBarBackgroundColor": "#d9362c",
  "navigationBarTextStyle": "white"
}
```

#### **1.4 复制素材**
从配套资源中复制以下素材到项目：
- **样式文件**：`pages/map/map.wxss` 和 `pages/coupon/coupon.wxss`
- **SDK文件夹**：`libs`，保存微信小程序 JavaScript SDK
- **图片素材文件夹**：`images`

项目目录结构完成后的效果如下图所示。

---

### **2. 获取初始数据**
在 `pages/map/map.js` 文件中初始化地图相关数据：
```javascript
const key = '填写自己申请的开发者密钥'; // 腾讯地图SDK密钥
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
const qqmapsdk = new QQMapWX({ key });

Page({
  data: {
    scale: 18,          // 地图缩放级别
    longitude: 0,       // 地图中心点经度
    latitude: 0,        // 地图中心点纬度
    markers: [],        // 标记点
    mapCtx: null        // MapContext 实例
  }
});
```

---

### **3. 在页面中显示地图**

#### **3.1 页面结构**
在 `pages/map/map.wxml` 中编写地图页面：
```xml
<map id="myMap" latitude="{{latitude}}" longitude="{{longitude}}" scale="{{scale}}" 
  markers="{{markers}}" show-location
  bindregionchange="regionChange" bindcontroltap="controlTap">
</map>

<view class="controls">
  <image class="banner" mode="widthFix" src="/images/banner.png" bindtap="bannerTap" />
  <image class="gps" src="/images/gps.png" bindtap="controlTap" />
</view>
```

#### **3.2 页面加载时获取当前位置**
在 `pages/map/map.js` 中的 `onLoad()` 函数实现：
```javascript
onLoad: function () {
  wx.getLocation({
    type: 'gcj02',
    success: res => {
      this.setData({
        longitude: res.longitude,
        latitude: res.latitude
      });
    }
  });
}
```

#### **3.3 获取地图实例**
在 `onReady()` 函数中获取 `MapContext`：
```javascript
onReady: function () {
  this.mapCtx = wx.createMapContext('myMap');
}
```

#### **3.4 声明地理位置权限**
在 `app.json` 文件中声明权限：
```json
"permission": {
  "scope.userLocation": {
    "desc": "你的位置信息将用于小程序位置接口的效果展示"
  }
}
```

---

### **4. 实现跳转到优惠券页面**

#### **4.1 编写跳转逻辑**
在 `pages/map/map.js` 文件中定义跳转函数：
```javascript
bannerTap: function () {
  wx.navigateTo({
    url: '/pages/coupon/coupon'
  });
}
```

#### **4.2 编写优惠券页面结构**
在 `pages/coupon/coupon.wxml` 中添加以下内容：
```xml
<view class="coupon">
  <image src="/images/couponone.png" />
</view>
<view class="coupon">
  <image src="/images/coupontwo.png" />
</view>
```

---

### **5. 实现查找附近美食餐厅功能**

#### **5.1 查找附近餐厅**
在 `pages/map/map.js` 中定义 `getFood()` 函数：
```javascript
getFood: function (longitude, latitude) {
  qqmapsdk.search({
    keyword: '餐厅',
    location: { longitude, latitude },
    success: res => {
      const markers = res.data.map((item, index) => ({
        iconPath: '/images/food.png',
        id: index,
        latitude: item.location.lat,
        longitude: item.location.lng,
        width: 30,
        height: 30
      }));
      markers.push({
        iconPath: '/images/center.png',
        id: res.data.length,
        latitude,
        longitude,
        width: 15,
        height: 40
      });
      this.setData({ markers });
    }
  });
}
```

#### **5.2 更新地图标记点**
在 `regionChange()` 函数中监听地图移动事件：
```javascript
regionChange: function (e) {
  if (e.type === 'end') {
    this.mapCtx.getCenterLocation({
      success: res => {
        this.getFood(res.longitude, res.latitude);
      }
    });
  }
}
```

#### **5.3 回到定位点**
实现 `controlTap()` 函数：
```javascript
controlTap: function () {
  this.mapCtx.moveToLocation();
}
```

---

### **6. 运行程序**
完成后，在地图上可以查看附近美食餐厅的标记点并实现跳转到优惠券页面。运行时需确保勾选 **“不校验合法域名”**。

至此，"查看附近美食餐厅" 微信小程序开发完成。