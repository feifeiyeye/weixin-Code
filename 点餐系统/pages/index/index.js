// index.js
const app = getApp();

Page({
  data: {
    swiper: [], // 轮播图数据
    ad: '', // 广告图
    category: [], // 分类图片
    loading: true, // 添加默认loading状态
    error: null
  },

  onLoad() {
    this.initPageData()
  },

  // 初始化页面数据
  initPageData() {
    const loadData = () => {
      this.setData({ loading: true })
      
      wx.showLoading({
        title: '努力加载中',
        mask: true
      })

      app.fetch('/food/index')
        .then(this.handleSuccess)
        .catch(this.handleError)
        .finally(() => {
          wx.hideLoading()
          this.setData({ loading: false })
        })
    }

    if (app.userLoginReady) {
      loadData()
    } else {
      app.userLoginReadyCallback = loadData
    }
  },

  // 处理数据加载成功
  handleSuccess(data) {
    this.setData({
      swiper: data.img_swiper,
      ad: data.img_ad, 
      category: data.img_category,
      error: null
    })
  },

  // 处理数据加载失败
  handleError(err) {
    this.setData({
      error: err.message || '加载失败'
    })
  },

  // 跳转到菜单列表页
  start() {
    wx.navigateTo({
      url: '/pages/list/list'
    })
  },

  // 重试加载
  retry() {
    this.initPageData()
  }
})
