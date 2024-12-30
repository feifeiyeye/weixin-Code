const config = require('./config.js');
const decodeCookie = require('./decodeCookie.js');

var sess = wx.getStorageSync('PHPSESSID');

module.exports = function (path, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.baseUrl + path,
      method: method,
      data: data,
      header: {
        'Cookie': sess ? 'PHPSESSID=' + sess : ''
      },
      success: res => {
        if (res.header['Set-Cookie'] !== undefined) {
          sess = decodeCookie(res.header['Set-Cookie'])['PHPSESSID'];
          wx.setStorageSync('PHPSESSID', sess);
        }

        if (res.statusCode !== 200) {
          fail('服务器异常', reject);
          return;
        }
        if (res.data.code === 0) {
          fail(res.data.msg, reject);
          return;
        }
        resolve(res.data);
      },
      fail: () => {
        fail('加载数据失败', reject);
      }
    });
  });
};

function fail(title, callback) {
  wx.hideLoading();
  wx.showModal({
    title: '提示',
    content: title,
    confirmText: '重试',
    success: res => {
      if (res.confirm) {
        callback();
      }
    }
  });
} 