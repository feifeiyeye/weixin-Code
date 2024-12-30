// pages/apply/data-preview.js
import weCropper from './weCropper.core.js'
var config = require('../config.js')
var request = require('../request.js')
var fun = require('../functions.js')
var data = {
  id: 'cropper',
  width: 600,
  height: 600,
  minScale: 1,
  maxScale: 2.5,
  src: 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/guide/photo_guide1.png',
  isLoading: false,
  order_detail: {},
  curr_applicant: {},
  url_params: {}

}
Page({
  data,
  onLoad: function (options) {
    this.setData({
      url_params: options
    })
    this.infoStatus(options)

    // 页面初始化 options为页面跳转所带来的参数
  },
  infoStatus(options) {
    if (this.data.isLoading === true) {
      return
    }
    this.setData({
      isLoading: true
    })
    var url = config.BASE + config.API.order_query
    var that = this
    request.post(url, { user_order_id: parseInt(options.user_order_id) }).then((res) => {
      if (res.ret == 0) {
        var curr_applicant = {}
        var applicant = {}
        var orderDetail = res.body
        if (!fun.isEmptyObject(orderDetail)) {
          applicant = orderDetail.applicant
        } else {
          applicant = res.body.applicant
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
          if (curr_applicant.id_photo.dest_photo != '') {
            that.setData({
              src: curr_applicant.id_photo.dest_photo
            })
            that.data.src = curr_applicant.id_photo.dest_photo
            console.log(that.data)
            new weCropper(that.data)
          }
        }
        that.setData({
          isLoading: false,
          order_detail: orderDetail
        })
      }
    })

    this.setData({
      url_params: options,
      isLoading: false
    })
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage() {
    this.wecropper.getCropperImage()
  },
  resetPhoto: function () {
    var that = this
    var url_params = this.data.url_params
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (file) {
        wx.getImageInfo({
          src: file.tempFilePaths[0],
          success: function (res) {

            if (url_params.referer == 'photo') {
              var order_applicant_id = parseInt(that.data.url_params.order_applicant_id)
              var user_order_id = parseInt(that.data.url_params.user_order_id)
              var url = '/pages/apply/photo/photo-check?order_applicant_id=' + order_applicant_id + '&user_order_id=' + user_order_id + '&file=' + (file.tempFilePaths[0]) + '&referer=' + url_params.referer
              wx.navigateTo({
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
            } else {

            }
            return
            let src = file.tempFilePaths[0]
            //  获取裁剪图片资源后，给data添加src属性及其值
            Object.assign(data, { src })
            new weCropper(data)
          },
          fail: function (res) {
            // fail
          },
          complete: function (res) {
            // complete
          }
        })

        console.log(file.tempFilePaths[0])
      }
    })
  },
  delPhoto: function () {
    var url_params = this.data.url_params
    var order_applicant_id = url_params.order_applicant_id
    var user_order_id = url_params.user_order_id
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