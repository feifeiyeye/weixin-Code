// pages/apply/photo/idcard-reada.js
var app = getApp();
var fun = require('../../functions.js')
var config = require('../../config.js')
var request = require('../../request.js')
Page({
  data: {
    //下拉菜单
    sexy: ['男', '女'],
    sexyIndex: 0,
    ethIdx: {
      "汉": 0,
      "蒙古": 1,
      "回": 2,
      "藏": 3,
      "维吾尔": 4,
      "苗": 5,
      "彝": 6,
      "壮": 7,
      "布依": 8,
      "朝鲜": 9,
      "满": 10,
      "侗": 11,
      "瑶": 12,
      "白": 13,
      "土家": 14,
      "哈尼": 15,
      "哈萨克": 16,
      "傣": 17,
      "黎": 18,
      "傈僳": 19,
      "佤": 20,
      "畲": 21,
      "高山": 22,
      "拉祜": 23,
      "水": 24,
      "东乡": 25,
      "纳西": 26,
      "景颇": 27,
      "柯尔克孜": 28,
      "土": 29,
      "达斡尔": 30,
      "仫佬": 31,
      "羌": 32,
      "布朗": 33,
      "撒拉": 34,
      "毛难": 35,
      "仡佬": 36,
      "锡伯": 37,
      "阿昌": 38,
      "普米": 39,
      "塔吉克": 40,
      "怒": 41,
      "乌孜别克": 42,
      "俄罗斯": 43,
      "鄂温克": 44,
      "崩龙": 45,
      "保安": 46,
      "裕固": 47,
      "京": 48,
      "塔塔尔": 49,
      "独龙": 50,
      "鄂伦春": 51,
      "赫哲": 52,
      "门巴": 53,
      "珞巴": 54,
      "基诺": 55
    },
    ethIndex: 0,
    ethData: [
      "汉",
      "蒙古",
      "回",
      "藏",
      "维吾尔",
      "苗",
      "彝",
      "壮",
      "布依",
      "朝鲜",
      "满",
      "侗",
      "瑶",
      "白",
      "土家",
      "哈尼",
      "哈萨克",
      "傣",
      "黎",
      "傈僳",
      "佤",
      "畲",
      "高山",
      "拉祜",
      "水",
      "东乡",
      "纳西",
      "景颇",
      "柯尔克孜",
      "土",
      "达斡尔",
      "仫佬",
      "羌",
      "布朗",
      "撒拉",
      "毛难",
      "仡佬",
      "锡伯",
      "阿昌",
      "普米",
      "塔吉克",
      "怒",
      "乌孜别克",
      "俄罗斯",
      "鄂温克",
      "崩龙",
      "保安",
      "裕固",
      "京",
      "塔塔尔",
      "独龙",
      "鄂伦春",
      "赫哲",
      "门巴",
      "珞巴",
      "基诺"
    ],
    idCard: {},
    url_params: {},
    warning: {
      name: '',
      id_number: '',
      sex: '',
      people: '',
      birthday: '',
      address: ''
    }
  },
  //民族选择
  ethChange: function (e) {
    var idCard = this.data.idCard
    var ethIdx = this.data.ethIdx
    var ethData = this.data.ethData
    idCard.people = ethIdx[ethData[e.detail.value]]
    this.setData({
      idCard: idCard
    })
  },
  //性别选择
  bindPickerChange: function (e) {
    var idCard = this.data.idCard
    idCard.sex = e.detail.value
    this.setData({
      idCard: idCard
    })
  },
  //日期
  bindDateChange: function (e) {
    var idCard = this.data.idCard
    idCard.birthday = e.detail.value
    this.setData({
      idCard: idCard
    })
  },
  inputValue: function (e) {
    var id = e.target.id
    var value = e.detail.value
    var idCard = this.data.idCard
    idCard[id] = value
    this.setData({
      idCard: idCard
    })
  },
  onLoad: function (options) {
    this.setData({
      url_params: options
    })
    var idCard = app.globalData.idCardInfoA
    idCard.birthday = (idCard.birthday).replace(/(\d{4}).(\d{1,2}).(\d{1,2}).+/mg, '$1-$2-$3');
    var ethData = this.data.ethData
    var ethIdx = this.data.ethIdx
    var date = (idCard.birthday).split('-')
    if (date[1] < 10) {
      date[1] = '0' + date[1]
    }
    if (date[2] < 10) {
      date[2] = '0' + date[2]
    }
    idCard.birthday = date.join('-')
    console.log(idCard.people, ethIdx[idCard.people], idCard.birthday)
    idCard.people = ethIdx[idCard.people]
    idCard.sex = idCard.sex == "男" ? 0 : 1
    console.log(idCard)
    this.setData({
      idCard: idCard
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
  submit: function (e) {
    console.log(e)
    var that = this
    var idCardInfoA = fun.clone(this.data.idCard)
    var sexy = this.data.sexy
    var ethData = this.data.ethData
    idCardInfoA.sex = parseInt(idCardInfoA.sex)
    idCardInfoA.people = ethData[idCardInfoA.people]
    app.globalData.idCardInfoA = idCardInfoA
    var warning = this.data.warning
    if (!idCardInfoA.address || !idCardInfoA.birthday || !idCardInfoA.id_number || !idCardInfoA.name) {
      for (var i in idCardInfoA) {
        if (idCardInfoA[i] === '') {
          warning[i] = 'warning'
        } else {
          warning[i] = ''
        }
      }
      this.setData({
        warning: warning
      })
      app.toastWarn({
        title: '信息不完整请检查标红项！',
        icon: 'success',
        duration: 2000
      })
      return
    } else {
      for (var i in idCardInfoA) {
        warning[i] = ''
      }
      this.setData({
        warning: warning
      })
    }
    console.log(idCardInfoA, 'idCardInfoA')
    var upload_url = config.BASE + config.API.upload_elec_request
    var url_params = this.data.url_params
    var data = {}
    data.pos = 1
    data.elec_id = parseInt(url_params.elec_id)
    data.order_applicant_id = parseInt(url_params.order_applicant_id)
    var suffixs = (idCardInfoA.url).split('.')
    var suffix = suffixs[(suffixs.length - 1)]
    data.suffix = suffix
    data.user_order_id = parseInt(url_params.user_order_id)
    app.showLoading()
    var formId = e.detail.formId
    request.post(upload_url, data,{ wxformid: formId }).then((res) => {
      if (res.ret == 0) {
        var body = res.body
        var aliyun_host = config.HTTP + body.oss_out
        request.uploadFile2Aliyun(aliyun_host, idCardInfoA.url, body.key, body.callback, body.signature, body.policy)
          .then((fileInfo) => {
            console.log(fileInfo, 'file info ', fileInfo.data.ret)
            if (fileInfo.data.ret == 0) {
              idCardInfoA.url = fileInfo.data.body.url
              var params = that.data.url_params

              app.hideLoading()
              var applicant_id_card_add_url = config.BASE + config.API.applicant_id_card_add

              var data = {
                address: idCardInfoA.address,
                //back_img: '',
                birthday: idCardInfoA.birthday,
                // expire_date: '',
                front_img: idCardInfoA.url,
                fullname: idCardInfoA.name,
                gender: idCardInfoA.sex,
                id_no: idCardInfoA.id_number,
                // issue_authority: '',
                // issue_date: '',
                nation: idCardInfoA.people,
                order_applicant_id: parseInt(url_params.order_applicant_id),
                user_order_id: parseInt(url_params.user_order_id)
              }
              request.post(applicant_id_card_add_url, data)
                .then((res) => {
                  console.log(res)
                  if (res.ret == 0) {
                    var key = params.user_order_id + '_' + params.order_applicant_id + '_' + params.elec_id + '_a'
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
                  }
                }).catch((err) => {
                  console.log(err)
                })

            }

          })
      }
    })
  }
})