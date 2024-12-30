var config = require('../config.js')
var app = getApp()
var fun = require('../functions.js')
var request = require('../request.js')
Page({
  onLoad: function () {
    this.setData({
      hasLogin: app.globalData.hasLogin
    })
  },
  data: {
    phone: '',
    password: '',
    loginstyle: 'login_btn hollow_btn_red',
    loginbtnEvent: 'listernerInput',
  },

  /**
    * 监听手机号输入
    */
  listenerPhoneInput: function (e) {
    this.setData({ phone: e.detail.value })
  },

  /**
   * 监听密码输入
   */
  listenerPasswordInput: function (e) {
    this.setData({ password: e.detail.value })
    var tphone = this.data.phone;
    var tpassword = this.data.password;

    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
    if ((reg.test(tphone)) && (tpassword) && (tpassword.length > 5) && (tpassword.length < 21)) {
      this.setData({
        loginstyle: "login_btn btn_red",
        loginbtnEvent: "listenerLogin"
      });
    }
  },


  /**
   * 手机号码-密码 未输入完成监听
   */
  listernerInput: function () {
    var tphone = this.data.phone;
    var tpassword = this.data.password;
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
    if (!reg.test(tphone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    if (!tpassword || tpassword.length < 6) {
      wx.showToast({
        title: '密码长度不能少于6位',
        icon: 'success',
        duration: 2000
      })
      return;
    }
  },



  /**
   * 监听登录按钮
   */
  listenerLogin: function () {
    //打印收入账号和密码
    var tphone = this.data.phone;
    var tpassword = this.data.password;
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
    if (!reg.test(tphone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    if (!tpassword || tpassword.length < 6) {
      wx.showToast({
        title: '密码长度不能少于6位',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    var that = this
    var password = fun.md5(this.data.password)
    wx.login({
      success: function (resData) {
        console.log(resData)
        // success
        var url = config.BASE + config.API.user_login
        var data = {
          mobile_phone: that.data.phone,
          passwd: password,
          wx_code: resData.code
        }
        var header = request.getHeader()
        request.post(url, data, header)
          .then((res) => {
            var retCode = res.ret;
            if (retCode == '0') {
              var userinfo = res.data.body
              userinfo.logintime = parseInt((new Date()).getTime() / 1000);
              wx.setStorageSync('userinfo', userinfo)
              //没有返回值提示

              wx.redirectTo({
                url: '/pages/order/order',
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

            } else if (retCode == '-1') {
              wx.showToast({
                title: '手机号已注册，请登录',
                icon: 'success',
                duration: 2000
              })
            } else {
              wx.showToast({
                title: '手机号或密码错误',
                icon: 'success',
                duration: 2000
              })
            }
          }).catch((err) => {
            console.log(err)
          })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })



  },

  login: function () {
    var that = this
    wx.login({
      success: function (res) {
        console.log(res)
        app.globalData.hasLogin = true
        that.setData({
          hasLogin: true
        })
        wx.setStorageSync('isLogin', true)
        //var isLogin = wx.getStorageSync('isLogin')
        if (that.data.hasLogin) {
          wx.redirectTo({
            url: '/pages/order/order'
          })
        }
        that.update()
      }
    })
  },
  logout: function () {
    wx.removeStorageSync('isLogin')
    this.setData({
      hasLogin: false
    })
    app.globalData.hasLogin = false
    wx.redirectTo({
      url: '/pages/login/login'
    })
  }

})
