// pages/apply/apply-b.js
var util = require('../../utils/util.js')
Page({
  data: {
    //资助类型
    saveStyle: [
      { name: '', value: '财务', checked: 'true' },
      { name: '', value: '膳宿' },
      { name: '', value: '其它' },
    ],
    dataArr: [],
    relations: ["父子", "母子", "父女", "母女", "配偶", "其它"],
    selectRelationIndexs: [],
    dateNow: '',
  },

  // 紧急联系人关系选择器
  bindRelationPickerChange: function (e) {

    var index = parseInt(e.currentTarget.id)

    this.data.selectRelationIndexs[index] = parseInt(e.detail.value)

    var content = this.data.content
    this.data.dataArr[index].together_relation = this.data.relations[parseInt(e.detail.value)]
    this.setData({
      dataArr: this.data.dataArr,
      selectRelationIndexs: this.data.selectRelationIndexs
    })
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
    this.data.dataArr.push({ 'together_name': '', 'together_birthday': '', 'together_country': '中国', 'together_relation': '父子' })
    this.setData({
      dataArr: this.data.dataArr
    })
  },

  // 绑定基本信息输入
  contentBindInput: function (e) {
    var index = parseInt(e.currentTarget.id)
    this.data.dataArr[index].together_name = e.detail.value
  },

  bindVisitStartPickerChange: function (e) {
    var index = parseInt(e.currentTarget.id)
    this.data.dataArr[index].together_birthday = e.detail.value
    this.setData({
      dataArr: this.data.dataArr
    })
  },

  save: function (e) {

    var flag = true

    // 先检查
    for (var i = 0; i < this.data.dataArr.length; i++) {
      var item = this.data.dataArr[i];
      if (item.together_name.length == 0) {
        flag = false
        break
      }
      if (item.together_birthday.length == 0) {
        flag = false
        break
      }
      if (item.together_country.length == 0) {
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
    getApp().globalData.togetherInfoCache = this.data.dataArr

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

    var d = util.formatDate2(new Date())
    this.setData({
      dateNow: d,
    })

    // 初始化时将app里的缓存数据拉取下来
    var dataArr = []
    for (var i = 0; i < getApp().globalData.togetherInfoCache.length; i++) {
      dataArr.push(getApp().globalData.togetherInfoCache[i])
    }

    if (dataArr.length == 0) {
      dataArr.push({ 'together_name': '', 'together_birthday': '', 'together_country': '中国', 'together_relation': '父子' })
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