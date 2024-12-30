// app.js
App({
  fetch: require('./utils/fetch.js'),
  userLoginReady: false,
  userLoginReadyCallback: null,

  onLaunch: function() {
    wx.showLoading({
      title: '登录中',
      mask: true
    });

    this.fetch('/user/checkLogin').then(data => {
      if (data.isLogin) {
        this.onUserLoginReady();
      } else {
        this.login({
          success: () => {
            this.onUserLoginReady();
          },
          fail: () => {
            this.onLaunch();
          }
        });
      }
    });
  },

  login: function(options) {
    wx.login({
      success: res => {
        this.fetch('/user/login', { js_code: res.code })
          .then(data => {
            if (data && data.isLogin) {
              options.success();
            } else {
              wx.hideLoading();
              wx.showModal({
                title: '登录失败（请检查服务器端配置）',
                confirmText: '重试',
                success: res => {
                  if (res.confirm) {
                    options.fail();
                  }
                }
              });
            }
          });
      }
    });
  },

  onUserLoginReady: function() {
    wx.hideLoading();
    if (this.userLoginReadyCallback) {
      this.userLoginReadyCallback();
    }
    this.userLoginReady = true;
    console.log('已登录');
  }
});
