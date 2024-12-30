var config = require('../config.js')
var fun = require('../functions.js')
var request = require('../request.js')
var app = getApp()
// pages/login/register.js
Page({
  data: {
    phone: '',
    password: '',
    checkCode: '',
    //checkbox信息
    checkboxItems: [
      { name: '1', value: '注册代表您已阅读并同意', checked: true },
    ],
    checkCode: '',
    regstyle: 'login_btn btn_red',
    regbtnEvent: 'listenerRegister',
    timer: '',
    authCodeStr: '获取验证码',
    second: 60,
    second_color: '',
    border_color: ''
  },

  /**
   * 监听验证码发送请求
   */
  listenerCheckCodeSend: function (e) {
    var tphone = this.data.phone;
    console.log(tphone)
    var reg = /^1\d{10}$/
    if (!reg.test(tphone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    var second_color = this.data.second_color
    if (second_color != '') {
      return
    }
    var border_color = this.data.border_color
    if (border_color != '') {
      return
    }
    var that = this
    var ver_url = config.BASE + config.API.sys_verify_code_get
    var userinfo = wx.getStorageSync('userinfo')
    console.log(userinfo, 'bind userinfo')

    wx.login({
      success: function (res) {

        if (res.code) {
          wx.getUserInfo({
            success: function (User) {
              var loginurl = config.BASE + config.API.user_login
              var data = {
                wx_code: res.code,
                encrypted_data: User.encryptedData,
                iv: User.iv
              }
              request.post(loginurl, data).then((loginres) => {
                var wx_token = loginres.body.wx_token
                if (wx_token) {
                  var verdata = {
                    "mobile_phone": tphone,
                    "action": 2,
                    "wx_token": wx_token
                  }
                  request.post(ver_url, verdata).then((verCode) => {
                    if (verCode.ret == '0') {
                      wx.showToast({
                        title: '验证码已发送',
                        icon: 'success',
                        duration: 2000
                      })
                      var timer = that.data.timer
                      console.log('timer', timer)
                      timer = setInterval(that.second__, 1000)
                      that.setData({
                        timer: timer
                      })

                    } else {
                      if (verCode.msg == '手机号已绑定了其他微信，请登录') {
                        wx.showModal({
                          title: '提示',
                          content: '该手机号已绑定其他账号，请使用另一个手机号绑定',
                          cancelText: '取消',
                          cancelColor: '#aaa',
                          confirmText: '知道了',
                          confirmColor: '#f98483',
                          success: function (res) {
                            if (res.confirm) {
                            }

                          }
                        })
                      } else {
                        wx.showToast({
                          title: verCode.msg,
                          icon: 'success',
                          duration: 2000
                        })
                      }

                    }
                  }).catch((err) => {
                    console.log(err)
                    wx.showToast({
                      title: '验证码发送失败，请重试!',
                      icon: 'success',
                      duration: 2000
                    })
                  })
                }
              })
            }
          })
        }
      },
      complete: function (e) {
        console.log(e)
      }
    });

  },

  second__: function () {
    var second = --(this.data.second)
    if (second <= 0) {
      this.setData({
        authCodeStr: '获取验证码',
        second: 60,
        second_color: '',
        border_color: ''
      })
      var timer = this.data.timer
      if (timer) {
        clearInterval(timer)
      }
    } else {
      this.setData({
        authCodeStr: second + 's',
        second: second,
        second_color: '#aaa',
        border_color: '#cfcfcf'
      })
    }

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
    var tcheckCode = this.data.checkCode;
    var reg = /^[1]\d{10}$/
    if ((reg.test(tphone)) && (tcheckCode) && (tpassword) && (tpassword.length > 5) && (tpassword.length < 21)) {
      this.setData({
        regstyle: "login_btn btn_red",
        regbtnEvent: "listenerRegister"
      });
    }
  },

  /**
   * 监听验证码输入
   */
  listenerCheckCode: function (e) {
    this.setData({ checkCode: e.detail.value })
  },
  /**
   *  绑定监听
   */
  listenerRegister: function (e) {

    var tphone = this.data.phone;
    var tcheckCode = this.data.checkCode;
    var reg = /^1\d{10}$/
    if (!reg.test(tphone)) {
      wx.showToast({
        title: '请输入正确的手机号码!',
        icon: 'success',
        duration: 2000
      })
      return;
    }

    if (!tcheckCode) {
      wx.showToast({
        title: '请输入短信验证码!',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    var that = this
    app.showLoading()
    wx.login({
      success: function (loginData) {
        console.log(loginData)
        // success
        wx.getUserInfo({
          success: function (User) {
            var userInfo = User.userInfo
            var nickName = userInfo.nickName
            var avatarUrl = userInfo.avatarUrl
            var gender = userInfo.gender //性别 0：未知、1：男、2：女 
            var province = userInfo.province
            var city = userInfo.city
            var country = userInfo.country

            var loginurl = config.BASE + config.API.user_login
            var data = {
              wx_code: loginData.code,
              encrypted_data: User.encryptedData,
              iv: User.iv
            }
            var header = request.getHeader()
            request.post(loginurl, data, header)
              .then((loginres) => {
                var wx_token = loginres.body.wx_token
                var token = loginres.body.token
                if (token) {
                  var login_userinfo = loginres.body
                  console.log(login_userinfo, 'login_user')
                  wx.setStorageSync('userinfo', login_userinfo)
                  wx.switchTab({
                    url: '/pages/order/order',
                    success: function (res) {
                      wx.hideToast()
                    },
                    fail: function () {
                      // fail
                    },
                    complete: function () {
                      // complete
                      app.hideLoading()
                    }
                  })
                }
                if (wx_token != undefined && wx_token) {
                  var bind_data = {
                    avatarurl: avatarUrl,
                    code: tcheckCode,
                    mobile_phone: that.data.phone,
                    nickname: nickName,
                    wx_token: wx_token,
                    encrypted_data: User.encryptedData,
                    iv: User.iv
                  }
                  var bindurl = config.BASE + config.API.user_bind
                  request.post(bindurl, bind_data).
                    then((bindData) => {
                      if (bindData.ret == 0) {
                        var userinfo = bindData.body
                        userinfo.logintime = parseInt((new Date()).getTime() / 1000);
                        wx.setStorageSync('userinfo', userinfo)
                        wx.showToast({
                          title: '手机号绑定成功!',
                          icon: 'success',
                          duration: 1500,
                          success: function () {
                            setTimeout(function () {
                              wx.switchTab({
                                url: '/pages/order/order',
                                success: function (res) {
                                  wx.hideToast()
                                },
                                fail: function () {
                                  // fail
                                },
                                complete: function () {
                                  // complete
                                  app.hideLoading()
                                }
                              })
                            }, 1500)
                          }
                        })
                      } else {
                        wx.showToast({
                          title: bindData.msg,
                          icon: 'success',
                          duration: 2000
                        })
                      }
                    })
                }
              }).catch((err) => {
                console.log(err)
              })
          },
          complete: function (e) {
            // complete
            console.log(e)
            app.hideLoading()
          },
          fail: function (e) {
            console.log(e)
          }
        })
      },
      fail: function (err) {
        console.log(err)
        // fail
      },
      complete: function (e) {
        // complete
        console.log(e)
        app.hideLoading()
      }
    })


  },
  //chcekbox
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
  login: function () {
    request.reLogin()
  },
  onLoad: function (options) {
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
  }
})