var config = require('../config.js')
var fun = require('../functions.js')
// pages/login/register.js
Page({
  data: {
    phone: '',
    password: '',
    checkCode: '',
    //checkbox信息
    checkboxItems: [
      { name: '1', value: '注册代表您已阅读并同意' },
    ],
    checkCode: '',
    regstyle: 'login_btn hollow_btn_red',
    regbtnEvent: 'listernerInput',
    timer: '',
    authCodeStr: '获取验证码',
    second: 60,
    second_color: ''
  },

  /**
   * 监听验证码发送请求
   */
  listenerCheckCodeSend: function (e) {
    var tphone = this.data.phone;
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
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
    var that = this

    wx.request({
      url: config.BASE + config.API.sys_verify_code_get,
      data: {
        "mobile_phone": tphone,
        "action": 0
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (res.data.ret == '0') {
          wx.showToast({
            title: '验证码已发送',
            icon: 'success',
            duration: 2000
          })
          var timer = that.data.timer
          console.log('timer', timer)
          if (timer == '') {
            timer = setInterval(that.second__, 1000)
            that.setData({
              timer: timer
            })
          }

        } else {
          wx.showToast({
            title: '验证码发送失败，请重试!',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  second__: function () {
    var second = --(this.data.second)
    if (second <= 0) {
      this.setData({
        authCodeStr: '获取验证码',
        second: 60,
        second_color: ''
      })
    } else {
      this.setData({
        authCodeStr: second + 's',
        second: second,
        second_color: '#aaa'
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
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
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
   * 手机号码-密码 未输入完成监听
   */
  listernerInput: function () {
    var tphone = this.data.phone;
    var tpassword = this.data.password;
    var tcheckCode = this.data.checkCode;
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

    if (!tcheckCode) {
      wx.showToast({
        title: '请输入短信验证码!',
        icon: 'success',
        duration: 2000
      })
      return;
    }
  },


  /**
   *  注册事件监听
   */
  listenerRegister: function (e) {

    var tphone = this.data.phone;
    var tpassword = this.data.password;
    var tcheckCode = this.data.checkCode;
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
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

    if (!tpassword) {
      wx.showToast({
        title: '请输入密码!',
        icon: 'success',
        duration: 2000
      })
      return;
    }



    var md5tpassword = fun.md5(tpassword);

    if (!md5tpassword) {
      wx.showToast({
        title: '请重新设置密码!',
        icon: 'success',
        duration: 2000
      })
      return;
    }

    wx.request({
      url: config.BASE + config.API.user_register,
      data: {
        "mobile_phone": tphone,
        "passwd": md5tpassword,
        "code": tcheckCode
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (res.data.ret == '0') {

          var userinfo = res.data.body;
          userinfo.logintime = parseInt((new Date()).getTime() / 1000);
          wx.setStorageSync('userinfo', res.data.body);

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

          // wx.showToast({
          //   title: '注册成功!',
          //   icon: 'success',
          //   duration: 2000
          // })


        } else {
          wx.showToast({
            title: '注册失败，请重试!',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })


    console.log("koko", "kokokoko");
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