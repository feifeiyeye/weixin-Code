// pages/order/checkout/checkout.js
const app = getApp();

Page({
  data: {
    orderInfo: {
      foods: [],    // 订单商品列表
      price: 0,     // 订单总价
      promotion: 0, // 优惠金额
      id: ''        // 订单ID
    },
    loading: true,  // 加载状态
    error: null,    // 错误信息
    comment: '',    // 用户备注
    submitting: false // 提交状态
  },

  onLoad(options) {
    this.loadOrderInfo(options.order_id)
  },

  // 加载订单信息
  async loadOrderInfo(orderId) {
    if (!orderId) {
      this.showError('订单ID不能为空')
      return
    }

    try {
      wx.showLoading({ title: '努力加载中' })
      const data = await app.fetch('/food/order', { id: orderId })
      
      this.setData({
        orderInfo: {
          foods: data.order_food,
          price: data.price,
          promotion: data.promotion,
          id: orderId
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

  // 更新备注
  onCommentInput(e) {
    this.setData({
      comment: e.detail.value
    })
  },

  // 提交支付
  async submitPay() {
    if (this.data.submitting) return
    
    const { id } = this.data.orderInfo
    if (!id) {
      this.showError('订单ID不能为空')
      return
    }

    try {
      this.setData({ submitting: true })
      wx.showLoading({ title: '正在支付' })

      // 提交订单备注
      await app.fetch('/food/order', {
        id,
        comment: this.data.comment
      }, 'POST')

      // 发起支付
      await app.fetch('/food/pay', { id }, 'POST')

      // 支付成功
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 2000
      })

      // 跳转到订单详情
      setTimeout(() => {
        wx.navigateTo({
          url: `/pages/order/detail/detail?order_id=${id}`
        })
      }, 2000)

    } catch (err) {
      this.showError('支付失败，请重试')
    } finally {
      this.setData({ submitting: false })
      wx.hideLoading()
    }
  },

  // 重试加载
  retry() {
    this.loadOrderInfo(this.data.orderInfo.id)
  },

  // 检查是否有优惠
  hasPromotion() {
    return this.data.orderInfo.promotion > 0
  }
})