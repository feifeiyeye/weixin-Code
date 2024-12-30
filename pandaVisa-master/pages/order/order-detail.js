// pages/order/order-detail.js
var config = require('../config.js')
var request = require('../request.js')
var app = getApp()
Page({
  data: {
    user_order_id: 0,
    order_detail: {},
    orderStatus: ['已取消', '待上传资料', '待填写申请表', '待支付', '待邮寄资料', '办理中', '已发货', '待评价', '已完成'],
    bg_hide: 'hide',
    kd_info_class: 'hide',
    kdCompany: ['请选择快递公司', '顺丰快递', '中国邮政EMS', '申通快递', '韵达快递', '中通快递', '圆通快递', '百世汇通', '宅急送', '其他'],
    kd_index: 0,
    identity_material: ['在职人员', '自由职业者', '退休人员', '在校学生', '学龄前儿童'],
    identityApplyStatus: ['已取消', '等待预审', '预审未通过', '等待送签', '使馆审核中', '出签成功', '拒签', '退款中', '退款成功', '等待预约', '待确认', '等待接受资料', '等待培训', '待前往使馆', '拒签(待提交证明)', '拒签(等待审核)', '拒签(审核不通过)'],
    total_price: 0,
    kdOrderNo: 0,
    submitKdOk: false,
    kdInfoBtn: '',
    areaData: {},
    isLoading: false,
    options: {},
    borderColor: ['r', 'w', 'b', 'w', 'r', 'w', 'b', 'w', 'r', 'w', 'b', 'w', 'r', 'w', 'b', 'w', 'r', 'w', 'b', 'w', 'r', 'w', 'b', 'w', 'r', 'w', 'b', 'w'],
    express_detail:{}
  },
  onLoad: function (options) {
    var that = this
    this.infoStatus(options)
    app.getAreaJson(function (res) {
      that.setData({
        areaData: res
      })
      console.log(res)
    })
  },
  infoStatus: function (options) {
    this.setData({
      options: options
    })
    if (this.data.isLoading == true) {
      return
    }
    this.setData({
      isLoading: true
    })
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
    var user_order_id = parseInt(options.user_order_id)
    this.setData({
      user_order_id: user_order_id
    })
    var url = config.BASE + config.API.order_query
    var that = this
    request.post(url, { user_order_id: user_order_id })
      .then((res) => {
        if (res.ret == 0) {
          var order_detail = res.body
          var total = 0
          for (var i in order_detail.applicant) {
            var attr_1_len = 0
            total += order_detail.applicant[i].sell_price
            var material_optional = order_detail.applicant[i].material.material_optional
            var material_required = order_detail.applicant[i].material.material_required
            for (var j in material_optional) {
              if (material_optional[j].attr == 1) {
                attr_1_len += 1
              }
            }
            for (var j in material_required) {
              if (material_required[j].attr == 1) {
                attr_1_len += 1
              }
            }
            var applicant_status = order_detail.applicant[i].applicant_status
            if ((applicant_status == 2 || applicant_status == 1 || applicant_status == 3 || order_detail.order_status >=5)) {
              order_detail.applicant[i].data_url = '/pages/apply/apply-data-nopass?order_applicant_id=' + order_detail.applicant[i].order_applicant_id + '&user_order_id=' + order_detail.user_order_id + '&country=' + order_detail.country
            } else {
              order_detail.applicant[i].data_url = '/pages/apply/apply-data-b?order_applicant_id=' + order_detail.applicant[i].order_applicant_id + '&user_order_id=' + order_detail.user_order_id
            }
            order_detail.applicant[i].attr_1_len = attr_1_len
          }
          if (order_detail.pay_info.invoice_price > 0) {
            total += order_detail.pay_info.invoice_price
          }
          that.setData({
            order_detail: order_detail,
            total_price: total,
            isLoading: false
          })
          return order_detail.return_express[0]
        } else {

        }
      }).then((returnExpress)=>{
        var sys_express_query = config.BASE + config.API.sys_express_query
        var data = {
          user_order_id: user_order_id,
          tracking_number: returnExpress.tracking_number,
          express_name: returnExpress.express_name
        }
        request.post(sys_express_query,data ).then((res) => {
          if (res.ret == 0) {
            console.log(res.body)
            that.setData({
              express_detail:res.body
            })
          } else {
            app.toastWarn(res.msg)
          }
        }) 
      })

  },
  payOrder: function () {
    var user_order_id = parseInt(this.data.user_order_id)
    request.wxPay(user_order_id)
  },
  cancalOrder: function () {
    var user_order_id = this.data.user_order_id
    var that = this
    var order_detail = this.data.order_detail
    wx.showModal({
      title: '提示',
      content: '确定取消订单吗?',
      cancelText: '再想想',
      cancelColor: '#aaa',
      confirmText: '是',
      confirmColor: '#f98483',
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          var url = config.BASE + config.API.order_delete
          var data = { user_order_id: parseInt(user_order_id) }
          request.post(url, data)
            .then((_res) => {
              console.log(_res)
              if (_res.ret == 0) {
                order_detail.order_status = 0
                that.setData({
                  order_detail: order_detail
                })
                wx.redirectTo({
                  url: 'order',
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
        }
      }
    })

  },
  kdInfo: function () {
    this.setData({
      bg_hide: '',
      kd_info_class: ''
    })
  },
  closePopup: function () {
    this.setData({
      bg_hide: 'hide',
      kd_info_class: 'hide'
    })
  },
  kdOrder: function (e) {
    var val = e.detail.value
    if (val) {
      this.setData({
        kdOrderNo: val
      })
    }
  },
  submitKdInfo: function () {
    var kdOrderNo = this.data.kdOrderNo
    var user_order_id = this.data.user_order_id
    var kdCompany = this.data.kdCompany
    var kd_index = this.data.kd_index
    var that = this
    if (kd_index <= 0) {
      wx.showToast({
        title: '选择快递公司',
        icon: 'success',
        duration: 2000
      })
      return
    }
    if (!kdOrderNo) {
      wx.showToast({
        title: '快递单号不能为空',
        icon: 'success',
        duration: 2000
      })
      return
    }
    var express_name = kdCompany[kd_index]
    var url = config.BASE + config.API.order_express_add
    var data = {
      user_order_id: user_order_id,
      tracking_number: kdOrderNo,
      express_name: express_name
    }
    request.post(url, data)
      .then((res) => {
        if (res.ret == 0) {
          that.setData({
            bg_hide: 'hide',
            kd_info_class: 'hide',
            submitKdOk: true,
            kdInfoBtn: 'hide'
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'success',
            duration: 2000
          })
        }
      })
  },
  bindPickerChange(e) {
    var val = e.detail.value
    this.setData({
      kd_index: val
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var options = this.data.options
    if (options) {
      this.infoStatus(options)
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})