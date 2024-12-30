// pages/apply/apply.js
var util = require('../../utils/util.js')
var config = require('../config.js')
var request = require('../request')
// var japan = require('../japan.js')
var that = null

Page({
  data: {

    img_src: 'https://visa.oss-cn-shenzhen.aliyuncs.com/icon/wxa/product/in.png',

    ops: {},

    content: {}, // 所有的数据
    age: -1,
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

    marryStatus: ['单身', '已婚', '离异', '丧偶'],

    provinces: ['北京', '上海', '广东', '浙江', '天津', '江苏', '四川', '福建', '河北', '辽宁', '湖北', '重庆', '内蒙古', '吉林', '黑龙江', '山西', '安徽', '江西', '山东', '河南', '湖南', '广西', '海南', '贵州', '云南', '陕西', '甘肃', '青海', '宁夏', '西藏', '新疆', '其他'],
    bornProvinceIndex: 0,
    issueProvinceIndex: 0,

    relationJson: [
      { label: '父子', value: '1' },
      { label: '母子', value: '2' },
      { label: '父女', value: '3' },
      { label: '母女', value: '4' },
      { label: '夫妻', value: '26' },
      { label: '兄弟', value: '5' },
      { label: '兄妹', value: '6' },
      { label: '姐弟', value: '7' },
      { label: '姐妹', value: '8' },
      { label: '表兄弟', value: '9' },
      { label: '表兄妹', value: '10' },
      { label: '表姐弟', value: '11' },
      { label: '表姐妹', value: '12' },
      { label: '堂兄弟', value: '13' },
      { label: '堂兄妹', value: '14' },
      { label: '堂姐弟', value: '15' },
      { label: '堂姐妹', value: '16' },
      { label: '嫂子', value: '17' },
      { label: '弟媳', value: '18' },
      { label: '姐夫', value: '19' },
      { label: '妹夫', value: '20' },
      { label: '叔侄', value: '21' },
      { label: '舅侄', value: '22' },
      { label: '姑甥', value: '23' },
      { label: '姨甥', value: '24' },
      { label: '祖孙', value: '25' }
    ],
    relations: (function (arr) {
      var a = []
      for (var o in arr) {
        a.push(arr[o].label)
      }
      return a
    })([
      { label: '父子', value: '1' },
      { label: '母子', value: '2' },
      { label: '父女', value: '3' },
      { label: '母女', value: '4' },
      { label: '夫妻', value: '26' },
      { label: '兄弟', value: '5' },
      { label: '兄妹', value: '6' },
      { label: '姐弟', value: '7' },
      { label: '姐妹', value: '8' },
      { label: '表兄弟', value: '9' },
      { label: '表兄妹', value: '10' },
      { label: '表姐弟', value: '11' },
      { label: '表姐妹', value: '12' },
      { label: '堂兄弟', value: '13' },
      { label: '堂兄妹', value: '14' },
      { label: '堂姐弟', value: '15' },
      { label: '堂姐妹', value: '16' },
      { label: '嫂子', value: '17' },
      { label: '弟媳', value: '18' },
      { label: '姐夫', value: '19' },
      { label: '妹夫', value: '20' },
      { label: '叔侄', value: '21' },
      { label: '舅侄', value: '22' },
      { label: '姑甥', value: '23' },
      { label: '姨甥', value: '24' },
      { label: '祖孙', value: '25' }
    ]),
    selectRelationIndex: 0,

    days: (function () {
      var a = []
      for (var i = 1; i <= 100; i++) {
        a.push(i + '')
      }
      return a
    })(),

    //checkbox信息
    checkboxItems: [
      { name: '', value: '无', checked: 'true' },
      { name: '', value: '祖父' },
      { name: '', value: '祖母' },
      { name: '', value: '父亲' },
      { name: '', value: '母亲' },
    ],
    selectedIndex: -1,
    animationDatas: [], // 动态高度动画
    animationArrowDatas: [],  // 箭头转向动画
    heights: [509, 356, 653, 454, 252],  // 这里的高度都是基本高度，在有选项展开后，要加上相应的展开的高度
    // +16是因为判决有罪换行
    //出生日期
    dateNow: '', // 当前日期字符串
  },

  JanFun_getTempHeight: function (index) {
    var height = 0;
    if (index == 0) {
      if (this.data.content.old_name == 1) {
        height += this.data.oldNameSelectedHeight;
      }
      height += this.data.bornProvinceIndex == this.data.provinces.length - 1 ? 50 : 0;
    } else if (index == 1) {
      height += this.data.issueProvinceIndex == this.data.provinces.length - 1 ? 50 : 0;
    } else if (index == 2) {
      if (this.data.content.marry == 2 || this.data.age < 18) {
        height += 50;
      }
    } else if (index == 4) {
      // if (this.data.content.ever_go == 1) {
      //   height += 100;
      // }
    }
    return height;
  },

  JanFun_tapToExpand: function (e) {
    var index = e.currentTarget.id - 100

    this.JanFun_tapAction(index)
  },

  JanFun_tapAction: function (index) {
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

    this.JanFun_refreshView()

  },

  JanFun_refreshView: function () {
    var animationDataTemp = []
    var animationArrowDatasTemp = []

    for (var i = 0; i < this.data.heights.length; i++) {

      var height = 0
      var rotateDegree = 0
      if (this.data.selectedIndex == i) {
        // 重新计算每列的高度
        var tempHeight = this.JanFun_getTempHeight(i)
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

    this.JanFun_checkInputStatus()

  },


  // 性别选择
  JanFun_bindSexPickerChange: function (e) {
    var content = this.data.content
    content.gender = parseInt(e.detail.value)
    this.setData({
      content: content
    })
  },

  // 有无曾用名选择
  JanFun_bindOldNamePickerChange: function (e) {
    var content = this.data.content
    content.old_name = parseInt(e.detail.value)
    if (content.old_name == 0) {
      content.old_name_cn = ''
      content.old_name_en = ''
    }
    this.setData({
      content: content
    })
    this.JanFun_refreshView()
  },

  // 出生地选择
  JanFun_bindBornProvincePickerChange: function (e) {
    var content = this.data.content
    content.birth_place = this.data.provinces[parseInt(e.detail.value)]
    if (parseInt(e.detail.value) != this.data.provinces.length - 1) {
      content.birth_place2 = ''
    }
    this.setData({
      content: content,
      bornProvinceIndex: parseInt(e.detail.value),
    })
    this.JanFun_refreshView()
  },

  // 签发地选择
  JanFun_bindIssuedProvincePickerChange: function (e) {

    var content = this.data.content
    content.issue_place_cn = this.data.provinces[parseInt(e.detail.value)]
    if (parseInt(e.detail.value) != this.data.provinces.length - 1) {
      content.other_issue_place_cn = ''
    }
    this.setData({
      content: content,
      issueProvinceIndex: parseInt(e.detail.value),
    })

    this.JanFun_refreshView()

  },

  // 婚姻状况选择
  JanFun_bindMarryStatusPickerChange: function (e) {
    var content = this.data.content
    content.marry = parseInt(e.detail.value) + 1
    this.setData({
      content: content
    })
  },

  // chcekbox
  JanFun_checkboxChange: function (e) {
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
  JanFun_bindDateChange: function (e) {
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
  JanFun_bindRelationPickerChange: function (e) {
    var content = this.data.content
    content['jj_relation'] = parseInt(this.data.relationJson[parseInt(e.detail.value)].value)
    this.setData({
      content: content,
      selectRelationIndex: parseInt(e.detail.value)
    })
  },

  // 紧急联系人是否住在一起选择器
  JanFun_bindTogetherPickerChange: function (e) {
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

  // 紧急联系人是否住在一起选择器
  JanFun_bindTargetPickerChange: function (e) {
    var content = this.data.content
    content['target'] = parseInt(e.detail.value) + 1
    this.setData({
      content: content,
    })
  },

  // 紧急联系人是否住在一起选择器
  JanFun_bindKouanPickerChange: function (e) {
    var content = this.data.content
    content['kouan'] = ['东京', '大阪', '名古屋', '福冈', '札幌', '北海道'][parseInt(e.detail.value)]
    this.setData({
      content: content,
      selectKouanIndex: parseInt(e.detail.value)
    })
  },

  // 是否去过日本、等选择的值与picker相等且无特殊操作的选择器
  JanFun_bindNormalPickerChange: function (e) {
    var id = e.currentTarget.id
    var content = this.data.content
    content[id] = parseInt(e.detail.value)
    this.setData({
      content: content,
    })
    this.JanFun_refreshView()
  },

  // 是否去过日本、等选择的值与picker相等且无特殊操作的选择器
  JanFun_bindEverDurationPickerChange: function (e) {
    var id = e.currentTarget.id
    var content = this.data.content
    content[id] = parseInt(e.detail.value) + 1
    this.setData({
      content: content,
    })
  },
  JanFun_initAreaData: function () {
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
  JanFun_bindPickerChange: function (e) {
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
      this.JanFun_initAreaData()

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

  JanFun_initWorkAreaData: function () {
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
  JanFun_bindWorkPickerChange: function (e) {
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
      this.JanFun_initWorkAreaData()

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
  JanFun_initJJAreaData: function () {
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
  // 紧急联系人地址选择器
  JanFun_bindJJPickerChange: function (e) {
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
      this.JanFun_initJJAreaData()

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

  JanFun_getData: function () {
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
          that.initStringData(content, 'birthday', res.body.passport.birthday)
          that.initStringData(content, 'birth_place', res.body.passport.birth_place_cn)
          that.initStringData(content, 'birth_place2', '')

          // 证件信息
          that.initStringData(content, 'id_no', res.body.id.id_no)
          that.initStringData(content, 'passport_number', res.body.passport.passport_number)
          that.initStringData(content, 'issue_place_cn', res.body.passport.issue_place_cn)
          that.initStringData(content, 'other_issue_place_cn', '')

          that.initStringData(content, 'ps_issue_date', res.body.passport.issue_date)
          that.initStringData(content, 'ps_expire_date', res.body.passport.expire_date)
          that.initStringData(content, 'issue_authority_cn', res.body.passport.issue_authority_cn)


          // 家庭与职业信息
          that.initStringData(content, 'home_address', '')
          that.initStringData(content, 'home_street', '')
          that.initStringData(content, 'home_mobile', '')

          that.initStringData(content, 'work', '')
          that.initStringData(content, 'work_phone', '')
          that.initStringData(content, 'work_address', '')
          that.initStringData(content, 'work_street', '')

          that.initStringData(content, 'job', '')
          that.initStringData(content, 'mate_job', '')
          that.initStringData(content, 'parent_job', '')


          // 紧急联系人
          that.initStringData(content, 'jjjj', '')
          that.initStringData(content, 'jj_name', '')
          that.initStringData(content, 'jj_mobile', '')
          that.initIntData(content, 'jj_together', 0)

          that.initStringData(content, 'jj_address', '')
          that.initStringData(content, 'jj_street', '')
          that.initIntData(content, 'jj_relation', 1)
          that.initStringData(content, 'jj_relation_other', '')

          // 其他信息
          that.initIntData(content, 'target', 1)
          that.initStringData(content, 'kouan', '东京')
          that.initStringData(content, 'reach', this.data.dateNow)
          that.initStringData(content, 'reach2', this.data.dateNow)

          // that.initIntData(content, 'ever_go', 0)
          // that.initStringData(content, 'ever_date', this.data.dateNow)
          // that.initIntData(content, 'ever_duration', 1)
          // that.initIntData(content, 'guilt', 0)

          that.setData({
            content: content,
          })

          var age = util.getAge(content.birthday)

          that.setData({
            age: age
          })

          var arr = content.home_address.split('-')
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

          var arr1 = content.work_address.split('-')
          if (arr1 == undefined || !(arr1 instanceof Array))
            arr1 = []
          this.setData({
            currentAddressWork: {
              province: arr1.length > 0 ? arr1[0] : '',
              city: arr1.length > 1 ? arr1[1] : '',
              country: arr1.length > 2 ? arr1[2] : '',
              city_code: 110100,
              counties_code: 110101,
              province_code: 110000
            }
          })

          var arr2 = content.jj_address.split('-')
          if (arr2 == undefined || !(arr2 instanceof Array))
            arr2 = []
          this.setData({
            currentAddressJJ: {
              province: arr2.length > 0 ? arr2[0] : '',
              city: arr2.length > 1 ? arr2[1] : '',
              country: arr2.length > 2 ? arr2[2] : '',
              city_code: 110100,
              counties_code: 110101,
              province_code: 110000
            }
          })

          this.JanFun_checkInputStatus()

        } else {

        }
      }).catch((err) => {
        console.log(err)
      })
  },

  // 初始化content里的数据，以content为准，如果content里没有，则去对应的id、passport里的值
  JanFun_initStringData: function (content, key, str) {
    if (content[key] == undefined || (content[key] + '').length == 0) {
      if (str != undefined)
        content[key] = str
    }
  },

  JanFun_initIntData: function (content, key, value) {
    if (content[key] == undefined || (content[key] + '').length == 0) {
      content[key] = value
    }
  },

  // 绑定基本信息输入
  JanFun_contentBindInput: function (e) {
    var id = e.currentTarget.id
    this.data.content[id] = e.detail.value
    console.log(this.data.content)
    this.JanFun_checkInputStatus()
  },

  JanFun_valid: function (e) {
    var key = this.data.ops['user_order_id'] + '_' + this.data.ops['order_applicant_id']
    var name = ' '

    // 各种检验
    if (e == 0) {
      if (!this.JanFun_validBaseInfo(true)) {
        getApp().globalData.applyTableErr[key] = name
        return false
      }
    }
    if (e == 1) {
      if (!this.JanFun_validCardInfo(true)) {
        getApp().globalData.applyTableErr[key] = name
        return false
      }
    }
    if (e == 2) {
      if (!this.JanFun_validfamilyAndWork(true)) {
        getApp().globalData.applyTableErr[key] = name
        return false
      }
    }
    if (e == 3) {
      if (!this.JanFun_validUgentInfo(true)) {
        getApp().globalData.applyTableErr[key] = name
        return false
      }
    }
    if (e == 4) {
      if (!this.JanFun_validOtherInfo(true)) {
        getApp().globalData.applyTableErr[key] = name
        return false
      }
    }

    getApp().globalData.applyTableErr[key] = undefined

    return true
  },

  JanFun_saveInfo: function (e) {

    if (!this.JanFun_valid(parseInt(e.currentTarget.id))) {
      return;
    }

    var content = JSON.stringify(this.data.content)
    console.log('提交的信息：' + content)
    console.log(e)
    var formId = e.detail.formId
    this.JanFun_applicantAdd(0, content, { wxformid: formId })
  },

  JanFun_tijiao: function (e) {
    for (var i = 0; i <= 4; i++) {
      if (!this.JanFun_valid(i)) {
        return;
      }
    }

    var content = JSON.stringify(this.data.content)
    console.log('提交的信息：' + content)
    this.JanFun_applicantAdd(1, content)
  },

  JanFun_applicantAdd: function (action, content, header) {
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

          this.JanFun_tapAction(index)
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

  JanFun_checkInputStatus: function () {
    this.JanFun_validBaseInfo(false)
    this.JanFun_validCardInfo(false)
    this.JanFun_validfamilyAndWork(false)
    this.JanFun_validUgentInfo(false)
    this.JanFun_validOtherInfo(false)
  },

  JanFun_validBaseInfo: function (showToast) {
    var inputStatus = this.data.inputStatus
    inputStatus[0] = 1

    // 曾用名、其他出生地点存在时才要校验
    var keys = ['first_name_cn', 'second_name_cn', 'first_name_en', 'second_name_en',
      'old_name', 'gender', 'marry', 'birthday']

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
    this.setData({
      inputStatus: inputStatus
    })
    return true
  },

  JanFun_validCardInfo: function (showToast) {
    var inputStatus = this.data.inputStatus
    inputStatus[1] = 1

    var keys = ['id_no', 'passport_number', 'issue_place_cn',
      'ps_issue_date', 'ps_expire_date', 'issue_authority_cn']

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

    if (this.data.content['birth_place'] == '其他') {
      if (this.data.content['birth_place2'] == undefined || this.data.content['birth_place2'].length == 0) {
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
        console.log('出生地')
        return false
      }
    }
    this.setData({
      inputStatus: inputStatus
    })
    return true
  },

  JanFun_validfamilyAndWork: function (showToast) {
    var inputStatus = this.data.inputStatus
    inputStatus[2] = 1

    var keys = ['home_street', 'home_mobile']

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

    this.data.content.work_address = this.data.currentAddressWork.province + '-' + this.data.currentAddressWork.city + '-' + this.data.currentAddressWork.country

    // 配偶职位必须填写
    if (this.data.content.marry == 2) {
      if (this.data.content.mate_job.length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请填写配偶职位',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[2] = 0
        this.setData({
          inputStatus: inputStatus
        })
        console.log('配偶职位')
        return false
      }
    } else if (this.data.age < 18) {
      if (this.data.content.parent_job.length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请填写父母职位',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[2] = 0
        this.setData({
          inputStatus: inputStatus
        })
        console.log('父母职位')
        return false
      }
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
  JanFun_validUgentInfo: function (showToast) {
    var inputStatus = this.data.inputStatus
    inputStatus[3] = 1

    var keys = ['jj_name', 'jj_mobile', 'jj_street']

    if (this.data.currentAddressJJ.province.length == 0 ||
      this.data.currentAddressJJ.city.length == 0 ||
      this.data.currentAddressJJ.country.length == 0) {
      if (showToast) {
        wx.showToast({
          title: '请填写居住地址',
          icon: 'success',
          duration: 1500
        })
      }
      inputStatus[3] = 0
      this.setData({
        inputStatus: inputStatus
      })
      console.log('紧急联系人居住地址')
      return false
    } else {
      this.data.content.jj_address = this.data.currentAddressJJ.province + '-' + this.data.currentAddressJJ.city + '-' + this.data.currentAddressJJ.country
    }

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      if (this.data.content[key] == undefined || this.data.content[key].length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请完整填写紧急联系人信息',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[3] = 0
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

  // 校验其他信息
  JanFun_validOtherInfo: function (showToast) {
    var inputStatus = this.data.inputStatus
    inputStatus[4] = 1

    var keys = ['target', 'kouan', 'reach', 'reach2', 'kouan', 'reach']

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      if (this.data.content[key] == undefined || this.data.content[key].length == 0) {
        if (showToast) {
          wx.showToast({
            title: '请完整填写其他信息',
            icon: 'success',
            duration: 1500
          })
        }
        inputStatus[4] = 0
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

  JanFun_onLoad: function (options) {

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

    this.JanFun_getData()
    this.JanFun_getAddress()

  },

  JanFun_getAddress: function () {

    var url_area = config.API.area_json
    request.get(url_area)
      .then((res) => {
        console.log(res['86'])
        console.log('获取地址返回')
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

  JanFun_onReady: function () {
    // 页面渲染完成
    this.JanFun_initAreaData()
  },
  JanFun_onShow: function () {
    // 页面显示
  },
  JanFun_onHide: function () {
    // 页面隐藏
  },
  JanFun_onUnload: function () {
    // 页面关闭
  }

})