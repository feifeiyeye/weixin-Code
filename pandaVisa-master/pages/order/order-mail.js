// pages/order/order-mail.js
var app = getApp();
var config = require('../config.js')
var request = require('../request.js')
Page({
  data: {
    url_params: {},
    order_detail: {},
    applicant: [],
    visa_address: {},
    curr_identity_id: 0,
    curr_identity_material: {},
    kdOrderNo: 0,
    submitKdOk: false,
    bg_hide: 'hide',
    kd_info_class: 'hide',
    kdCompany: ['请选择快递公司', '顺丰快递', '中国邮政EMS', '申通快递', '韵达快递', '中通快递', '圆通快递', '百世汇通', '宅急送', '其他'],
    kd_index: 0,
    email_info_class: 'hide',
    email: '',
    previewImg: {}
  },
  closePopup: function () {
    this.setData({
      bg_hide: 'hide',
      kd_info_class: 'hide',
      email_info_class: 'hide'
    })
  },
  sendEmailInfo: function () {
    this.setData({
      bg_hide: '',
      email_info_class: ''
    })
  },
  sendEmailOk: function () {
    var email = this.data.email
    var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    var that = this
    if (reg.test(email)) {
      var url = config.BASE + config.API.order_email_send
      var data = {
        email: email,
        user_order_id: parseInt(this.data.url_params.user_order_id)
      }
      app.showLoading()
      request.post(url, data).then((res) => {
        if (res.ret == 0) {
          app.hideLoading()
          wx.showToast({
            title: "发送成功",
            icon: "success",
            duration: 2000
          })
          that.closePopup()
        } else {
          app.hideLoading()
          wx.showToast({
            title: res.msg,
            icon: "success",
            duration: 2000
          })
        }
      })
    } else {
      wx.showToast({
        title: '邮箱地址格式有误',
        icon: 'success',
        duration: 2000
      })
      return
    }
  },
  previewSample: function (e) {
    var id = e.target.id
    var previewImg = this.data.previewImg
    console.log(previewImg[id],id,previewImg)
    var url = previewImg[id]
    if (url) {
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: [url] // 需要预览的图片http链接列表
      })
    }

  },
  kdInfo: function () {
    this.setData({
      bg_hide: '',
      kd_info_class: ''
    })
  },
  kdOrder: function (e) {
    this.setData({
      kdOrderNo: e.detail.value
    })
  },
  onLoad: function (options) {
    this.setData({
      url_params: options
    })
    var user_order_id = parseInt(options.user_order_id)
    var url = config.BASE + config.API.order_query
    var data = {
      user_order_id: user_order_id
    }
    var that = this
    request.post(url, data)
      .then((res) => {
        if (res.ret == 0) {
          var applicant = res.body.applicant
          that.setData({
            order_detail: res.body,
            visa_address: res.body.visa_address,
            applicant: res.body.applicant
          })
          var identity_ids = []
          for (var i in applicant) {
            if (applicant[i].material)
              identity_ids.push(applicant[i].material.identity_id)
          }
          return { pro_id: res.body.visa_product_id, identity: identity_ids }
        }

      }).then((obj) => {
        var visa_product_id = parseInt(obj.pro_id)
        var url = config.BASE + config.API.visa_product_query
        request.post(url, { visa_product_id: visa_product_id })
          .then((pro_data) => {
            if (pro_data.ret == 0) {
              var previewImg = that.data.previewImg
              var curr_identity_material = pro_data.body.identity_material
              console.log(obj, 'qe3213', curr_identity_material)
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
            }

          })
      })
    // 页面初始化 options为页面跳转所带来的参数
  },
  bindPickerChange(e) {
    var val = e.detail.value
    this.setData({
      kd_index: val
    })
  },
  emailInput: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  submitKdInfo: function () {
    var kdOrderNo = this.data.kdOrderNo
    var user_order_id = parseInt(this.data.url_params.user_order_id)
    var kdCompany = this.data.kdCompany
    var kd_index = this.data.kd_index
    if (kd_index <= 0) {
      wx.showToast({
        title: '选择快递公司',
        icon: 'success',
        duration: 2000
      })
      return
    }
    if (!kdOrderNo) {
      wx.showToast({
        title: '快递单号不能为空',
        icon: 'success',
        duration: 2000
      })
      return
    }
    var express_name = kdCompany[kd_index]
    var url = config.BASE + config.API.order_express_add
    var data = {
      user_order_id: user_order_id,
      tracking_number: kdOrderNo,
      express_name: express_name
    }

    request.post(url, data)
      .then((res) => {
        if (res.ret == 0) {
          this.setData({
            bg_hide: 'hide',
            kd_info_class: 'hide',
            submitKdOk: true,
            kdInfoBtn: 'hide'
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'success',
            duration: 2000
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
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})