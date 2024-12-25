// pages/record/record.js
const app = getApp()

const DEFAULT_AVATAR = '/images/avatar.png'

Page({
  data: {
    userInfo: {
      avatarUrl: DEFAULT_AVATAR
    },
    recordList: [],     // 消费记录列表
    loading: true,      // 加载状态
    error: null,        // 错误信息
    totalAmount: 0      // 总消费金额
  },

  onLoad() {
    this.loadRecordList()
  },

  // 加载消费记录
  async loadRecordList() {
    try {
      wx.showLoading({ title: '努力加载中…' })
      const data = await app.fetch('/food/record')
      
      // 格式化记录列表
      const recordList = this.formatRecordList(data.list || [])
      const totalAmount = this.calculateTotalAmount(recordList)

      this.setData({
        recordList,
        totalAmount,
        loading: false,
        error: null
      })
    } catch (err) {
      this.showError('加载失败，请重试')
      console.error('获取数据失败:', err)
    } finally {
      wx.hideLoading()
    }
  },

  // 格式化记录列表
  formatRecordList(list) {
    return list.map(item => {
      try {
        const [dateStr, timeStr] = (item.pay_time || '').split(' ')
        return {
          ...item,
          dateStr: dateStr || '未知日期',
          timeStr: timeStr || '未知时间'
        }
      } catch (err) {
        console.error('日期解析错误:', err, '原始数据:', item)
        return {
          ...item,
          dateStr: '未知日期',
          timeStr: '未知时间'
        }
      }
    })
  },

  // 计算总消费金额
  calculateTotalAmount(list) {
    return list.reduce((total, item) => total + (Number(item.price) || 0), 0)
  },

  // 显示错误信息
  showError(message) {
    this.setData({
      error: message,
      loading: false
    })
    wx.showToast({
      title: message,
      icon: 'none'
    })
  },

  // 选择头像
  async onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    try {
      // 这里可以添加上传头像到服务器的逻辑
      this.setData({
        'userInfo.avatarUrl': avatarUrl
      })
    } catch (err) {
      this.showError('头像更新失败')
    }
  },

  // 重试加载
  retry() {
    this.loadRecordList()
  }
})