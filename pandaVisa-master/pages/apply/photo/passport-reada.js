// pages/apply/photo/passport-reada.js
// pages/apply/photo/idcard-reada.js
var app = getApp();
var fun = require('../../functions.js')
var util = require('../../../utils/util.js')
var request = require('../../request.js')
var config = require('../../config.js')

Page({
  data: {
    //下拉菜单
    sexy: ['男', '女'],
    sexyIdx: 0,
    area: ["北京",
      "上海",
      "广东",
      "浙江",
      "天津",
      "江苏",
      "四川",
      "福建",
      "河北",
      "辽宁",
      "湖北",
      "重庆",
      "内蒙古",
      "吉林",
      "黑龙江",
      "山西",
      "安徽",
      "江西",
      "山东",
      "河南",
      "湖南",
      "广西",
      "海南",
      "贵州",
      "云南",
      "陕西",
      "甘肃",
      "青海",
      "宁夏",
      "西藏",
      "新疆",
      "其他"],
    area_idx: {
      "北京": 0,
      "上海": 1,
      "广东": 2,
      "浙江": 3,
      "天津": 4,
      "江苏": 5,
      "四川": 6,
      "福建": 7,
      "河北": 8,
      "辽宁": 9,
      "湖北": 10,
      "重庆": 11,
      "内蒙古": 12,
      "吉林": 13,
      "黑龙江": 14,
      "山西": 15,
      "安徽": 16,
      "江西": 17,
      "山东": 18,
      "河南": 19,
      "湖南": 20,
      "广西": 21,
      "海南": 22,
      "贵州": 23,
      "云南": 24,
      "陕西": 25,
      "甘肃": 26,
      "青海": 27,
      "宁夏": 28,
      "西藏": 29,
      "新疆": 30,
      "其他": 31
    },
    area_en: [
      "BEIJING",
      "SHANGHAI",
      "GUANGDONG",
      "ZHEJIANG",
      "TIANJIN",
      "JIANGSU",
      "SICHUAN",
      "FUJIAN",
      "HEBEI",
      "LIAONING",
      "HUBEI",
      "CHONGQING",
      "NEIMENGGU",
      "JILIN",
      "HEILONGJIANG",
      "SHANXI",
      "ANHUI",
      "JIANGXI",
      "SHANDONG",
      "HENAN",
      "HUNAN",
      "GUANGXI",
      "HAINAN",
      "GUIZHOU",
      "YUNNAN",
      "SHANGXI",
      "GANSU",
      "QINGHAI",
      "NINGXIA",
      "XIZAN",
      "XINJIANG",
      "OTHER"
    ],
    passPort: {},
    birthplace_other: false,
    birthplace_other_val: '',
    birthplace_other_en_val: '',
    issue_place_other: false,
    issue_place_other_val: '',
    issue_place_other_en_val: '',
    user_order_id: 0,
    order_applicant_id: 0,
    url_params: {},
    warning: {
      birthday: '',
      birthplace: '',
      birthplace_en: '',
      country_code: '',
      issue_date: '',
      issue_place: '',
      issue_place_en: '',
      issuing: '',
      issuing_en: '',
      name: '',
      name_en: '',
      name_en_last: '',
      passport_number: '',
      sex: '',
      validity: '',
      birthplace_other: '',
      issue_place_other: '',
      issue_place_other_en: ''
    }
  },
  //性别选择
  bindPickerChangeSex: function (e) {
    var passPort = this.data.passPort
    passPort.sex = e.detail.value
    this.setData({
      passPort: passPort
    })
  },
  bindPickerChangeArea: function (e) {
    var id = e.target.id
    var idx = e.detail.value
    var birthplace_other = this.data.birthplace_other
    var issue_place_other = this.data.issue_place_other

    var passPort = this.data.passPort
    if (id == 'birthplace_en' || id == 'birthplace') {
      passPort.birthplace = idx
      passPort.birthplace_en = idx
      if (idx == 31) {
        birthplace_other = true;
      } else {
        birthplace_other = false;
      }
    } else if (id == 'issue_place' || id == 'issue_place_en') {
      passPort.issue_place = idx
      passPort.issue_place_en = idx
      if (idx == 31) {
        issue_place_other = true;
      } else {
        issue_place_other = false;
      }
    }
    this.setData({
      passPort: passPort,
      birthplace_other: birthplace_other,
      issue_place_other: issue_place_other
    })
  },
  //日期
  bindDateChange: function (e) {
    var id = e.target.id
    var passPort = this.data.passPort
    if (id == 'birthday') {
      passPort.birthday = e.detail.value
    } else if (id == 'issue_date') {
      passPort.issue_date = e.detail.value
    } else if (id == 'validity') {
      passPort.validity = e.detail.value
    }
    this.setData({
      passPort: passPort
    })
  },
  onLoad: function (options) {

    this.setData({
      url_params: options
    })
    var passPort = app.globalData.passPort
    var area_idx = this.data.area_idx
    var area_en = this.data.area_en
    var birthplace_other = this.data.birthplace_other
    var issue_place_other = this.data.issue_place_other
    passPort.name_en = ''
    passPort.name_en_last = ''
    if (!passPort.name) {
      passPort.name = ''
    }
    if (passPort.passport_line1 != 'undefined') {
      var tmp = passPort.passport_line1.split('<<')
      if (tmp.length > 2) {
        var name_en = tmp[0].split('CHN')
        if (name_en.length >= 2) {
          passPort.name_en = name_en[1]
        }

        var name_en_last = tmp[1].replace('<', '')
        passPort.name_en_last = name_en_last
      }
    }
    var brithplace = ''
    var issue_place = ''
    var brithplace = new String(passPort.birthplace)

    if (brithplace.indexOf('/')) {
      brithplace = brithplace.split('/')
      console.log('brithplace', brithplace)
    }
    issue_place = passPort.issue_place != undefined ? passPort.issue_place : ''
    console.log(issue_place, issue_place.indexOf('/'), '22s')
    if (issue_place.indexOf('/')) {
      issue_place = issue_place.split('/')
    }
    if (brithplace.length >= 2) {
      if (area_idx[brithplace[0]]) {
        passPort.birthplace = area_idx[brithplace[0]]
        passPort.birthplace_en = passPort.birthplace
        birthplace_other = false
      } else {
        passPort.birthplace = 31
        passPort.birthplace_en = 31
        passPort.birthplace_other = ''
        passPort.birthplace_other_en = ''
        birthplace_other = true
      }
    } else {
      if (area_idx[brithplace]) {
        passPort.birthplace = area_idx[brithplace]
        passPort.birthplace_en = passPort.birthplace
        birthplace_other = false
      } else {
        passPort.birthplace = 31
        passPort.birthplace_en = 31
        passPort.birthplace_other = ''
        passPort.birthplace_other_en = ''
        birthplace_other = true
      }
    }

    if (issue_place.length >= 2) {
      console.log(issue_place[0], area_idx[issue_place[0]])
      if (area_idx[issue_place[0]]) {
        passPort.issue_place = area_idx[issue_place[0]]
        passPort.issue_place_en = passPort.issue_place
        issue_place_other = false
      } else {
        passPort.issue_place = 31
        passPort.issue_place_en = 31
        passPort.issue_place_other_en = ''
        passPort.issue_place_other = ''
        issue_place_other = true
      }
    } else {
      if (area_idx[issue_place]) {
        passPort.issue_place = area_idx[issue_place]
        passPort.issue_place_en = passPort.issue_place
        issue_place_other = false
      } else {
        passPort.issue_place = 31
        passPort.issue_place_en = 31
        passPort.issue_place_other_en = ''
        passPort.issue_place_other = ''
        issue_place_other = true
      }
    }


    passPort.issue_date = util.formatDate2(new Date(passPort.issue_date)) == 'NaN-NaN-NaN' ? '' : util.formatDate2(new Date(passPort.issue_date))
    passPort.validity = util.formatDate2(new Date(passPort.validity)) == 'NaN-NaN-NaN' ? '' : util.formatDate2(new Date(passPort.validity))
    passPort.issuing = '公安部出入境管理局'
    passPort.issuing_en = 'MPS EXIT & ENTRY ADMINISTRATION'
    passPort.birthday = util.formatDate2(new Date(passPort.birthday)) == 'NaN-NaN-NaN' ? '' : util.formatDate2(new Date(passPort.birthday))
    passPort.sex = (passPort.sex == "男" || passPort.sex == undefined) ? 0 : 1
    console.log(passPort)
    this.setData({
      passPort: passPort,
      birthplace_other: birthplace_other,
      issue_place_other: issue_place_other,
      user_order_id: options.user_order_id,
      order_applicant_id: options.order_applicant_id
    })
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    app.hideLoading()
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  inputVal: function (e) {
    var id = e.target.id
    var val = e.detail.value
    var passPort = this.data.passPort
    passPort[id] = val
    this.setData({
      passPort: passPort
    })
  },
  other_input: function (e) {
    var val = e.detail.value
    var id = e.target.id
    var passPort = this.data.passPort
    passPort[id] = val
    this.setData({
      passPort: passPort
    })
    if (id == 'birthplace_other') {
      this.setData({
        birthplace_other_val: val
      })
    } else if (id == 'birthplace_other_en') {
      this.setData({
        birthplace_other_en_val: val
      })
    } else if (id == 'issue_place_other') {
      this.setData({
        issue_place_other_val: val
      })
    } else if (id == 'issue_place_other_en') {
      this.setData({
        issue_place_other_en_val: val
      })
    }
  },
  name_input: function (e) {
    var val = e.detail.value
    var id = e.target.id
    var passPort = this.data.passPort
    passPort[id] = val
    this.setData({
      passPort: passPort
    })
  },
  en_name_input: function (e) {
    var val = e.detail.value
    var id = e.target.id
    var passPort = this.data.passPort
    if (id == 'name_en') {
      passPort.name_en = val
    } else if (id == 'name_en_last') {
      passPort.name_en_last = val
    }
    console.log(passPort)
    this.setData({
      passPort: passPort
    })
  },
  submit: function (e) {
    var that = this
    var pass = this.data.passPort
    var passPort = fun.clone(pass)
    var area_idx = this.data.area_idx
    var area = this.data.area
    var birthplace_other = this.data.birthplace_other
    var issue_place_other = this.data.issue_place_other
    var birthplace_other_val = this.data.birthplace_other_val
    var birthplace_other_en_val = this.data.birthplace_other_en_val
    var issue_place_other_val = this.data.issue_place_other_val
    var issue_place_other_en_val = this.data.issue_place_other_en_val
    console.log('sss', passPort)
    passPort.sex = parseInt(passPort.sex)
    var warning = this.data.warning
    if (!passPort.birthday ||
      !passPort.birthplace ||
      !passPort.birthplace_en ||
      !passPort.country_code ||
      !passPort.issue_date ||
      !passPort.issue_place ||
      !passPort.issue_place_en ||
      !passPort.issuing ||
      !passPort.issuing_en ||
      !passPort.name ||
      !passPort.name_en ||
      !passPort.name_en_last ||
      !passPort.passport_number ||
      !passPort.validity) {
      for (var i in passPort) {
        if (passPort[i] === '') {
          warning[i] = 'warning'
        } else {
          warning[i] = ''
        }
      }
      this.setData({
        warning: warning
      })
      console.log(warning)
      app.toastWarn({
        title: '信息不完整请检查标红项！'
      })
      return
    } else {
      for (var i in passPort) {
        warning[i] = ''
      }
      this.setData({
        warning: warning
      })
    }
    if (passPort.name_en == '') {
      warning.name_en = 'warning'
      this.setData({
        warning: warning
      })
      wx.showToast({
        title: '英文姓不能为空',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (passPort.validity == '') {
      warning.validity = 'warning'
      this.setData({
        warning: warning
      })
      wx.showToast({
        title: '有效期日期不能为空',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (passPort.issue_date == '') {
      warning.issue_date = 'warning'
      this.setData({
        warning: warning
      })
      wx.showToast({
        title: '签发日期不能为空',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (passPort.birthday == '') {
      warning.birthday = 'warning'
      this.setData({
        warning: warning
      })
      wx.showToast({
        title: '出生日期不能为空',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (passPort.name_en_last == '') {
      warning.name_en_last = 'warning'
      this.setData({
        warning: warning
      })
      wx.showToast({
        title: '英文名不能为空',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (birthplace_other && (birthplace_other_val == '' || birthplace_other_en_val == '')) {
      warning.birthplace_other = 'warning'
      this.setData({
        warning: warning
      })
      wx.showToast({
        title: '其它出生地点不能为空',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (issue_place_other && (issue_place_other_val == '' || issue_place_other_en_val == '')) {
      warning.issue_place_other = 'warning'
      this.setData({
        warning: warning
      })
      wx.showToast({
        title: '其它签发地点不能为空',
        icon: 'error',
        duration: 2000
      })
      return
    }
    app.globalData.passPort = passPort
    console.log(app.globalData.passPort, 'ss')
    var passport_url = config.BASE + config.API.applicant_passport_add
    var area = this.data.area
    var area_en = this.data.area_en
    var birth_place_cn = passPort.birthplace == 31 ? birthplace_other_val : area[passPort.birthplace]
    var birth_place_pinyin = passPort.birthplace_en == 31 ? birthplace_other_en_val : area_en[passPort.birthplace_en]
    var issue_place = passPort.issue_place == 31 ? issue_place_other_val : area[passPort.issue_place]
    var issue_place_en = passPort.issue_place_en == 31 ? issue_place_other_en_val : area_en[passPort.issue_place_en]
    var user_order_id = parseInt(this.data.user_order_id)
    var order_applicant_id = parseInt(this.data.order_applicant_id)


    app.showLoading()

    var params = that.data.url_params
    var data = {}
    data.elec_id = parseInt(params.elec_id)
    data.pos = 1
    data.order_applicant_id = parseInt(params.order_applicant_id)
    var suffixs = (pass.url).split('.')
    var suffix = suffixs[(suffixs.length - 1)]
    data.suffix = suffix
    data.user_order_id = parseInt(params.user_order_id)
    var upload_elec_url = config.BASE + config.API.upload_elec_request
    var formId = e.detail.formId
    request.post(upload_elec_url, data, { wxformid: formId })
      .then((upData) => {
        if (upData.ret == 0) {
          return upData.body
        } else {
          return
        }
      }).then((upBody) => {
        var aliyun_host = config.HTTP + upBody.oss_out
        request.uploadFile2Aliyun(aliyun_host, pass.url, upBody.key, upBody.callback, upBody.signature, upBody.policy)
          .then((aliData) => {
            var url = aliData.data.body.url
            var adddata = {
              birth_place_cn: birth_place_cn,
              birth_place_pinyin: birth_place_pinyin,
              birthday: passPort.birthday,
              expire_date: passPort.validity,
              fullname: passPort.name,
              gender: passPort.sex,
              img: url,
              issue_authority_cn: passPort.issuing,
              issue_authority_en: passPort.issuing_en,
              issue_date: passPort.issue_date,
              issue_place_cn: issue_place,
              issue_place_pinyin: issue_place_en,
              name_cn: passPort.name,
              name_pinyin: passPort.name_en_last,
              order_applicant_id: order_applicant_id,
              passport_number: passPort.passport_number,
              surname_cn: passPort.name,
              surname_pinyin: passPort.name_en,
              user_order_id: user_order_id
            }
            console.log(adddata)
            request.post(passport_url, adddata)
              .then((res) => {

              })
            var params = that.data.url_params
            var key = params.user_order_id + '_' + params.order_applicant_id + '_' + params.elec_id
            app.globalData.materialUpload[key] = true
            app.hideLoading()
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


          })
      })


  }
})