// pages/order/list/list.js
const app = getApp();

Page({
  data: {
    orderList: [],    // 订单列表
    pagination: {
      isLast: true,   // 是否最后一页
      lastId: 0,      // 最后一条数据ID
      pageSize: 10    // 每页数量
    },
    loading: true,    // 加载状态
    refreshing: false, // 刷新状态
    error: null       // 错误信息
  },

  onLoad() {
    this.loadOrderList()
  },

  // 加载订单列表
  async loadOrderList(isRefresh = false) {
    try {
      if (isRefresh) {
        wx.showLoading({ title: '刷新中...' })
      } else {
        this.setData({ loading: true })
      }

      const { lastId, pageSize } = this.data.pagination
      const data = await app.fetch('/food/orderlist', {
        last_id: isRefresh ? 0 : lastId,
        row: pageSize
      })

      this.setData({
        orderList: isRefresh ? data.list : [...this.data.orderList, ...data.list],
        'pagination.isLast': data.list.length < pageSize,
        'pagination.lastId': data.last_id,
        loading: false,
        error: null
      })
    } catch (err) {
      this.showError('加载失败，请重试')
    } finally {
      wx.hideLoading()
      if (isRefresh) {
        wx.stopPullDownRefresh()
      }
    }
  },

  // 显示错误信息
  showError(message) {
    this.setData({
      error: message,
      loading: false
    })
    wx.showToast({
      title: message,
      icon: 'none'
    })
  },

  // 下拉刷新
  async onPullDownRefresh() {
    this.setData({ refreshing: true })
    await this.loadOrderList(true)
    this.setData({ refreshing: false })
  },

  // 触底加载更多
  async onReachBottom() {
    if (this.data.loading || this.data.pagination.isLast) return
    await this.loadOrderList()
  },

  // 跳转到订单详情
  goToDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/order/detail/detail?order_id=${id}`
    })
  },

  // 重试加载
  retry() {
    this.loadOrderList()
  }
})