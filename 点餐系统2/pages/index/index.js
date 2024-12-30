// index.js
const app = getApp();

Page({
  data: {
    swiper: [], // 轮播图数据
    ad: '',     // 广告图片
    category: [] // 分类图片
  },

  onLoad: function () {
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
      });
    };

    // 确保在用户登录后再加载数据
    if (app.userLoginReady) {
      callback();
    } else {
      app.userLoginReadyCallback = callback;
    }
  },

  // 点击开启点餐按钮
  start: function () {
    wx.navigateTo({
      url: '/pages/list/list'
    });
  }
});
