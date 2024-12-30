// pages/apply/photo/photo-preview.js
var app = getApp()
Page({
  data: {
    src: '',
    url_params: {}
  },
  onLoad: function (options) {
    var photo = app.globalData.photoResult
    this.setData({
      src: photo.id_photo,
      url_params: options
    })
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  submitOk: function () {
    var url_params = this.data.url_params
    var delta = 1
    if(url_params.hasOwnProperty('referer') && url_params.referer =='photo'){
      delta = 2
    }
    console.log('delta', delta)
    wx.navigateBack({
      delta: delta, // 回退前 delta(默认为1) 页面
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  }
})