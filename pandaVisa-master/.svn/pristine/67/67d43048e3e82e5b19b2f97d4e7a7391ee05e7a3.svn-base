// pages/order/order-info.js
var app = getApp();
var config = require('../config.js')
var request = require('../request.js')
Page({
  data: {
    date: '2017-01-01',
    jobid: ['在职人员', '自由职业者', '退休人员', '在校学生', '学龄前儿童'],
    jobIndex: 0,
    formArray: [{ show: 1, inputvalue: '', jobIndex: 0 }],
    visa_product_id: 0
  },
  onLoad: function (options) {
    this.setData({
      visa_product_id: parseInt(options.visa_product_id)
    })
    // 页面初始化 options为页面跳转所带来的参数
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
  },
  bindTimeChange: function (e) {
  },
  //身份证选择
  bindPickerChange: function (e) {
    var id = e.target.id;
    var idx = id.split('_')
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var formArr = this.data.formArray
    formArr[idx[1]].jobIndex = parseInt(e.detail.value)
    this.setData({
      formArray: formArr
    })
    console.log(formArr)
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  newAddApply: function (e) {
    var formArr = []
    formArr = this.data.formArray
    formArr.push({ show: 1, jobIndex: 0, inputvalue: '' })
    this.setData({
      formArray: formArr
    })
  },
  delApply: function (e) {
    var id = e.target.id
    console.log(id)
    var idx = id.split('_')
    var formArr = []
    formArr = this.data.formArray
    console.log(formArr)
    formArr[idx[1]].show = 0
    formArr[idx[1]].jobIndex = 0
    this.setData({
      formArray: formArr
    })
  },
  nameInput: function (e) {
    var id = e.target.id
    var idx = id.split('_')
    var formArray = this.data.formArray
    formArray[idx[1]].inputvalue = e.detail.value
    this.setData({
      formArray: formArray
    })
  },
  nextStart: function (e) {
    var that = this
    var data = {}
    var applicant = []
    var formArray = this.data.formArray
    console.log(formArray)
    for (var i in formArray) {
      if (formArray[i].show == 1) {
        applicant.push({ applicant_name: formArray[i].inputvalue, identity_id: parseInt(formArray[i].jobIndex) })
      }
    }
    if (applicant[0].applicant_name == '') {
      wx.showToast({
        title: '填写中文姓名',
        icon: 'success',
        duration: 2000
      })
      return
    }
    var error = []
    for (var i in formArray) {
      if (formArray[i].inputvalue == '' && formArray[i].show == 1) {
        wx.showToast({
          title: '填写中文姓名',
          icon: 'success',
          duration: 2000
        })
        error.push(1)
        break;
      }
    }
    if (error.length > 0) {
      return
    }
    data.depart_date = this.data.date
    data.visa_product_id = parseInt(this.data.visa_product_id)
    data.applicant = applicant
    request.post(config.BASE + config.API.order_add, data)
      .then((res) => {
        if (res.ret == 0) {
          var user_order_id = res.body.user_order_id
          wx.redirectTo({
            url: '/pages/apply/apply-data?step=1&user_order_id=' + user_order_id
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'success',
            duration: 2000
          })
        }
      })

  }
})