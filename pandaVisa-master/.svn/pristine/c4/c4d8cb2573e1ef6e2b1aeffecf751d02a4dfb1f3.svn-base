// pages/apply/photo/idcard.js
var config = require('../../config.js')
var request = require('../../request.js')
var Crypto = require('../../../utils/crypto/crypto.js')
var Base64 = require('../../../utils/base64.js')
var queryString = require('../../../utils/query-string/index.js')
var fun = require('../../functions.js')
var oss = {}
var app = getApp()
Page({
  data: {
    idCardR: 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/sample/id_negative.png',
    idCardZ: 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/sample/id_positive.png',
    idCardZSample: 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/sample/id_positive.png',
    idCardRSample: 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/sample/id_negative.png',
    btn_hide: '',
    cer_hide: 'hide',
    btn_r_hide: '',
    cer_r_hide: 'hide',
    isSelectPhoto: true,
    curr_elec_id_info: {},
    //checkbox信息
    noItems: [
      { name: '', value: ' ' },
    ],
    //radio信息
    radioItems: [
      { name: '1', show: 0, value: '未满16周岁，尚未办理身份证', checked: 'true' },
      { name: '2', show: 0, value: '身份证丢失' },
    ],
    radioHide: 'hide',
    btnImgCamera: 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/applicant/camera.png',
    order_applicant_id: 0,
    user_order_id: 0,
    tip: '',
    url_params: {},
    camera: 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/applicant/camera.png',
    nocamera: 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/applicant/nocamera.png',
    borderStyle: 'border: 1rpx solid #ff5a60',
    isLoading: false,
    order_detail: {},
    curr_applicant: {}
  },
  infoStatus(options) {
    if (this.data.isLoading === true) {
      return
    }
    this.setData({
      isLoading: true
    })
    var idCardA = app.globalData.idCardInfoA
    var idCardB = app.globalData.idCardInfoB
    var order_applicant_id = parseInt(options.order_applicant_id)
    var url = config.BASE + config.API.order_query
    var params = this.data.url_params
    var that = this
    request.post(url, { user_order_id: parseInt(options.user_order_id) }).then((res) => {
      if (res.ret == 0) {
        var order_detail = res.body
        var applicant = order_detail.applicant
        var curr_applicant = {}
        for (var i in applicant) {
          if (applicant[i].order_applicant_id == order_applicant_id) {
            curr_applicant = applicant[i]
            break;
          }
        }
        if (!fun.isEmptyObject(curr_applicant)) {
          var required = curr_applicant.material.material_required
          var curr_elec_id_info = {}
          var tip = ''
          for (var i in required) {
            if (required[i].elec_id == options.elec_id) {
              curr_elec_id_info = required[i]
              tip = curr_elec_id_info.attention
              break;
            }
          }

          if (curr_elec_id_info.upload.length > 0) {
            if (curr_elec_id_info.upload[0].url && curr_elec_id_info.upload[0].pos == 1) {
              that.setData({
                idCardZ: curr_elec_id_info.upload[0].url,
                btn_hide: 'hide',
                cer_hide: ''
              })
            } else if (curr_elec_id_info.upload.length == 2) {
              var idCardZ = ''
              if (curr_elec_id_info.upload[0].pos == 1) {
                idCardZ = curr_elec_id_info.upload[0].url
              } else if (curr_elec_id_info.upload[0].pos == 2) {
                idCardR = curr_elec_id_info.upload[0].url
              } else if (curr_elec_id_info.upload[1].pos == 1) {
                idCardZ = curr_elec_id_info.upload[1].url
              } else if (curr_elec_id_info.upload[1].pos == 2) {
                idCardR = curr_elec_id_info.upload[1].url
              }
              var key = params.user_order_id + '_' + params.order_applicant_id + '_' + params.elec_id
              if (idCardR) {
                app.globalData.materialUpload[key + '_a'] = true
                that.setData({
                  idCardZ: idCardR,
                  btn_r_hide: 'hide',
                  cer_r_hide: ''
                })
              }
              if (idCardZ) {
                app.globalData.materialUpload[key + '_b'] = true
                that.setData({
                  idCardZ: idCardZ,
                  btn_hide: 'hide',
                  cer_hide: ''
                })
              }


            } else if (curr_elec_id_info.upload[0].url && curr_elec_id_info.upload[0].pos == 2) {
              that.setData({
                idCardR: curr_elec_id_info.upload[0].url,
                btn_r_hide: 'hide',
                cer_r_hide: ''
              })
            }
            else if (!fun.isEmptyObject(idCardA)) {
              this.setData({
                idCardZ: idCardA.url,
                btn_hide: 'hide',
                cer_hide: ''
              })
            }

            if (curr_elec_id_info.upload[0].special_code == 1 || curr_elec_id_info.upload[0].special_code == 2) {
              var noItems = that.data.noItems
              noItems[0].checked = true

              var radioItems = that.data.radioItems
              if (curr_elec_id_info.upload[0].special_code == 1) {
                radioItems[0].checked = true
                radioItems[1].checked = false
              } else if (curr_elec_id_info.upload[0].special_code == 2) {
                radioItems[1].checked = true
                radioItems[0].checked = false
              }
              that.setData({
                noItems: noItems,
                radioItems: radioItems,
                radioHide: '',
                camera: that.data.nocamera,
                borderStyle: 'border: 1rpx solid #e9e9e9',
                btn_hide: '',
                cer_hide: 'hide',
                btn_r_hide: '',
                cer_r_hide: 'hide'
              })
            }

            if (curr_elec_id_info.upload[1].url) {
              that.setData({
                btn_r_hide: 'hide',
                cer_r_hide: '',
                idCardR: curr_elec_id_info.upload[1].url,
              })
            } else {
              if (!fun.isEmptyObject(idCardB)) {
                this.setData({
                  idCardR: idCardB.url,
                  btn_r_hide: 'hide',
                  cer_r_hide: ''
                })
              }
            }
            if (curr_elec_id_info.upload.length == 1) {
              curr_elec_id_info.upload[0].memoArr = curr_elec_id_info.upload[0].memo.split('\n')
            } else if (curr_elec_id_info.upload.length == 2) {
              curr_elec_id_info.upload[0].memoArr = curr_elec_id_info.upload[0].memo.split('\n')
              curr_elec_id_info.upload[1].memoArr = curr_elec_id_info.upload[1].memo.split('\n')
            }
            that.setData({
              tip: tip,
              curr_elec_id_info: curr_elec_id_info
            })
          }
        }
        that.setData({
          isLoading: false,
          order_detail: order_detail,
          curr_applicant: curr_applicant
        })
      }
    })
    this.setData({
      url_params: options,
      user_order_id: parseInt(options.user_order_id),
      order_applicant_id: parseInt(options.order_applicant_id),
    })
  },
  onLoad: function (options) {
    this.infoStatus(options)
  },
  //chcekbox
  noChange: function (e) {
    var checked = e.detail.value

    var changed = {}
    for (var i = 0; i < this.data.noItems.length; i++) {
      if (checked.indexOf(this.data.noItems[i].name) !== -1) {
        changed['noItems[' + i + '].checked'] = true
        this.setData({
          radioHide: '',
          camera: this.data.nocamera,
          isSelectPhoto: false,
          borderStyle: 'border: 1rpx solid #e9e9e9',
          btn_hide: '',
          cer_hide: 'hide',
          btn_r_hide: '',
          cer_r_hide: 'hide'
        })
      } else {
        changed['noItems[' + i + '].checked'] = false
        this.setData({
          radioHide: 'hide',
          camera: 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/applicant/camera.png',
          borderStyle: 'border: 1rpx solid #ff5a60',
          isSelectPhoto: true
        })
      }
    }
    this.setData(changed)
  },
  //radio
  radioChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].value) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  previewImg: function (e) {
    var id = e.target.id
    var idx = id.split('_')[0]
    console.log(id)
    var curr_elec_id_info = this.data.curr_elec_id_info
    if (curr_elec_id_info)
      if (idx == 'idCardZ') {
        app.previewImg(this.data.idCardZ)
      } else if (idx == 'idCardR') {
        app.previewImg(this.data.idCardR)
      }

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    var opt = this.data.url_params
    if (!fun.isEmptyObject(opt)) {
      this.infoStatus(opt)
    }
  },
  onHide: function () {
    app.hideLoading()
  },
  onUnload: function () {
    // 页面关闭
    var params = this.data.url_params
    if (!fun.isEmptyObject(app.globalData.idCardInfoA) && !fun.isEmptyObject(app.globalData.idCardInfoB)) {
      var key = params.user_order_id + '_' + params.order_applicant_id + '_' + params.elec_id
      app.globalData.materialUpload[key] = true
    }
  },
  selectRIdcard: function (e) {
    // if (!this.data.isSelectPhoto) {
    //   return
    // }
    var idstr = e.target.id
    var id = idstr.split('_')[1] + ''
    var idCard = this.data.noItems
    if (idCard[0].checked) {
      return
    }
    // if (id == 'R') {
    //   if (fun.isEmptyObject(app.globalData.idCardInfoA) && this.data.btn_hide == '') {
    //     wx.showToast({
    //       title: '请先上传身份证正面',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //     return
    //   }
    // }

    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (file) {
        console.log(file, 'chooseImage');
        var data = {}
        var action = { Z: 1, R: 2 }
        var url_params = that.data.url_params
        data.pos = action[id]
        data.elec_id = parseInt(url_params.elec_id)
        data.order_applicant_id = that.data.order_applicant_id
        var suffix = (file.tempFilePaths[0]).split('.')[1]
        data.suffix = suffix
        data.user_order_id = that.data.user_order_id
        var url = config.BASE + config.API.upload_elec_request
        var chooseFile = file

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = chooseFile.tempFilePaths
        // 身份证扫描识别接口
        var id_card_scan_url = config.API.id_card_scan
        app.toastWarn({ type: 'Loading', title: 'Loading', duration: 30000 })
        request.uploadFile(id_card_scan_url, tempFilePaths[0]).then((res) => {
          if (!res.data) {
            app.toastWarn({
              title: '信息不完整，请重新拍摄!',
              icon: 'success',
              duration: 2000
            })
            return
          }
          return JSON.parse(res.data)
        }).then((scanTmp) => {
          console.log(scanTmp)
          if (id == 'Z' && (scanTmp.type == '未知类型' || !scanTmp.id_number && !scanTmp.address)) {
            app.toastWarn({
              title: '信息不完整，请重新拍摄!',
              icon: 'success',
              duration: 2000
            })
            return
          }
          if (id == 'R' && (scanTmp.type == '未知类型' || !scanTmp.issue_authority)) {
            app.toastWarn({
              title: '信息不完整，请重新拍摄!',
              icon: 'success',
              duration: 2000
            })
            return
          }

          if (!fun.isEmptyObject(scanTmp)) {
            scanTmp.url = tempFilePaths[0]
            if (id == 'Z') {
              app.globalData.idCardInfoA = scanTmp
              wx.navigateTo({
                url: '/pages/apply/photo/idcard-reada?' + queryString.stringify(url_params),
                success: function (res) {
                  that.setData({
                    idCardZ: tempFilePaths[0],
                    btn_hide: 'hide',
                    cer_hide: ''
                  })
                  app.hideLoading()
                  // success
                },
                fail: function () {
                  // fail
                  app.hideLoading()
                },
                complete: function () {

                  app.hideLoading()
                  // complete
                }
              })
            } else if (id == 'R') {
              app.globalData.idCardInfoB = scanTmp
              wx.navigateTo({
                url: '/pages/apply/photo/idcard-readb?' + queryString.stringify(url_params),
                success: function (res) {
                  // success
                  that.setData({
                    idCardR: tempFilePaths[0],
                    btn_r_hide: 'hide',
                    cer_r_hide: ''
                  })
                  app.hideLoading()
                },
                fail: function () {
                  // fail
                  app.hideLoading()
                },
                complete: function () {

                  app.hideLoading()
                  // complete
                }
              })
            }
          }
        })
      },
      complete: function (res) {
      }
    })
  },
  submit: function () {
    var that = this
    var marriageStatus = this.data.radioItems
    var curr_marriage_id = this.data.curr_marriage_id
    var params = this.data.url_params
    var url = config.BASE + config.API.applicant_elec_special_handle
    var idCard = this.data.noItems
    var idCardStatus = this.data.radioItems
    var special_code = 1
    if (idCard[0].checked) {
      if (idCardStatus[0].checked) {
        special_code = 1
      } else if (idCardStatus[1].checked) {
        special_code = 2
      }
      var data = {
        elec_id: parseInt(params.elec_id),
        special_code: parseInt(special_code),
        order_applicant_id: parseInt(params.order_applicant_id),
        user_order_id: parseInt(params.user_order_id)
      }
      request.post(url, data).then((res) => {
        if (res.ret == 0) {
          var key1 = params.user_order_id + '_' + params.order_applicant_id + '_' + params.elec_id + '_a'
          var key2 = params.user_order_id + '_' + params.order_applicant_id + '_' + params.elec_id + '_b'
          app.globalData.materialUpload[key1] = true
          app.globalData.materialUpload[key2] = true
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
        }
      })
    } else {
      var params = this.data.url_params
      var key = params.user_order_id + '_' + params.order_applicant_id + '_' + params.elec_id
      if (!fun.isEmptyObject(app.globalData.idCardInfoA) && !fun.isEmptyObject(app.globalData.idCardInfoB)) {

        app.globalData.materialUpload[(key + '_a')] = true
        app.globalData.materialUpload[(key + '_b')] = true
      } else {
        app.globalData.materialUpload[(key + '_a')] = false
        app.globalData.materialUpload[(key + '_b')] = false
      }
      console.log('materialUpload', app.globalData.materialUpload)
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
    }
  }
})