// app.js
App({
  globalData: {
    token: null // 保存token
  },

  onLaunch: function () {
    this.checkLogin(res => {
      console.log('is_login:', res.is_login);
      if (!res.is_login) {
        this.login();
      }
    });
  },

  login: function () {
    wx.login({
      success: res => {
        console.log('login code:', res.code);
        wx.request({
          url: 'http://127.0.0.1:3000/login',
          method: 'POST',
          data: { code: res.code },
          success: res => {
            console.log('token:', res.data.token);
            this.globalData.token = res.data.token;
            wx.setStorage({
              key: 'token',
              data: res.data.token
            });
          }
        });
      }
    });
  },

  checkLogin: function (callback) {
    let token = this.globalData.token;

    if (!token) {
      token = wx.getStorageSync('token');
      if (token) {
        this.globalData.token = token;
      } else {
        callback({ is_login: false });
        return;
      }
    }

    wx.request({
      url: 'http://127.0.0.1:3000/checklogin',
      data: { token: token },
      success: res => {
        callback({ is_login: res.data.is_login });
      }
    });
  }
})
