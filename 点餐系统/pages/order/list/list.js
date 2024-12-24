// pages/order/list/list.js
const app = getApp();
const fetch = app.fetch;

Page({
  data: {
    is_last: true,
    order: [],
    last_id: 0,
    row: 10,
  },

  onLoad: function () {
    wx.showLoading({ title: '加载中...' });
    this.loadData({
      last_id: 0,
      success: data => {
        this.setData({ order: data.list });
      },
      fail: () => this.onLoad(),
    });
    wx.hideLoading();
  },

  loadData: function (options) {
    wx.showNavigationBarLoading();
    fetch('/food/orderlist', {
      last_id: options.last_id,
      row: this.data.row,
    }).then(data => {
      this.setData({
        order: [...this.data.order, ...data.list],
        is_last: data.list.length < this.data.row,
        last_id: data.last_id,
      });
      options.success(data);
    }).catch(() => {
      options.fail();
    }).finally(() => {
      wx.hideNavigationBarLoading();
    });
  },

  onPullDownRefresh: function () {
    wx.showLoading({ title: '加载中...' });
    this.loadData({
      last_id: 0,
      success: data => {
        this.setData({ order: data.list });
        wx.stopPullDownRefresh();
      },
      fail: () => this.onLoad(),
    });
    wx.hideLoading();
  },

  onReachBottom: function () {
    if (this.data.is_last) return;
    this.loadData({
      last_id: this.data.last_id,
      success: data => {
        this.setData({ order: [...this.data.order, ...data.list] });
      },
      fail: () => this.onReachBottom(),
    });
  },

  detail: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/order/detail/detail?order_id=${id}` });
  }
});