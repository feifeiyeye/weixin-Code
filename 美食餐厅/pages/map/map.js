const key = '	PMDBZ-SCFLW-IISRK-3VHQC-47WL2-RMFB2'; 
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
const qqmapsdk = new QQMapWX({ key });

Page({
  data: {
    scale: 18,
    longitude: 0,
    latitude: 0,
    markers: [],
    mapCtx: null
  },

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
  },

  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap');
  },

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
  },

  regionChange: function (e) {
    if (e.type === 'end') {
      this.mapCtx.getCenterLocation({
        success: res => {
          this.getFood(res.longitude, res.latitude);
        }
      });
    }
  },

  controlTap: function () {
    this.mapCtx.moveToLocation();
  },

  bannerTap: function () {
    wx.navigateTo({
      url: '/pages/coupon/coupon'
    });
  }
}) 