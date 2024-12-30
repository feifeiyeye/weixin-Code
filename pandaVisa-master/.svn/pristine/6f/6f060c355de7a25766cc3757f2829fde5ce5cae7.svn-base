var config = require('../config.js')
var request = require('../request.js')
var util = require('../../utils/util.js')
var fun = require('../functions.js')
var app = getApp();
var that = null;
var korea = require('./apply-korea-exp.js')
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    navHeight: 0,
    // tab切换  
    currentTab: 0,
    //黑底弹出层
    mail_info: 'hide',
    bg_hide: 'hide',
    //白底弹出层
    postion_mail: 'hide',
    white_bg: 'hide',
    apply: 'apply',
    radian: 0,
    maxRian: 0,
    step: 1,
    order_detail: {},
    identity_material: ['在职人员', '自由职业者', '退休人员', '在校学生', '学龄前儿童'],
    order_applicant_id: 0,
    user_order_id: 0,
    applicant_info: [],
    base_img: '',
    curr_identity_id: '0',
    curr_identity_material: [],
    icon_active: ['active', '', '', '', ''],
    icon_pos: 0,
    scroll_pos: 0,
    base_info: [],
    showSendMail: 'hide',
    showSendMailBtn: '',
    email: '',
    handle_process: '',
    reminder: '',
    customer_phone: '0755-36976217',
    visa_product_id: 0,
    background: '',
    animationData: {},
    isInput: false,
    maxWidth: 0,
    minWidth: 0,
    bill: '',
    interval: null,
    loading: false,
    sampleArr: {},
    saveBtn: '',
    url_params: {},
    infoStatusLoading: false,
    circular: false,
    tabWidth: '28.33',
    isExpressData: false,
    tabsArr: [
      { tabName: 'App拍摄资料', tabIndex: 0, show: true },
      { tabName: '申请表', tabIndex: 1, show: true },
      { tabName: '邮寄资料', tabIndex: 2, show: true },
    ],
    /**新加坡申请表数据 */
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


    /*********************************************韩国数据 **********************************************************************/
    currentAddressWork: {},
    currentAddressJJ: {},



    selectKouanIndex: 0,

    otherPassportTypeArr: ["外交护照", "公务护照", "普通护照", "其他"],


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
    /***************************************日本数据****************************************************************************/
    age: -1,

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
    applicationMemo: [],
    emailMaterial: [],
    appCount: 0,
    tableCount: 0,
    expressCount: 0,

    kd_bg_hide: 'hide',
    kd_info_class: 'hide',
    kdCompany: ['请选择快递公司', '顺丰快递', '中国邮政EMS', '申通快递', '韵达快递', '中通快递', '圆通快递', '百世汇通', '宅急送', '其他'],
    kd_index: 0,
    kdOrderNo: 0,
    submitKdOk: false,
    kdInfoBtn: '',
    submitValue: 'tijiao'
  },
  onLoad: function (options) {
    this.getAddress();
    that = this;
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


    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        console.log('systeminfo', res)
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          navHeight: 80 * res.windowWidth / res.windowHeight
        });
      }

    });

    this.setData({
      user_order_id: options.user_order_id,
      url_params: options
    })

    this.infoStatus()
    var country = options.country
    console.log(country, 'ss')
    switch (country) {
      case '新加坡':
        this.getData();
        break;
      case '韩国':
        this.KoreagetData();
        that.setData({
          heights: korea.data.heights,
          xueliArr: korea.data.xueliArr,
          inputStatus: korea.data.inputStatus,
          oldNameSelectedHeight: korea.data.oldNameSelectedHeight,
          bornProvinceIndex: 0,
          issueProvinceIndex: 0,
          submitValue: 'Koreatijiao'
        })
        break;
      case '日本':
        this.JanFun_getData()
        that.setData({
          heights: [509, 356, 653, 454, 252],
          inputStatus: korea.data.inputStatus,
          oldNameSelectedHeight: korea.data.oldNameSelectedHeight,
          bornProvinceIndex: 0,
          issueProvinceIndex: 0,
          submitValue: 'JanFun_tijiao'
        })
        break;
      default:
        break;
    }


  },
  getAddress: function () {
    var that = this
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
  kdInfo: function () {
    this.setData({
      kd_bg_hide: '',
      kd_info_class: ''
    })
  },
  kdclosePopup: function () {
    this.setData({
      kd_bg_hide: 'hide',
      kd_info_class: 'hide'
    })
  },
  kdOrder: function (e) {
    var val = e.detail.value
    if (val) {
      this.setData({
        kdOrderNo: val
      })
    }
  },
  submitKdInfo: function () {
    var kdOrderNo = this.data.kdOrderNo
    var user_order_id = this.data.user_order_id
    var kdCompany = this.data.kdCompany
    var kd_index = this.data.kd_index
    var that = this
    if (kd_index <= 0) {
      wx.showToast({
        title: '选择快递公司',
        icon: 'success',
        duration: 2000
      })
      return
    }
    if (!kdOrderNo) {
      wx.showToast({
        title: '快递单号不能为空',
        icon: 'success',
        duration: 2000
      })
      return
    }
    var express_name = kdCompany[kd_index]
    var url = config.BASE + config.API.order_express_add
    var data = {
      user_order_id: user_order_id,
      tracking_number: kdOrderNo,
      express_name: express_name
    }
    request.post(url, data)
      .then((res) => {
        if (res.ret == 0) {
          that.setData({
            kd_bg_hide: 'hide',
            kd_info_class: 'hide',
            submitKdOk: true,
            kdInfoBtn: 'hide'
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'success',
            duration: 2000
          })
        }
        that.infoStatus()
      })
  },
  kd_bindPickerChange(e) {
    var val = e.detail.value
    this.setData({
      kd_index: val
    })
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
      var opacity = 0
      if (this.data.selectedIndex == i) {
        // 重新计算每列的高度
        var tempHeight = this.getTempHeight(i)
        height = this.data.heights[i] + tempHeight;
        rotateDegree = 90
        opacity = 1
      }

      this.animation.opacity(opacity).rotate(0).step()
      animationDataTemp[i] = this.animation.export()

      this.animation.height(height + "px").rotate(0).step()
      animationDataTemp[i] = this.animation.export()

      this.animation.rotate(rotateDegree).height("24rpx").opacity(1).step()
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
          that.KoreainitIntData(content, 'old_name', -1)
          that.initStringData(content, 'old_name_en', '')

          that.initStringData(content, 'phone', '')
          var birthday = res.body.passport.birthday
          if (birthday == undefined || birthday.length == 0)
            birthday = ''
          that.initStringData(content, 'birthday', birthday)
          var gender = res.body.passport.gender + ''
          that.KoreainitIntData(content, 'gender', gender.length == 0 ? -1 : parseInt(gender))
          that.KoreainitIntData(content, 'marry', -1)

          that.KoreainitIntData(content, 'mate_country', -1)
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
          that.KoreainitIntData(content, 'job', -1)
          that.KoreainitIntData(content, 'xueli', -1)
          that.KoreainitIntData(content, 'belief', -1)
          that.KoreainitIntData(content, 'target', -1)

          that.KoreainitIntData(content, 'other_visit', -1)
          that.KoreainitIntData(content, 'any_reject', -1)
          that.KoreainitIntData(content, 'any_guilt', -1)
          that.KoreainitIntData(content, 'ever_ban', -1)
          that.KoreainitIntData(content, 'other_name', -1)


          that.setData({
            content: content,
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
          //this.refreshView()

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

    console.log('提交的信息：' + content)
    this.applicantAdd(1, content)
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

    var data = {
      user_order_id: this.data.ops.user_order_id,
      order_applicant_id: this.data.ops.order_applicant_id,
      action: action,
      content: content,
    }
    var that = this
    request.post(url, data, header).then((res) => {

      console.log(JSON.stringify(res))

      if (res.ret == '0') {
        if (action == 0) {
          var index = that.data.selectedIndex
          if (that.data.selectedIndex < 2) {
            index++
          }

          that.tapAction(index)
          // 提交成功，弹提示框然后退出页面
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1500
          })
          that.infoStatus(that.data.url_params)
        } else {
          // 提交成功，弹提示框然后退出页面
          wx.showToast({
            title: '信息提交成功',
            icon: 'success',
            duration: 1500
          })
          var applicant_status = that.data.curr_applicant_info.applicant_status
          if (applicant_status == 2 || applicant_status == 1) {
            that.infoStatus(that.data.url_params)
          } else {
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


        }
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 1500
        })
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
  previewSample: function (e) {
    console.log(e)
    var id = e.target.id
    var idx = id.split('_')[0]
    var sampleArr = this.data.sampleArr
    console.log(sampleArr[idx], '11')
    if (sampleArr[idx]) {
      wx.previewImage({
        current: sampleArr[idx], // 当前显示图片的http链接
        urls: [sampleArr[idx]] // 需要预览的图片http链接列表
      })
    }

  },
  /** 
     * 滑动切换tab 
     */
  bindSwiperChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  infoStatus: function () {
    var infoStatusLoading = this.data.infoStatusLoading
    if (infoStatusLoading === true) {
      return
    }
    this.setData({
      infoStatusLoading: true
    })
    var that = this
    var params = this.data.url_params
    var url = config.BASE + config.API.order_query
    var user_order_id = parseInt(params.user_order_id)
    var data = { user_order_id: user_order_id }
    request.post(url, data).then((res) => {
      var order_detail = res.body

      if (order_detail) {
        app.globalData.orderDetail = order_detail
      }
      var tabsArr = that.data.tabsArr

      console.log('app global', app.globalData.orderDetail)
      var applicant = order_detail.applicant
      var curr_applicant_info = {}
      for (var i in applicant) {
        if (applicant[i].order_applicant_id == params.order_applicant_id) {
          curr_applicant_info = applicant[i]
          break;
        }
      }

      var appCount = 0
      var expressCount = 0
      var isExpressData = false
      var kdInfoBtn = ''
      if (!fun.isEmptyObject(curr_applicant_info.id_photo) && curr_applicant_info.id_photo != undefined) {
        if (!fun.isEmptyObject(curr_applicant_info.id_photo.dest_photo)) {
          curr_applicant_info.id_photo.photo_key = 'finish'
        }
        if (curr_applicant_info.id_photo.id_photo_status == 0) {
          curr_applicant_info.id_photo.photo_key = 'passed'
        }
        if (curr_applicant_info.id_photo.id_photo_status == 3) {
          appCount += 1
          curr_applicant_info.id_photo.photo_key = 'wrong'
        }
      }
      var emailMaterial = []
      var app_material_required = curr_applicant_info.material.material_required
      /////******************************** */
      //app_material_required[2].express = [{ memo: 'sfsfdsfsdfs\nfsfsfd', paper_status: 4 }]

      for (var i in app_material_required) {
        app_material_required[i].finish = ''
        if (app_material_required[i].attr == 1) {
          isExpressData = true
          app_material_required[i].attention_arr = app_material_required[i].attention.split('\n')
          app_material_required[i].finish = 'passed'
          if (app_material_required[i].express.length > 0) {
            for (var k in app_material_required[i].express) {
              var express_info = app_material_required[i].express[k]
              if (express_info.paper_status == 4) {
                expressCount += 1
                app_material_required[i].finish = 'wrong'
                express_info.nopass = express_info.memo.split('\n')
                kdInfoBtn = ''
                continue
              } else if (express_info.paper_status == 0 || express_info.paper_status == 1 || express_info.paper_status == 2 || express_info.paper_status == 3) {
                kdInfoBtn = 'hide'
                app_material_required[i].finish = 'passed'
                break
              }
            }
          }
          emailMaterial.push(app_material_required[i])
        }
        if (!fun.isEmptyObject(app_material_required[i].upload) && app_material_required[i].attr == 0 && app_material_required[i].pattern != 1) {

          app_material_required[i].finish = ''
          if (app_material_required[i].hasOwnProperty('upload') && app_material_required[i].upload.length > 0) {
            for (var j in app_material_required[i].upload) {
              var curr_elec_status = app_material_required[i].upload[j].elec_status
              if (curr_elec_status == 0 || curr_elec_status == 4) {
                app_material_required[i].finish = 'passed'
                continue;
              } else if (curr_elec_status == 3 || curr_elec_status == 1) {
                appCount += 1
                app_material_required[i].finish = 'wrong'
                break;
              } else if (curr_elec_status == 2 && curr_applicant_info.applicant_status == 1) {
                app_material_required[i].finish = 'finish'
                break;
              } else if (curr_elec_status == 2) {
                app_material_required[i].finish = 'finish'
                continue;
              }

            }
          }

          console.log(app_material_required[i].elec_name, app_material_required[i].finish)
        }
        //身份证
        if (app_material_required[i].hasOwnProperty('pattern') && app_material_required[i].pattern == 1 &&
          app_material_required[i].attr == 0) {
          if (app_material_required[i].upload.length > 0) {
            for (var k in app_material_required[i].upload) {
              var curr_elec_status = app_material_required[i].upload[k].elec_status
              if (curr_elec_status == 3 || curr_elec_status == 1) {
                appCount += 1
                app_material_required[i].finish = 'wrong'
                break;
              } else if (curr_elec_status == 2) {
                app_material_required[i].finish = 'finish'
                continue;
              } else if (curr_elec_status == 0) {
                app_material_required[i].finish = 'passed'
                continue;
              }

            }
          }
        }
      }

      var app_material_optional = curr_applicant_info.material.material_optional
      for (var i in app_material_optional) {
        app_material_optional[i].finish = ''
        if (app_material_optional[i].attr == 1) {
          isExpressData = true
          app_material_optional[i].attention_arr = app_material_optional[i].attention.split('\n')
          console.log(app_material_optional, 'options')
          app_material_optional[i].finish = 'passed'
          if (app_material_optional[i].express.length > 0) {
            for (var k in app_material_optional[i].express) {
              var express_status = app_material_optional[i].express[k].paper_status
              if (express_status == 4) {
                expressCount += 1
                kdInfoBtn = ''
                app_material_optional[i].finish = 'wrong'
                app_material_optional[i].express[k].nopass = app_material_optional[i].express[k].memo.split('\n')
                continue
              } else if (express_status == 0 || express_status == 1 || express_status == 2 || express_status == 3) {
                kdInfoBtn = 'hide'
                app_material_optional[i].finish = 'passed'
                break
              }
            }
          }
          emailMaterial.push(app_material_optional[i])
        }
        if (!fun.isEmptyObject(app_material_optional[i].upload) && app_material_optional[i].attr == 0) {
          app_material_optional[i].finish = ''
          if (app_material_optional[i].upload.length > 0 && app_material_optional[i].upload[0].hasOwnProperty('elec_status'))
            for (var j in app_material_optional[i].upload) {

              var curr_elec_status = app_material_optional[i].upload[j].elec_status

              if (curr_elec_status == 0 || curr_elec_status == 4) {
                app_material_optional[i].finish = 'passed'
                continue;
              } else if (curr_elec_status == 3 || curr_elec_status == 1) {
                appCount += 1
                app_material_optional[i].finish = 'wrong'
                break;
              } else if (curr_elec_status == 2 && curr_applicant_info.applicant_status == 1) {
                app_material_optional[i].finish = 'finish'
                break;
              } else if (curr_elec_status == 2) {
                app_material_optional[i].finish = 'finish'
                break;
              }

            }
        }
      }
      if (curr_applicant_info.applicant_status == 1 || curr_applicant_info.applicant_status == 2) {
        wx.setNavigationBarTitle({
          title: curr_applicant_info.applicant_name + '申请资料',
          success: function (res) {
            // success
          }
        })
      }
      var material_required = curr_applicant_info.material.material_required
      var sum = 0
      for (var i in material_required) {
        if (material_required[i].attr == 0) {
          ++sum
        }
      }
      if (!fun.isEmptyObject(order_detail.id_photo) && order_detail.hasOwnProperty('id_photo')) {
        sum += 1
      }
      var done_count = 0
      //计算资料百分比
      for (var i in material_required) {
        var tmparr = material_required[i].finish
        if (!fun.isEmptyObject(tmparr) && material_required[i].attr == 0) {
          ++done_count
        }
      }
      if (curr_applicant_info.id_photo != undefined && !fun.isEmptyObject(curr_applicant_info.id_photo.dest_photo)) {
        done_count += 1
      }
      var maxRian = parseInt((done_count / sum) * 100)
      var tableCount = 0
      console.log('bill', maxRian, done_count, sum, (done_count / sum))
      var applicationMemo = []
      //curr_applicant_info.application.memo = '头发过少，看不清楚\n头发过少，看不清楚'
      if (curr_applicant_info.hasOwnProperty('application') && curr_applicant_info.application.application_status == 3) {
        tableCount += 1
        applicationMemo = curr_applicant_info.application.memo.split('\n')
      }
      tabsArr = [{ tabName: 'App拍摄资料', tabIndex: 0, show: true, count: appCount },
      { tabName: '申请表', tabIndex: 1, show: true, count: tableCount },
      { tabName: '邮寄资料', tabIndex: 2, show: true, count: expressCount }]
      var express_tabIndex = 2
      var express_show = true
      var table_tabIndex = 1
      var table_show = true
      var app_tabIndex = 0
      var app_show = true
      if (isExpressData == false) {
        express_show = false
        express_tabIndex = -1
      }
      if (order_detail.visa_application_id == 0) {
        table_tabIndex = -1
        table_show = false
      }
      if (table_show === false && express_show === false) {
        app_show = false
        app_tabIndex = -1
      }
      if (table_show == false) {
        express_tabIndex = 1
      }
      tabsArr = [{ tabName: 'App拍摄资料', tabIndex: app_tabIndex, show: app_show, count: appCount },
      { tabName: '申请表', tabIndex: table_tabIndex, show: table_show, count: tableCount },
      { tabName: '邮寄资料', tabIndex: express_tabIndex, show: express_show, count: expressCount }]
      that.setData({
        order_detail: order_detail,
        order_applicant_id: params.order_applicant_id,
        curr_applicant_info: curr_applicant_info,
        visa_product_id: order_detail.visa_product_id,
        curr_identity_id: curr_applicant_info.material.identity_id,
        maxRian: maxRian,
        applicationMemo: applicationMemo,
        infoStatusLoading: false,
        emailMaterial: emailMaterial,
        expressCount: expressCount / 2,
        appCount: appCount,
        tableCount: tableCount,
        isExpressData: isExpressData,
        tabsArr: tabsArr,
        kdInfoBtn: kdInfoBtn

      })

      this.draw(maxRian)
      var visa_product_id = order_detail.visa_product_id
      if (visa_product_id) {
        var pro_url = config.BASE + config.API.visa_product_query
        var pro_data = {}
        pro_data.visa_product_id = visa_product_id
        request.post(pro_url, pro_data)
          .then((res) => {
            var pro_res = res.body
            var curr_identity_id = curr_applicant_info.material.identity_id
            if (res.ret == 0) {
              var sampleArr = that.data.sampleArr
              var curr_identity_material = []
              for (var k in pro_res.identity_material) {
                if (pro_res.identity_material[k].identity_id == that.data.curr_identity_id) {
                  curr_identity_material[0] = pro_res.identity_material[k].material_elec
                  curr_identity_material[1] = pro_res.identity_material[k].material_paper
                  curr_identity_material[2] = pro_res.identity_material[k].material_take_along
                  break;
                }
              }
              for (var k in curr_identity_material) {
                if (typeof curr_identity_material[k] == 'object') {
                  for (var j in curr_identity_material[k]) {
                    if (typeof curr_identity_material[k][j] == 'object') {
                      for (var idx in curr_identity_material[k][j])
                        if (curr_identity_material[k][j][idx]['sample'])
                          sampleArr[curr_identity_material[k][j][idx]['id']] = curr_identity_material[k][j][idx]['sample']
                    }
                  }
                }

              }
              that.setData({
                curr_identity_material: curr_identity_material,
                sampleArr: sampleArr,
                infoStatusLoading: false
              })
            }
          })
      }
    }).catch((err) => {
      console.error(err)
    })
  },
  draw: function (maxRian) {

    var context = wx.createCanvasContext('circle_progress_canvas')

    var lineWidth = 8
    var radian = this.data.maxRian

    if (maxRian) {
      radian = maxRian
    }

    context.setLineWidth(lineWidth)

    context.setFillStyle('#aaaaaa')
    context.beginPath(0)

    var radius = 90 / 2

    context.setStrokeStyle('#ffe9ea')
    context.arc(radius, radius, radius - lineWidth / 2, 0, Math.PI * 2)
    context.stroke()

    if (radian > 0) {
      context.beginPath(1)
      var PI2 = Math.PI * 2
      var bill = (radian / 100.0)

      var swipeAngle = (bill >= 1 ? PI2 : (bill * PI2))
      console.log('sweepAngle', bill, swipeAngle)
      context.arc(radius, radius, radius - lineWidth / 2, -Math.PI / 2, -Math.PI / 2 + swipeAngle)
      context.setStrokeStyle('#ff5a60')
      context.stroke()
    }

    context.draw()

    // if (radian >= this.data.maxRian) {
    //   radian = this.data.maxRian
    //   clearInterval(this.data.interval)
    // }
    // this.setData({
    //   radian: radian
    // })

    /*
        context.setLineWidth(0)
        var font = 24
        var offset = 28
        var fontTopOffset = 22
        if (radian >= 100) {
          offset += 12
          fontTopOffset -= 4
          font = 22
        }
        if (radian <= 0) {
          offset -= 10
        }
        context.setFillStyle("#aaaaaa")
        context.setFontSize(font)
    
        context.fillText(radian, radius - offset / 2, radius + fontTopOffset / 2)
    
        var font1 = 16
        var leftOffset = 20
        var topOffset = 20
        if (radian >= 100) {
          leftOffset += 12
          font1 = 14
        }
        context.setFontSize(font1)
        context.fillText("%", radius + leftOffset / 2, radius + topOffset / 2)
    */

    // 此方法被弃用了
    // wx.drawCanvas({
    //   canvasId: 'circle_progress_canvas',
    //   actions: context.getActions()
    // })

  },

  onUnload: function () {
    var interval = this.data.interval
    if (interval) {
      clearInterval(interval)
    }
    var appCount = this.data.appCount
    var tableCount = this.data.tableCount
    var expressCount = this.data.expressCount
    var curr_applicant_info = this.data.curr_applicant_info
    if (appCount == 0 && tableCount == 0 && expressCount == 0 && curr_applicant_info.applicant_status == 2) {
      var url = config.BASE + config.API.applicant_reverify
      console.log(url)
      var url_params = this.data.url_params
      wx.showModal({
        title: '提示',
        content: '资料都修改完啦，现在提交，熊猫签证' + '\r\n' + '专家可以尽快帮你重新审核哦~~',
        cancelText: '暂不提交',
        cancelColor: '#aaa',
        confirmText: '重新审核',
        confirmColor: '#f98483',
        success: function (res) {
          if (res.confirm) {
            request.post(url, { user_order_id: url_params.user_order_id, order_applicant_id: url_params.order_applicant_id })
              .then((res) => {
                if (res.ret == 0) {
                  wx.showToast({
                    title: '重新审核提交成功',
                    icon: 'success',
                    duration: 2000
                  })
                  setTimeout(function () {
                    var page = app.getCurrentPage()
                    console.log(page)
                    if (url_params) {
                      page.onShow(url_params)
                    }
                  }, 2000)
                } else {
                  wx.showToast({
                    title: res.msg,
                    icon: 'success',
                    duration: 2000
                  })
                }
              })
          }
        }
      })
    }

  },
  //弹出层关闭
  closePopup: function (e) {
    console.log(e.target.id)
    var id = e.target.id;
    console.log(id, e.target);
    this.setData({
      mail_info: 'hide',
      bg_hide: 'hide',
      postion_mail: 'hide',
      white_bg: 'hide',
      bill: '',
      saveBtn: ''
    })
  },
  //弹出层打开
  openPopup: function (e) {
    console.log(e)
    var id = e.target.id;
    console.log(id, e.target);
    console.log(this.data[id])
    this.setData({
      bill: 'display:none'
    })

    if (id === 'mail_info') {
      this.setData({
        mail_info: '',
        bg_hide: '',
      })
    }
    console.log(id === 'postion_mail')
    if (id === 'postion_mail') {
      this.setData({
        bg_hide: 'hide',
        white_bg: '',
        postion_mail: '',
        saveBtn: 'hide'
      })
    }

  },
  //邮件发送
  emailInput: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  sendMailSuccess: function (e) {

  },
  sendMail: function (e) {
    var that = this

    if (this.data.isInput) {
      // 当前是输入状态，点击之后应该转为发送到邮箱按钮全屏展示状态

      this.setData({
        isInput: false
      })

      var email = this.data.email;
      var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
      if (reg.test(email)) {
        wx.showToast({
          title: " 发送中... ",
          icon: "loading",
          duration: 10000
        })
        var url = config.BASE + config.API.visa_product_share
        var data = {
          email: email,
          visa_product_id: parseInt(this.data.visa_product_id),
          identity_id: parseInt(this.data.curr_identity_id)
        }
        request.post(url, data).then((res) => {
          if (res.ret == 0) {
            wx.showToast({
              title: "发送成功",
              icon: "success",
              duration: 2000
            })
            // 发送按钮变回原状态
            that.animation.width('100%').step()
            that.setData({
              email: '',
              animationData: that.animation.export()
            })
          } else {
            wx.showToast({
              title: res.msg,
              icon: "success",
              duration: 2000
            })
          }
        })
      } else {
        wx.showToast({
          title: 'Email地址有误！',
          icon: 'success',
          duration: 2000
        })
      }

    } else {

      this.animation = wx.createAnimation({
        timingFunction: 'ease',
      })
      that.animation.width('20%').step()
      this.setData({
        animationData: this.animation.export(),
        isInput: true
      })

    }

  },
  onShow: function () {
    this.infoStatus()
  },
  /*****************************韩国逻辑 **************************************************************************************/
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

    this.KorearefreshView()

  },

  KorearefreshView: function () {
    var animationDataTemp = []
    var animationArrowDatasTemp = []

    for (var i = 0; i < this.data.heights.length; i++) {

      var height = 0
      var rotateDegree = 0
      var opacity = 0
      if (this.data.selectedIndex == i) {
        // 重新计算每列的高度
        var tempHeight = this.KoreagetTempHeight(i)
        height = this.data.heights[i] + tempHeight;
        rotateDegree = 90
        var opacity = 1
      }

      this.animation.opacity(opacity).rotate(0).step()
      animationDataTemp[i] = this.animation.export()

      this.animation.height(height + "px").rotate(0).step()
      animationDataTemp[i] = this.animation.export()

      this.animation.rotate(rotateDegree).height("24rpx").opacity(1).step()
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
  KoreabindOldNamePickerChange: function (e) {
    var content = this.data.content
    content.old_name = parseInt(e.detail.value)
    if (content.old_name == 0) {
      content.old_name_cn = ''
      content.old_name_en = ''
    }
    this.setData({
      content: content
    })
    this.KorearefreshView()
  },

  // 出生地选择
  KoreabindBornProvincePickerChange: function (e) {
    var content = this.data.content
    content.birth_place = this.data.provinces[parseInt(e.detail.value)]
    if (parseInt(e.detail.value) != this.data.provinces.length - 1) {
      content.birth_place2 = ''
    }
    this.setData({
      content: content,
      bornProvinceIndex: parseInt(e.detail.value),
    })
    this.KorearefreshView()
  },

  // 签发地选择
  KoreabindIssuedProvincePickerChange: function (e) {

    var content = this.data.content
    content.issue_place_cn = this.data.provinces[parseInt(e.detail.value)]
    if (parseInt(e.detail.value) != this.data.provinces.length - 1) {
      content.other_issue_place_cn = ''
    }
    this.setData({
      content: content,
      issueProvinceIndex: parseInt(e.detail.value),
    })

    this.KorearefreshView()

  },

  // 婚姻状况选择
  KoreabindMarryStatusPickerChange: function (e) {
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
  KoreabindRelationPickerChange: function (e) {
    var content = this.data.content
    content['ugent_relation'] = this.data.relations[parseInt(e.detail.value)]
    this.setData({
      content: content,
      selectRelationIndex: parseInt(e.detail.value)
    })
  },

  // 紧急联系人是否住在一起选择器
  KoreabindTogetherPickerChange: function (e) {
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
  KoreabindKouanPickerChange: function (e) {
    var content = this.data.content
    content['kouan'] = ['东京', '大阪', '名古屋', '福冈', '札幌', '北海道'][parseInt(e.detail.value)]
    this.setData({
      content: content,
      selectKouanIndex: parseInt(e.detail.value)
    })
  },

  // 是否去过日本、等选择的值与picker相等且无特殊操作的选择器
  KoreabindNormalPickerChange: function (e) {
    var id = e.currentTarget.id
    var content = this.data.content
    content[id] = parseInt(e.detail.value)
    this.setData({
      content: content,
    })
    this.KorearefreshView()
  },

  // 选择的值为picker+1、且无特殊操作的选择器
  KoreabindSpecialPickerChange: function (e) {
    var id = e.currentTarget.id
    var content = this.data.content
    content[id] = parseInt(e.detail.value) + 1
    this.setData({
      content: content,
    })
    this.KorearefreshView()
  },

  // 是否去过日本、等选择的值与picker相等且无特殊操作的选择器
  KoreabindEverDurationPickerChange: function (e) {
    var id = e.currentTarget.id
    var content = this.data.content
    content[id] = parseInt(e.detail.value) + 1
    this.setData({
      content: content,
    })
  },

  // 学历选择器
  KoreabindXueliPickerChange: function (e) {
    var content = this.data.content
    content['xueli'] = this.data.xueliArr[parseInt(e.detail.value)]
    this.setData({
      content: content,
    })
    this.KorearefreshView()
  },

  // 职业选择器
  KoreabindJobPickerChange: function (e) {
    var content = this.data.content
    content['job'] = this.data.jobArr[parseInt(e.detail.value)]
    this.setData({
      content: content,
      selectJobIndex: parseInt(e.detail.value)
    })
    this.KorearefreshView()
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
      this.KoreainitAreaData()

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
      this.KoreainitWorkAreaData()

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
          that.KoreainitStringData(content, 'first_name_cn', res.body.passport.surname_cn)
          that.KoreainitStringData(content, 'second_name_cn', res.body.passport.name_cn)
          that.KoreainitStringData(content, 'first_name_en', res.body.passport.surname_pinyin)
          that.KoreainitStringData(content, 'second_name_en', res.body.passport.name_pinyin)

          that.KoreainitIntData(content, 'old_name', 0)
          that.KoreainitStringData(content, 'old_name_cn', '')
          that.KoreainitStringData(content, 'old_name_en', '')
          var gender = res.body.passport.gender + ''
          that.KoreainitIntData(content, 'gender', gender.length == 0 ? 0 : parseInt(gender))

          that.KoreainitIntData(content, 'marry', 1)
          var birthday = res.body.passport.birthday
          if (birthday == undefined || birthday.length == 0) {
            birthday = this.data.dateNow
          }
          that.KoreainitStringData(content, 'birthday', birthday)
          that.KoreainitStringData(content, 'country', '')
          that.KoreainitStringData(content, 'id_no', res.body.id.id_no)
          that.KoreainitIntData(content, 'double_country', 0)
          that.KoreainitStringData(content, 'other_country', '')

          // 证件信息
          that.KoreainitStringData(content, 'passport_number', res.body.passport.passport_number)
          that.KoreainitStringData(content, 'issue_place_cn', res.body.passport.issue_place_cn)
          that.KoreainitStringData(content, 'other_issue_place_cn', '')
          that.KoreainitStringData(content, 'ps_issue_date', res.body.passport.issue_date)

          that.KoreainitStringData(content, 'ps_expire_date', res.body.passport.expire_date)
          that.KoreainitIntData(content, 'other_passport', 0)
          that.KoreainitStringData(content, 'other_passport_type', 1)
          that.KoreainitStringData(content, 'other_passport_number', '')
          that.KoreainitStringData(content, 'other_passport_country', '')
          that.KoreainitStringData(content, 'other_passport_expire_date', '')

          that.KoreainitIntData(content, 'stay', 1)
          that.KoreainitStringData(content, 'arrive', '')

          // 家庭与职业信息
          that.KoreainitStringData(content, 'home_address', '')
          that.KoreainitStringData(content, 'home_street', '')
          that.KoreainitStringData(content, 'home_mobile', '')

          that.KoreainitStringData(content, 'ugent_name', '')
          that.KoreainitStringData(content, 'ugent_country', '')
          that.KoreainitStringData(content, 'ugent_mobile', '')
          that.KoreainitStringData(content, 'ugent_relation', '父子')


          // 职业与教育信息
          that.KoreainitStringData(content, 'xueli', '文盲')

          for (var i = 0; i < that.data.xueliArr.length; i++) {
            if (content.xueli == that.data.xueliArr[i]) {
              that.setData({
                selectXueliIndex: i,
              })
              break;
            }
          }

          that.KoreainitStringData(content, 'school', '')
          that.KoreainitStringData(content, 'school_address_detail', '')

          that.KoreainitStringData(content, 'job', '其它')

          for (var i = 0; i < that.data.jobArr.length; i++) {
            if (content.job == that.data.jobArr[i]) {
              that.setData({
                selectJobIndex: i,
              })
              break;
            }
          }

          that.KoreainitStringData(content, 'company', '')
          that.KoreainitStringData(content, 'position', '')
          that.KoreainitStringData(content, 'company_phone', '')
          that.KoreainitStringData(content, 'company_address_detail', '')
          that.KoreainitStringData(content, 'other_job', '')


          // 其他信息
          that.KoreainitIntData(content, 'target', 1)
          that.KoreainitIntData(content, 'ever_go', 0)
          that.KoreainitIntData(content, 'ever_times', 1)  // 1-200
          that.KoreainitIntData(content, 'ever_target', 1)

          that.KoreainitIntData(content, 'other_visit', 0)
          var visitsData = content['visitsData'] == undefined ? [] : content['visitsData']
          content['visitsData'] = visitsData    // 注意最多三条

          that.KoreainitIntData(content, 'together', 0)
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

          this.KoreacheckInputStatus()

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
    this.KoreacheckInputStatus()
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
      if (!this.KoreavalidBaseInfo(true)) {
        return false
      }
    }
    if (e == 1) {
      if (!this.KoreavalidCardInfo(true)) {
        return false
      }
    }
    if (e == 2) {
      if (!this.KoreavalidfamilyAndWork(true)) {
        return false
      }
    }
    if (e == 3) {
      if (!this.KoreavalidUgentInfo(true)) {
        return false
      }
    }
    if (e == 4) {
      if (!this.KoreavalidOtherInfo(true)) {
        return false
      }
    }
    return true
  },

  KoreasaveInfo: function (e) {

    if (!this.Koreavalid(parseInt(e.currentTarget.id))) {
      return;
    }

    var content = JSON.stringify(this.data.content)
    console.log('提交的信息：' + content)
    var formId = e.detail.formId
    this.KoreaapplicantAdd(0, content, { wxformid: formId })
  },

  Koreatijiao: function (e) {
    for (var i = 0; i <= 4; i++) {
      if (!this.Koreavalid(i)) {
        return;
      }
    }

    var content = JSON.stringify(this.data.content)
    console.log('提交的信息：' + content)
    this.KoreaapplicantAdd(1, content)
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
          var index = that.data.selectedIndex
          if (that.data.selectedIndex < 4) {
            index++
          }

          that.tapAction(index)
        } else {
          // 提交成功，弹提示框然后退出页面
          wx.showToast({
            title: '信息提交成功',
            icon: 'success',
            duration: 1500
          })
          var applicant_status = that.data.curr_applicant_info.applicant_status
          if (applicant_status == 2 || applicant_status == 1) {
            that.infoStatus(that.data.url_params)
          } else {
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
        }
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 1500
        })
      }
    }).catch((err) => {
      console.log(err)
    })

  },

  KoreacheckInputStatus: function () {
    this.KoreavalidBaseInfo(false)
    this.KoreavalidCardInfo(false)
    this.KoreavalidfamilyAndWork(false)
    this.KoreavalidUgentInfo(false)
    this.KoreavalidOtherInfo(false)
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
    this.KoreainitAreaData()

  },
  onReady: function () {
    this.KoreainitAreaData()
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
  },


  /************************************************日本数据********************************************* */
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
      var opacity = 0
      if (this.data.selectedIndex == i) {
        // 重新计算每列的高度
        var tempHeight = this.getTempHeight(i)
        height = this.data.heights[i] + tempHeight;
        rotateDegree = 90
        opacity = 1
      }

      this.animation.opacity(opacity).rotate(0).step()
      animationDataTemp[i] = this.animation.export()

      this.animation.height(height + "px").rotate(0).step()
      animationDataTemp[i] = this.animation.export()

      this.animation.rotate(rotateDegree).height("24rpx").opacity(1).step()
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
          var index = that.data.selectedIndex
          if (that.data.selectedIndex < 4) {
            index++
          }

          that.JanFun_tapAction(index)
        } else {
          // 提交成功，弹提示框然后退出页面
          wx.showToast({
            title: '信息提交成功',
            icon: 'success',
            duration: 1500
          })
          var applicant_status = that.data.curr_applicant_info.applicant_status
          if (applicant_status == 2 || applicant_status == 1) {
            that.infoStatus(that.data.url_params)
          } else {
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

        }
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 1500
        })
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