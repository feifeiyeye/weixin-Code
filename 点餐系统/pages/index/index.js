// index.js
const app = getApp();

Page({
  data: {
    swiper: [], // 轮播图数据
    ad: '', // 广告图
    category: [], // 分类图片
    loading: false,
    error: null
  },

  onLoad: function() {
    var callback = () => {
      wx.showLoading({
        title: '努力加载中',
        mask: true
      });

      app.fetch('/food/index').then(data => {
        wx.hideLoading();
        this.setData({
          swiper: data.img_swiper,
          ad: data.img_ad,
          category: data.img_category
        });
      }).catch(err => {
        this.setData({
          error: err.message || '加载失败'
        });
      });
    };

    if (app.userLoginReady) {
      callback();
    } else {
      app.userLoginReadyCallback = callback;
    }
  },

  // 跳转到菜单列表页
  start: function() {
    wx.navigateTo({
      url: '/pages/list/list'
    });
  }
});
