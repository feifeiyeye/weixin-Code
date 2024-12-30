// pages/apply/apply-data.js、
var config = require('../config.js')
var request = require('../request.js')
var app = getApp()
var fun = require('../functions.js')
Page({
  data: {
    //radio信息
    radioItems: [
      { name: '1', value: '个人', checked: 'true' },
      { name: '2', value: '公司' },
    ],
    hidden: false,
    //checkbox信息
    checkboxItems: [
      { name: '1', value: '支付订单代表阅读并同意', checked: 'true' },
    ],
    borderColor: ['r', 'w', 'b', 'w', 'r', 'w', 'b', 'w', 'r', 'w', 'b', 'w', 'r', 'w', 'b', 'w', 'r', 'w', 'b', 'w', 'r', 'w', 'b', 'w', 'r', 'w', 'b', 'w'],
    noItems: [
      { name: '', value: '' },
    ],
    invoice: 'hide',
    //modal
    modalHidden: true,
    applicant: [],
    identityName: ['在职人员', '自由职业者', '退休人员', '在校学生', '学龄前儿童'],
    order_applicant_id: 0,
    order_detail: {},
    step_class: ['li_on', '', ''],
    step1: '',
    step2: 'hide',
    step3: 'hide',
    url_params: {},
    userAddress: {},
    sysConfig: {},
    invoice_price: 0,
    pay_price: 0,
    applyTableErr: {},
    invoice_header: '',
    space: 'space-between',
    step_name: ['资料上传', '填写申请表', '订单确认'],
    areaData: {},
    isLoading: false
  },
  inputInvoice: function (e) {
    this.setData({
      invoice_header: e.detail.value
    })
  },
  onLoad: function (options) {

    console.log(options)
    var step = options.step
    var step_class = this.data.step_class
    for (var i in step_class) {
      step_class[i] = ''
    }
    if (options.step == 1) {
      step_class[0] = 'li_on'
      this.setData({
        step1: "",
        step2: 'hide',
        step3: 'hide',
        step_class: step_class
      })
    } else if (step == 2) {
      wx.setNavigationBarTitle({
        title: '填写申请表'
      })
      step_class[1] = 'li_on'
      this.setData({
        step1: "hide",
        step2: '',
        step3: 'hide',
        step_class: step_class
      })
    } else if (step == 3) {
      wx.setNavigationBarTitle({
        title: '确认订单'
      })
      step_class[2] = 'li_on'
      this.setData({
        step1: "hide",
        step2: 'hide',
        step3: '',
        step_class: step_class
      })
    }
    this.setNavTitle(options.step - 1)
    this.setData({
      url_params: options,
      sysConfig: app.globalData.sysConfig
    })
    // 页面初始化 options为页面跳转所带来的参数
    var url = config.BASE + config.API.order_query
    var query_url = config.BASE + config.API.applicant_application_query
    var data = { user_order_id: parseInt(options.user_order_id) }
    var that = this
    request.post(url, data).then((res) => {
      var applicant = res.body.applicant

      var pay_price = 0
      for (var i in applicant) {
        pay_price += applicant[i].sell_price
      }
      if (res.body.visa_application_id == 0) {
        that.setData({
          step_name: ['资料上传', '订单确认'],
          space: 'space-around'
        })
      }
      that.setData({
        applicant: applicant,
        order_detail: res.body,
        pay_price: parseFloat(pay_price)
      })
      app.globalData.orderDetail = res.body
      console.log(res)
      return applicant
    }).then((applicant) => {
    }).catch((err) => {
      console.log(err)
    })
    this.loadDefAddress()
  },
  loadDefAddress: function () {
    var quer_address_url = config.BASE + config.API.user_address_query
    var that = this
    var isLoading = this.data.isLoading
    if (isLoading === false) {
      that.setData({
        isLoading: true
      })
      app.getAreaJson(function (areaData) {
        that.setData({
          areaData: areaData
        })
        request.post(quer_address_url, {}).then((res) => {
          if (res.ret == 0) {
            var userAddress = res.body[0]
            userAddress.detail_address = areaData['86'][userAddress.province_code] + areaData[userAddress.province_code][userAddress.city_code] + areaData[userAddress.city_code][userAddress.counties_code] + userAddress.detail_address
            that.setData({
              userAddress: userAddress,
              isLoading: false
            })
          }
        })
      })
    }

  },
  setApplyErr: function (applyTableErr) {
    console.log(applyTableErr)
    this.setData({
      applyTableErr: applyTableErr
    })
  },
  addAddress: function () {
    var params = this.data.url_params
    wx.navigateTo({
      url: '/pages/apply/addr/addr-list',
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

  setNavTitle: function (e) {
    var step_name = this.data.step_name
    wx.setNavigationBarTitle({
      title: step_name[e]
    })
  },

  nextStart: function () {
    var orderDetail = app.globalData.orderDetail
    var applicant = orderDetail.applicant
    var err = []
    for (var i in applicant) {
      var required = applicant[i].material.material_required
      console.log(required)
      for (var j in required) {
        if (required[j].attr == 0 && fun.isEmptyObject(required[j].upload)) {
          err.push(1)
        }
      }
    }
    var order_detail = this.data.order_detail
    var url = config.BASE + config.API.order_upload_check
    var user_order_id = parseInt(this.data.url_params.user_order_id)
    var data = {
      user_order_id: user_order_id
    }
    var that = this
    request.post(url, data)
      .then((res) => {
        console.log(res)
        if (res.ret == -1) {
          app.toastWarn({
            title: res.msg,
            icon: "success",
            duration: 2000
          })
        } else if (res.ret == 0) {
          var step_class = that.data.step_class
          for (var i in step_class) {
            step_class[i] = ''
          }
          if (order_detail.visa_application_id == 0) {

            var step_name = that.data.step_name
            step_class[step_name.length - 1] = 'li_on'
            that.setNavTitle(step_name.length - 1)
            that.setData({
              step1: "hide",
              step2: 'hide',
              step3: '',
              step_class: step_class,
              step_name: ['资料上传', '订单确认'],
              space: 'space-around'
            })

          } else if (order_detail.visa_application_id > 0) {
            step_class[1] = 'li_on'
            that.setNavTitle(1)
            that.setData({
              step1: "hide",
              step2: '',
              step3: 'hide',
              step_class: step_class
            })
          }

        }
      })
  },
  callPhone: function () {
    app.callPhone()
  },
  next2: function () {

    var url = config.BASE + config.API.order_upload_check
    var user_order_id = parseInt(this.data.url_params.user_order_id)
    var data = {
      user_order_id: user_order_id
    }
    var that = this
    request.post(url, data)
      .then((res) => {
        console.log(res, res.ret)
        if (res.ret != 0) {
          app.toastWarn(res.msg)
          return
        } else if (res.ret == 0) {
          var step_class = that.data.step_class
          for (var i in step_class) {
            step_class[i] = ''
          }
          step_class[2] = 'li_on'
          that.setNavTitle(2)
          that.setData({
            step1: "hide",
            step2: 'hide',
            step3: '',
            step_class: step_class
          })
        }
      })
  },
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
  //chcekbox
  noChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    var sysConfig = this.data.sysConfig
    var applicant = this.data.applicant
    var pay_price = 0
    for (var i in applicant) {
      pay_price += applicant[i].sell_price
    }
    for (var i = 0; i < this.data.noItems.length; i++) {
      if (checked.indexOf(this.data.noItems[i].name) !== -1) {
        changed['noItems[' + i + '].checked'] = true
        changed['invoice'] = ''
        var invoice_price = parseFloat(sysConfig.invoice_price)
        pay_price += parseFloat(invoice_price)
      } else {
        changed['noItems[' + i + '].checked'] = false
        changed['invoice'] = 'hide'
      }
    }
    console.log(pay_price)
    this.setData({
      pay_price: pay_price
    })
    this.setData(changed)
  },
  checkboxChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
        changed['checkboxItems[' + i + '].checked'] = true
      } else {
        changed['checkboxItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  submitPay: function (e) {
    var formId = e.detail.formId
    console.log(e.detail)
    var userAddress = this.data.userAddress
    var user_order_id = parseInt(this.data.url_params.user_order_id)
    if (!userAddress || fun.isEmptyObject(userAddress)) {
      app.toastWarn('添加收货地址')
      return
    }

    var invoice_type = 0
    var invoice_price = 0
    var sysConfig = this.data.sysConfig
    var invoice_header = e.detail.value.invoice_header
    if (this.data.noItems[0].checked) {
      if (invoice_header == '' || invoice_header == undefined) {
        app.toastWarn({
          title: '填写发票抬头',
          icon: 'success',
          duration: 2000
        })
        return
      }
      if (this.data.radioItems[0].checked) {
        invoice_type = 1
      }
      if (this.data.radioItems[1].checked) {
        invoice_type = 2
      }
      if (sysConfig) {
        invoice_price = sysConfig.invoice_price
      }
    } else {
      invoice_header = ''
    }
    var pay_price = this.data.pay_price
    var submit_data = {
      invoice_price: invoice_price,
      invoice_type: invoice_type,
      wxformid: formId,
      invoice_header: invoice_header,
      user_order_id: user_order_id,
      user_address_id: parseInt(userAddress.user_address_id),
      share_amount: 0,
      balance: 0
    }

    var order_submit_url = config.BASE + config.API.order_submit
    request.post(order_submit_url, submit_data, { wxformid: formId })
      .then((res) => {
        if (res.ret == 0) {
          request.wxPay(user_order_id)
        } else {
          app.toastWarn({
            title: res.msg,
            icon: 'success',
            duration: 2000
          })
        }

      }).catch((err) => {
        console.log(err)
      })
  },
  //modal
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  modalChange: function (e) {
    this.setData({
      modalHidden: true
    })
  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    if (!fun.isEmptyObject(app.globalData.currAddress) && app.globalData.currAddress != undefined) {
      var userAddress = app.globalData.currAddress
      if (userAddress.addressee != undefined || userAddress.addressee) {
        this.setData({
          userAddress: userAddress
        })
      }
    } else {
      this.loadDefAddress()
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