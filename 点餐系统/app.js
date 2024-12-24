// app.js
const { login } = require('./utils/login.js');

App({
  onLaunch: function () {
    wx.showLoading({
      title: '登录中',
      mask: true
    });
    
    this.fetch('/user/checkLogin').then(data => {
      if (data.isLogin) {
        this.onUserLoginReady();
      } else {
        login({
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

  userLoginReady: false,
  userLoginReadyCallback: null,

  onUserLoginReady: function () {
    wx.hideLoading();
    if (this.userLoginReadyCallback) {
      this.userLoginReadyCallback();
    }
    this.userLoginReady = true;
    console.log('用户已成功登录');
  },

  globalData: {
    userInfo: null
  },
  
  fetch: require('./utils/fetch.js')
});
