var config = require('/pages/config.js')
var request = require('/pages/request.js')
var fun = require('/pages/functions.js')
let {WeToast} = require('/pages/component/wetoast/wetoast.js')
var toastObj = null
App({
  toastWarn: function (object) {
    //this.hideLoading()
    var title = ''
    var duration = 1500
    var img = 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/applicant/tips-warr.png'
    if (typeof object == 'object') {
      title = object.title
      if (object.duration > 0 && object.duration != undefined) {
        duration = object.duration
      }
      if (object.img != undefined) {
        img = object.img
      }
      if (object.type == 'Loading') {
        img = '/image/loading.gif'
      }
    } else if (typeof object == 'string') {
      title = object
    }
    new WeToast().toast({
      img: img,
      title: title,
      imgMode: 'aspectFit',
      duration: duration,
      success(data) {
        console.log(Date.now() + ': success')
      },
      fail(data) {
        console.log(Date.now() + ': fail')
      },
      complete(data) {
        console.log(Date.now() + ': complete')
      }
    })
  },
  onLaunch: function () {
    // 测试
    //new this.WeToast()
    console.log('App Launch', getCurrentPages())   //获取页面页数

    var that = this
    wx.getSystemInfo({
      success: function (res) {
        // that.globalData.rpxTopx = 750.0 / res.windowWidth
        that.globalData.rpxTopx = res.windowWidth / 750.0
      }
    })

    //获取系统配置
    var sysConfigUrl = config.BASE + config.API.sys_config_get
    var that = this
    request.post(sysConfigUrl, {}).then((res) => {
      if (res.ret == 0) {
        that.globalData.sysConfig = res.body
        config.BASE = res.body.apipath ? res.body.apipath : config.BASE
      }
    })
    var sys_domain_name_get_url = config.BASE + config.API.sys_domain_name_get
    request.post(sys_domain_name_get_url, {}).then((res) => {
      if (res.ret == 0) {
        config.BASE = res.body.domain_names[0] ? res.body.domain_names[0] : config.BASE
      }
    })

    this.orderTip()


    // request.login().then((loginres) => {
    //   if (loginres.ret == 0) {
    //     var wx_token = loginres.body.wx_token
    //     var token = loginres.body.token
    //     if (token) {
    //       var login_userinfo = loginres.body
    //       login_userinfo.logintime = parseInt((new Date()).getTime() / 1000)
    //       console.log(login_userinfo, 'login_user')
    //       wx.setStorageSync('userinfo', login_userinfo)
    //       return
    //     }
    //     if (wx_token) {
    //       wx.setStorageSync('userinfo', loginres.body)
    //     }
    //   }
    // }).catch((err) => {
    //   console.error(err)
    // })

    // this.getAreaJson(function (res) {
    //   console.log(typeof res, 'init json')
    // });

  },
  orderTip: function () {
    console.log('App Show')
    request.post(`${config.BASE}/wxa/order_notify`, {}).then(res => {
      if (Number(res.ret) === 0) {
        const order = res.body
        const orderStatus = res.body.order_status
        let content = ''
        let confirmText = ''
        let url = ''
        let userOrderId = res.body.user_order_id
        if (orderStatus >= 1) {
          switch (orderStatus) {
            case 1:
              content = `您正在办理“${res.body.visa_product_name}”，提交申请表我们将尽快为您办理！`
              confirmText = '补充资料'
              break
            case 2:
              content = `您正在办理“${res.body.visa_product_name}”，补全资料我们将尽快为您办理！`
              confirmText = '填写申请表'
              break
            case 3:
              content = `您正在办理“${res.body.visa_product_name}”，完成支付向美好假期更近一步！`
              confirmText = '去支付'
              url = '/pages/order/order-detail?user_order_id=' + order.user_order_id
              break
            default:
          }
          if (order.applicant.length == 1) {
            if (order.order_status == 1) {
              url = '/pages/apply/apply-data-b?order_applicant_id=' + order.applicant[0]['order_applicant_id'] + '&user_order_id=' + order.user_order_id
            } else if (order.order_status == 2) {
              var country = order.country
              var apply = country == '日本' ? 'apply' : country == '韩国' ? 'apply-korea' : country == '新加坡' ? 'apply-singapore' : ''
              /*url = '/pages/apply/' + apply + '?step=' + order.order_status + '&user_order_id=' + order.user_order_id+'&order_applicant_id=' + order.applicant[0]['order_applicant_id']*/
              url = '/pages/apply/apply-data?step=' + order.order_status + '&user_order_id=' + order.user_order_id
            }
          } else {
            if (order.order_status == 1 || order.order_status == 2) {
              url = '/pages/apply/apply-data?step=' + order.order_status + '&user_order_id=' + order.user_order_id
            }
          }
          wx.showModal({
            content,
            confirmText,
            cancelColor: '#aaa',
            confirmColor: '#f98483',
            success: function (res) {
              if (res.confirm) {
                console.log(url)
                wx.navigateTo({
                  url: url
                })
              }
            }
          })
        }
      }
    })
  },
  onHide: function () {
    console.log('App Hide')
  },
  callPhone: function () {
    var sysConfig = this.globalData.sysConfig
    wx.showModal({
      title: '呼叫客服',
      content: sysConfig.consumer_hotline + '\r\n' + sysConfig.working_time,
      cancelText: '取消',
      cancelColor: '#aaa',
      confirmText: '呼叫',
      confirmColor: '#f98483',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: sysConfig.consumer_hotline,
            success: function (res) {
              console.log(res)
            },
            fail: function (err) {
              console.log(err)
            },
            complete: function (info) {
              console.log(info)
            }
          })
        }

      }
    })
  },
  isJson: function (obj) {
    var isjson = (typeof (obj) == "object");
    return isjson;
  },
  getAreaJson: function (cb) {

    var areaData = wx.getStorageSync('areaJson')
    var that = this
    // if (!fun.isEmptyObject(areaData) && areaData != 'undefined' && areaData != null && areaData != '') {
    if (false) {
      if (!that.isJson(areaData) || typeof areaData === 'string') {
        console.log('parse json', typeof areaData)
        areaData = JSON.parse(areaData)
        console.log('parse json after', typeof areaData)
      }
      typeof cb == 'function' && cb(areaData)
    } else {
      var url_area = config.API.area_json
      wx.request({
        url: url_area,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          // success
          if (cb) {

            var tmpData = {}
            // if (!that.isJson(res.data)) {
            //   console.log('parse json url',that.isJson(res.data), typeof res.data)
            //   tmpData = JSON.parse(res.data)

            // } else {
            //   tmpData = res.data
            // }
            var areaData = JSON.stringify(res.data)
            wx.setStorageSync('areaJson', areaData)
            tmpData = JSON.parse(areaData)
            console.log('url parse json', typeof tmpData, 'raw data type', typeof res.data)
            cb(tmpData)
          }
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
  showLoading: function () {

    wx.showToast({
      title: 'Loading',
      icon: 'loading',
      duration: 15000
    })
  },
  previewImg: function (url, url_arr) {
    if (!url) {
      return
    }
    if (url_arr == undefined) {
      url_arr = url
    }
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url_arr] // 需要预览的图片http链接列表
    })
  },
  hideLoading: function () {
    wx.hideToast()
    console.log(toastObj)
    new WeToast().toast()

  },
  globalData: {
    hasLogin: false,
    detailReviews: [],
    visa_country_background: {},
    rpxTopx: 0,   // rpx乘以这个系数可转化成px
    idCardInfoA: {},
    idCardInfoB: {},
    passPort: {},
    materialUpload: {},
    orderDetail: {},
    currAddress: {},
    sysConfig: {},
    vistoryHistoryCache: undefined, // 韩国申请表的访问别国记录
    togetherInfoCache: undefined, // 韩国申请表陪同家属
    applyTableErr: {}
  }
})