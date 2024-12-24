// pages/order/checkout/checkout.js
const app = getApp();

Page({
  data: {
    order_food: [], // 订单商品列表
    price: 0,      // 订单总价
    promotion: 0,  // 优惠金额
    id: ''         // 订单ID
  },

  comment: '', // 用户备注

  onLoad: function(options) {
    wx.showLoading({ title: '努力加载中' });
    app.fetch('/food/order', { 
      id: options.order_id 
    }).then(data => {
      this.setData({
        order_food: data.order_food,
        price: data.price,
        promotion: data.promotion,
        id: options.order_id
      });
      wx.hideLoading();
    }).catch(() => {
      this.onLoad(options);
    });
  },

  inputComment: function(e) {
    this.comment = e.detail.value;
  },

  pay: function() {
    var id = this.data.id;
    wx.showLoading({ title: '正在支付' });
    app.fetch('/food/order', {
      id: id,
      comment: this.comment
    }, 'POST').then(() => {
      return app.fetch('/food/pay', { id: id }, 'POST');
    }).then(() => {
      wx.hideLoading();
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          wx.navigateTo({ 
            url: '/pages/order/detail/detail?order_id=' + id 
          });
        }
      });
    }).catch(() => {
      this.pay();
    });
  },

  checkPromotion: function(promotion) {
    return promotion > 0;
  }
});