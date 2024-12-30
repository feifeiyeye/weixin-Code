// pages/apply/photo/photo.js
var config = require('../../config.js')
var request = require('../../request.js')
var fun = require('../../functions.js')
var app = getApp()
Page({
  data: {
    //弹出层
    mail_info: 'hide',
    bg_hide: 'hide',
    photoStart: 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/applicant/camera.png',
    //滑动
    imgUrls: [
      'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/guide/photo_guide1.png',
      'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/guide/photo_guide2.png',
      'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/guide/photo_guide3.png',
      'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/guide/photo_guide4.png',
      'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/guide/photo_guide5.png'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    uploadStatus: false,
    url_params: {},
    curr_applicant: {},
    isLoading: false,
    order_detail: {}
  },
  //弹出层
  closePopup: function (e) {
    console.log(e.target.id)
    var id = e.target.id;
    console.log(id, e.target);

    this.setData({
      mail_info: 'hide',
      bg_hide: 'hide',
    })
  },
  previewImg: function () {
    var curr_applicant = this.data.curr_applicant
    var url_img = this.data.photoStart


    /**
     * 预览开关*/
     app.previewImg(url_img, url_img)
     return
     
    var user_order_id = this.data.url_params.user_order_id
    var order_applicant_id = this.data.url_params.order_applicant_id
    if (curr_applicant.id_photo.id_photo_status == 0) {
      app.previewImg(url_img, url_img)
    } else {
      wx.navigateTo({
        url: '/pages/apply/data-preview?user_order_id=' + user_order_id + '&order_applicant_id=' + order_applicant_id + '&referer=photo',
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


  },
  openPopup: function (e) {
    console.log(e)
    var id = e.target.id;
    console.log(id, e.target);
    console.log(this.data[id])
    if (id === 'mail_info') {
      this.setData({
        mail_info: '',
        bg_hide: '',
      })
    }

  },
  photoSelect: function () {
    var that = this;
    var curr_applicant = this.data.curr_applicant
    // 选择图片
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (file) {
        console.log('chooseImage', file);
        var order_applicant_id = parseInt(that.data.url_params.order_applicant_id)
        var user_order_id = parseInt(that.data.url_params.user_order_id)

        wx.getImageInfo({
          src: file.tempFilePaths[0],
          success: function (res) {
            if (res.width < 500 || res.height < 500) {
              app.toastWarn('照片长宽像素不得低于500，请选择其他照片或重新拍摄')
              return
            }
            var url = '/pages/apply/photo/photo-check?order_applicant_id=' + order_applicant_id + '&user_order_id=' + user_order_id + '&file=' + (file.tempFilePaths[0])
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
        //组合请求数据，发送HTTPS请求，
        var data = {};

        data.action = 'applicant_id_photo_src_add'
        data.order_applicant_id = order_applicant_id
        var suffixs = file.tempFilePaths[0].split('.')
        data.suffix = suffixs[(suffixs.length - 1)]
        data.user_order_id = user_order_id
        var url = config.BASE + config.API.upload_general_request
        var curr_applicant = that.data.curr_applicant
        request.post(url, data)  // body = data
          .then((res) => {      // res = res.data
            if (res.ret == 0) {
              // 将本地资源上传到服务器
              var body = res.body
              var chooseFile = file
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = chooseFile.tempFilePaths
              var aliyun_host = config.HTTP + body.oss_out
              request.uploadFile2Aliyun(aliyun_host, tempFilePaths[0], body.key, body.callback, body.signature, body.policy)
                .then((fileInfo) => {
                  var params = that.data.url_params
                  var key = params.user_order_id + '_' + params.order_applicant_id + '_id_photo'
                  app.globalData.materialUpload[key] = true
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
      }
    })

  },
  submit: function () {
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
          curr_applicant.id_photo.memoArr = curr_applicant.id_photo.memo.split('\n')
          that.setData({
            curr_applicant: curr_applicant
          })
          console.log(curr_applicant.id_photo.dest_photo)
          if (curr_applicant.id_photo.dest_photo != '') {
            that.setData({
              uploadStatus: true,
              photoStart: curr_applicant.id_photo.dest_photo
            })
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
  onLoad: function (options) {
    this.infoStatus(options)
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    console.log(this.data.url_params)
    if (this.data.url_params) {
      this.infoStatus(this.data.url_params)
    }
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})