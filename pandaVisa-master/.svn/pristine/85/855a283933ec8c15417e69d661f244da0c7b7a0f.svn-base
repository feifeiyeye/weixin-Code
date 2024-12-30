// pages/apply/express-detail.js
var config = require('../config.js')
var request = require('../request')
var app = getApp()
Page({
  data: {
    express_detail: {},
    order_detail: {}
  },
  onLoad: function (options) {
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    var user_order_id = parseInt(options.user_order_id)
    var url = config.BASE + config.API.order_query
    request.post(url, { user_order_id: user_order_id })
      .then((res) => {

        if (res.ret == 0) {
          var order_detail = res.body
          if (order_detail.return_express.length > 0) {
            that.setData({
              express_detail: order_detail.return_express[0]
            })
          }
          that.setData({
            order_detail: order_detail
          })
          return order_detail.return_express[0]
        } else {
          app.toastWarn(res.msg)
        }
      }).then((expressData) => {
        var sys_express_query = config.BASE + config.API.sys_express_query
        var data = {
          user_order_id: user_order_id,
          tracking_number: expressData.tracking_number,
          express_name: expressData.express_name
        }
        request.post(sys_express_query, data).then((res) => {
          if (res.ret == 0) {
            console.log(res.body)
            that.setData({
              express_detail: res.body
            })
          } else {
            app.toastWarn(res.msg)
          }
        })
      })

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