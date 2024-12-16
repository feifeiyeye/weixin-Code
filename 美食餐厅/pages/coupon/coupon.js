// pages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupons: [
      { id: 1, image: '/images/couponone.png' },
      { id: 2, image: '/images/coupontwo.png' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  useCoupon: function(e) {
    wx.showToast({
      title: '优惠券已领取',
      icon: 'success'
    });
  }
})