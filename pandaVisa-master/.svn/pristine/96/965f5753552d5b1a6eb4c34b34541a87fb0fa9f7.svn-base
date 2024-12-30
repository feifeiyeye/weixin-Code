// pages/apply/photo/passport.js
var config = require('../../config.js')
var request = require('../../request.js')
var fun = require('../../functions.js')
var queryString = require('../../../utils/query-string/index.js')
var app = getApp()
Page({
  data: {
    imagePath: "https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/applicant/camera.png",
    passportimg: 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/sample/passport.png',
    upload_passport: 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/sample/passport.png',
    btn_hide: '',
    hz_hide: 'hide',
    url_params: {},
    tip: "",
    isLoading: false,
    curr_elec_id_info: {},
    order_detail: {}
  },
  chooseImage: function (e) {
    var that = this
    const ctx = wx.createCanvasContext('passPortCanvas')
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log("imagePath:" + tempFilePaths)
        var path = res.tempFilePaths[0]
        ctx.drawImage(path, 0, 0, 1024, 1024)
        ctx.draw()
        var params = that.data.url_params
        var data = {}
        data.elec_id = parseInt(params.elec_id)
        data.pos = 1
        data.order_applicant_id = parseInt(params.order_applicant_id)
        var suffixs = (path).split('.')
        var suffix = suffixs[(suffixs.length)]
        data.suffix = suffix
        data.user_order_id = parseInt(params.user_order_id)
        // wx.canvasToTempFilePath({
        //   canvasId: 'passPortCanvas',
        //   success(res) {
        //     console.log('1024*768', res.tempFilePath)

        //   },
        //   complete: function (e) {
        //     console.log('canvasToTempFilePath', e)
        //   },
        //   fail: function (err) {
        //     console.log('err', err)
        //   }
        // })
        app.showLoading()
        var recognize_passport_s = config.API.recognize_passport_s
        request.uploadFile(recognize_passport_s, tempFilePaths[0])
          .then((res) => {
            console.log('scan', res)
            return JSON.parse(res.data)
          }).then((scanData) => {
            var scanTmp = scanData
            if (fun.isEmptyObject(scanTmp) || scanTmp.type == '未知类型' || !scanTmp.passport_line1) {

              wx.showToast({
                title: '信息不完整，请重新拍摄!',
                icon: 'warn',
                duration: 2000
              })
              return
            }
            if (!fun.isEmptyObject(scanTmp)) {
              scanTmp.url = tempFilePaths[0]
              app.globalData.passPort = scanTmp
              var params_str = queryString.stringify(that.data.url_params)

              wx.navigateTo({
                url: '/pages/apply/photo/passport-reada?' + params_str,
                success: function (res) {

                  that.setData({
                    upload_passport: tempFilePaths[0],
                    hz_hide: '',
                    btn_hide: 'hide'
                  })
                  console.log('to passport reada', res)
                },
                fail: function () {
                  // fail
                },
                complete: function () {
                  // complete
                  app.hideLoading()
                }
              })


            }
          })


      }
    })
  },
  previewImg: function (e) {
    console.log(e)
    var curr_elec_id_info = this.data.curr_elec_id_info
    var upload_passport = this.data.upload_passport
    app.previewImg(upload_passport)
    console.log(curr_elec_id_info)
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
    this.infoStaus(options)
  },
  infoStaus(options) {
    var isLoading = this.data.isLoading
    if (isLoading === true) {
      return
    }
    this.setData({
      isLoading: true
    })
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    var orderDetail = app.globalData.orderDetail
    var pass_url = config.BASE + config.API.order_query
    request.post(pass_url, { user_order_id: parseInt(options.user_order_id) }).then((res) => {
      if (res.ret == 0) {
        orderDetail = res.body
        var curr_applicant = {}
        var applicant = {}
        if (!fun.isEmptyObject(orderDetail)) {
          applicant = orderDetail.applicant
          for (var i in applicant) {
            if (applicant[i].order_applicant_id == options.order_applicant_id) {
              curr_applicant = applicant[i]
              break;
            }
          }
        }

        if (!fun.isEmptyObject(curr_applicant)) {
          that.setData({
            curr_applicant: curr_applicant
          })
          var curr_elec_id_info = {}
          var required = curr_applicant.material.material_required
          var optional = curr_applicant.material.material_optional
          var tip = ''
          if (required) {
            for (var i in required) {
              if (required[i].elec_id == options.elec_id) {
                curr_elec_id_info = required[i]
                tip = required[i].attention
                break;
              }
            }
            if (curr_elec_id_info.upload.length > 0) {
              that.setData({
                upload_passport: curr_elec_id_info.upload[0].url,
                hz_hide: '',
                btn_hide: 'hide'
              })
            }
          }
        }
        for (var k in curr_elec_id_info.upload) {
          curr_elec_id_info.upload[k].memoArr = curr_elec_id_info.upload[k].memo.split('\n')
        }
        var url_params = options
        that.setData({
          url_params: url_params,
          tip: tip,
          curr_elec_id_info: curr_elec_id_info,
          isLoading: false,
          order_detail: orderDetail
        })
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var opt = this.data.url_params
    if (!fun.isEmptyObject(opt)) {

      this.infoStaus(opt)
    }
  },
  onHide: function () {
    // 页面隐藏
    app.hideLoading()
  },
  onUnload: function () {
    // 页面关闭
  }
})