// index.js
const app = getApp()
const fetch = app.fetch

Page({
  data: {
    isLogin: false,
    swiper: [],    // 轮播图数据
    ad: [],        // 广告图数据
    category: []   // 分类图数据
  },

  onLoad: function() {
    // 立即检查登录状态
    this.checkLoginStatus()
    
    // 定义加载数据的回调函数
    const callback = () => {
      wx.showLoading({
        title: '努力加载中',
        mask: true
      })

      fetch('/food/index').then(data => {
        wx.hideLoading()
        this.setData({
          swiper: data.img_swiper,
          ad: data.img_ad,
          category: data.img_category
        })
        console.log('轮播图数据:', this.data.swiper)
        console.log('广告图数据:', this.data.ad)
        console.log('分类图数据:', this.data.category)
      }, () => {
        callback() // 失败时重试
      })
    }

    // 判断是否已登录
    if (app.userLoginReady) {
      callback()
    } else {
      app.userLoginReadyCallback = callback
    }
  },

  // 检查登录状态的方法
  checkLoginStatus() {
    // 先检查当前��态
    if (app.userLoginReady || app.globalData.isLogin) {
      this.setData({ isLogin: true })
      return
    }

    // 如果未登录，启动定时器检查
    let checkTimer = setInterval(() => {
      if (app.userLoginReady || app.globalData.isLogin) {
        this.setData({ isLogin: true })
        clearInterval(checkTimer)
      }
    }, 100)

    // 30秒后清除定时器，避免一直运行
    setTimeout(() => {
      clearInterval(checkTimer)
    }, 30000)
  },

  start: function() {
    wx.navigateTo({
      url: '/pages/list/list'
    })
  }
})
