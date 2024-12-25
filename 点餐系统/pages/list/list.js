// pages/list/list.js
const app = getApp();
const shopcartAnimate = require('../../utils/shopcartAnimate.js')

Page({
  data: {
    foodList: [],    
    promotion: {},   
    activeIndex: 0,  
    tapIndex: 0,     
    cart: {
      price: 0,    // 购物车总价格
      number: 0,   // 购物车总数量
      list: [],    // 购物车商品列表
      show: false, // 购物车显示状态
    },
    ball: {
      show: false, // 是否显示购物车动画小球
      x: 0,        // 小球的起始X坐标
      y: 0,        // 小球的起始Y坐标
      y2: 0,       // 小球的结束Y坐标
    },
    cartBall: {
      show: false,
      x: 0,
      y: 0
    }
  },

  onLoad() {
    this.loadFoodList()
    // 延迟初始化购物车动画，确保页面已渲染
    wx.nextTick(() => {
      this.cartAnimate = shopcartAnimate('.cart-icon', this)
    })
  },

  // 加载商品列表
  async loadFoodList() {
    try {
      wx.showLoading({ title: '努力加载中' })
      const data = await app.fetch('/food/list')
      this.setData({
        foodList: data.list,
        promotion: data.promotion[0] || {}
      }, () => {
        // 在 setData 的回调中执行，确保数据更新后再计算位置
        wx.nextTick(() => {
          this.calculateCategoryPositions()
        })
      })
    } catch (err) {
      wx.showToast({
        title: '加载失败，请重试',
        icon: 'none'
      })
    } finally {
      wx.hideLoading()
    }
  },

  // 计算分类位置
  calculateCategoryPositions() {
    const query = wx.createSelectorQuery()
    query.select('.food').boundingClientRect(rect => {
      if (!rect) {
        console.warn('未找到.food元素，将在onShow中重试')
        return
      }
      const top = rect.top
      const height = rect.height
      
      query.selectAll('.food-category').boundingClientRect(res => {
        if (!res || !res.length) {
          console.warn('未找到.food-category元素，将在onShow中重试')
          return
        }
        this.categoryPosition = res.map(rect => 
          rect.top - top - height / 3
        )
      }).exec()
    }).exec()
  },

  // 点击分类
  tapCategory(e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      activeIndex: index,
      tapIndex: index
    })
    this.disableNextScroll = true
  },

  // 滚动监听
  onFoodScroll: throttle(function(e) {
    if (this.disableNextScroll) {
      this.disableNextScroll = false
      return
    }

    const scrollTop = e.detail.scrollTop
    const activeIndex = this.categoryPosition.findIndex(top => 
      scrollTop >= top
    )

    if (activeIndex !== -1 && activeIndex !== this.data.activeIndex) {
      this.setData({ activeIndex })
    }
  }, 100),

  // 添加到购物车
  addToCart(e) {
    const { category_index, food_index } = e.currentTarget.dataset
    const food = this.data.foodList[category_index].food[food_index]
    
    // 执行动画
    if (this.cartAnimate) {
      this.cartAnimate.start(e)
    }
    
    // 更新购物车
    this.updateCart(food)
  },

  // 显示购物车动画
  showCartAnimation(x, y) {
    const query = wx.createSelectorQuery()
    query.select('.operate-shopcart-icon').boundingClientRect(res => {
      this.setData({
        'ball.show': true,
        'ball.x': x,
        'ball.y': y,
        'ball.y2': res.top - y
      })

      setTimeout(() => {
        this.setData({ 'ball.show': false })
      }, 500)
    }).exec()
  },

  // 更新购物车数据
  updateCart(food) {
    const { cart } = this.data
    const cartItem = cart.list[food.id]

    if (cartItem) {
      cartItem.number++
    } else {
      cart.list[food.id] = {
        id: food.id,
        name: food.name,
        price: parseFloat(food.price),
        number: 1
      }
    }

    this.setData({
      'cart.list': cart.list,
      'cart.price': cart.price + parseFloat(food.price),
      'cart.number': cart.number + 1
    })
  },

  // 切换购物车显示
  toggleCart() {
    if (this.data.cart.number > 0) {
      this.setData({
        'cart.show': !this.data.cart.show
      })
    }
  },

  // 清空购物车
  clearCart() {
    this.setData({
      cart: {
        price: 0,
        number: 0,
        list: [],
        show: false
      }
    })
  },

  // 修改商品数量
  changeNumber(e) {
    const { index, type } = e.currentTarget.dataset
    const { cart } = this.data
    const item = cart.list[index]
    
    if (!item) return

    if (type === 'add') {
      item.number++
      this.setData({
        'cart.list': cart.list,
        'cart.price': cart.price + item.price,
        'cart.number': cart.number + 1
      })
    } else {
      item.number--
      if (item.number === 0) {
        delete cart.list[index]
      }
      this.setData({
        'cart.list': cart.list,
        'cart.price': cart.price - item.price,
        'cart.number': cart.number - 1
      })
    }
  },

  // 提交订单
  async submitOrder() {
    if (this.data.cart.number === 0) return
    
    try {
      wx.showLoading({ title: '���在生成订单' })
      const { order_id } = await app.fetch('/food/order', {
        order: this.data.cart.list
      }, 'POST')
      
      wx.navigateTo({
        url: `/pages/order/checkout/checkout?order_id=${order_id}`
      })
    } catch (err) {
      wx.showToast({
        title: '提交订单失败，请重试',
        icon: 'none'
      })
    } finally {
      wx.hideLoading()
    }
  },

  // 添加 onShow 生命周期方法
  onShow() {
    // 页面显示时重新计算位置
    if (this.data.foodList.length > 0) {
      wx.nextTick(() => {
        this.calculateCategoryPositions()
      })
    }
  }
})

// 节流函数
function throttle(fn, delay) {
  let timer = null
  return function(...args) {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}