var config = require('config.js')
var fun = require('functions.js')
var queryString = require('../utils/query-string/index.js')
var Promise = require('../utils/promise.js').Promise
// var Crypto = require('../utils/crypto/crypto.js')
// var Base64 = require('../utils/base64.js')
var app = getApp()
module.exports = {
    getHeader: function (method) {
        var header = config.header.headers
        header.noncestr = fun.randStr(16)
        header.uuid = fun.getuuid()
        var md5Str = 'appver=' + header.appver + '&noncestr=' + header.noncestr + '&platform=' + header.platform + '&uuid=' + header.uuid + '&secretkey=' + config.secretkey
        header.sign = fun.md5(md5Str)
        if (header.platform != '2') {
            header.platform = '2'
        }
        var userinfo = wx.getStorageSync('userinfo');
        if (userinfo.token != undefined || userinfo.token != '') {
            header.token = userinfo.token
        } else {
            header.token = ''
        }

        return header
    },
    get: function (url, params, Header) {
        /**
         * 签证国展示：/wxa/visa_country_show
            商品详情：/wxa/visa_product_query
            商品列表：/wxa/visa_product_brief_query
            获取验证码：/wxa/sys_verify_code_get
            手机号绑定： /wxa/user_bind
         */
        var header = this.getHeader()
        if (!fun.isEmptyObject(Header) && Header != undefined) {
            for (var i in Header) {
                header[i] = Header[i]
            }
        } else {
            header = this.getHeader()
        }
        if (params) {
            url += '?' + queryString.stringify(params)
        }
        var that = this
        return new Promise(function (resolve, reject) {
            wx.request({
                url: url,
                data: {},
                header: header,
                method: 'GET',
                success: function (res) {
                    if (res.statusCode == 401) {
                        that.reLogin()
                        return
                    }
                    if (res.statusCode == 503) {
                        wx.showToast({
                            title: res.statusCode + '=>' + '服务器忙！',
                            icon: 'loading',
                            duration: 3000
                        })
                    }
                    if (res.data.ret) {
                        console.error(url, res, params)
                        return
                    }
                    resolve(res.data)
                },
                fail: function (err) {
                    console.error(url, err, params)
                    reject(err)
                }
            })
        })
    },
    post: function (url, body, Header) {
        var header = this.getHeader()
        console.log(Header)
        if (!fun.isEmptyObject(Header) && Header != undefined) {
            console.log(Header, 'no empty')
            for (var i in Header) {
                header[i] = Header[i]
            }
        } else {
            header = this.getHeader()
        }
        var that = this
        return new Promise(function (resolve, reject) {
            wx.request({
                url: url,
                data: JSON.stringify(body),
                header: header,
                method: 'POST',
                success: function (res) {
                    if (res.statusCode == 401) {
                        that.reLogin()
                        return
                    }
                    if (res.statusCode == 503) {
                        wx.showToast({
                            title: res.statusCode + '=>' + '服务器忙！',
                            icon: 'loading',
                            duration: 3000
                        })
                    }
                    if (res.data.ret) {
                        console.error(url, res, body)
                    }
                    resolve(res.data)
                },
                fail: function (err) {
                    console.error(url, err, body)
                    reject(err)
                }
            })
        })
    },
    reLogin: function (jumpUrl) {
        var that = this
        wx.login({
            success: function (loginData) {
                wx.getUserInfo({
                    success: function (User) {
                        var userInfo = User.userInfo
                        var nickName = userInfo.nickName
                        var avatarUrl = userInfo.avatarUrl
                        var gender = userInfo.gender //性别 0：未知、1：男、2：女 
                        var province = userInfo.province
                        var city = userInfo.city
                        var country = userInfo.country

                        var loginurl = config.BASE + config.API.user_login
                        var data = {
                            wx_code: loginData.code,
                            encrypted_data: User.encryptedData,
                            iv: User.iv
                        }
                        that.post(loginurl, data).then((loginres) => {
                            var wx_token = loginres.body.wx_token
                            var token = loginres.body.token
                            if (wx_token && wx_token != undefined) {
                                wx.navigateTo({
                                    url: '/pages/login/bind',
                                    success: function (res) {
                                        // success
                                    },
                                    fail: function () {
                                        // fail
                                    },
                                    complete: function () {
                                        // complete
                                        wx.hideToast()
                                    }
                                })
                                return
                            }
                            if (token) {
                                wx.showModal({
                                    title: '提示',
                                    content: '登录已过期，是否重新登录?',
                                    cancelText: '否',
                                    cancelColor: '#aaa',
                                    confirmText: '是',
                                    confirmColor: '#f98483',
                                    success: function (res) {
                                        if (res.confirm) {
                                            var login_userinfo = loginres.body
                                            login_userinfo.logintime = parseInt((new Date()).getTime() / 1000)
                                            console.log(login_userinfo, 'login_user')
                                            wx.setStorageSync('userinfo', login_userinfo)
                                            var url = jumpUrl ? jumpUrl : '/pages/index/index'
                                            wx.switchTab({
                                                url: url,
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

                                    }
                                })
                                return
                            }
                        })
                    },
                    complete: function (e) {
                        if (e.errMsg == 'getUserInfo:fail auth deny') {
                            wx.removeStorageSync('userinfo')
                        }
                        console.log('getuserinfo', e)
                    },
                    fail: function (e) {
                        if (e.errMsg == 'getUserInfo:fail') {
                            wx.removeStorageSync('userinfo')
                        }
                        console.log('getuserinfo', e)
                    }
                })
            },
            fail: function (e) {
                console.error('wx.login', e)
            }
        })

    },
    uploadFile: function (host, filePath, fileName, params) {
        console.log(host)
        var that = this
        return new Promise(function (resolve, reject) {
            wx.uploadFile({
                url: host,
                filePath: filePath,
                name: 'file',
                formData: params,
                success: function (res) {
                    if (res.statusCode == 401) {
                        that.reLogin()
                        return
                    }
                    if (res.data.ret) {
                        console.error(url, res, params)
                    }
                    resolve(res)
                },
                fail: function (err) {
                    console.error(host, err, params)
                    reject(err)
                },
                complete: function (e) {
                    console.log('com', e)
                }
            })
        })
    },
    uploadFile2Aliyun: function (host, filePath, fileName, callbackbody, sign, policy, accessIdKey) {

        var accessid = 'gFacAYtERSUxGBOR';
        if (accessIdKey) {
            accessid = accessIdKey
        }

        var timestamp = Date.parse(new Date()) / 1000;

        var policyText = {
            "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
            "conditions": [
                ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
            ]
        };

        // var policyBase64 = Base64.encode(JSON.stringify(policyText))
        // if (policy) {
        //     console.log('policy', policy)
        //     policyBase64 = policy
        // }
        // var message = policyBase64
        // var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true });
        // var signature = Crypto.util.bytesToBase64(bytes);
        // if (sign) {
        //     signature = sign
        // }
        //var policy = 'eyJleHBpcmF0aW9uIjoiMjAxNi0xMi0yMFQyMjo1NDowNFoiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwxMDQ4NTc2MDAwXSxbInN0YXJ0cy13aXRoIiwibWF0ZXJpYWxcL2FwcGxpY2FudF9lbGVjX3VybF85YWIyM2VkMmEyMGU5Y2JiNmE1YTk4YTRhYzA0ZTY1OS5wbmciLCJtYXRlcmlhbFwvIl1dfQ=='
        console.log('callboack', policy, callbackbody)
        var params = {
            'key': fileName,
            'policy': policy,
            'OSSAccessKeyId': accessid,
            'success_action_status': 200, //让服务端返回200,不然，默认会返回204
            'callback': callbackbody,
            'signature': sign
        }
        console.log(params, 'upload params')
        var that = this
        return new Promise(function (resolve, reject) {
            wx.uploadFile({
                name: 'file',
                filePath: filePath,
                url: host,
                header: {
                    "Content-Type": "application/octet-stream"
                },
                formData: params,
                success: function (res) {
                    if (res.statusCode == 401) {
                        that.reLogin()
                        return
                    }
                    console.log('before res', res)
                    res.data = JSON.parse(res.data)
                    //res.data.body.url = res.data.body.url + '?time=' + (new Date()).getTime()
                    resolve(res)
                },
                fail: function (err) {
                    console.error(host, err, params)
                    reject(err)
                },
                complete: function (e) {
                    console.log('com', e)
                    if (e.statusCode == 200) {
                    } else {
                        reject(e)
                    }
                }
            })
        })

    },
    //微信支付
    wxPay: function (user_order_id) {
        var url = config.BASE + config.API.order_pay
        var data = {
            payment_type: 4,
            user_order_id: user_order_id
        }
        this.post(url, data)
            .then((res) => {
                console.log('wxPay', res)
                if (res.ret == 0) {
                    var payInfo = res.body
                    console.log(payInfo, 'payinfo')
                    return payInfo
                } else {
                    wx.showToast({
                        title: res.msg,
                        icon: 'success',
                        duration: 2000
                    })
                }
            }).then((payInfo) => {
                wx.requestPayment({
                    'timeStamp': payInfo.timeStamp + '',
                    'nonceStr': payInfo.nonceStr,
                    'package': payInfo.package,
                    'signType': payInfo.signType,
                    'paySign': payInfo.paySign,
                    'success': function (payRes) {
                        console.log('paysuccess', payRes)
                        wx.navigateTo({
                            url: '/pages/order/pay/payok?user_order_id=' + parseInt(user_order_id),
                            success: function (res) {
                                // success
                            },
                            fail: function (errRes) {
                                console.log('pay err', errRes)
                            },
                            complete: function () {
                                // complete
                            }
                        })
                    },
                    'fail': function (errRes) {
                        console.log('pay err', errRes)
                        wx.showToast({
                            title: errRes.err_desc,
                            icon: 'success',
                            duration: 2000
                        })
                    },
                    'complete': function (comp) {
                        console.log('complete', comp)
                    }
                })
            })
            .catch((err) => {
                console.error('payerr', err)
            })
    },
    login: function () {
        var that = this
        return new Promise(function (resolve, reject) {
            wx.login({
                success: function (res) {
                    wx.getUserInfo({
                        success: function (User) {
                            var user_login_url = config.BASE + config.API.user_login
                            var data = {
                                wx_code: res.code,
                                encrypted_data: User.encryptedData,
                                iv: User.iv
                            }
                            that.post(user_login_url, data).then((loginData) => {
                                resolve(loginData)
                            })
                        },
                        fail: function () {
                            // fail
                        },
                        complete: function () {
                            // complete
                        }
                    })
                },
                fail: function (err) {
                    // fail
                    reject(err)
                },
                complete: function (e) {
                    // complete
                    if (e.code) {
                    } else {
                        reject(e)
                    }
                }
            })
        })
    }
}