// pages/apply/apply-b.js
Page({
  data: {
    //资助类型
    saveStyle: [
      { name: '', value: '财务', checked: 'true' },
      { name: '', value: '膳宿' },
      { name: '', value: '其它' },
    ],
    dataArr: [],
  },


  del: function (e) {

    var that = this;

    var index = parseInt(e.currentTarget.id)

    wx.showModal({
      title: '提示',
      content: '确认删除此条记录?',
      success: function (res) {
        if (res.confirm) {
          that.data.dataArr.splice(index, 1)
          that.setData({
            dataArr: that.data.dataArr
          })
        }
      }
    })

  },

  add: function (e) {
    this.data.dataArr.push({ 'visit_country': '', 'visit_target': 1, 'visit_start': '', 'visit_end': '' })
    this.setData({
      dataArr: this.data.dataArr
    })
  },

  // 绑定基本信息输入
  contentBindInput: function (e) {
    var index = parseInt(e.currentTarget.id)
    this.data.dataArr[index].visit_country = e.detail.value
  },

  bindVisitPickerChange: function (e) {
    var index = parseInt(e.currentTarget.id)
    this.data.dataArr[index].visit_target = parseInt(e.detail.value) + 1
    this.setData({
      dataArr: this.data.dataArr
    })
  },

  bindVisitStartPickerChange: function (e) {
    var index = parseInt(e.currentTarget.id)
    this.data.dataArr[index].visit_start = e.detail.value
    this.setData({
      dataArr: this.data.dataArr
    })
  },

  bindVisitEndPickerChange: function (e) {
    var index = parseInt(e.currentTarget.id)
    this.data.dataArr[index].visit_end = e.detail.value
    this.setData({
      dataArr: this.data.dataArr
    })
  },

  save: function (e) {

    var flag = true

    // 先检查
    for (var i = 0; i < this.data.dataArr.length; i++) {
      var item = this.data.dataArr[i];
      if (item.visit_country.length == 0) {
        flag = false
        break
      }
      if (item.visit_start.length == 0) {
        flag = false
        break
      }
      if (item.visit_end.length == 0) {
        flag = false
        break
      }
    }

    if (!flag) {
      wx.showToast({
        title: '请完整填写信息',
        icon: 'success',
        duration: 1500
      })
      return
    }

    // 保存数据
    getApp().globalData.vistoryHistoryCache = this.data.dataArr

    this.cancel()

  },

  cancel: function (e) {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
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
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    // 初始化时将app里的缓存数据拉取下来
    var dataArr = []

    for (var i = 0; i < getApp().globalData.vistoryHistoryCache.length; i++) {
      dataArr.push(getApp().globalData.vistoryHistoryCache[i])
    }

    if (dataArr.length == 0) {
      dataArr.push({ 'visit_country': '', 'visit_target': 1, 'visit_start': '', 'visit_end': '' })
    }

    this.setData({
      dataArr: dataArr
    })

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