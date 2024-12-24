// index.js
const app = getApp();
const fetch = app.fetch;

Page({
  data: {
    // 页面数据
  },

  onLoad: function() {
    wx.showLoading({
      title: '努力加载中',
      mask: true
    });

    fetch('/food/index', {}, 'GET').then(data => {
      wx.hideLoading();
      console.log(data);
      this.setData({
        // 设置获取到的数据
      });
    }, () => {
      wx.hideLoading();
      console.log('请求失败');
    });
  }
});
