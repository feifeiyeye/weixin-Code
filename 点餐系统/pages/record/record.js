// pages/record/record.js
const defaultAvatar = '/images/avatar.png';
const app = getApp();
const fetch = app.fetch;

Page({
  data: {
    avatarUrl: defaultAvatar,
    list: []
  },

  onLoad: function () {
    wx.showLoading({
      title: '努力加载中…'
    });
    
    fetch('/food/record').then(data => {
      console.log('接收到的数据:', data);

      // 格式化日期
      const list = (data.list || []).map(item => {
        try {
          const payTime = item.pay_time;
          if (!payTime) {
            throw new Error('pay_time is empty');
          }

          // 直接处理字符串格式的日期 "2024-12-24 12:56:13"
          const [dateStr, timeStr] = payTime.split(' ');
          
          return {
            ...item,
            dateStr: dateStr,
            timeStr: timeStr
          };
        } catch (err) {
          console.error('日期解析错误:', err, '原始数据:', item);
          return {
            ...item,
            dateStr: '未知日期',
            timeStr: '未知时间'
          };
        }
      });
      
      wx.hideLoading();
      this.setData({
        ...data,
        list
      });
    }).catch(err => {
      console.error('获取数据失败:', err);
      wx.hideLoading();
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    });
  },

  onChooseAvatar: function (e) {
    const { avatarUrl } = e.detail;
    this.setData({ avatarUrl });
  }
})