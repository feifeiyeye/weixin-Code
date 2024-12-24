// index.js
const app = getApp();
const defaultAvatar = '/images/avatar.png';

Page({
  data: {
    avatarUrl: defaultAvatar,
    nickname: ''
  },

  onChooseAvatar: function (e) {
    console.log(e);
    const { avatarUrl } = e.detail;
    this.setData({ avatarUrl });
  },

  credit: function () {
    wx.request({
      url: 'http://127.0.0.1:3000/credit',
      data: { token: app.globalData.token },
      success: res => {
        if (res.data.credit) {
          wx.showToast({
            title: '当前积分：' + res.data.credit,
            icon: 'none'
          });
        } else {
          wx.showToast({
            title: res.data.err,
            icon: 'none'
          });
        }
      }
    });
  }
});
