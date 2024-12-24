// app.js
App({
  onLaunch: function () {
    // 小程序启动时执行
  },
  globalData: {
    userInfo: null
  },
  fetch: require('./utils/fetch.js')
})
