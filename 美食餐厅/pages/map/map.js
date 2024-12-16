const key = 'OQCBZ-I363A-M34KB-CJS4E-RY2N6-JVBC6'; 
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
const qqmapsdk = new QQMapWX({ key });

Page({
  data: {
    scale: 18,
    longitude: 0,
    latitude: 0,
    markers: [],
    mapCtx: null,
    searchStats: {
      total: 0,
      searching: false
    }
  },

  onLoad: function () {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
        this.getFood(res.longitude, res.latitude);
      },
      fail: err => {
        wx.showToast({
          title: '获取位置失败',
          icon: 'none'
        });
      }
    });
  },

  onReady: function () {
    this.setData({
      mapCtx: wx.createMapContext('myMap', this)
    });
  },

  getFood: function (longitude, latitude) {
    this.setData({
      'searchStats.searching': true,
      markers: []
    });

    qqmapsdk.search({
      keyword: '餐厅',
      location: { longitude, latitude },
      radius: 2000,
      page_size: 20,
      success: res => {
        if (!res.data || res.data.length === 0) {
          this.setData({
            'searchStats.searching': false,
            'searchStats.total': 0,
            markers: []
          });
          wx.showToast({
            title: '附近没有找到餐厅',
            icon: 'none'
          });
          return;
        }

        const newMarkers = res.data.map((item, index) => ({
          iconPath: '/images/food.png',
          id: index,
          latitude: item.location.lat,
          longitude: item.location.lng,
          width: 30,
          height: 30,
          title: item.title,
          address: item.address,
          distance: item._distance,
          callout: {
            content: item.title,
            padding: 10,
            borderRadius: 5,
            display: 'BYCLICK'
          }
        }));
        
        newMarkers.push({
          iconPath: '/images/center.png',
          id: -1,
          latitude,
          longitude,
          width: 15,
          height: 40
        });

        this.setData({
          markers: newMarkers,
          'searchStats.total': newMarkers.length - 1,
          'searchStats.searching': false
        });
      },
      fail: err => {
        console.error('搜索失败:', err);
        this.setData({
          'searchStats.searching': false,
          'searchStats.total': 0,
          markers: []
        });
        wx.showToast({
          title: '搜索餐厅失败',
          icon: 'none'
        });
      }
    });
  },

  regionChange: function (e) {
    if (e.type === 'end' && this.data.mapCtx) {
      this.data.mapCtx.getCenterLocation({
        success: res => {
          this.getFood(res.longitude, res.latitude);
        }
      });
    }
  },

  controlTap: function () {
    if (this.data.mapCtx) {
      this.data.mapCtx.moveToLocation();
    }
  },

  bannerTap: function () {
    wx.navigateTo({
      url: '/pages/coupon/coupon'
    });
  },

  markertap: function(e) {
    const marker = this.data.markers.find(m => m.id === e.markerId);
    if (marker && marker.title && marker.id !== -1) {
      wx.showActionSheet({
        itemList: ['查看详情', '导航到这里'],
        success: (res) => {
          if (res.tapIndex === 0) {
            wx.showModal({
              title: marker.title,
              content: `距离：${marker.distance}米\n地址：${marker.address}`,
              showCancel: false
            });
          } else if (res.tapIndex === 1) {
            wx.openLocation({
              latitude: marker.latitude,
              longitude: marker.longitude,
              name: marker.title,
              address: marker.address,
              scale: 18
            });
          }
        }
      });
    }
  }
}); 