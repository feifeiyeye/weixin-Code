// pages/apply/photo/marriage.js
var config = require('../../config.js')
var request = require('../../request.js')
var fun = require('../../functions.js')
var app = getApp()
Page({
  data: {
    //radio信息
    radioItems: [
      { name: '1', value: '未婚', show: 'hide' },
      { name: '2', value: '已婚', show: '', checked: true },
      { name: '3', value: '离异', show: 'hide' },
      { name: '4', value: '丧偶', show: 'hide' },
    ],
    hidden: false,
    url_params: {},
    marry_img: '',
    divorce_img: '',
    marry_hide: 'hide',
    btn_hide: '',
    btn_divorce_hide: '',
    divorce_hide: 'hide',
    applicant: {},
    curr_marriage_id: 2,
    curr_elec_id_info: {},
    isLoading: false,
    order_detail: {},
    curr_applicant:{}
  },
  previewImg: function (e) {
    console.log(e)
    var id = e.target.id
    var idx = id.split('_')[0]
    var url = ''
    if (idx == 'marry') {
      url = this.data.marry_img
    } else {
      url = this.data.divorce_img
    }
    app.previewImg(url)
  },
  radioChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    var params = this.data.url_params
    var radioItems = this.data.radioItems
    var key = params.user_order_id + '_' + params.order_applicant_id + '_' + params.elec_id
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].value) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
        changed['radioItems[' + i + '].show'] = ''
        this.setData({
          curr_marriage_id: this.data.radioItems[i].name
        })
      } else {
        changed['radioItems[' + i + '].checked'] = false
        changed['radioItems[' + i + '].show'] = 'hide'
      }
    }
    if (checked == '丧偶' || checked == '未婚') {
      app.globalData.materialUpload[key] = true
    } else if (checked == '离异' || checked == '已婚') {
      app.globalData.materialUpload[key] = false
    }
    console.log(app.globalData.materialUpload)
    this.setData(changed)
  },
  selectMarriage: function (e) {
    var id = e.target.id
    var that = this
    console.log(id)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log("imagePath:" + tempFilePaths)
        var path = res.tempFilePaths[0]

        var url = config.BASE + config.API.upload_elec_request
        var data = {}
        var params = that.data.url_params
        data.elec_id = parseInt(params.elec_id)
        data.pos = 1
        data.order_applicant_id = parseInt(params.order_applicant_id)
        var suffixs = (path).split('.')
        var suffix = suffixs[(suffixs.length - 1)]
        data.suffix = suffix
        data.user_order_id = parseInt(params.user_order_id)
        request.post(url, data)
          .then((res) => {
            console.log(res, 'res')
            if (res.ret == 0) {
              return res.body
            }
            return {}
          }).then((upData) => {
            console.log('up', upData)
            var aliyun_host = 'https://' + upData.oss_out
            request.uploadFile2Aliyun(aliyun_host, tempFilePaths[0], upData.key, upData.callback, upData.signature, upData.policy)
              .then((aliData) => {
                var url_img = aliData.data.body.url
                if (id.indexOf('marry') >= 0) {
                  that.setData({
                    marry_img: url_img,
                    marry_hide: '',
                    btn_hide: 'hide'
                  })
                } else if (id.indexOf('divorce') >= 0) {
                  that.setData({
                    divorce_img: url_img,
                    divorce_hide: '',
                    btn_divorce_hide: 'hide'
                  })
                }
                var params = that.data.url_params
                if (!fun.isEmptyObject(params)) {
                  that.infoStatus(params)
                }
                var key = params.user_order_id + '_' + params.order_applicant_id + '_' + params.elec_id
                app.globalData.materialUpload[key] = true
              }).catch((err) => {
                console.error(err)
              })
          })
      }
    })
  },
  submit: function (e) {

    var that = this
    var marriageStatus = this.data.radioItems
    var curr_marriage_id = this.data.curr_marriage_id
    var params = this.data.url_params
    var url = config.BASE + config.API.applicant_marital_status_add
    var curr_elec_id_info = this.data.curr_elec_id_info
    var data = {
      elec_id: parseInt(params.elec_id),
      marital_status: parseInt(curr_marriage_id),
      order_applicant_id: parseInt(params.order_applicant_id),
      user_order_id: parseInt(params.user_order_id)
    }


    var marry_img = this.data.marry_img
    var divorce_img = this.data.divorce_img

    var formId = e.detail.formId
    if (curr_marriage_id > 0 && this.data.order_detail.order_status == 1) {
      if (curr_marriage_id == 2 && !marry_img) {
        app.toastWarn('请上传结婚证!')
        return
      }
      if (!divorce_img && curr_marriage_id == 3) {
        app.toastWarn('请上传离婚证!')
        return
      }
      request.post(url, data, { wxformid: formId }).then((res) => {
        if (res.ret == 0) {
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


  },
  infoStatus: function (options) {
    if (this.data.isLoading === true) {
      return
    }
    this.setData({
      url_params: options,
      isLoading: true
    })
    var order_applicant_id = options.order_applicant_id
    var url = config.BASE + config.API.order_query
    var that = this
    request.post(url, { user_order_id: parseInt(options.user_order_id) }).then((res) => {
      if (res.ret == 0) {
        var order_detail = res.body
        that.setData({
          order_detail: order_detail
        })
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
          for (var i in required) {
            if (required[i].elec_id == options.elec_id) {
              curr_elec_id_info = required[i]
              break;
            }
          }
          console.log('marry', curr_elec_id_info.upload[0].url, curr_elec_id_info, curr_applicant.marital_status)
          if (curr_elec_id_info.upload.length > 0) {
            var radioItems = that.data.radioItems
            var marry_img = ''
            var divorce_img = ''
            var changed = {
              'radioItems[0].checked': false,
              'radioItems[0].show': 'hide',
              'radioItems[1].checked': false,
              'radioItems[1].show': 'hide',
              'radioItems[2].checked': false,
              'radioItems[2].show': 'hide',
              'radioItems[3].checked': false,
              'radioItems[3].show': 'hide',
            }
            if (curr_applicant.marital_status == 1) {
              changed['radioItems[0].checked'] = true
              changed['radioItems[0].show'] = ''
              that.setData({
                curr_marriage_id: radioItems[0].name
              })
            } else if (curr_applicant.marital_status == 2) {
              changed['radioItems[1].checked'] = true
              changed['radioItems[1].show'] = ''
              marry_img = curr_elec_id_info.upload[0].url
              that.setData({
                marry_img: marry_img,
                marry_hide: '',
                btn_hide: 'hide',
                curr_marriage_id: radioItems[1].name
              })

            } else if (curr_applicant.marital_status == 3) {
              divorce_img = curr_elec_id_info.upload[0].url

              changed['radioItems[2].checked'] = true
              changed['radioItems[2].show'] = ''
              that.setData({
                divorce_img: divorce_img,
                divorce_hide: '',
                btn_divorce_hide: 'hide',
                curr_marriage_id: radioItems[2].name
              })
            } else if (curr_applicant.marital_status == 4) {
              changed['radioItems[3].checked'] = true
              changed['radioItems[3].show'] = ''
              that.setData({
                curr_marriage_id: radioItems[3].name
              })
            } else {

            }

            if (curr_elec_id_info.upload[0].special_code == 3 && curr_applicant.marital_status == 1) {
              changed['radioItems[0].checked'] = true
              changed['radioItems[0].show'] = ''

              that.setData({
                curr_marriage_id: radioItems[0].name
              })
            } else if (curr_elec_id_info.upload[0].special_code == 4 && curr_applicant.marital_status == 4) {
              changed['radioItems[3].checked'] = true
              changed['radioItems[3].show'] = ''
              that.setData({
                curr_marriage_id: radioItems[3].name
              })
            }
            console.log(changed)
            for (var k in curr_elec_id_info.upload) {
              curr_elec_id_info.upload[k].memoArr = curr_elec_id_info.upload[k].memo.split('\n')
            }
            changed['curr_elec_id_info'] = curr_elec_id_info
            changed['isLoading'] = false
            changed['curr_applicant'] = curr_applicant
            that.setData(changed)
          }
        }
      }
      that.setData({
        isLoading: false
      })
    })
    console.log(options)
  },
  onLoad: function (options) {
    this.infoStatus(options)
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