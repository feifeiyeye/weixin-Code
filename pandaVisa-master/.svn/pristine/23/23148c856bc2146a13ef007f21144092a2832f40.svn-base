var functions = require('../functions.js')
var config = require('../config.js')
var request = require('../request.js')
var app = getApp();
var pageSize = 20
Page({
  data: {
    films: [],
    showLoading: false,
    start: 0,
    list: [],
    isLoading: false
  },
  onLoad: function () {
    this.reLoad()
  },
  reLoad: function () {
    var isLoading = this.data.isLoading
    var that = this
    if (!isLoading) {
      that.setData({
        isLoading: true
      })
      wx.showToast({
        title: 'Loding...',
        icon: 'loading',
        duration: 3000
      })
      var url = config.BASE + config.API.visa_country_show
      var data = {}
      request.get(url, data)
        .then((res) => {
          if (res.ret == '0') {
            var list = res.body
            that.setData({
              list: list
            })
            var visa_country_background = {}
            for (var i in list) {
              visa_country_background[list[i].visa_country_id] = list[i].background_img
            }
            app.globalData.visa_country_background = visa_country_background
            // success
            that.setData({
              isLoading: false
            })
            wx.hideToast()
            wx.stopPullDownRefresh()
          } else {
            that.setData({
              isLoading: false
            })
            wx.hideToast()
            wx.stopPullDownRefresh()
          }

        }).catch((err) => {
          wx.hideToast()
          console.log(err)
          that.setData({
            isLoading: false
          })
        })
    } else {
      that.setData({
        isLoading: false
      })
      wx.hideToast()
      wx.stopPullDownRefresh()
    }

  },
  onPullDownRefresh: function () {
    this.reLoad()
  },
  onShow: function () {
    this.reLoad()
  },
  onShareAppMessage: function () {
    return {
      title: '熊猫签证',
      desc: '足不出户办签证',
      path: '/pages/index/index'
    }
  }
})
