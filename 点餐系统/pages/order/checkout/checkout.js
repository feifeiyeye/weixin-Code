// pages/order/checkout/checkout.js
const app = getApp()
const fetch = app.fetch

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 订单数据将从服务器获取
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '努力加载中'
    })

    fetch('/food/order', {
      id: options.order_id
    }).then(data => {
      this.setData(data)
      wx.hideLoading()
    }, () => {
      this.onLoad(options) // 失败时重试
    })
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

  // 备注信息
  comment: '',

  // 处理备注输入
  inputComment: function(e) {
    this.comment = e.detail.value
  },

  // 处理支付
  pay: function() {
    const id = this.data.id
    
    wx.showLoading({
      title: '正在支付'
    })

    // 先更新订单备注
    fetch('/food/order', {
      id: id,
      comment: this.comment
    }, 'POST')
    .then(() => {
      // 修改支付接口参数格式
      return fetch('/food/pay', {
        id: id  // 使用对象格式传递参数
      }, 'POST')
    })
    .then(() => {
      wx.hideLoading()
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 2000,
        complete: () => {  // 使用 complete 替代 success
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/order/detail/detail?order_id=' + id
            })
          }, 2000)  // 等待 toast 显示完成后再跳转
        }
      })
    })
    .catch((error) => {
      wx.hideLoading()
      wx.showToast({
        title: '支付失败',
        icon: 'error',
        duration: 2000
      })
      console.error('支付失败:', error)
    })
  }
})