const fetch = require('./fetch.js');

function login(options) {
  wx.login({
    success: res => {
      fetch('/user/login', { js_code: res.code })
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
}

module.exports = {
  login
}; 