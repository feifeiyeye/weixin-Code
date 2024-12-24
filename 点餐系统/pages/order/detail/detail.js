// pages/order/detail/detail.js
const app = getApp();
const fetch = app.fetch;

Page({
  data: {
    taken: false,     // 是否已取餐
    code: '',         // 取餐号
    comment: '',      // 备注
    sn: '',          // 订单号码
    create_time: '', // 下单时间
    pay_time: '',    // 付款时间
    taken_time: '',  // 取餐时间
    is_taken: false  // 是否已取餐
  },

  onLoad: function(options) {
    wx.showLoading({
      title: '努力加载中',
    });
    fetch('/food/order', { 
      id: options.order_id 
    }).then(data => {
      this.setData(data);
      wx.hideLoading();
    }, () => {
      this.onLoad(options);
    });
  },

  onUnload: function() {
    wx.reLaunch({
      url: '/pages/order/list/list',
    });
  }
});