// pages/list/list.js
const app = getApp()
const fetch = app.fetch

// 定义一个数组保存每个分类的高度
const categoryPosition = []

// 引入购物车动画模块
const shopcartAnimate = require('../../utils/shopcartAnimate.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodList: [],    // 菜单列表数据
    promotion: {       // 优惠信息
      full: 50,        // 满50元
      minus: 10        // 减10元
    },    
    activeIndex: 0,    // 当前激活的菜单项索引
    tapIndex: 0,       // 点击的菜单项索引
    cartPrice: 0,      // 购物车总价
    cartNumber: 0,     // 购物车商品总数
    cartList: {},      // 购物车数据
    cartBall: {
      show: false,
      x: 0,
      y: 0
    },
    showCart: false  // 控制购物车界面显示
  },

  // 是否禁止下一次scroll事件触发
  disableNextScroll: false,

  // 购物车动画对象
  shopcartAnimate: null,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    wx.showLoading({
      title: '努力加载中',
      mask: true
    })

    fetch('/food/list').then(data => {
      wx.hideLoading()
      this.setData({
        foodList: data.list,
        // 不再从接口获取 promotion 数据
        // promotion: data.promotion[0]
      }, () => {
        // 获取右侧商品列表各分类的位置信息
        const query = wx.createSelectorQuery()
        let top = 0
        let height = 0
        
        query.select('.food').boundingClientRect(rect => {
          top = rect.top
          height = rect.height
        })

        query.selectAll('.food-category').boundingClientRect(res => {
          res.forEach(rect => {
            categoryPosition.push(rect.top - top - height/3)
          })
        })
        query.exec()
      })
    }, () => {
      this.onLoad() // 失败时重试
    })

    // 初始化购物车动画
    this.shopcartAnimate = shopcartAnimate('.operate-shopcart-icon', this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相���事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 点击左侧菜单项
  tapCategory: function(e) {
    this.disableNextScroll = true
    const index = e.currentTarget.dataset.index
    this.setData({
      activeIndex: index,
      tapIndex: index
    })
  },

  // 监听右侧商品列表滚动
  onFoodScroll: function(e) {
    // 如果是点击左侧菜单项触发的滚动，则忽略
    if(this.disableNextScroll) {
      this.disableNextScroll = false
      return
    }

    const scrollTop = e.detail.scrollTop
    let activeIndex = 0

    // 根据滚动位置判断当前分类
    categoryPosition.forEach((item, i) => {
      if(scrollTop >= item) {
        activeIndex = i
      }
    })

    // 避免重复设置相同的激活项
    if(activeIndex !== this.data.activeIndex) {
      this.setData({ activeIndex })
    }
  },

  // 添加商品到购物车
  addToCart: function(e) {
    const index = e.currentTarget.dataset.index
    const category_index = e.currentTarget.dataset.category_index
    const food = this.data.foodList[category_index].food[index]
    const cartList = this.data.cartList

    if (cartList[index]) {
      // 商品已在购物车中，数量加1
      ++cartList[index].number
    } else {
      // 商品未在购物车中，新增商品
      cartList[index] = {
        id: food.id,
        name: food.name,
        price: parseFloat(food.price),
        number: 1
      }
    }

    // 更新购物车数据
    this.setData({
      cartList,
      cartPrice: this.data.cartPrice + cartList[index].price,
      cartNumber: this.data.cartNumber + 1
    })

    // 播放小球动画
    this.shopcartAnimate.start(e)
  },

  // 显示/隐藏购物车列表
  showCartList: function() {
    if (this.data.cartNumber > 0) {
      this.setData({
        showCart: !this.data.showCart
      })
    }
  },

  // 增加商品数量
  cartNumberAdd: function(e) {
    const id = e.currentTarget.dataset.id
    const cartList = this.data.cartList
    
    // 增加数量
    ++cartList[id].number
    
    // 更新数据
    this.setData({
      cartNumber: ++this.data.cartNumber,
      cartList: cartList,
      cartPrice: this.data.cartPrice + cartList[id].price
    })
  },

  // 减少商品数量
  cartNumberDec: function(e) {
    const id = e.currentTarget.dataset.id
    const cartList = this.data.cartList
    
    if (cartList[id]) {
      const price = cartList[id].price
      
      if (cartList[id].number > 1) {
        // 数量大于1时减少数量
        --cartList[id].number
      } else {
        // 数量为1时删除商品
        delete cartList[id]
      }
      
      // 更新数据
      this.setData({
        cartList: cartList,
        cartNumber: --this.data.cartNumber,
        cartPrice: this.data.cartPrice - price
      })
      
      // 当购物车为空时关闭购物车界面
      if (this.data.cartNumber <= 0) {
        this.setData({
          showCart: false
        })
      }
    }
  },

  // 清空购物车
  cartClear: function() {
    this.setData({
      cartList: {},      // 清空购物车列表
      cartNumber: 0,     // 重置商品总数
      cartPrice: 0,      // 重置总价格
      showCart: false    // 隐藏购物车界面
    })
  },

  // 跳转到订单确认页
  order: function() {
    if (this.data.cartNumber === 0) {
      return
    }
    
    wx.showLoading({
      title: '正在生成订单'
    })
    
    fetch('/food/order', {
      order: this.data.cartList
    }, 'POST').then(data => {
      wx.navigateTo({
        url: '/pages/order/checkout/checkout?order_id=' + data.order_id
      })
    }, () => {
      this.order() // 失败时重试
    })
  }
})