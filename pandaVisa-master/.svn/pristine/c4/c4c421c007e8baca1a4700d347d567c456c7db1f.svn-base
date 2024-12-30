// pages/order/pay/payok.js
var config = require('../../config.js')
var request = require('../../request.js')
var utils = require('../../../utils/util.js')
var app = getApp()
Page({
  data: {
    order_detail: {},
    url_params: {},
    applicant: {},
    identityName: ['在职人员', '自由职业者', '退休人员', '在校学生', '学龄前儿童'],
    curr_identity_material: {},
    start_date: '',
    end_date: '',
    areaJson: {},
    previewImg: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      url_params: options
    })

    var user_order_id = parseInt(options.user_order_id)
    var url = config.BASE + config.API.order_query
    var data = {
      user_order_id: user_order_id
    }
    var that = this
    app.getAreaJson(function (res) {
      that.setData({
        areaJson: res
      })
      console.log(res)
    })
    request.post(url, data).then((res) => {
      if (res.ret == 0) {
        var applicant = res.body.applicant
        that.setData({
          order_detail: res.body,
          applicant: applicant
        })
        var identity_ids = []
        for (var i in applicant) {
          if (applicant[i].material)
            identity_ids.push(applicant[i].material.identity_id)
        }
        console.log('12312',applicant)
      }
      return { pro_id: res.body.visa_product_id, identity: identity_ids }
    }).then((obj) => {
      var visa_product_id = parseInt(obj.pro_id)
      var url = config.BASE + config.API.visa_product_query
      request.post(url, { visa_product_id: visa_product_id })
        .then((pro_data) => {
          if (pro_data.ret == 0) {
            var previewImg = that.data.previewImg
            var identity_material = pro_data.body.identity_material
            var curr_identity_material = that.data.curr_identity_material
            for(var j in identity_material){
              curr_identity_material[identity_material[j].identity_id] = identity_material[j]
            }
            console.log('1231312',curr_identity_material)
            for (var k in obj.identity) {
              var required = curr_identity_material[obj.identity[k]].material_paper.required
              var optional = curr_identity_material[obj.identity[k]].material_paper.optional
              for (var i in required) {
                var tmp = required[i]
                if (tmp.sample)
                  previewImg[tmp.id] = tmp.sample
              }
              for (var j in optional) {
                var tmp1 = optional[j]
                if (tmp1.sample)
                  previewImg[tmp1.id] = tmp1.sample
              }
            }
            that.setData({
              curr_identity_material: curr_identity_material,
              previewImg: previewImg
            })
            console.log(curr_identity_material[0].material_paper.required.length)
          }
        })
    })

    var today = new Date();
    var aft3Day = new Date(Date.parse(new Date().toString()) + 86400000 * 3);
    var todayStr = (aft3Day.getMonth() + 1) + '月' + aft3Day.getDate() + '日'
    var endDateStr = new Date(Date.parse(new Date().toString()) + 86400000 * 9)
    endDateStr = (endDateStr.getMonth() + 1) + '月' + endDateStr.getDate() + '日'
    console.log('22', todayStr)
    this.setData({
      start_date: todayStr,
      end_date: endDateStr
    })
  },
  previewImg: function (e) {
    var id = e.target.id
    var previewImg = this.data.previewImg
    wx.previewImage({
      current: previewImg[id], // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: [previewImg[id]],
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
  },
  onUnload: function () {
  }
})