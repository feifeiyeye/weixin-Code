// pages/apply/addr/addr-list.js
var config = require('../../config.js')
var request = require('../../request.js')
var fun = require('../../functions.js')
var app = getApp()
Page({
  data: {
    List: [],
    province_name: [],
    province_code: [],
    province_idx: {},
    areaData: {},
    isLoading: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.loadAddress()
  },
  loadAddress: function () {
    var that = this
    var isLoading = this.data.isLoading
    var url = config.BASE + config.API.user_address_query
    if (isLoading  === false) {
      that.setData({
        isLoading: true
      })
      app.getAreaJson(function (res) {
        that.setData({
          areaData: res
        })
        request.post(url, {})
          .then((res) => {
            if (res.ret == 0) {
              that.setData({
                List: res.body
              })
            }
            that.setData({
              isLoading: false
            })
          })
      })
    }
  },
  selectAddress: function (e) {
    var id = e.target.id
    var user_address_id = id.split('_')[0]
    var currAddress = {}
    var List = this.data.List
    var areaData = this.data.areaData
    for (var i in List) {
      if (user_address_id == List[i].user_address_id) {
        currAddress = List[i]
        break;
      }
    }

    var province = areaData['86'][currAddress.province_code]
    var city = areaData[currAddress.province_code][currAddress.city_code]
    var counties = ''
    if (currAddress.counties_code > 0) {
      var counties = areaData[currAddress.city_code][currAddress.counties_code]
    }

    currAddress.detail_address = province + city + counties + currAddress.detail_address
    app.globalData.currAddress = currAddress
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
  newAddress: function () {
    wx.navigateTo({
      url: 'addr-edit?a=add',
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
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.loadAddress()
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})