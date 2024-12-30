// pages/apply/photo/passport.js
var config = require('../../config.js')
var request = require('../../request.js')
var fun = require('../../functions.js')
var queryString = require('../../../utils/query-string/index.js')
var app = getApp()
Page({
  data: {
    imagePath: "https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/applicant/camera.png",
    previewImg: '',
    upload_passport: '',
    btn_hide: '',
    hz_hide: 'hide',
    url_params: {},
    tip: "",
    curr_elec_id_info: {},
    isLoading: false,
    order_detail: {},
    curr_applicant: {}
  },
  chooseImage: function (e) {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log("imagePath:" + tempFilePaths)
        var path = res.tempFilePaths[0]

        var params = that.data.url_params
        var data = {}
        data.elec_id = parseInt(params.elec_id)
        data.pos = 1
        data.order_applicant_id = parseInt(params.order_applicant_id)
        var suffixs = (path).split('.')
        var suffix = suffixs[(suffixs.length - 1)]
        data.suffix = suffix
        data.user_order_id = parseInt(params.user_order_id)
        var url = config.BASE + config.API.upload_elec_request
        request.post(url, data)
          .then((upData) => {
            if (upData.ret == 0) {
              return upData.body
            } else {
              return
            }
          }).then((upBody) => {

            var aliyun_host = config.HTTP + upBody.oss_out
            request.uploadFile2Aliyun(aliyun_host, tempFilePaths[0], upBody.key, upBody.callback, upBody.signature, upBody.policy)
              .then((aliData) => {
                var url = aliData.data.body.url

                if (url) {
                  that.setData({
                    upload_passport: url,
                    hz_hide: '',
                    btn_hide: 'hide'
                  })

                  var key = params.user_order_id + '_' + params.order_applicant_id + '_' + params.elec_id
                  if (!fun.isEmptyObject(params)) {
                    that.infoStatus(params)
                  }
                  app.globalData.materialUpload[key] = true
                }
              })
          })
      }
    })
  },
  previewImg: function () {
    app.previewImg(this.data.upload_passport)
  },
  passPortSave: function () {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
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
  onLoad: function (options) {

    this.infoStatus(options)
  },
  infoStatus(options) {
    if (this.data.isLoading === true) {
      return
    }
    this.setData({
      isLoading: true
    })
    // 页面初始化 options为页面跳转所带来的参数
    var url_params = options
    this.setData({
      url_params: url_params,
      tip: url_params.attention
    })
    console.log(options)
    var that = this
    var url = config.BASE + config.API.order_query
    var user_order_id = parseInt(options.user_order_id)
    var data = {
      user_order_id: user_order_id
    }
    request.post(url, data).then((res) => {
      if (res.ret == 0) {
        var orderDetail = res.body//app.globalData.orderDetail
        var curr_applicant = {}
        var applicant = {}
        if (!fun.isEmptyObject(orderDetail)) {
          applicant = orderDetail.applicant
        }
        for (var i in applicant) {
          if (applicant[i].order_applicant_id == options.order_applicant_id) {
            curr_applicant = applicant[i]
            break;
          }
        }
        if (!fun.isEmptyObject(curr_applicant)) {
          that.setData({
            curr_applicant: curr_applicant
          })
          var curr_elec_id_info = {}
          var required = curr_applicant.material.material_required
          var optional = curr_applicant.material.material_optional
          console.log(required)
          var upload_passport = ''
          var tip = ''
          var previewImg = ''
          if (required.length > 0) {
            for (var i in required) {
              if (required[i].elec_id == options.elec_id) {
                curr_elec_id_info = required[i]
                tip = curr_elec_id_info.attention
                console.log(curr_elec_id_info.sample)
                if (curr_elec_id_info.sample != '')
                  previewImg = curr_elec_id_info.sample
                if (curr_elec_id_info.elec_name != '') {
                  wx.setNavigationBarTitle({
                    title: curr_elec_id_info.elec_name
                  })
                }
                break;
              }
            }

          }
          for (var i in optional) {
            if (optional[i].elec_id == options.elec_id) {
              curr_elec_id_info = optional[i]
              tip = curr_elec_id_info.attention
              console.log(curr_elec_id_info.sample)
              if (curr_elec_id_info.sample != '')
                previewImg = curr_elec_id_info.sample
              if (curr_elec_id_info.elec_name != '') {
                wx.setNavigationBarTitle({
                  title: curr_elec_id_info.elec_name
                })
              }
              break;
            }
          }

          console.log(curr_applicant, previewImg, 'previewImg')
          if (previewImg === '') {
            var optional = curr_applicant.material.material_optional
            var curr_optional = {}
            if (optional.length > 0) {
              for (var i in optional) {
                if (optional[i].elec_id == options.elec_id) {
                  curr_optional = optional[i]
                  tip = curr_optional.attention
                  if (curr_optional.sample != '' && previewImg == '')
                    previewImg = curr_optional.sample
                  if (curr_optional.elec_name != '') {
                    wx.setNavigationBarTitle({
                      title: curr_optional.elec_name
                    })
                  }
                  break;
                }
              }
              if (!fun.isEmptyObject(curr_optional) && curr_optional.upload.length > 0) {
                if (curr_optional.upload.length > 0)
                  upload_passport = curr_optional.upload[0].url
              }
            }
          }
          if (!fun.isEmptyObject(curr_elec_id_info) && curr_elec_id_info.upload.length > 0) {
            upload_passport = curr_elec_id_info.upload[0].url
          }

          if (upload_passport != '') {
            that.setData({
              upload_passport: upload_passport,
              hz_hide: '',
              btn_hide: 'hide'
            })
          }
          for (var k in curr_elec_id_info.upload) {
            curr_elec_id_info.upload[k].memoArr = curr_elec_id_info.upload[k].memo.split('\n')
          }
          that.setData({
            tip: tip,
            previewImg: previewImg,
            isLoading: false,
            curr_elec_id_info: curr_elec_id_info,
            order_detail: orderDetail,
            curr_applicant: curr_applicant
          })

        }
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