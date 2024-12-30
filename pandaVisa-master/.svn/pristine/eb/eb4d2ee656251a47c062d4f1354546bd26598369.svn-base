// pages/visa/visa-detail.js
var util = require('../../utils/util.js')
var config = require('../config.js')
var request = require('../request.js')
var app = getApp()
Page({
  data: {
    scan_exp: 'hide',
    letsGo: 'hide',
    detail: 'hide',
    make_time: 'hide',
    mail_info: 'hide',
    bg_hide: 'hide',
    make_type: 'hide',
    postion_mail: 'hide',
    fee_: 'hide',
    white_bg: 'hide',
    visa_detail: {},
    identity_material: ['在职人员', '自由职业者', '退休人员', '在校学生', '学龄前儿童'],
    identity_icon: ['id-work-a.png', 'id-freelancer.png', 'id-student.png', 'id-retirees.png', 'id-child.png'],
    identity_icon_active: [config.BASE_IMG + '/icon/wxa/identity/' + 'id-work-a.png', config.BASE_IMG + '/icon/wxa/identity/' + 'id-freelancer-a.png', config.BASE_IMG + '/icon/wxa/identity/' + 'id-student-a.png', config.BASE_IMG + '/icon/wxa/identity/' + 'id-retirees-a.png', config.BASE_IMG + '/icon/wxa/identity/' + 'id-child-a.png'],
    identity_icon_fixed: ['id-work.png', 'id-freelancer.png', 'id-student.png', 'id-retirees.png', 'id-child.png'],
    curr_identity_id: 0,
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
    continents: ['bg-asia.png', 'bg-europe.png', 'bg-america.png', 'bg-africa.png', 'bg-oceania.png'],
    background: '',
    animationData: {},
    curr_op_id: 0,
    isInput: false,
    maxWidth: 0,
    minWidth: 0,
    // 出行信息
    date: '2017-01-01',
    jobid: ['在职人员', '自由职业者', '退休人员', '在校学生', '学龄前儿童'],
    jobid_obj: {
      '在职人员': 0, '自由职业者': 1, '退休人员': 2, '在校学生': 3, '学龄前儿童': 4
    },
    jobIndex: 0,
    formArray: [{ show: 1, inputvalue: '', jobIndex: '', showDel: false }],
    visa_product_id: 0,
    start_date: '',
    end_date: '',
    sampleArr: {}
  },

  onLoad: function (options) {

    var that = this

    var today = new Date();
    var aft3Day = new Date(Date.parse(new Date().toString()) + 86400000 * 31);
    var travel_date = (aft3Day.getFullYear()) + '-' + (aft3Day.getMonth() + 1) + '-' + aft3Day.getDate()
    this.setData({
      base_img: config.BASE_IMG + '/icon/wxa/identity/',
      visa_product_id: parseInt(options.visa_product_id),
      date: travel_date
    })
    var identity_icon = this.data.identity_icon
    var identity_icon_active = this.data.identity_icon_active
    var identity_icon_fixed = this.data.identity_icon_fixed
    for (var i in identity_icon) {
      identity_icon[i] = config.BASE_IMG + '/icon/wxa/identity/' + identity_icon[i]
    }
    // for (var j in identity_icon_active) {
    //   identity_icon_active[j] = config.BASE_IMG + '/icon/wxa/identity/' + identity_icon_active[j]
    // }
    for (var k in identity_icon_fixed) {
      identity_icon_fixed[k] = config.BASE_IMG + '/icon/wxa/identity/' + identity_icon_fixed[k]
    }
    this.setData({
      identity_icon: identity_icon,
      //identity_icon_active: identity_icon_active,
      identity_icon_fixed: identity_icon_fixed
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          maxWidth: res.windowWidth - 20,
          minWidth: 80,
        })
      }
    })
    var sampleArr = that.data.sampleArr
    var that = this
    var url = config.BASE + config.API.visa_product_details
    var data = { visa_product_id: parseInt(options.visa_product_id) }
    request.post(url, data)
      .then((res) => {
        if (res.ret == '0') {
          var visaDetail = res.body
          var continents = that.data.continents
          that.setData({
            background: 'background-image:url("' + config.BASE_IMG + '/icon/wxa/continents/' + continents[visaDetail.continents] + '")'
          })
          var score = visaDetail.review.sum_score.toString().split('.')
          if (score[1] == '' || score[1] == undefined) {
            score[1] = 0;
          } else {
            score[1] = '0.' + score[1]
          }
          if (score[0] <= 0) {
            score[0] = 5
          }
          visaDetail.rater = { float: score[1], fraction: score[0] }
          for (var i in visaDetail.procedure) {
            visaDetail.procedure[i].icon = decodeURI(visaDetail.procedure[i].icon)
          }
          var curr_identity_material = []
          for (var k in visaDetail.identity_material) {
            if (visaDetail.identity_material[k].identity_id == that.data.curr_identity_id) {
              curr_identity_material[0] = visaDetail.identity_material[k].material_elec
              curr_identity_material[1] = visaDetail.identity_material[k].material_paper
              curr_identity_material[2] = visaDetail.identity_material[k].material_take_along
              break;
            }
          }
          var curr_jobid = []
          var jobid = that.data.jobid
          for (var j in jobid) {
            for (var i in visaDetail.identity_material) {
              if (visaDetail.identity_material[i].identity_id == j) {
                if (jobid[visaDetail.identity_material[i].identity_id]) {
                  curr_jobid.push(jobid[visaDetail.identity_material[i].identity_id])
                }
                continue;
              }
            }
          }
          console.log(curr_jobid)
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
          console.log(sampleArr)
          that.setData({
            visa_detail: visaDetail,
            jobid: curr_jobid,
            curr_identity_material: curr_identity_material,
            sampleArr: sampleArr
          })
          app.globalData.detailReviews = visaDetail.review.reviews
          if (visaDetail.basic_info.length > 0) {
            for (var i in visaDetail.basic_info) {
              visaDetail.basic_info[i].content = visaDetail.basic_info[i].content.split('\n')
            }
            that.setData({
              base_info: visaDetail.basic_info
            })
          }
          if (visaDetail.handle_process) {
            console.log(visaDetail.handle_process)
            that.setData({
              handle_process: visaDetail.handle_process
            })
          }

          //温馨提示
          if (visaDetail.reminder) {
            var reminder_list = visaDetail.reminder.split('\n')
            that.setData({
              reminder: visaDetail.reminder,
              reminder_list: reminder_list
            })
          }
          if (visaDetail.customer_phone) {
            that.setData({
              customer_phone: visaDetail.customer_phone
            })
          }
          var start_date = new Date(Date.parse(new Date().toString()) + 86400000 * visaDetail.need_mindays);
          var end_date = new Date(Date.parse(new Date().toString()) + 86400000 * 365);

          var start_date = (start_date.getFullYear()) + '-' + (start_date.getMonth() + 1) + '-' + start_date.getDate()
          var end_date = (end_date.getFullYear()) + '-' + (end_date.getMonth() + 1) + '-' + end_date.getDate()
          that.setData({
            start_date: start_date,
            end_date: end_date
          })
        }
      }).catch((err) => {

      })

  },
  imgerror: function (e) {
    //console.log('icon中文url imgerror log', e)
  },
  imgload: function (e) {
    //console.log('icon中文url imgload log', e)
  },
  callPhone: function () {
    app.callPhone()
  },
  selectIdentity: function (e) {
    console.log(e.target.id)
    var id = e.target.id.split('_');
    var sampleArr = this.data.sampleArr
    console.log(id)
    //var curr_identity = this.data.visa_detail.identity_material[id[1]]

    var icon_active = this.data.icon_active
    for (var i in icon_active) {
      icon_active[i] = ''
    }
    icon_active[id[1]] = 'active'
    var identity_icon = this.data.identity_icon
    var identity_icon_active = this.data.identity_icon_active
    var identity_icon_fixed = this.data.identity_icon_fixed
    for (var i in identity_icon) {
      if (i == id[1]) {
        identity_icon[id[1]] = identity_icon_active[id[1]]
      } else {
        identity_icon[i] = identity_icon_fixed[i]
      }
    }

    var scroll_pos = 0
    if (id[1] >= 3) {
      scroll_pos = 53
    }
    var curr_identity_material = []
    var visaDetail = this.data.visa_detail
    for (var k in visaDetail.identity_material) {
      if (visaDetail.identity_material[k].identity_id == this.data.curr_identity_id) {
        curr_identity_material[0] = visaDetail.identity_material[k].material_elec
        curr_identity_material[1] = visaDetail.identity_material[k].material_paper
        curr_identity_material[2] = visaDetail.identity_material[k].material_take_along
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
    this.setData({
      curr_identity_id: id[1],
      curr_identity_material: curr_identity_material,
      icon_active: icon_active,
      scroll_pos: scroll_pos,
      identity_icon: identity_icon
    })
    console.log(this.data.tab_active);
  },
  showSendMail: function (e) {


  },
  // 开始办理 - 出行信息
  //身份证选择
  bindPickerChange: function (e) {
    var id = e.target.id;
    var idx = id.split('_')
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var formArr = this.data.formArray
    formArr[idx[1]].jobIndex = parseInt(e.detail.value)
    this.setData({
      formArray: formArr
    })
    console.log(formArr)
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  newAddApply: function (e) {
    var formArr = this.data.formArray
    var newArr = [{ show: 1, jobIndex: '', inputvalue: '', showDel: true }]
    formArr = newArr.concat(formArr)
    console.log(formArr)
    if (formArr.length > 1) {
      for (var i in formArr) {
        formArr[i].showDel = true
      }
    }
    this.setData({
      formArray: formArr
    })
  },
  delApply: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除此申请人信息？',
      cancelText: '否',
      cancelColor: '#aaa',
      confirmText: '是',
      confirmColor: '#f98483',
      success: function (res) {
        if (res.confirm) {
          var id = e.target.id
          console.log(id)
          var idx = id.split('_')
          var formArr = []
          formArr = that.data.formArray
          console.log(formArr)
          formArr[idx[1]].show = 0
          formArr[idx[1]].jobIndex = 0
          var len = 0
          for (var i in formArr) {
            if (formArr[i].show) {
              len += 1
            }
          }
          if (len == 1) {
            for (var i in formArr) {
              if (formArr[i].show) {
                formArr[i].showDel = false
              }
            }
          }
          that.setData({
            formArray: formArr
          })
        }
      }
    })

  },
  nameInput: function (e) {
    var id = e.target.id
    var idx = id.split('_')
    var formArray = this.data.formArray
    formArray[idx[1]].inputvalue = e.detail.value
    this.setData({
      formArray: formArray
    })
  },
  nextStart: function (e) {

    var userinfo = wx.getStorageSync('userinfo');
    if (!userinfo || userinfo == undefined || userinfo.token == undefined) {
      request.reLogin()
      return
    }
    if (userinfo.token) {
      var that = this
      var data = {}
      var applicant = []
      var curr_job = this.data.jobid
      var formArray = this.data.formArray
      var jobid_obj = this.data.jobid_obj
      var error = []
      for (var i in formArray) {
        if (formArray[i].inputvalue == '' && formArray[i].show == 1) {
          error.push(1)
          app.toastWarn('请填写中文姓名')
          break;
        }
        if (formArray[i].jobIndex === '' && formArray[i].show == 1) {
          error.push(1)
          app.toastWarn('请选择旅客身份')
          break;
        }
      }
      console.log(formArray,error)
      if (error.length > 0) {
        return
      }

      for (var i in formArray) {
        if (formArray[i].show == 1) {
          applicant.push({ applicant_name: formArray[i].inputvalue, identity_id: parseInt(jobid_obj[curr_job[formArray[i].jobIndex]]) })
        }
      }


      data.depart_date = this.data.date
      data.visa_product_id = parseInt(this.data.visa_product_id)
      data.applicant = applicant
      console.log(e, data)
      var formId = e.detail.formId
      request.post(config.BASE + config.API.order_add, data, { wxformid: formId })
        .then((res) => {
          console.log(res)
          if (res.ret == 0) {
            var user_order_id = res.body.user_order_id
            if (applicant.length == 1) {
              console.log(res)
              wx.redirectTo({
                url: '/pages/apply/apply-data-b?order_applicant_id=' + res.body.applicant[0]['order_applicant_id'] + '&user_order_id=' + user_order_id
              })
            } else if (applicant.length > 1) {
              wx.redirectTo({
                url: '/pages/apply/apply-data?step=1&user_order_id=' + user_order_id
              })
            }

          } else {
            app.toastWarn(res.msg)
          }
        })
    }

  },//开始办理 - 出行信息 结束

  startExecute: function () {

  },
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
      var d = { email: email, visa_product_id: this.data.visa_product_id, identity_id: this.data.curr_identity_id }
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
            app.toastWarn(res.msg)
          }
        })
      } else {
        app.toastWarn('Email地址有误！')
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
  closePopup: function (e) {
    console.log(e.target.id)
    var id = e.target.id;
    console.log(id, e.target);
    var curr_op_id = this.data.curr_op_id
    console.log('curr_op_id', curr_op_id)
    curr_op_id.indexOf('scan_exp')
    if (curr_op_id.indexOf('letsGo') >= 0) {
      wx.setNavigationBarTitle({
        title: '签证详情'
      })
    }
    if (curr_op_id.indexOf('scan_exp') >= 0) {
      this.setData({
        scan_exp: 'hide',
        letsGo: 'hide',
        detail: 'hide',
        make_time: 'hide',
        mail_info: 'hide',
        fee_: 'hide',
        bg_hide: 'hide',
        make_type: 'hide',
        postion_mail: '',
        white_bg: ''
      })
      this.setData({
        curr_op_id: 'postion_mail'
      })
    } else {
      this.setData({
        scan_exp: 'hide',
        letsGo: 'hide',
        detail: 'hide',
        make_time: 'hide',
        mail_info: 'hide',
        bg_hide: 'hide',
        make_type: 'hide',
        fee_: 'hide',
        postion_mail: 'hide',
        white_bg: 'hide'
      })
    }

  },
  openPopup: function (e) {
    var id = e.target.id;
    console.log(id, e.target);
    this.setData({
      curr_op_id: id
    })
    if (id.indexOf('make_time') >= 0) {
      this.setData({
        make_time: '',
        bg_hide: '',
        white_bg: 'hide'
      })
    }

    if (id.indexOf('mail_info') >= 0) {
      this.setData({
        mail_info: '',
        bg_hide: '',
        white_bg: 'hide'
      })
    }
    console.log(id,'fee_',id.indexOf('fee_'))
    if (id.indexOf('fee_') >= 0) {
      this.setData({
        fee_: '',
        bg_hide: '',
        white_bg: 'hide'
      })
    }
    console.log(id.indexOf('letsGo'))
    if (id.indexOf('letsGo') >= 0) {
      var userinfo = wx.getStorageSync('userinfo');
      console.log('11', userinfo)
      if (!userinfo || userinfo == '' || userinfo == undefined || userinfo.token == undefined) {
        // var pages = getCurrentPages()
        // var pageLen = pages.length
        // var jumpUrl = pages[(pageLen - 1)] + '?visa_product_id=' + this.data.visa_product_id
        request.reLogin()
        return
      }
      wx.setNavigationBarTitle({
        title: '出行信息'
      })
      this.setData({
        letsGo: '',
        bg_hide: 'hide',
        white_bg: ''
      })
    }
    if (id.indexOf('scan_exp') >= 0) {
      var idx = id.split('_')[0]

      var sampleArr = this.data.sampleArr
      console.log('sampleArr[idx]', sampleArr[idx])
      this.setData({
        scan_exp: '',
        bg_hide: '',
        white_bg: '',
        curr_sample: sampleArr[idx]
      })
    }

    if (id.indexOf('detail') >= 0) {
      this.setData({
        detail: '',
        bg_hide: 'hide',
        white_bg: ''
      })
    }
    if (id.indexOf('make_type') >= 0) {
      this.setData({
        make_type: '',
        bg_hide: 'hide',
        white_bg: ''
      })
    }
    if (id.indexOf('postion_mail') >= 0) {
      this.setData({
        bg_hide: 'hide',
        white_bg: '',
        postion_mail: ''
      })
    }

  },
  previewSample: function (e) {
    var id = e.target.id;
    var idx = id.split('_')[0]
    var sampleArr = this.data.sampleArr
    console.log('sampleArr[idx]', sampleArr[idx])
    app.previewImg(sampleArr[idx], sampleArr[idx])
  },
  onShareAppMessage: function () {
    var title = this.data.visa_detail.product_name
    var visa_product_id = this.data.visa_product_id
    var continents = this.data.continents
    var visaDetail = this.data.visa_detail
    this.setData({
      background: 'background-image:url("' + config.BASE_IMG + '/icon/wxa/continents/' + continents[visaDetail.continents] + '")'
    })
    return {
      title: title,
      desc: '熊猫签证—足不出户办签证',
      path: '/pages/visa/visa-detail?visa_product_id=' + visa_product_id
    }
  }

})