// pages/apply/photo/photo-result.js
var queryString = require('../../../utils/query-string/index.js')
var app = getApp()
Page({
  data: {
    src: "",
    width: 0,
    height: 0,
    photoResult: [],
    url_params: {},
    result: ''
  },
  onLoad: function (options) {
    var that = this
    var photoResult = app.globalData.photoResult
    wx.getImageInfo({
      src: options.file,
      success: function (res) {

        that.setData({
          width: res.width,
          height: res.height,
          src: options.file,
          url_params: options
        })
        if (typeof photoResult.des == 'string') {
          //app.toastWarn(photoResult.des)
          that.setData({
            result: photoResult.des
          })
          return
        }
        for (var i in photoResult.des) {
          var des = photoResult.des[i].des
          var des_arr = []
          if (des.indexOf('：')) {
            des_arr = des.split('：')
          } else {
            des_arr[0] = des
            des_arr[1] = ''
          }

          photoResult.des[i].title = des_arr[0]
          photoResult.des[i].text = des_arr[1]
          if (photoResult.des[i].status == 0) {
            photoResult.des[i].class = 'right'
          } else {
            photoResult.des[i].class = 'error'
          }
        }
        that.setData({
          src: options.file,
          photoResult: photoResult,
          url_params: options
        })
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })

    // 页面初始化 options为页面跳转所带来的参数
  },
  resetPhoto: function () {
    var that = this
    var order_applicant_id = that.data.url_params.order_applicant_id
    var user_order_id = that.data.url_params.user_order_id
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (file) {
        wx.getImageInfo({
          src: file.tempFilePaths[0],
          success: function (res) {

            if (res.width < 500 || res.height < 500) {
              app.toastWarn('照片长宽像素不得低于500，请选择其他照片或重新拍摄')
              return
            }
            var params = that.data.url_params
            params.file = file.tempFilePaths[0]
            var url = '/pages/apply/photo/photo-check?'+queryString.stringify(params)
            wx.redirectTo({
              url: url,
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
            // success
          },
          fail: function (res) {
            // fail
          },
          complete: function (res) {
            // complete
          }
        })




        return
        wx.getImageInfo({
          src: file.tempFilePaths[0],
          success: function (res) {
            that.setData({
              width: res.width,
              height: res.height,
              src: file.tempFilePaths[0]
            })
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
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHition() {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})