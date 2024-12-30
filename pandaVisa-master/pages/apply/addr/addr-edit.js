// pages/apply/addr/addr-edit.js
var config = require('../../config.js')
var request = require('../../request.js')
var app = getApp()
Page({
  data: {
    province_name: [],
    province_code: [],
    province_idx: {},
    city_name: [],
    city_code: [],
    city_idx: {},
    counties_name: [],
    counties_code: [],
    counties_idx: {},
    areaData: {},
    index: 0,
    url_params: {},
    currAddress: {},
    action: '',
    countiesShow: true
  },
  saveAddress: function () {

    var action = this.data.action
    var currAddress = this.data.currAddress
    var email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if (!currAddress.addressee) {
      wx.showToast({
        title: '填写联系人!',
        icon: 'success',
        duration: 2000
      })
      return
    }
    if (!currAddress.mobile_phone) {
      wx.showToast({
        title: '填写手机号!',
        icon: 'success',
        duration: 2000
      })
      return
    }
    if (!email.test(currAddress.email)) {
      wx.showToast({
        title: '邮箱格式错误!',
        icon: 'success',
        duration: 2000
      })
      return
    }

    if (!currAddress.province_code) {
      wx.showToast({
        title: '选择省份!',
        icon: 'success',
        duration: 2000
      })
      return
    }
    if (!currAddress.city_code) {
      wx.showToast({
        title: '选择城市!',
        icon: 'success',
        duration: 2000
      })
      return
    }
    if (!currAddress.counties_code && this.data.countiesShow !== false) {
      wx.showToast({
        title: '选择区县!',
        icon: 'success',
        duration: 2000
      })
      return
    } else {
      if (!currAddress.counties_code) {
        currAddress.counties_code = 0
      }
    }
    if (!currAddress.detail_address) {
      wx.showToast({
        title: '填写详细地址!',
        icon: 'success',
        duration: 2000
      })
      return
    }
    var url = ''
    if (action == 'add') {
      url = config.BASE + config.API.user_address_add
    } else if (action == 'edit') {
      url = config.BASE + config.API.user_address_update
    }
    //currAddress['mobile_phone'] = parseInt(currAddress.mobile_phone)
    currAddress['province_code'] = parseInt(currAddress.province_code)
    currAddress['city_code'] = parseInt(currAddress.city_code)
    currAddress['counties_code'] = parseInt(currAddress.counties_code)
    request.post(url, currAddress)
      .then((res) => {
        if (res.ret == 0) {
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
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'success',
            duration: 2000
          })
        }
      })
  },
  inpuValue: function (e) {
    var val = e.detail.value
    var id = e.target.id
    var currAddress = this.data.currAddress
    if (id) {
      currAddress[id] = val
      this.setData({
        currAddress: currAddress
      })
    }

  },
  initAreaData: function (select) {
    var currAddress = this.data.currAddress
    var province_code = this.data.province_code
    var province_idx = this.data.province_idx
    var areaData = this.data.areaData
    var city_name = []
    var city_code = []
    var city_idx = {}
    var c = 0;
    for (var i in areaData[currAddress.province_code]) {
      city_name.push(areaData[currAddress.province_code][i])
      city_code.push(i)
      city_idx[i] = c++
    }

    if (select) {
      currAddress.counties_code = ''
      currAddress.city_code = ''
    }
    var counties_name = []
    var counties_code = []
    var counties_idx = {}
    var j = 0;
    for (var a in areaData[currAddress.city_code]) {
      counties_name.push(areaData[currAddress.city_code][a])
      counties_code.push(a)
      counties_idx[a] = j++
    }
    this.setData({
      currAddress: currAddress,
      city_name: city_name,
      city_code: city_code,
      city_idx: city_idx,
      counties_idx: counties_idx,
      counties_name: counties_name,
      counties_code: counties_code
    })
  },
  bindPickerChange: function (e) {
    var id = e.target.id
    var currAddress = this.data.currAddress
    var province_code = this.data.province_code
    var areaData = this.data.areaData

    if (id == 'province') {
      currAddress.province_code = province_code[e.detail.value]
      this.setData({
        currAddress: currAddress
      })
      this.initAreaData(true)

    } else if (id == 'city') {
      var city_name = []
      var city_code = []
      var city_idx = {}
      var k = 0;
      for (var i in areaData[currAddress.province_code]) {
        city_name.push(areaData[currAddress.province_code][i])
        city_code.push(i)
        city_idx[i] = k++
      }
      currAddress.city_code = city_code[e.detail.value]
      var counties_name = []
      var counties_code = []
      var counties_idx = {}
      var j = 0;
      for (var a in areaData[currAddress.city_code]) {
        counties_name.push(areaData[currAddress.city_code][a])
        counties_code.push(a)
        counties_idx[a] = j++
      }
      if (counties_code.length <= 0) {
        this.setData({
          countiesShow: false
        })
      } else if (counties_code.length >= 1) {
        this.setData({
          countiesShow: true
        })
      }
      currAddress.counties_code = ''
      console.log(counties_name, counties_code, counties_idx)
      this.setData({
        currAddress: currAddress,
        counties_idx: counties_idx,
        counties_name: counties_name,
        counties_code: counties_code
      })

    } else if (id == 'counties') {
      var counties_name = []
      var counties_code = []
      var counties_idx = {}
      var j = 0;
      for (var a in areaData[currAddress.city_code]) {
        counties_name.push(areaData[currAddress.city_code][a])
        counties_code.push(a)
        counties_idx[a] = j++
      }
      currAddress.counties_code = counties_code[e.detail.value]
      this.setData({
        currAddress: currAddress
      })
    }

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var action = options.a
    var that = this
    this.setData({
      url_params: options,
      action: action
    })
    app.getAreaJson(function (res) {
      console.log(res['86'])
      var province_name = []
      var province_code = []
      var province_idx = {}
      var j = 0
      for (var i in res['86']) {
        province_name.push(res['86'][i])
        province_code.push(i)
        province_idx[i] = j++
      }
      that.setData({
        province_name: province_name,
        province_code: province_code,
        province_idx: province_idx,
        areaData: res
      })
      console.log(that.data)
      if (action == 'add') {
        that.setData({
          currAddress: {
            addressee: '',
            mobile_phone: '',
            detail_address: '',
            city_code: '',
            counties_code: '',
            province_code: '',
            email: ''
          }
        })
      } else {
        var user_address_id = parseInt(options.user_address_id)
        var url = config.BASE + config.API.user_address_query
        var data = {
          user_address_id: user_address_id
        }
        request.post(url, data)
          .then((res) => {
            if (res.ret == 0) {
              var currAddress = {}
              for (var i in res.body) {
                if (res.body[i].user_address_id == user_address_id) {
                  currAddress = res.body[i]
                  break;
                }
              }
              if (currAddress.counties_code == 0) {
                that.setData({
                  countiesShow: false
                })
              }
              that.setData({
                currAddress: currAddress
              })
              that.initAreaData()
            }

          })
      }
    })




  },
  delAddress: function () {
    var url_params = this.data.url_params
    var user_address_id = parseInt(url_params.user_address_id)
    var data = {
      user_address_id: user_address_id
    }
    var url = config.BASE + config.API.user_address_delete
    request.post(url, data)
      .then((res) => {
        if (res.ret == 0) {
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
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'success',
            duration: 2000
          })
        }
      })
  },
  onReady: function () {
    // 页面渲染完成
    this.initAreaData()
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