// pages/logs/index.js
var app = getApp()
var request = require("../request.js")
var config = require('../config.js')
Page({
  data: {
    orderList: [],
    isLogin: false,
    userInfo: {},
    showStatus: ['0', '0', '0', '0', '4', '5', '6', '7', '8'],
    identityApplyStatus: ['已取消', '等待预审', '预审未通过', '等待送签', '使馆审核中', '出签成功', '拒签', '退款中', '退款成功', '等待预约', '待确认', '等待接受资料', '等待培训', '待前往使馆', '拒签(待提交证明)', '拒签(等待审核)', '拒签(审核不通过)'],
    orderStatus: ['已取消', '待上传资料', '待填写申请表', '待支付', '待邮寄资料', '办理中', '已发货', '待评价', '已完成'],
    identityName: ['在职人员', '自由职业者', '退休人员', '在校学生', '学龄前儿童'],
    isLoding: false,
    last_user_order_id: 0
  },
  onLoad: function (options) {
    this.reLoadData()
  },
  onPullDownRefresh: function () {
    this.reLoadData()
  },
  reLoadData: function (append) {
    var that = this
    var isLoding = this.data.isLoding
    if (!isLoding) {
      this.setData({
        isLoding: true
      })
      wx.showToast({
        title: 'Loding...',
        icon: 'loading',
        duration: 3000
      })
      var url = config.BASE + config.API.order_brief_query
      var params = {}
      if (append) {
        params.user_order_id = this.data.last_user_order_id
      }

      request.post(url, params)
        .then((data) => {
          if (data.ret == 0) {
            var orderList = that.data.orderList
            var lastOrderList = data.body
            if (lastOrderList.length == 0 && append) {
              wx.hideToast()
              app.toastWarn('没有订单了')
              return
            }
            var last_user_order_id = lastOrderList[lastOrderList.length - 1].user_order_id
            if (append) {
              orderList = orderList.concat(lastOrderList)
            } else {
              orderList = lastOrderList
              /*if (orderList.length > 0) {
                  
                  orderList = lastOrderList.concat(orderList.splice(0,5))
              } else {
                
              }*/
            }
            for (var i in orderList) {
              var country = orderList[i].country
              if (orderList[i].applicant.length == 1) {
                if (orderList[i].order_status == 1) {
                  orderList[i].url = '/pages/apply/apply-data-b?order_applicant_id=' + orderList[i].applicant[0]['order_applicant_id'] + '&user_order_id=' + orderList[i].user_order_id
                } else if (orderList[i].order_status == 2) {
                  
                  var apply = country == '日本' ? 'apply' : country == '韩国' ? 'apply-korea' : country == '新加坡' ? 'apply-singapore' : ''
                  /*orderList[i].url = '/pages/apply/' + apply + '?step=' + orderList[i].order_status + '&user_order_id=' + orderList[i].user_order_id+'&order_applicant_id=' + orderList[i].applicant[0]['order_applicant_id']*/
                  orderList[i].url = '/pages/apply/apply-data?step=' + orderList[i].order_status + '&user_order_id=' + orderList[i].user_order_id
                } else if (orderList[i].order_status == 5 && orderList[i].applicant[0].applicant_status == 2) {
                  orderList[i].url = '/pages/apply/apply-data-nopass' + '?user_order_id=' + orderList[i].user_order_id + '&order_applicant_id=' + orderList[i].applicant[0]['order_applicant_id'] + '&country=' + country
                }
              } else {
                if (orderList[i].order_status == 1 || orderList[i].order_status == 2) {
                  orderList[i].url = '/pages/apply/apply-data?step=' + orderList[i].order_status + '&user_order_id=' + orderList[i].user_order_id
                } else {
                   orderList[i].url = '/pages/apply/apply-data-nopass' + '?user_order_id=' + orderList[i].user_order_id + '&order_applicant_id=' + orderList[i].applicant[0]['order_applicant_id'] + '&country=' + country
                }

              }
            }
            console.log(orderList);
            that.setData({
              orderList: orderList,
              isLoding: false,
              last_user_order_id: last_user_order_id
            })
            wx.hideToast()
            wx.stopPullDownRefresh()
          } else {
            that.setData({
              isLoding: false
            })
            request.reLogin()
          }
        }).catch((err) => {
          console.log('orderlist err', data)
          request.reLogin()
        })
    } else {
      that.setData({
        isLoding: false
      })
      wx.hideToast()
    }

  },
  /**微信支付 */
  payment: function (e) {
    var id = e.target.id
    var user_order_id = parseInt(id.split('_')[1])
    request.wxPay(user_order_id)
  },
  clone: function (obj) {
    var o;
    if (typeof obj == "object") {
      if (obj === null) {
        o = null;
      } else {
        if (obj instanceof Array) {
          o = [];
          for (var i = 0, len = obj.length; i < len; i++) {
            o.push(this.clone(obj[i]));
          }
        } else {
          o = {};
          for (var j in obj) {
            o[j] = this.clone(obj[j]);
          }
        }
      }
    } else {
      o = obj;
    }
    return o;
  },
  cancelOrder: function (e) {
    var id = e.target.id
    var user_order_id = id.split('_')[0]
    var that = this
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
                that.reLoadData()
              }
            })
        }
      }
    })
  },
  onReady: function () {
    this.reLoadData();
    // 页面渲染完成
  },
  onShow: function () {
    this.reLoadData();
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onReachBottom: function () {
    this.reLoadData(true)
  }
})