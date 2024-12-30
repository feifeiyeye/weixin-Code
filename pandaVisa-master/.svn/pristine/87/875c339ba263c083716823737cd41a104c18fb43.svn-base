// pages/apply/photo/photo-check.js
var config = require('../../config.js')
var request = require('../../request.js')
var fun = require('../../functions.js')
var queryString = require('../../../utils/query-string/index.js')
var app = getApp()
Page({
  data: {
    src: 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/guide/photo_guide1.png',
    width: 0,
    height: 0,
    url_params: {}
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      url_params: options
    })
    wx.getImageInfo({
      src: options.file,
      success: function (res) {
        console.log(res)
        that.setData({
          width: res.width,
          height: res.height,
          src: options.file
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
    //组合请求数据，发送HTTPS请求，
    var data = {};
    var order_applicant_id = parseInt(options.order_applicant_id)
    var user_order_id = parseInt(options.user_order_id)
    data.action = 'applicant_id_photo_src_add'
    data.order_applicant_id = order_applicant_id
    var suffixs = options.file.split('.')
    data.suffix = suffixs[(suffixs.length - 1)]
    data.user_order_id = user_order_id
    var url = config.BASE + config.API.upload_general_request
    request.post(url, data)  // body = data
      .then((res) => {      // res = res.data
        if (res.ret == 0) {
          // 将本地资源上传到服务器
          var body = res.body
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var aliyun_host = config.HTTP + body.oss_out
          request.uploadFile2Aliyun(aliyun_host, options.file, body.key, body.callback, body.signature, body.policy)
            .then((fileInfo) => {
              var params = that.data.url_params
              var url_params_str = queryString.stringify(params)
              console.log(url_params_str, 'url_params')
              var key = params.user_order_id + '_' + params.order_applicant_id + '_id_photo'
              app.globalData.materialUpload[key] = true
              console.log(fileInfo)
              if (fileInfo.data.ret == 0) {
                app.globalData.photoResult = fileInfo.data.body
                wx.redirectTo({
                  url: '/pages/apply/photo/photo-preview?' + url_params_str,
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
              } else {
                app.globalData.photoResult = fileInfo.data.msg
                wx.redirectTo({
                  url: '/pages/apply/photo/photo-result?' + url_params_str,
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

              return
              that.setData({
                uploadStatus: true,
                photoStart: fileInfo.data.body.url,
                isLoading: false
              })
              curr_applicant.id_photo.dest_photo = fileInfo.data.body.url
              console.log('parsssssssssssssssssss', that.data.url_params)
              if (!fun.isEmptyObject(params)) {
                that.infoStatus(params)
              }
            })
          that.setData({
            isLoading: false
          })
        }

      }).catch((err) => {
        console.error('出错了', err)
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
  }
})