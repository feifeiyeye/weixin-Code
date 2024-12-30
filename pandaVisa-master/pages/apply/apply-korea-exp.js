// pages/apply/apply.js
var util = require('../../utils/util.js')
var config = require('../config.js')
var request = require('../request')
// var japan = require('../japan.js')
var that = null
module.exports = {

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

    currentAddressHome: {},
    currentAddressWork: {},
    currentAddressJJ: {},

    inputStatus: [0, 0, 0, 0, 0], // 输入状态，0填写，1已完成


    //下拉菜单
    sexy: ['男', '女'],
    sexyIndex: 0,

    oldNames: ['无', '有'],
    oldNameSelectedHeight: 100,   // 有曾用名时高度要加100px 单身、已婚、离异、丧偶

    shiOrfou: ['否', '是'],
    selectKouanIndex: 0,

    otherPassportTypeArr: ["外交护照", "公务护照", "普通护照", "其他"],

    marryStatus: ['单身', '已婚', '离异', '丧偶'],

    provinces: ['北京', '上海', '广东', '浙江', '天津', '江苏', '四川', '福建', '河北', '辽宁', '湖北', '重庆', '内蒙古', '吉林', '黑龙江', '山西', '安徽', '江西', '山东', '河南', '湖南', '广西', '海南', '贵州', '云南', '陕西', '甘肃', '青海', '宁夏', '西藏', '新疆', '其他'],
    bornProvinceIndex: 0,
    issueProvinceIndex: 0,

    relations: ["父子", "母子", "父女", "母女", "配偶", "其它"],
    selectRelationIndex: 0,

    xueliArr: ['硕士/博士', '研究生', '本科', '大专', '中专', '高中', '初中', '小学', '文盲'],
    selectXueliIndex: 0,

    jobArr: ['企业家', '个人经营', '工作者', '公务员', '学生', '退休者', '无职', '其它'],
    selectJobIndex: 0,

    days: (function () {
      var a = []
      for (var i = 1; i <= 30; i++) {
        a.push(i + '')
      }
      return a
    })(),


    selectedIndex: -1,
    animationDatas: [], // 动态高度动画
    animationArrowDatas: [],  // 箭头转向动画
    heights: [611, 407, 503, 200, 252],  // 这里的高度都是基本高度，在有选项展开后，要加上相应的展开的高度
    // +16是因为判决有罪换行
    //出生日期
    dateNow: '', // 当前日期字符串

  },

  KoreagetTempHeight: function (index) {
    var height = 0;
    if (index == 0) {
      if (this.data.content.old_name == 1) {
        height += this.data.oldNameSelectedHeight;
      }
      height += this.data.content.double_country == 1 ? 50 : 0;
    } else if (index == 1) {
      height += this.data.content.issue_place_cn == '其他' ? 50 : 0;
      height += this.data.content.other_passport == 1 ? 200 : 0;
    } else if (index == 2) {

    } else if (index == 3) {
      if (this.data.content.xueli != '文盲') {
        height += 250
      }
      if (this.data.selectJobIndex <= 4) {
        height += 350
      } else if (this.data.content.job == '其它') {
        height += 50
      }
    } else if (index == 4) {
      if (this.data.content.ever_go == 1) {
        height += 100;
      }
      if (this.data.content.other_visit == 1) {
        height += 50;
      }
      if (this.data.content.together == 1) {
        height += 50;
      }
    }
    return height;
  },

  KoreatapToExpand: function (e) {
    var index = e.currentTarget.id - 100

    this.tapAction(index)
  },

  KoreatapAction: function (index) {
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

  KorearefreshView: function () {
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
  KoreabindSexPickerChange: function (e) {
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
    content.birth_place = this.data.provinces[parseInt(e.detail.value)]
    if (parseInt(e.detail.value) != this.data.provinces.length - 1) {
      content.birth_place2 = ''
    }
    this.setData({
      content: content,
      bornProvinceIndex: parseInt(e.detail.value),
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
  },

  // chcekbox
  KoreacheckboxChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
        changed['checkboxItems[' + i + '].checked'] = true
      } else {
        changed['checkboxItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },

  // 出生日期
  KoreabindDateChange: function (e) {
    var content = this.data.content
    content[e.currentTarget.id] = e.detail.value
    this.setData({
      content: content
    })
    if ('birthday' == e.currentTarget.id) {
      that.setData({
        age: util.getAge(content.birthday)
      })
    }
  },

  // 紧急联系人关系选择器
  bindRelationPickerChange: function (e) {
    var content = this.data.content
    content['ugent_relation'] = this.data.relations[parseInt(e.detail.value)]
    this.setData({
      content: content,
      selectRelationIndex: parseInt(e.detail.value)
    })
  },

  // 紧急联系人是否住在一起选择器
  bindTogetherPickerChange: function (e) {
    var content = this.data.content
    content['jj_together'] = parseInt(e.detail.value)
    if (content['jj_together'] == 1) {
      // 改变当前地址为申请人地址

      try {
        var j = JSON.parse(JSON.stringify(this.data.currentAddressHome))
        this.setData({
          currentAddressJJ: j
        })
      } catch (e) {
      }

      content['jj_street'] = content['home_street']
    }
    this.setData({
      content: content,
    })
  },

  // 
  bindKouanPickerChange: function (e) {
    var content = this.data.content
    content['kouan'] = ['东京', '大阪', '名古屋', '福冈', '札幌', '北海道'][parseInt(e.detail.value)]
    this.setData({
      content: content,
      selectKouanIndex: parseInt(e.detail.value)
    })
  },

  // 是否去过日本、等选择的值与picker相等且无特殊操作的选择器
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

  // 是否去过日本、等选择的值与picker相等且无特殊操作的选择器
  bindEverDurationPickerChange: function (e) {
    var id = e.currentTarget.id
    var content = this.data.content
    content[id] = parseInt(e.detail.value) + 1
    this.setData({
      content: content,
    })
  },

  // 学历选择器
  bindXueliPickerChange: function (e) {
    var content = this.data.content
    content['xueli'] = this.data.xueliArr[parseInt(e.detail.value)]
    this.setData({
      content: content,
    })
    this.refreshView()
  },

  // 职业选择器
  KoreabindJobPickerChange: function (e) {
    var content = this.data.content
    content['job'] = this.data.jobArr[parseInt(e.detail.value)]
    this.setData({
      content: content,
      selectJobIndex: parseInt(e.detail.value)
    })
    this.refreshView()
  },


  KoreainitAreaData: function () {
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
  KoreabindPickerChange: function (e) {
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

  },

  KoreainitWorkAreaData: function () {
    var currentAddressWork = this.data.currentAddressWork
    var province_code = this.data.province_code
    var province_idx = this.data.province_idx
    var areaData = this.data.areaData
    var city_name = []
    var city_code = []
    var city_idx = {}
    var c = 0;
    console.log(province_idx, currentAddressWork.province_code)
    var idx = province_code[province_idx[currentAddressWork.province_code]]
    console.log(idx)
    for (var i in areaData[idx]) {
      city_name.push(areaData[idx][i])
      city_code.push(i)
      city_idx[i] = c++
    }
    currentAddressWork.province_code = idx
    currentAddressWork.city_code = city_code[0]

    var counties_name = []
    var counties_code = []
    var counties_idx = {}
    var j = 0;
    for (var a in areaData[currentAddressWork.city_code]) {
      counties_name.push(areaData[currentAddressWork.city_code][a])
      counties_code.push(a)
      counties_idx[a] = j++
    }

    currentAddressWork.counties_code = counties_code[0]
    this.setData({
      currentAddressWork: currentAddressWork,
      city_name: city_name,
      city_code: city_code,
      city_idx: city_idx,
      counties_idx: counties_idx,
      counties_name: counties_name,
      counties_code: counties_code
    })
  },
  // 工作地址选择器
  KoreabindWorkPickerChange: function (e) {
    var id = e.target.id
    var currentAddressWork = this.data.currentAddressWork
    var province_code = this.data.province_code
    var areaData = this.data.areaData

    if (id == 'province') {
      currentAddressWork.province_code = province_code[e.detail.value]
      currentAddressWork.province = this.data.province_name[this.data.province_idx[currentAddressWork.province_code]]
      this.setData({
        currentAddressWork: currentAddressWork
      })
      this.initWorkAreaData()

    } else if (id == 'city') {
      var city_name = []
      var city_code = []
      var city_idx = {}
      var k = 0;
      for (var i in areaData[currentAddressWork.province_code]) {
        city_name.push(areaData[currentAddressWork.province_code][i])
        city_code.push(i)
        city_idx[i] = k++
      }
      currentAddressWork.city_code = city_code[e.detail.value]
      currentAddressWork.city = this.data.city_name[this.data.city_idx[currentAddressWork.city_code]]
      var counties_name = []
      var counties_code = []
      var counties_idx = {}
      var j = 0;
      for (var a in areaData[currentAddressWork.city_code]) {
        counties_name.push(areaData[currentAddressWork.city_code][a])
        counties_code.push(a)
        counties_idx[a] = j++
      }
      currentAddressWork.counties_code = counties_code[0]
      console.log(counties_name, counties_code, counties_idx)
      this.setData({
        currentAddressWork: currentAddressWork,
        counties_idx: counties_idx,
        counties_name: counties_name,
        counties_code: counties_code
      })

    } else if (id == 'counties') {
      var counties_name = []
      var counties_code = []
      var counties_idx = {}
      var j = 0;
      for (var a in areaData[currentAddressWork.city_code]) {
        counties_name.push(areaData[currentAddressWork.city_code][a])
        counties_code.push(a)
        counties_idx[a] = j++
      }
      currentAddressWork.counties_code = counties_code[e.detail.value]
      currentAddressWork.country = this.data.counties_name[this.data.counties_idx[currentAddressWork.counties_code]]
      this.setData({
        currentAddressWork: currentAddressWork
      })
    }

  },

  // 紧急联系人初始化数据
  KoreainitJJAreaData: function () {
    var currentAddressJJ = this.data.currentAddressJJ
    var province_code = this.data.province_code
    var province_idx = this.data.province_idx
    var areaData = this.data.areaData
    var city_name = []
    var city_code = []
    var city_idx = {}
    var c = 0;
    console.log(province_idx, currentAddressJJ.province_code)
    var idx = province_code[province_idx[currentAddressJJ.province_code]]
    console.log(idx)
    for (var i in areaData[idx]) {
      city_name.push(areaData[idx][i])
      city_code.push(i)
      city_idx[i] = c++
    }
    currentAddressJJ.province_code = idx
    currentAddressJJ.city_code = city_code[0]

    var counties_name = []
    var counties_code = []
    var counties_idx = {}
    var j = 0;
    for (var a in areaData[currentAddressJJ.city_code]) {
      counties_name.push(areaData[currentAddressJJ.city_code][a])
      counties_code.push(a)
      counties_idx[a] = j++
    }

    currentAddressJJ.counties_code = counties_code[0]
    this.setData({
      currentAddressJJ: currentAddressJJ,
      city_name: city_name,
      city_code: city_code,
      city_idx: city_idx,
      counties_idx: counties_idx,
      counties_name: counties_name,
      counties_code: counties_code
    })
  },
  // 工作地址选择器
  KoreabindJJPickerChange: function (e) {
    var id = e.target.id
    var currentAddressJJ = this.data.currentAddressJJ
    var province_code = this.data.province_code
    var areaData = this.data.areaData

    if (id == 'province') {
      currentAddressJJ.province_code = province_code[e.detail.value]
      currentAddressJJ.province = this.data.province_name[this.data.province_idx[currentAddressJJ.province_code]]
      this.setData({
        currentAddressJJ: currentAddressJJ
      })
      this.initJJAreaData()

    } else if (id == 'city') {
      var city_name = []
      var city_code = []
      var city_idx = {}
      var k = 0;
      for (var i in areaData[currentAddressJJ.province_code]) {
        city_name.push(areaData[currentAddressJJ.province_code][i])
        city_code.push(i)
        city_idx[i] = k++
      }
      currentAddressJJ.city_code = city_code[e.detail.value]
      currentAddressJJ.city = this.data.city_name[this.data.city_idx[currentAddressJJ.city_code]]
      var counties_name = []
      var counties_code = []
      var counties_idx = {}
      var j = 0;
      for (var a in areaData[currentAddressJJ.city_code]) {
        counties_name.push(areaData[currentAddressJJ.city_code][a])
        counties_code.push(a)
        counties_idx[a] = j++
      }
      currentAddressJJ.counties_code = counties_code[0]
      console.log(counties_name, counties_code, counties_idx)
      this.setData({
        currentAddressJJ: currentAddressJJ,
        counties_idx: counties_idx,
        counties_name: counties_name,
        counties_code: counties_code
      })

    } else if (id == 'counties') {
      var counties_name = []
      var counties_code = []
      var counties_idx = {}
      var j = 0;
      for (var a in areaData[currentAddressJJ.city_code]) {
        counties_name.push(areaData[currentAddressJJ.city_code][a])
        counties_code.push(a)
        counties_idx[a] = j++
      }
      currentAddressJJ.counties_code = counties_code[e.detail.value]
      currentAddressJJ.country = this.data.counties_name[this.data.counties_idx[currentAddressJJ.counties_code]]
      this.setData({
        currentAddressJJ: currentAddressJJ
      })
    }

  },

  KoreagetData: function () {
    var url = config.BASE + config.API.applicant_application_query
    // var data = {}
    var that = this
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

          // 基本信息
          that.initStringData(content, 'first_name_cn', res.body.passport.surname_cn)
          that.initStringData(content, 'second_name_cn', res.body.passport.name_cn)
          that.initStringData(content, 'first_name_en', res.body.passport.surname_pinyin)
          that.initStringData(content, 'second_name_en', res.body.passport.name_pinyin)

          that.initIntData(content, 'old_name', 0)
          that.initStringData(content, 'old_name_cn', '')
          that.initStringData(content, 'old_name_en', '')
          var gender = res.body.passport.gender + ''
          that.initIntData(content, 'gender', gender.length == 0 ? 0 : parseInt(gender))

          that.initIntData(content, 'marry', 1)
          var birthday = res.body.passport.birthday
          if (birthday == undefined || birthday.length == 0) {
            birthday = this.data.dateNow
          }
          that.initStringData(content, 'birthday', birthday)
          that.initStringData(content, 'country', '')
          that.initStringData(content, 'id_no', res.body.id.id_no)
          that.initIntData(content, 'double_country', 0)
          that.initStringData(content, 'other_country', '')

          // 证件信息
          that.initStringData(content, 'passport_number', res.body.passport.passport_number)
          that.initStringData(content, 'issue_place_cn', res.body.passport.issue_place_cn)
          that.initStringData(content, 'other_issue_place_cn', '')
          that.initStringData(content, 'ps_issue_date', res.body.passport.issue_date)

          that.initStringData(content, 'ps_expire_date', res.body.passport.expire_date)
          that.initIntData(content, 'other_passport', 0)
          that.initStringData(content, 'other_passport_type', 1)
          that.initStringData(content, 'other_passport_number', '')
          that.initStringData(content, 'other_passport_country', '')
          that.initStringData(content, 'other_passport_expire_date', '')

          that.initIntData(content, 'stay', 1)
          that.initStringData(content, 'arrive', '')

          // 家庭与职业信息
          that.initStringData(content, 'home_address', '')
          that.initStringData(content, 'home_street', '')
          that.initStringData(content, 'home_mobile', '')

          that.initStringData(content, 'ugent_name', '')
          that.initStringData(content, 'ugent_country', '')
          that.initStringData(content, 'ugent_mobile', '')
          that.initStringData(content, 'ugent_relation', '父子')


          // 职业与教育信息
          that.initStringData(content, 'xueli', '文盲')

          for (var i = 0; i < that.data.xueliArr.length; i++) {
            if (content.xueli == that.data.xueliArr[i]) {
              that.setData({
                selectXueliIndex: i,
              })
              break;
            }
          }

          that.initStringData(content, 'school', '')
          that.initStringData(content, 'school_address_detail', '')

          that.initStringData(content, 'job', '其它')

          for (var i = 0; i < that.data.jobArr.length; i++) {
            if (content.job == that.data.jobArr[i]) {
              that.setData({
                selectJobIndex: i,
              })
              break;
            }
          }

          that.initStringData(content, 'company', '')
          that.initStringData(content, 'position', '')
          that.initStringData(content, 'company_phone', '')
          that.initStringData(content, 'company_address_detail', '')
          that.initStringData(content, 'other_job', '')


          // 其他信息
          that.initIntData(content, 'target', 1)
          that.initIntData(content, 'ever_go', 0)
          that.initIntData(content, 'ever_times', 1)  // 1-200
          that.initIntData(content, 'ever_target', 1)

          that.initIntData(content, 'other_visit', 0)
          var visitsData = content['visitsData'] == undefined ? [] : content['visitsData']
          content['visitsData'] = visitsData    // 注意最多三条

          that.initIntData(content, 'together', 0)
          var togetherData = content['togetherData'] == undefined ? [] : content['togetherData']
          content['togetherData'] = togetherData    // 注意最多三条

          that.setData({
            content: content,
          })

          var arr = content.home_address.split('-')
          if (arr == undefined || !(arr instanceof Array))
            arr = []
          // 初始化地址信息
          that.setData({
            currentAddressHome: {
              province: arr.length > 0 ? arr[0] : '',
              city: arr.length > 1 ? arr[1] : '',
              country: arr.length > 2 ? arr[2] : '',
              city_code: 110100,
              counties_code: 110101,
              province_code: 110000
            }
          })

          var school_address = content.school_address == undefined ? '' : content.school_address
          var arr1 = school_address.split('-')
          if (arr1 == undefined || !(arr1 instanceof Array))
            arr1 = []
          that.setData({
            currentAddressWork: {
              province: arr1.length > 0 ? arr1[0] : '',
              city: arr1.length > 1 ? arr1[1] : '',
              country: arr1.length > 2 ? arr1[2] : '',
              city_code: 110100,
              counties_code: 110101,
              province_code: 110000
            }
          })

          var company_address = content.company_address == undefined ? '' : content.company_address
          var arr2 = company_address.split('-')
          if (arr2 == undefined || !(arr2 instanceof Array))
            arr2 = []
          that.setData({
            currentAddressJJ: {
              province: arr2.length > 0 ? arr2[0] : '',
              city: arr2.length > 1 ? arr2[1] : '',
              country: arr2.length > 2 ? arr2[2] : '',
              city_code: 110100,
              counties_code: 110101,
              province_code: 110000
            }
          })

          this.checkInputStatus()

        } else {

        }
      }).catch((err) => {
        console.log(err)
      })
  },

  // 初始化content里的数据，以content为准，如果content里没有，则去对应的id、passport里的值
  KoreainitStringData: function (content, key, str) {
    if (content[key] == undefined || (content[key] + '').length == 0) {
      if (str != undefined)
        content[key] = str
    }
  },

  KoreainitIntData: function (content, key, value) {
    if (content[key] == undefined || (content[key] + '').length == 0) {
      content[key] = value
    }
  },

  // 绑定基本信息输入
  KoreacontentBindInput: function (e) {
    var id = e.currentTarget.id
    this.data.content[id] = e.detail.value
    console.log(this.data.content)
    this.checkInputStatus()
  },

  Koreatijiao: function (e) {
    for (var i = 0; i <= 4; i++) {
      if (!this.valid(i)) {
        return;
      }
    }
    var content = JSON.stringify(this.data.content)
    console.log('提交的信息：' + content)
    this.applicantAdd(1, content)
  },

  Koreavalid: function (e) {
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
      if (!this.validfamilyAndWork(true)) {
        return false
      }
    }
    if (e == 3) {
      if (!this.validUgentInfo(true)) {
        return false
      }
    }
    if (e == 4) {
      if (!this.validOtherInfo(true)) {
        return false
      }
    }
    return true
  },

  KoreasaveInfo: function (e) {

    if (!this.valid(parseInt(e.currentTarget.id))) {
      return;
    }

    var content = JSON.stringify(this.data.content)
    console.log('提交的信息：' + content)
    var formId = e.detail.formId
    this.applicantAdd(0, content, { wxformid: formId })
  },

  Koreatijiao: function (e) {
    for (var i = 0; i <= 4; i++) {
      if (!this.valid(i)) {
        return;
      }
    }

    var content = JSON.stringify(this.data.content)
    console.log('提交的信息：' + content)
    this.applicantAdd(1, content)
  },

  KoreaapplicantAdd: function (action, content, header) {
    var url = config.BASE + config.API.applicant_application_add

    var data = {
      user_order_id: this.data.ops.user_order_id,
      order_applicant_id: this.data.ops.order_applicant_id,
      action: action,
      content: content,
    }

    request.post(url, data, header).then((res) => {
      console.log(JSON.stringify(res))
      if (res.ret == '0') {
        if (action == 0) {
          var index = this.data.selectedIndex
          if (this.data.selectedIndex < 4) {
            index++
          }

          this.tapAction(index)
        } else {
          // 提交成功，弹提示框然后退出页面
          wx.showToast({
            title: '信息提交成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function () {
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
          }, 1500)

        }
      } else {

      }
    }).catch((err) => {
      console.log(err)
    })

  },

  KoreacheckInputStatus: function () {
    this.validBaseInfo(false)
    this.validCardInfo(false)
    this.validfamilyAndWork(false)
    this.validUgentInfo(false)
    this.validOtherInfo(false)
  },

  KoreavalidBaseInfo: function (showToast) {
    var inputStatus = this.data.inputStatus
    inputStatus[0] = 1

    // 曾用名、其他出生地点存在时才要校验
    var keys = ['first_name_cn', 'second_name_cn', 'first_name_en', 'second_name_en',
      'birthday', 'country']

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      if (this.data.content[key] == undefined || this.data.content[key].length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请完整填写基本信息',
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

    if (this.data.content['old_name'] == 1) {
      if (this.data.content['old_name_cn'] == undefined || this.data.content['old_name_cn'].length == 0
        || this.data.content['old_name_en'] == undefined || this.data.content['old_name_en'].length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请完整填写基本信息',
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

    if (this.data.content['double_country'] == 1) {
      if (this.data.content['other_country'].length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请填写另有国籍',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[0] = 0
        this.setData({
          inputStatus: inputStatus
        })
        console.log('另有国籍')
        return false
      }
    }

    this.setData({
      inputStatus: inputStatus
    })
    return true
  },

  KoreavalidCardInfo: function (showToast) {
    var inputStatus = this.data.inputStatus
    inputStatus[1] = 1

    var keys = ['passport_number', 'issue_place_cn', 'ps_issue_date', 'ps_expire_date',
      'arrive']

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      if (this.data.content[key] == undefined || this.data.content[key].length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请完整填写证件信息',
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
    if (this.data.content['issue_place_cn'] == '其他') {
      if (this.data.content['other_issue_place_cn'] == undefined || this.data.content['other_issue_place_cn'].length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请完整填写证件信息',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[1] = 0
        this.setData({
          inputStatus: inputStatus
        })
        console.log('其他签发地点')
        return false
      }
    }

    if (this.data.content['other_passport'] == 1) {
      if (this.data.content['other_passport_number'].length == 0 ||
        this.data.content['other_passport_country'].length == 0 ||
        this.data.content['other_passport_expire_date'].length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请完整填写证件信息',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[1] = 0
        this.setData({
          inputStatus: inputStatus
        })
        console.log('other_passport')
        return false
      }
    }

    this.setData({
      inputStatus: inputStatus
    })
    return true
  },

  KoreavalidfamilyAndWork: function (showToast) {
    var inputStatus = this.data.inputStatus
    inputStatus[2] = 1

    var keys = ['home_street', 'home_mobile', 'ugent_name', 'ugent_country',
      'ugent_mobile', 'ugent_relation']

    if (this.data.currentAddressHome.province.length == 0 ||
      this.data.currentAddressHome.city.length == 0 ||
      this.data.currentAddressHome.country.length == 0) {
      if (showToast) {
        wx.showToast({
          title: '请填写居住地址',
          icon: 'success',
          duration: 1500
        })
      }
      inputStatus[2] = 0
      this.setData({
        inputStatus: inputStatus
      })
      console.log('居住地址')
      return false
    } else {
      this.data.content.home_address = this.data.currentAddressHome.province + '-' + this.data.currentAddressHome.city + '-' + this.data.currentAddressHome.country
    }

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      if (this.data.content[key] == undefined || this.data.content[key].length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请完整填写家庭与职业信息',
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

    this.setData({
      inputStatus: inputStatus
    })
    return true
  },

  // 校验紧急联系人
  KoreavalidUgentInfo: function (showToast) {
    var inputStatus = this.data.inputStatus
    inputStatus[3] = 1

    /**
    
              that.initStringData(content, 'school', '')
              that.initStringData(content, 'school_address_detail', '')
    
              that.initStringData(content, 'job', '其它')
    
              for (var i = 0; i < that.data.jobArr.length; i++) {
                if (content.job == that.data.jobArr[i]) {
                  that.setData({
                    selectJobIndex: i,
                  })
                  break;
                }
              }
    
              that.initStringData(content, 'company', '')
              that.initStringData(content, 'position', '')
              that.initStringData(content, 'company_phone', '')
              that.initStringData(content, 'company_address_detail', '')
              that.initStringData(content, 'other_job', '')
     */

    if (this.data.content.xueli != '文盲') {
      // 要填写学校
      if (this.data.content.school == undefined || this.data.content.school.length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请填写学校',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[3] = 0
        return false
      }

      if (this.data.currentAddressWork.province.length == 0 ||
        this.data.currentAddressWork.city.length == 0 ||
        this.data.currentAddressWork.country.length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请填写学校地址',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[3] = 0
        this.setData({
          inputStatus: inputStatus
        })
        console.log('学校地址')
        return false
      } else {
        this.data.content.school_address = this.data.currentAddressWork.province + '-' + this.data.currentAddressWork.city + '-' + this.data.currentAddressWork.country
      }

      if (this.data.content.school_address_detail == undefined || this.data.content.school_address_detail.length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请填写学校详细地址',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[3] = 0
        return false
      }

    }

    if (this.data.selectJobIndex <= 4) {

      // 要填写学校
      if (this.data.content.company == undefined || this.data.content.company.length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请填写单位名称',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[3] = 0
        return false
      }

      // 要填写职位
      if (this.data.content.position == undefined || this.data.content.position.length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请填写职位',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[3] = 0
        return false
      }



      if (this.data.currentAddressJJ.province.length == 0 ||
        this.data.currentAddressJJ.city.length == 0 ||
        this.data.currentAddressJJ.country.length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请填写办公地址',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[3] = 0
        this.setData({
          inputStatus: inputStatus
        })
        console.log('办公地址')
        return false
      } else {
        this.data.content.company_address = this.data.currentAddressJJ.province + '-' + this.data.currentAddressJJ.city + '-' + this.data.currentAddressJJ.country
      }



      if (this.data.content.company_address_detail == undefined || this.data.content.company_address_detail.length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请填写办公详细地址',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[3] = 0
        return false
      }

      // 要填写电话
      if (this.data.content.company_phone == undefined || this.data.content.company_phone.length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请填写办公电话',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[3] = 0
        return false
      }

    } else if (this.data.content.job == '其它') {
      if (this.data.content.other_job == undefined || this.data.content.other_job.length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请填写其他工作',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[3] = 0
        return false
      }
    }

    this.setData({
      inputStatus: inputStatus
    })
    return true
  },

  // 校验其他信息
  KoreavalidOtherInfo: function (showToast) {
    var inputStatus = this.data.inputStatus
    inputStatus[4] = 1

    var ever_times = 0;
    if (this.data.content.ever_go == 1) {
      try {
        ever_times = parseInt(this.data.content.ever_times)
      } catch (e) {

      }

      if (isNaN(ever_times) || ever_times <= 0 || ever_times > 200) {
        wx.showToast({
          title: '访问次数应为1-200',
          icon: 'success',
          duration: 1500
        })
        inputStatus[4] = 0
        this.setData({
          inputStatus: inputStatus
        })
        return false
      } else {
        this.data.content['ever_times'] = ever_times
      }

    }

    this.setData({
      inputStatus: inputStatus
    })
    return true
  },

  KoreaonLoad: function (options) {

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

  KoreagetAddress: function () {

    var url_area = config.API.area_json
    request.get(url_area)
      .then((res) => {
        console.log(res[86])
        var province_name = []
        var province_code = []
        var province_idx = {}
        var j = 0
        for (var i in res[86]) {
          province_name.push(res[86][i])
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

  KoreaeditHistory: function (e) {
    getApp().globalData.vistoryHistoryCache = this.data.content['visitsData']
    wx.navigateTo({
      url: '/pages/apply/apply-b',
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

  KoreaeditPerson: function (e) {
    getApp().globalData.togetherInfoCache = this.data.content['togetherData']
    wx.navigateTo({
      url: '/pages/apply/apply-b-person',
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

  KoreaonReady: function () {
    // 页面渲染完成
    this.initAreaData()

  },
  KoreaonShow: function () {
    // 页面显示

    // 这里有可能获取到访问记录与同行家属的信息，如果appapp.js中的信息不为undefined时，则把数据取到dataArr中
    if (getApp().globalData.vistoryHistoryCache != undefined) {
      this.data.content['visitsData'] = getApp().globalData.vistoryHistoryCache
      this.setData({
        content: this.data.content
      })
      getApp().globalData.vistoryHistoryCache = undefined
    }

    if (getApp().globalData.togetherInfoCache != undefined) {
      this.data.content['togetherData'] = getApp().globalData.togetherInfoCache
      this.setData({
        content: this.data.content
      })
      getApp().globalData.togetherInfoCache = undefined
    }

  },
  KoreaonHide: function () {
    // 页面隐藏
  },
  KoreaonUnload: function () {
    // 页面关闭
  }

}
