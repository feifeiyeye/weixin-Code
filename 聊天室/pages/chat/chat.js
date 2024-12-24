Page({
  data: {
    messages: [],
    inputMessage: '',
    lastMessageId: '',
    socketTask: null,
    connecting: false
  },

  onLoad() {
    this.connectSocket()
    
    // 监听键盘高度变化
    wx.onKeyboardHeightChange(res => {
      if (res.height > 0) {
        this.scrollToBottom()
      }
    })
  },

  connectSocket() {
    if (this.data.connecting) return
    
    this.setData({ connecting: true })
    
    const socketTask = wx.connectSocket({
      url: 'ws://127.0.0.1:3000',
      success: () => {
        console.log('WebSocket连接成功！')
        wx.showToast({
          title: '连接成功',
          icon: 'success'
        })
      },
      fail: () => {
        wx.showToast({
          title: '连接失败',
          icon: 'error'
        })
      },
      complete: () => {
        this.setData({ connecting: false })
      }
    })

    this.setData({ socketTask })

    socketTask.onMessage(this.onReceiveMessage.bind(this))
    socketTask.onClose(() => {
      console.log('WebSocket连接已关闭！')
      wx.showToast({
        title: '连接已断开',
        icon: 'none'
      })
    })
  },

  scrollToBottom() {
    setTimeout(() => {
      if (this.data.messages.length > 0) {
        const lastId = this.data.messages[this.data.messages.length - 1].id
        this.setData({
          lastMessageId: `msg-${lastId}`
        })
      }
    }, 200)
  },

  onReceiveMessage(res) {
    const message = JSON.parse(res.data)
    const messages = [...this.data.messages, {
      id: Date.now(),
      content: message.content,
      isSelf: false
    }]
    
    this.setData({ 
      messages,
      lastMessageId: `msg-${messages[messages.length - 1].id}`
    })
  },

  onInputChange(e) {
    this.setData({
      inputMessage: e.detail.value
    })
  },

  sendMessage() {
    if (!this.data.inputMessage.trim()) return

    const message = {
      content: this.data.inputMessage
    }

    this.data.socketTask.send({
      data: JSON.stringify(message),
      success: () => {
        const messages = [...this.data.messages, {
          id: Date.now(),
          content: this.data.inputMessage,
          isSelf: true
        }]
        
        this.setData({
          messages,
          inputMessage: '',
          lastMessageId: `msg-${messages[messages.length - 1].id}`
        })
      }
    })
  },

  onUnload() {
    if (this.data.socketTask) {
      this.data.socketTask.close()
    }
  }
}) 