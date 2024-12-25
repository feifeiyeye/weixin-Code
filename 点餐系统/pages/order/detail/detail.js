// pages/order/detail/detail.js
const app = getApp();

Page({
  data: {
    orderInfo: {
      code: '',         // 取餐号
      comment: '',      // 备注
      sn: '',          // 订单号码
      create_time: '', // 下单时间
      pay_time: '',    // 付款时间
      taken_time: '',  // 取餐时间
      is_taken: false, // 是否已取餐
      foods: [],       // 订单商品
      price: 0,        // 订单总价
      promotion: 0     // 优惠金额
    },
    loading: true,     // 加载状态
    error: null       // 错误信息
  },

  onLoad(options) {
    this.loadOrderDetail(options.order_id)
  },

  // 加载订单详情
  async loadOrderDetail(orderId) {
    if (!orderId) {
      this.showError('订单ID不能为空')
      return
    }

    try {
      wx.showLoading({ title: '努力加载中' })
      const data = await app.fetch('/food/order', { id: orderId })
      
      this.setData({
        orderInfo: {
          ...data,
          foods: data.order_food || []
        },
        loading: false,
        error: null
      })
    } catch (err) {
      this.showError('加载失败，请重试')
    } finally {
      wx.hideLoading()
    }
  },

  // 显示错误信息
  showError(message) {
    this.setData({
      error: message,
      loading: false
    })
  },

  // 重试加载
  retry() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const options = currentPage.options
    this.loadOrderDetail(options.order_id)
  },

  // 返回订单列表
  onUnload() {
    wx.reLaunch({
      url: '/pages/order/list/list'
    })
  },

  // 检查是否有优惠
  hasPromotion() {
    return this.data.orderInfo.promotion > 0
  }
})