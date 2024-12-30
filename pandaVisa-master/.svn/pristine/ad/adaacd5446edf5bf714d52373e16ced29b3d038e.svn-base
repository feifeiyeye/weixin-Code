// pages/apply/apply-data-b.js
var config = require('../config.js')
var request = require('../request.js')
var fun = require('../functions.js')
var app = getApp();
Page({
  data: {
    //黑底弹出层
    mail_info: 'hide',
    bg_hide: 'hide',
    //白底弹出层
    postion_mail: 'hide',
    white_bg: 'hide',
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
    infoStatusLoading: false
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    this.setData({
      user_order_id: options.user_order_id,
      url_params: options
    })

    this.infoStatus()




  },
  previewSample: function (e) {
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
  nextSubmit: function () {
    var user_order_id = this.data.url_params.user_order_id
    var applicant = this.data.order_detail.applicant
    if (applicant.length == 1) {
      wx.redirectTo({
        url: '/pages/apply/apply-data?step=1&user_order_id=' + user_order_id,
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
    } else if (applicant.length > 1) {
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



  },
  onReady: function () {
    //var interval = setInterval(this.draw(), 16)
    this.draw(this.data.maxRian)
    // this.setData({
    //   interval: interval
    // })
  },
  //护照选择
  passportSelect: function () {
    wx.navigateTo({
      url: '/pages/apply/photo/passport',
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
  //身份证
  idCardSelect: function () {
    wx.navigateTo({
      url: '/pages/apply/photo/idcard',
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
  //照片选择
  photoSelect: function () {
    wx.navigateTo({
      url: '/pages/apply/photo/photo',
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
  //婚姻选择
  marriageSelect: function () {
    wx.navigateTo({
      url: '/pages/apply/photo/marriage',
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
      console.log('app global', app.globalData.orderDetail)
      var applicant = order_detail.applicant
      var curr_applicant_info = {}
      for (var i in applicant) {
        if (applicant[i].order_applicant_id == params.order_applicant_id) {
          curr_applicant_info = applicant[i]
          break;
        }
      }
      if (!fun.isEmptyObject(curr_applicant_info.id_photo) && curr_applicant_info.id_photo != undefined) {
        if (!fun.isEmptyObject(curr_applicant_info.id_photo.dest_photo)) {
          curr_applicant_info.id_photo.photo_key = 'finish'
        }
        if (curr_applicant_info.id_photo.id_photo_status == 0) {
          curr_applicant_info.id_photo.photo_key = 'passed'
        }
        if (curr_applicant_info.id_photo.id_photo_status == 3) {
          curr_applicant_info.id_photo.photo_key = 'wrong'
        }
      }



      var app_material_required = curr_applicant_info.material.material_required
      for (var i in app_material_required) {
        app_material_required[i].finish = ''
        if (!fun.isEmptyObject(app_material_required[i].upload) && app_material_required[i].pattern != 1) {
          app_material_required[i].finish = 'finish'
        }
        if (app_material_required[i].hasOwnProperty('pattern') && app_material_required[i].pattern == 1) {
          if ((app_material_required[i].upload.length >= 2)) {
            app_material_required[i].finish = 'finish'
          } else if (app_material_required[i].upload.length == 1 && (app_material_required[i].upload[0].special_code == 1 || app_material_required[i].upload[0].special_code == 2)) {
            app_material_required[i].finish = 'finish'
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

      var app_material_optional = curr_applicant_info.material.material_optional
      for (var i in app_material_optional) {
        app_material_optional[i].finish = ''
        if (!fun.isEmptyObject(app_material_optional[i].upload)) {
          app_material_optional[i].finish = 'finish'
        }
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
        if (!fun.isEmptyObject(tmparr)) {
          ++done_count
        }
      }
      if (curr_applicant_info.id_photo != undefined && !fun.isEmptyObject(curr_applicant_info.id_photo.dest_photo)) {
        done_count += 1
      }
      var maxRian = parseInt((done_count / sum) * 100)
      console.log('bill', maxRian, done_count, sum, (done_count / sum))
      that.setData({
        order_detail: order_detail,
        order_applicant_id: params.order_applicant_id,
        curr_applicant_info: curr_applicant_info,
        visa_product_id: order_detail.visa_product_id,
        curr_identity_id: curr_applicant_info.material.identity_id,
        maxRian: maxRian,
        infoStatusLoading: false
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
      console.log(err)
    })
  },
  onShow: function () {
    this.infoStatus()

  },

  onHide: function () {
    // 页面隐藏
  },
  //进度条
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

})