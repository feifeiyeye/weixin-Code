// pages/apply/apply.js
var util = require('../../utils/util.js')
var config = require('../config.js')
var request = require('../request')
var fun = require('../functions.js')
// var japan = require('../japan.js')
var that = null
var app = getApp()
Page({
  data: {

    img_src: 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/product/in.png',

    ops: {},

    content: {}, // 所有的数据

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
    is_signature: false,

    currentAddressHome: {},

    inputStatus: [0, 0, 0], // 输入状态，0填写，1已完成


    //下拉菜单
    sexy: ['男', '女'],
    sexyIndex: 0,

    oldNames: ['无', '有'],
    oldNameSelectedHeight: 50,   // 有曾用名时高度要加100px 单身、已婚、离异、丧偶

    shiOrfou: ['否', '是'],

    marryStatus: ['单身', '已婚', '离异', '丧偶'],
    mateCountry: ['其它', '新加坡公民', '新加坡永久公民'],

    provinces: ['北京', '上海', '广东', '浙江', '天津', '江苏', '四川', '福建', '河北', '辽宁', '湖北', '重庆', '内蒙古', '吉林', '黑龙江', '山西', '安徽', '江西', '山东', '河南', '湖南', '广西', '海南', '贵州', '云南', '陕西', '甘肃', '青海', '宁夏', '西藏', '新疆', '其它'],
    bornProvinceIndex: -1,
    issueProvinceIndex: -1,

    jobs: ['职员', '退休', '学生', '学龄前儿童', '无业', '自由职业者'],
    xueliArr: ['无', '小学', '初中', '高中', '大学', '研究生'],
    beliefArr: ['无', '佛教', '伊斯兰教', '基督教'],
    targetArr: ['旅游', '商务'],

    selectedIndex: -1,
    animationDatas: [], // 动态高度动画
    animationArrowDatas: [],  // 箭头转向动画
    heights: [760, 305, 560],  // 这里的高度都是基本高度，在有选项展开后，要加上相应的展开的高度
    // +16是因为判决有罪换行
    //出生日期
    dateNow: '', // 当前日期字符串
  },

  getTempHeight: function (index) {
    var height = 0;
    if (index == 0) {
      if (this.data.content.old_name == 1) {
        height += this.data.oldNameSelectedHeight;
      }
      height += this.data.bornProvinceIndex == this.data.provinces.length - 1 ? 50 : 0;
      if (this.data.content.marry == 2) {
        height += 50
        if (this.data.content.mate_country == 0) {
          height += 50
        }
      }
    } else if (index == 1) {
      height += this.data.content.issue_place_cn == '其它' ? 50 : 0;
    } else if (index == 2) {

    }
    return height;
  },

  tapToExpand: function (e) {
    var index = e.currentTarget.id - 100

    this.tapAction(index)
  },

  tapAction: function (index) {
    for (var i = 0; i < this.data.heights.length; i++) {

      if (index == i) {
        if (this.data.selectedIndex == index) {
          // 重复点击某一行
          this.setData({
            selectedIndex: -1
          })
        } else {
          this.setData({
            selectedIndex: index
          })
        }
      }
    }

    this.refreshView()

  },

  refreshView: function () {
    var animationDataTemp = []
    var animationArrowDatasTemp = []

    for (var i = 0; i < this.data.heights.length; i++) {

      var height = 0
      var rotateDegree = 0
      if (this.data.selectedIndex == i) {
        // 重新计算每列的高度
        var tempHeight = this.getTempHeight(i)
        height = this.data.heights[i] + tempHeight;
        rotateDegree = 90
      }

      this.animation.height(height + "px").rotate(0).step()
      animationDataTemp[i] = this.animation.export()

      this.animation.rotate(rotateDegree).height("24rpx").step()
      animationArrowDatasTemp[i] = this.animation.export()
    }

    this.setData({
      animationDatas: animationDataTemp,
      animationArrowDatas: animationArrowDatasTemp,
    })

    this.checkInputStatus()

  },


  // 性别选择
  bindSexPickerChange: function (e) {
    var content = this.data.content
    content.gender = parseInt(e.detail.value)
    this.setData({
      content: content
    })
  },

  // 有无曾用名选择
  bindOldNamePickerChange: function (e) {
    var content = this.data.content
    content.old_name = parseInt(e.detail.value)
    if (content.old_name == 0) {
      content.old_name_cn = ''
      content.old_name_en = ''
    }
    this.setData({
      content: content
    })
    this.refreshView()
  },

  // 出生地选择
  bindBornProvincePickerChange: function (e) {
    var content = this.data.content
    content.province = this.data.provinces[parseInt(e.detail.value)]
    this.setData({
      bornProvinceIndex: parseInt(e.detail.value),
    })
    if (this.data.bornProvinceIndex == this.data.provinces.length - 1) {
      content.province = ''
    }
    this.setData({
      content: this.data.content,
    })
    this.refreshView()
  },

  // 签发地选择
  bindIssuedProvincePickerChange: function (e) {

    var content = this.data.content
    content.issue_place_cn = this.data.provinces[parseInt(e.detail.value)]
    if (parseInt(e.detail.value) != this.data.provinces.length - 1) {
      content.other_issue_place_cn = ''
    }
    this.setData({
      content: content,
      issueProvinceIndex: parseInt(e.detail.value),
    })

    this.refreshView()

  },

  // 婚姻状况选择
  bindMarryStatusPickerChange: function (e) {
    var content = this.data.content
    content.marry = parseInt(e.detail.value) + 1
    this.setData({
      content: content
    })
    this.refreshView()
  },

  // 出生日期
  bindDateChange: function (e) {
    var content = this.data.content
    content[e.currentTarget.id] = e.detail.value
    this.setData({
      content: content
    })
    this.validCardInfo(false)
  },

  // 紧急联系人是否住在一起选择器
  bindJobPickerChange: function (e) {
    var content = this.data.content
    content['job'] = parseInt(e.detail.value) + 1
    // job为学龄前儿童时，学历要改为无
    if (content['job'] == 4) {
      content['xueli'] = 0
    }
    this.setData({
      content: content,
    })
    this.refreshView()
  },

  // 配偶国籍、等选择的值与picker相等且无特殊操作的选择器
  bindNormalPickerChange: function (e) {
    var id = e.currentTarget.id
    var content = this.data.content
    content[id] = parseInt(e.detail.value)
    this.setData({
      content: content,
    })
    this.refreshView()
  },

  // 选择的值为picker+1、且无特殊操作的选择器
  bindSpecialPickerChange: function (e) {
    var id = e.currentTarget.id
    var content = this.data.content
    content[id] = parseInt(e.detail.value) + 1
    this.setData({
      content: content,
    })
    this.refreshView()
  },

  initAreaData: function () {
    var currentAddressHome = this.data.currentAddressHome
    var province_code = this.data.province_code
    var province_idx = this.data.province_idx
    var areaData = this.data.areaData
    var city_name = []
    var city_code = []
    var city_idx = {}
    var c = 0;
    console.log(province_idx, currentAddressHome.province_code)
    var idx = province_code[province_idx[currentAddressHome.province_code]]
    console.log(idx)
    for (var i in areaData[idx]) {
      city_name.push(areaData[idx][i])
      city_code.push(i)
      city_idx[i] = c++
    }
    currentAddressHome.province_code = idx
    currentAddressHome.city_code = city_code[0]

    var counties_name = []
    var counties_code = []
    var counties_idx = {}
    var j = 0;
    for (var a in areaData[currentAddressHome.city_code]) {
      counties_name.push(areaData[currentAddressHome.city_code][a])
      counties_code.push(a)
      counties_idx[a] = j++
    }

    currentAddressHome.counties_code = counties_code[0]
    this.setData({
      currentAddressHome: currentAddressHome,
      city_name: city_name,
      city_code: city_code,
      city_idx: city_idx,
      counties_idx: counties_idx,
      counties_name: counties_name,
      counties_code: counties_code
    })
  },

  // 常住地址选择器
  bindPickerChange: function (e) {
    var id = e.target.id
    var currentAddressHome = this.data.currentAddressHome
    var province_code = this.data.province_code
    var areaData = this.data.areaData

    if (id == 'province') {
      currentAddressHome.province_code = province_code[e.detail.value]
      currentAddressHome.province = this.data.province_name[this.data.province_idx[currentAddressHome.province_code]]
      this.setData({
        currentAddressHome: currentAddressHome
      })
      this.initAreaData()

    } else if (id == 'city') {
      var city_name = []
      var city_code = []
      var city_idx = {}
      var k = 0;
      for (var i in areaData[currentAddressHome.province_code]) {
        city_name.push(areaData[currentAddressHome.province_code][i])
        city_code.push(i)
        city_idx[i] = k++
      }
      currentAddressHome.city_code = city_code[e.detail.value]
      currentAddressHome.city = this.data.city_name[this.data.city_idx[currentAddressHome.city_code]]
      var counties_name = []
      var counties_code = []
      var counties_idx = {}
      var j = 0;
      for (var a in areaData[currentAddressHome.city_code]) {
        counties_name.push(areaData[currentAddressHome.city_code][a])
        counties_code.push(a)
        counties_idx[a] = j++
      }
      currentAddressHome.counties_code = counties_code[0]
      console.log(counties_name, counties_code, counties_idx)
      this.setData({
        currentAddressHome: currentAddressHome,
        counties_idx: counties_idx,
        counties_name: counties_name,
        counties_code: counties_code
      })

    } else if (id == 'counties') {
      var counties_name = []
      var counties_code = []
      var counties_idx = {}
      var j = 0;
      for (var a in areaData[currentAddressHome.city_code]) {
        counties_name.push(areaData[currentAddressHome.city_code][a])
        counties_code.push(a)
        counties_idx[a] = j++
      }
      currentAddressHome.counties_code = counties_code[e.detail.value]
      currentAddressHome.country = this.data.counties_name[this.data.counties_idx[currentAddressHome.counties_code]]
      this.setData({
        currentAddressHome: currentAddressHome
      })
    }

    this.validBaseInfo(false)

  },

  getData: function () {
    var url = config.BASE + config.API.applicant_application_query
    // var data = {}

    request.post(url, this.data.ops)
      .then((res) => {
        console.log(JSON.stringify(res))
        if (res.ret == '0') {
          var str = res.body.content
          var content = {}
          try {
            content = JSON.parse(str)
          } catch (e) {
            console.log('转化json异常')
          }

          // 消除所有默认值

          // 基本信息
          that.initStringData(content, 'first_name_en', res.body.passport.surname_pinyin)
          that.initStringData(content, 'second_name_en', res.body.passport.name_pinyin)
          that.initIntData(content, 'old_name', -1)
          that.initStringData(content, 'old_name_en', '')

          that.initStringData(content, 'phone', '')
          var birthday = res.body.passport.birthday
          if (birthday == undefined || birthday.length == 0)
            birthday = ''
          that.initStringData(content, 'birthday', birthday)
          var gender = res.body.passport.gender + ''
          that.initIntData(content, 'gender', gender.length == 0 ? -1 : parseInt(gender))
          that.initIntData(content, 'marry', -1)

          that.initIntData(content, 'mate_country', -1)
          that.initStringData(content, 'mate_country_other', '中国')
          that.initStringData(content, 'country', '中国')
          that.initStringData(content, 'province', res.body.passport.birth_place_cn)

          for (var i = 0; i < that.data.provinces.length; i++) {
            if (content.province == that.data.provinces[i]) {
              that.setData({
                bornProvinceIndex: i,
              })
            }
          }

          that.initStringData(content, 'race', 'CHINESE')
          that.initStringData(content, 'address', '')
          that.initStringData(content, 'address_detail', '')


          // 证件信息
          that.initStringData(content, 'passport_number', res.body.passport.passport_number)
          that.initStringData(content, 'issue_place_cn', res.body.passport.issue_place_cn)
          that.initStringData(content, 'other_issue_place_cn', '')
          for (var i = 0; i < that.data.provinces.length; i++) {
            if (content.issue_place_cn == that.data.provinces[i]) {
              that.setData({
                issueProvinceIndex: i,
              })
            }
          }

          that.initStringData(content, 'ps_issue_date', res.body.passport.issue_date)
          that.initStringData(content, 'ps_expire_date', res.body.passport.expire_date)
          that.initStringData(content, 'arrive', '')


          // 其它信息
          that.initIntData(content, 'job', -1)
          that.initIntData(content, 'xueli', -1)
          that.initIntData(content, 'belief', -1)
          that.initIntData(content, 'target', -1)

          that.initIntData(content, 'other_visit', -1)
          that.initIntData(content, 'any_reject', -1)
          that.initIntData(content, 'any_guilt', -1)
          that.initIntData(content, 'ever_ban', -1)
          that.initIntData(content, 'other_name', -1)


          that.setData({
            content: content,
            is_signature: res.body.signature
          })

          var arr = content.address.split('-')
          if (arr == undefined || !(arr instanceof Array))
            arr = []
          // 初始化地址信息
          this.setData({
            currentAddressHome: {
              province: arr.length > 0 ? arr[0] : '',
              city: arr.length > 1 ? arr[1] : '',
              country: arr.length > 2 ? arr[2] : '',
              city_code: 110100,
              counties_code: 110101,
              province_code: 110000
            }
          })

          this.checkInputStatus()
          this.refreshView()

        } else {

        }
      }).catch((err) => {
        console.log(err)
      })
  },

  // 初始化content里的数据，以content为准，如果content里没有，则去对应的id、passport里的值
  initStringData: function (content, key, str) {
    if (content[key] == undefined || (content[key] + '').length == 0) {
      if (str != undefined) {
        content[key] = str
      } else {
        content[key] = ''
      }
    }
  },

  initIntData: function (content, key, value) {
    if (content[key] == undefined || (content[key] + '').length == 0) {
      content[key] = value
    }
  },

  // 绑定基本信息输入
  contentBindInput: function (e) {
    var id = e.currentTarget.id
    this.data.content[id] = e.detail.value
    console.log(this.data.content)
    this.setData({
      content: this.data.content
    })
    this.checkInputStatus()
  },

  valid: function (e) {
    // 各种检验
    if (e == 0) {
      if (!this.validBaseInfo(true)) {
        return false
      }
    }
    if (e == 1) {
      if (!this.validCardInfo(true)) {
        return false
      }
    }
    if (e == 2) {
      if (!this.validOtherInfo(true)) {
        return false
      }
    }
    return true
  },

  saveInfo: function (e) {
    console.log(e)
    if (!this.valid(parseInt(e.currentTarget.id))) {
      return;
    }

    var content = this.getContent()

    console.log('提交的信息：' + content)
    var formId = e.detail.formId
    this.applicantAdd(0, content, { wxformid: formId })
  },

  tijiao: function (e) {
    for (var i = 0; i <= 2; i++) {
      if (!this.valid(i)) {
        return;
      }
    }

    var content = this.getContent()
    var that = this
    var is_signature = this.data.is_signature
    if (!fun.isEmptyObject(content)) {
      if (!is_signature) {
        wx.showModal({
          title: '提示信息',
          content: '确认填写的内容正确无误?\r\n添加电子签名即可提交',
          cancelText: '核对一下',
          cancelColor: '#aaa',
          confirmText: '去签名',
          confirmColor: '#f98483',
          success: function (res) {
            if (res.confirm && !is_signature) {
              console.log('提交的信息：' + content)
              that.applicantAdd(1, content)
            }
          }
        })
      } else {
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
          success: function(res){
            // success
          },
          fail: function(res) {
            // fail
          },
          complete: function(res) {
            // complete
          }
        })
      }
    }

  },

  getContent: function () {
    var content = JSON.stringify(this.data.content)

    var contentJSON = JSON.parse(content)
    var keys = ['old_name', 'gender', 'marry', 'mate_country',
      'job', 'xueli', 'belief', 'target',
      'other_visit', 'any_reject', 'any_guilt', 'ever_ban', 'other_name']

    if (contentJSON['old_name'] == 0) {
      contentJSON['old_name_cn'] = undefined
      contentJSON['old_name_en'] = undefined
    }
    if (contentJSON['issue_place_cn'] != '其它') {
      contentJSON['other_issue_place_cn'] = undefined
    }
    if (contentJSON['mate_country'] != 0) {
      contentJSON['mate_country_other'] = undefined
    }
    if (contentJSON['birth_place2'] != undefined) {
      contentJSON['birth_place2'] = undefined
    }

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      contentJSON[key] = contentJSON[key] + ''
    }

    content = JSON.stringify(contentJSON)

    return content
  },

  applicantAdd: function (action, content, header) {
    var url = config.BASE + config.API.applicant_application_add
    var user_order_id = this.data.ops.user_order_id
    var order_applicant_id = this.data.ops.order_applicant_id
    var data = {
      user_order_id: user_order_id,
      order_applicant_id: order_applicant_id,
      action: action,
      content: content,
    }

    request.post(url, data, header).then((res) => {

      console.log(JSON.stringify(res))

      if (res.ret == '0') {
        if (action == 0) {
          var index = this.data.selectedIndex
          if (this.data.selectedIndex < 2) {
            index++
          }

          this.tapAction(index)
          // 提交成功，弹提示框然后退出页面
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1500
          })
        } else {
          // 提交成功，弹提示框然后退出页面
          wx.showToast({
            title: '信息提交成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function () {
            wx.navigateTo({
                url: '/pages/apply/handWriting?user_order_id=' + user_order_id +'&order_applicant_id=' +order_applicant_id,
                success: function (res) {
                  // success
                },
                fail: function (res) {
                  // fail
                },
                complete: function (res) {
                  // complete
                }
              })
          }, 1500)

        }
      } else {

      }
    }).catch((err) => {
      console.log(err)
    })

  },

  checkInputStatus: function () {
    this.validBaseInfo(false)
    this.validCardInfo(false)
    this.validOtherInfo(false)
  },

  validBaseInfo: function (showToast) {
    var inputStatus = this.data.inputStatus
    inputStatus[0] = 1

    var keysInt = ['old_name', 'gender', 'marry']
    for (var i = 0; i < keysInt.length; i++) {
      var key = keysInt[i]
      if (this.data.content[key] == undefined || this.data.content[key] < 0) {
        if (showToast) {
          wx.showToast({
            title: '请检查标红的部分',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[0] = 0
        this.setData({
          inputStatus: inputStatus
        })
        console.log(key)
        return false
      }
    }

    var keys = ['first_name_en', 'second_name_en', 'phone',
      'birthday', 'country', 'province', 'race',
      'address_detail']

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      if (this.data.content[key] == undefined || this.data.content[key].length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请检查标红的部分',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[0] = 0
        this.setData({
          inputStatus: inputStatus
        })
        console.log(key)
        return false
      }
    }

    if (this.data.content['phone'].length != 11) {
      if (showToast) {
        wx.showToast({
          title: '请检查标红的部分',
          icon: 'success',
          duration: 1500
        })
      }
      inputStatus[0] = 0
      this.setData({
        inputStatus: inputStatus
      })
      console.log('phone')
      return false
    }

    if (this.data.content['old_name'] == 1) {
      if (this.data.content['old_name_en'] == undefined || this.data.content['old_name_en'].length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请检查标红的部分',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[0] = 0
        this.setData({
          inputStatus: inputStatus
        })
        console.log('曾用名')
        return false
      }
    }

    if (this.data.content['marry'] == 2 &&
      (this.data.content['mate_country'] == -1 || (this.data.content['mate_country'] == 0 && this.data.content['mate_country_other'].length == 0))) {
      if (showToast) {
        wx.showToast({
          title: '请检查标红的部分',
          icon: 'success',
          duration: 1500
        })
      }
      inputStatus[0] = 0
      this.setData({
        inputStatus: inputStatus
      })
      console.log('配偶其它国籍')
      return false
    }

    if (this.data.currentAddressHome.province.length == 0 ||
      this.data.currentAddressHome.city.length == 0 ||
      this.data.currentAddressHome.country.length == 0) {
      if (showToast) {
        wx.showToast({
          title: '请检查标红的部分',
          icon: 'success',
          duration: 1500
        })
      }
      inputStatus[0] = 0
      this.setData({
        inputStatus: inputStatus
      })
      console.log('居住地址')
      return false
    } else {
      this.data.content.address = this.data.currentAddressHome.province + '-' + this.data.currentAddressHome.city + '-' + this.data.currentAddressHome.country
    }

    this.setData({
      inputStatus: inputStatus
    })
    return true
  },

  validCardInfo: function (showToast) {
    var inputStatus = this.data.inputStatus
    inputStatus[1] = 1

    var keys = ['passport_number', 'issue_place_cn',
      'ps_issue_date', 'ps_expire_date', 'arrive']

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      if (this.data.content[key] == undefined || this.data.content[key].length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请检查标红的部分',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[1] = 0
        this.setData({
          inputStatus: inputStatus
        })
        console.log(key)
        return false
      }
    }

    if (this.data.content['issue_place_cn'] == '其它') {
      if (this.data.content['other_issue_place_cn'] == undefined || this.data.content['other_issue_place_cn'].length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请检查标红的部分',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[1] = 0
        this.setData({
          inputStatus: inputStatus
        })
        console.log('其它地点')
        return false
      }
    }

    this.setData({
      inputStatus: inputStatus
    })
    return true
  },

  // 校验其它信息
  validOtherInfo: function (showToast) {
    var inputStatus = this.data.inputStatus
    inputStatus[2] = 1

    var keys = [
      'job', 'xueli', 'belief', 'target',
      'other_visit', 'any_reject', 'any_guilt', 'ever_ban', 'other_name']
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      if (this.data.content[key] == undefined || this.data.content[key] < 0) {
        if (showToast) {
          wx.showToast({
            title: '请检查标红的部分',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[2] = 0
        this.setData({
          inputStatus: inputStatus
        })
        console.log(key)
        return false
      }
    }

    this.setData({
      inputStatus: inputStatus
    })
    return true
  },

  onLoad: function (options) {

    that = this

    // {user_order_id: "10000", order_applicant_id: "1001"}
    var ops = options
    ops['user_order_id'] = parseInt(options['user_order_id'] + '')
    ops['order_applicant_id'] = parseInt(options['order_applicant_id'] + '')
    this.setData({
      ops: ops,
    })

    // 页面初始化 options为页面跳转所带来的参数
    this.animation = wx.createAnimation({
      timingFunction: 'ease',
    })
    var d = util.formatDate2(new Date())
    this.setData({
      dateNow: d,
    })

    this.getData()
    this.getAddress()

  },

  getAddress: function () {
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