
var util = require('../../utils/util.js')
var config = require('../config.js')
var fun = require('../functions.js')
var request = require('../request.js')
var app = getApp();
Page({
  data: {
    class_name: 'pop_box',
    hide: 'hide',
    cityList: ['全部', "北京", "上海", "天津", "河北", "山西", "河南", "辽宁", "吉林", "黑龙江", "内蒙古", "江苏", "山东", "安徽", "浙江", "福建", "湖北", "湖南", "广东", "广西", "江西", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "新疆", "重庆", "海南"],
    activeCity: '全部',
    cityListCode: {
      "全部": "0",
      "北京": "110000",
      "上海": "310000",
      "广东": "440000",
      "浙江": "330000",
      "天津": "120000",
      "江苏": "320000",
      "四川": "510000",
      "福建": "350000",
      "河北": "130000",
      "辽宁": "210000",
      "湖北": "420000",
      "重庆": "500000",
      "内蒙古": "150000",
      "吉林": "220000",
      "黑龙江": "230000",
      "山西": "140000",
      "安徽": "340000",
      "江西": "360000",
      "山东": "370000",
      "河南": "410000",
      "湖南": "430000",
      "广西": "450000",
      "海南": "460000",
      "贵州": "520000",
      "云南": "530000",
      "陕西": "610000",
      "甘肃": "620000",
      "青海": "630000",
      "宁夏": "640000",
      "西藏": "540000",
      "新疆": "650000",
      "台湾": "710000",
      "香港": "810000",
      "澳门": "820000"
    },
    visaList: [],
    visaListBak: [],
    background: '',
    url_params: {},
    country: '',
    isLoad: false
  },
  onLoad: function (options) {
    this.setData({
      area: options['area'],
      url_params: options,
      isLoad: true
    })

    console.log('app glable', app.globalData.visa_country_background);
    var that = this
    app.showLoading()

    var visa_country_show_url = config.BASE + config.API.visa_country_show
    request.post(visa_country_show_url, {}).then((res) => {
      if (res.ret == '0') {
        var list = res.body
        var visa_country_background = {}
        for (var i in list) {
          visa_country_background[list[i].visa_country_id] = list[i].background_img
        }
        that.setData({
          background: 'background-image: url(' + visa_country_background[options.visa_country_id] + ');'
        })
      }
    })

    var url = config.BASE + config.API.visa_product_list
    var data = { visa_country_id: parseInt(options.visa_country_id) }
    request.post(url, data)
      .then((res) => {
        console.log(res.body.product)
        if (res.msg == 'ok') {
          var visaList = res.body.product
          for (var i in visaList) {
            var score = visaList[i].sum_score.toString().split('.')
            if (score[1] == '' || score[1] == undefined) {
              score[1] = 0;
            } else {
              score[1] = '0.' + score[1]
            }
            if (score[0] == 0) {
              score[0] = 5;
            }
            visaList[i].score = { float: score[1], fraction: parseInt(score[0]) }
          }
          var visaListClone = fun.clone(visaList)
          that.setData({
            visaList: visaList,
            visaListBak: visaListClone,
            isLoad: false
          })
          app.hideLoading()
          fun.getProvince(function (Province) {
            that.filterCity(Province)
            that.setData({
              activeCity: Province
            })

          })
        }
      }).catch((err) => {
        console.log(err)
      })

  },
  closePopup: function () {
    this.setData({
      'class_name': 'pop_box',
      'hide': 'hide'
    })
  },
  openPopup: function () {
    this.setData({
      'class_name': 'pop_box',
      'hide': ''
    })
  },
  selectCity: function (e) {
    var id = parseInt(e.target.id)
    var activeCity = this.data.cityList[id]
    this.setData({
      activeCity: this.data.cityList[id],
    })

    this.filterCity(activeCity)

    this.closePopup()
  },

  filterCity: function (activeCity) {

    var cityListCode = this.data.cityListCode
    var visaList = this.data.visaList
    var visaListBak = this.data.visaListBak

    var activeCode = cityListCode[activeCity]
    if (activeCode == 0 || activeCity == '全部') {
      this.setData({
        visaList: visaListBak,
        isLoad: false
      })
      return;
    }
    var tmpArr = []
    var tmpObj = {}
    for (var i = 0; i < visaListBak.length; i++) {
      var item = visaListBak[i]
      for (var j in item.cover_province) {
        if (activeCode == item.cover_province[j]) {
          tmpArr.push(item)
          tmpObj[item.visa_product_id] = 1
          break;
        } else {
          continue
        }
      }
    }
    this.setData({
      visaList: tmpArr,
      isLoad: false
    })
  },
  onShareAppMessage: function () {
    var country = this.data.url_params.country === undefined ? '' : this.data.url_params.country
    var country_id = this.data.url_params.visa_country_id
    var str = '&area=' + this.data.area + '&country=' + country
    return {
      title: country + '签证',
      desc: '熊猫签证—足不出户办签证',
      path: '/pages/visa/visa?visa_country_id=' + country_id + str
    }
  }
})