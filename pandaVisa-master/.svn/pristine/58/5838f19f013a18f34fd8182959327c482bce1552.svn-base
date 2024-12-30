// pages/apply/photo/idcard-readb.js
var app = getApp();
var config = require('../../config.js')
var request = require('../../request.js')
var fun = require('../../functions.js')
Page({
  data: {
    //日期
    date: '2016-09-01',
    start_date: '2001-01-01',
    end_date: '2016-09-01',
    idCardB: {},
    url_params: {},
    warning: {
      issue_authority: '',
      start_date: '',
      end_date: ''
    },
    idCheckBox: [
      { name: 'long', value: '长期有效' }
    ],
    longDisabled:false,
    dateClass:'pselect'
  },
  //日期
  bindDateChange: function (e) {
    var id = e.target.id
    var idCardB = this.data.idCardB
    if (id == "start_date") {
      var start_date = e.detail.value
      idCardB.start_date = start_date
      this.setData({
        start_date: start_date,
        idCardB: idCardB
      })
    } else {
      var end_date = e.detail.value
      idCardB.end_date = end_date
      this.setData({
        end_date: e.detail.value,
        idCardB: idCardB
      })
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var idCardB = app.globalData.idCardInfoB
    console.log(idCardB)
    var date = (idCardB.validity).split('-')
    var start_date = date[0]
    var end_date = date[1]
    start_date = start_date.replace(/\./g, '-')
    end_date = end_date.replace(/\./g, '-')
    idCardB.start_date = start_date
    idCardB.end_date = end_date
    this.setData({
      idCardB: idCardB,
      start_date: start_date,
      end_date: end_date,
      url_params: options
    })
    if (idCardB.end_date == '长期') {
      var idCheckBox = this.data.idCheckBox
      idCheckBox[0].checked = true
      this.setData({
        idCheckBox: idCheckBox,
        longDisabled:true,
        dateClass:'select'
      })
    }

  },
  inputValue: function (e) {
    var id = e.target.id
    var value = e.detail.value
    var idCardB = this.data.idCardB
    idCardB[id] = value
    this.setData({
      idCardB: idCardB
    })
  },
  saveInfo: function (e) {
    var idCardB = this.data.idCardB
    app.globalData.idCardInfoB = idCardB
    var idCardA = app.globalData.idCardInfoA
    var validity = []
    var start_date = (idCardB.start_date).split('-')
    var end_date = (idCardB.end_date).split('-')
    validity.push(start_date.join('.'))
    validity.push(end_date.join('.'))
    idCardB.validity = validity.join('-')
    console.log(idCardA, idCardB)
    var warning = this.data.warning
    var reg = /^(\d{4})-(\d{2})-(\d{2})$/
    if (!reg.test(idCardB.start_date)) {
      warning.start_date = 'warning'
      this.setData({
        warning: warning
      })
      app.toastWarn({
        title: '日期格式错误！',
        icon: 'success',
        duration: 2000
      })
      return
    }
    if (!reg.test(idCardB.end_date) && idCardB.end_date != '长期') {
      warning.end_date = 'warning'
      this.setData({
        warning: warning
      })
      app.toastWarn({
        title: '日期格式错误！',
        icon: 'success',
        duration: 2000
      })
      return
    }
    if (idCardB.end_date == '长期') {
      idCardB.end_date = '3333-12-31'
    }
    if (!idCardB.issue_authority) {
      for (var i in idCardB) {
        if (idCardB[i] === '') {
          warning[i] = 'warning'
        } else {
          warning[i] = ''
        }
      }
      this.setData({
        warning: warning
      })
      app.toastWarn({
        title: '信息不完整请检查标红项！',
        icon: 'success',
        duration: 2000
      })
      return
    } else {
      for (var i in idCardB) {
        warning[i] = ''
      }
      this.setData({
        warning: warning
      })
    }

    var upload_url = config.BASE + config.API.upload_elec_request
    var url_params = this.data.url_params
    var data = {}
    data.pos = 2 //反面
    data.elec_id = parseInt(url_params.elec_id)
    data.order_applicant_id = parseInt(url_params.order_applicant_id)
    var suffixs = (idCardB.url).split('.')
    var suffix = suffixs[(suffixs.length - 1)]
    data.suffix = suffix
    data.user_order_id = parseInt(url_params.user_order_id)
    app.showLoading()
    var formId = e.detail.formId
    request.post(upload_url, data, { wxformid: formId }).then((res) => {
      if (res.ret == 0) {
        var body = res.body
        var aliyun_host = config.HTTP + body.oss_out
        request.uploadFile2Aliyun(aliyun_host, idCardB.url, body.key, body.callback, body.signature, body.policy)
          .then((fileInfo) => {
            console.log(fileInfo, 'file info ', fileInfo.data.ret)
            if (fileInfo.data.ret == 0) {
              idCardB.url = fileInfo.data.body.url



              var applicant_id_card_add_url = config.BASE + config.API.applicant_id_card_add
              var data = {}
              if (!fun.isEmptyObject(idCardA)) {
                data = {
                  address: idCardA.address,
                  back_img: idCardB.url,
                  birthday: idCardA.birthday,
                  expire_date: idCardB.end_date,
                  front_img: idCardA.url,
                  fullname: idCardA.name,
                  gender: idCardA.sex,
                  id_no: idCardA.id_number,
                  issue_authority: idCardB.issue_authority,
                  issue_date: idCardB.start_date,
                  nation: idCardA.people,
                  order_applicant_id: parseInt(url_params.order_applicant_id),
                  user_order_id: parseInt(url_params.user_order_id)
                }
              } else {
                data = {
                  back_img: idCardB.url,
                  expire_date: idCardB.end_date,
                  issue_authority: idCardB.issue_authority,
                  issue_date: idCardB.start_date,
                  order_applicant_id: parseInt(url_params.order_applicant_id),
                  user_order_id: parseInt(url_params.user_order_id)
                }
              }

              request.post(applicant_id_card_add_url, data)
                .then((res) => {
                  console.log(res)
                  if (res.ret == 0) {
                    var key = url_params.user_order_id + '_' + url_params.order_applicant_id + '_' + url_params.elec_id + '_b'
                    app.globalData.materialUpload[key] = true
                    app.hideLoading()
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
                }).catch((err) => {
                  console.log(err)
                })

            }

          })
      }
    })
  },
  checkboxChange: function (e) {
    var checked = e.detail.value
    console.log(checked)
    var changed = {}
    for (var i = 0; i < this.data.idCheckBox.length; i++) {
      if (checked.length > 0) {
        changed['idCheckBox[' + i + '].checked'] = true
        changed['idCardB.end_date'] = '长期'
        changed['longDisabled'] = true,
        changed['dateClass'] = 'select'
      } else {
        changed['idCheckBox[' + i + '].checked'] = false
        changed['idCardB.end_date'] = '3333-12-31'
        changed['longDisabled'] = false
        changed['dateClass'] = 'pselect'
      }
    }
    this.setData(changed)
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    app.hideLoading()
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})