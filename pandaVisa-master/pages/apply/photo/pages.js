// pages/apply/photo/pages.js
var config = require('../../config.js')
var request = require('../../request.js')
var fun = require('../../functions.js')
var app = getApp()
Page({
  data: {
    List: [],
    tip: '',
    pos: 0,
    url_params: {},
    curr_applicant: {},
    curr_elec_id_info: {},
    isLoading: false,
    isNopass: false,
    preViewArr: {},
    order_detail: {},
    curr_action: 'addPhotos',
    no_url_pos: 0,
    btn_img: 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/applicant/camera.png',
    nocamera: false,
    curr_elec_status: false
  },
  addPhotos: function () {
    var that = this
    var url_params = this.data.url_params
    var len = this.data.List.length
    var pos = this.data.pos
    var List = this.data.List
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (file) {
        var chooseFile = file
        var data = {};
        data.order_applicant_id = parseInt(url_params.order_applicant_id)
        data.user_order_id = parseInt(url_params.user_order_id)
        data.elec_id = parseInt(url_params.elec_id)
        var suffixs = (file.tempFilePaths[0]).split('.')
        var isNopass = that.data.isNopass
        data.suffix = suffixs[(suffixs.length - 1)]
        if (isNopass) {
          data.pos = pos
        } else {
          data.pos = (++pos)
        }

        var url = config.BASE + config.API.upload_elec_request
        request.post(url, data)
          .then(function (res) {
            if (res.ret === 0) {
              var body = res.body
              console.log('body', body) //响应数据
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = file.tempFilePaths
              var host = config.HTTP + body.oss_out
              request.uploadFile2Aliyun(host, tempFilePaths[0], body.key, body.callback, body.signature, body.policy, body.access_key)
                .then((fileData) => {
                  console.log(fileData)
                  var img = fileData.data.body.url
                  if (img) {
                    List.push({ src: img, pos: pos })
                    that.setData({
                      pos: pos,
                      List: List
                    })
                    if (url_params) {
                      that.infoStatus(url_params)
                    }
                    var key = url_params.user_order_id + '_' + url_params.order_applicant_id + '_' + url_params.elec_id
                    app.globalData.materialUpload[key] = true
                  }
                }).catch(function (err) {
                  console.error(err)
                })
            }
          }).catch(function (err) {
            console.error(err)
          })
      }
    })
  },
  previewImg: function (e) {
    var id = e.target.id
    var list = this.data.List
    var idx = id.split('_')[1]
    var url = ''
    for (var i in list) {
      if (list[i].pos == idx) {
        url = list[i].src
      }
    }
    app.previewImg(url)

  },
  infoStatus(options) {
    if (this.data.isLoading === true) {
      return
    }
    this.setData({
      isLoading: true
    })
    // 页面初始化 options为页面跳转所带来的参数
    var url = config.BASE + config.API.order_query
    var user_order_id = parseInt(options.user_order_id)
    var tip = ''
    var data = {
      user_order_id: user_order_id
    }
    var that = this
    request.post(url, data).then((res) => {
      if (res.ret == 0) {
        var orderDetail = res.body
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
          var list = []
          var tip = ''
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
          for (var i in required) {
            if (required[i].elec_id == options.elec_id) {
              curr_elec_id_info = required[i]
              tip = curr_elec_id_info.attention
              if (curr_elec_id_info.elec_name != '') {
                wx.setNavigationBarTitle({
                  title: curr_elec_id_info.elec_name
                })
              }
              break;
            }
          }
          var no_url_pos = that.data.no_url_pos
          var curr_elec_status = that.data.curr_elec_status
          if (curr_elec_id_info.upload) {
            for (var j in curr_elec_id_info.upload) {
              var curr_upload = curr_elec_id_info.upload[j]
              curr_upload.memoArr = curr_upload.memo.split('\n')
              if (curr_upload.url == '' && curr_upload.elec_status == 1) {
                no_url_pos = curr_upload.pos
              }

              list.push({ elec_status: curr_upload.elec_status, src: curr_upload.url, pos: curr_upload.pos })

              //curr_elec_id_info.upload[j].memoArr = ''
            }
          }
          for (var j in curr_elec_id_info.upload) {
            var curr_upload = curr_elec_id_info.upload[j]
            if (curr_upload.elec_status == 2 && curr_applicant.applicant_status == 2) {
              curr_elec_status = true
              break
            }
          }

          var isNopass = false
          for (var l in list) {
            if (list[l].elec_status == 3 || (list[l].elec_status == 1 && curr_applicant.applicant_status == 2)) {
              isNopass = true
              break;
            } else {
              isNopass = false
              continue;
            }
          }
          if ((curr_applicant.applicant_status == 1 || curr_applicant.applicant_status == 3) && curr_elec_id_info.upload.length <= 0 && (orderDetail.order_status != 1 || orderDetail.order_status != 5)) {
            that.setData({
              btn_img: 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/applicant/nocamera.png',
              nocamera: true
            })
          }
          var curr_action = that.data.curr_action
          if (no_url_pos > 0) {
            curr_action = 'chooseImage'
          }
          that.setData({
            List: list,
            tip: tip,
            order_detail: orderDetail,
            pos: list.length,
            curr_elec_id_info: curr_elec_id_info,
            isLoading: false,
            isNopass: isNopass,
            curr_action: curr_action,
            no_url_pos: no_url_pos,
            curr_elec_status: curr_elec_status
          })
        }
      }
    }).catch((err) => {
      console.error(err)
    })

    this.setData({
      tip: options.attention,
      url_params: options
    })
    // 页面初始化 options为页面跳转所带来的参数
  },
  onLoad: function (options) {
    this.infoStatus(options)
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
  chooseImage: function (e) {
    var id = e.target.id
    console.log(id)
    var idx = id.split('_')[1]
    console.log(idx, 'idx')
    console.log(id, idx)
    if (idx == 'add') {
      idx = this.data.no_url_pos
    }
    var curr_elec_id_info = this.data.curr_elec_id_info

    var that = this
    var url_params = this.data.url_params
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (file) {
        var chooseFile = file
        var data = {};
        data.order_applicant_id = parseInt(url_params.order_applicant_id)
        data.user_order_id = parseInt(url_params.user_order_id)
        data.elec_id = parseInt(url_params.elec_id)
        data.suffix = (file.tempFilePaths[0]).split('.')[1]
        if (idx == 0) {
          idx = 1
        }
        data.pos = parseInt(idx)
        console.log(data, 'postdata')
        var url = config.BASE + config.API.upload_elec_request
        request.post(url, data)
          .then(function (res) {
            if (res.ret === 0) {
              var body = res.body
              console.log('body', body) //响应数据
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = file.tempFilePaths
              var host = config.HTTP + body.oss_out
              request.uploadFile2Aliyun(host, tempFilePaths[0], body.key, body.callback, body.signature, body.policy, body.access_key)
                .then((fileData) => {
                  console.log(fileData)
                  var img = fileData.data.body.url
                  if (img) {

                    var params = url_params
                    if (!fun.isEmptyObject(params)) {
                      that.infoStatus(params)
                    }
                    var key = params.user_order_id + '_' + params.order_applicant_id + '_' + params.elec_id
                    app.globalData.materialUpload[key] = true
                  }
                }).catch(function (err) {
                  console.error(err)
                })
            }
          }).catch(function (err) {
            console.error(err)
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