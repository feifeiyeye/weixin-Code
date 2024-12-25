const fetch = require('./fetch.js');

class AuthService {
  // 登录
  static async login() {
    try {
      const code = await this.getLoginCode();
      const data = await this.loginWithCode(code);
      
      if (!data?.isLogin) {
        throw new Error('登录失败（请检查服务器端配置）');
      }

      return data;
    } catch (err) {
      return this.handleLoginError(err);
    }
  }

  // 获取登录码
  static getLoginCode() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => resolve(res.code),
        fail: err => reject(err)
      });
    });
  }

  // 使用code登录
  static async loginWithCode(code) {
    return await fetch('/user/login', { js_code: code });
  }

  // 处理登录错误
  static handleLoginError(error) {
    wx.hideLoading();
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: error.message || '登录失败',
        confirmText: '重试',
        success: res => {
          if (res.confirm) {
            reject(error);
          }
        }
      });
    });
  }
}

module.exports = AuthService; 