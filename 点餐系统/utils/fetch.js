const config = require('./config.js')

class HttpClient {
  constructor() {
    this.baseUrl = config.baseUrl
    this.sessionKey = 'PHPSESSID'
  }

  // 发送请求
  async request(path, data = {}, method = 'GET') {
    try {
      const sessionId = wx.getStorageSync(this.sessionKey)
      const response = await this._wxRequest({
        url: this.baseUrl + path,
        method,
        data,
        header: this._getHeaders(sessionId)
      })

      // 处理响应
      return this._handleResponse(response)
    } catch (err) {
      return this._handleError(err)
    }
  }

  // 处理响应
  _handleResponse(response) {
    // 保存服务器返回的Cookie
    this._saveCookie(response.header)

    // 检查状态码
    if (response.statusCode !== 200) {
      throw new Error('服务器异常')
    }

    // 检查业务状态码
    if (response.data.code === 0) {
      throw new Error(response.data.msg || '请求失败')
    }

    return response.data
  }

  // 处理错误
  _handleError(error) {
    return new Promise((resolve, reject) => {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: error.message || '加载数据失败',
        confirmText: '重试',
        success: (res) => {
          if (res.confirm) {
            reject(error)
          }
        }
      })
    })
  }

  // 获取请求头
  _getHeaders(sessionId) {
    return {
      'Cookie': sessionId ? `${this.sessionKey}=${sessionId}` : ''
    }
  }

  // 保存Cookie
  _saveCookie(headers) {
    const setCookie = headers['Set-Cookie']
    if (setCookie) {
      const sessionId = this._parseCookie(setCookie)[this.sessionKey]
      if (sessionId) {
        wx.setStorageSync(this.sessionKey, sessionId)
      }
    }
  }

  // 解析Cookie
  _parseCookie(cookie) {
    const cookies = {}
    cookie.split(',').forEach(item => {
      item.split('; ').forEach(item => {
        const [key, value] = item.split('=')
        cookies[key] = value !== undefined ? decodeURIComponent(value) : true
      })
    })
    return cookies
  }

  // 封装wx.request为Promise
  _wxRequest(options) {
    return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        success: resolve,
        fail: () => reject(new Error('网络请求失败'))
      })
    })
  }
}

// 导出实例
const httpClient = new HttpClient()
module.exports = (path, data, method) => httpClient.request(path, data, method) 