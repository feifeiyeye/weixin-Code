// pages/list/list.js
const app = getApp();
const fetch = app.fetch;

// 用于存储分类位置信息
let categoryPosition = [];
let top = 0;
let height = 0;

Page({
  data: {
    foodList: [],     // 保存分类和商品信息
    promotion: {},    // 保存优惠券信息
    activeIndex: 0,   // 当前激活的分类索引
    tapIndex: 0,       // 点击的分类索引
    cartList: [],     // 购物车商品列表
    cartPrice: 0,     // 购物车总价格
    cartNumber: 0,    // 购物车商品总数量
    showCart: false,  // 是否显示购物车面板
    cartBall: {       // 小球动画数据
      show: false,
      x: 0,
      y: 0
    }
  },

  onLoad: function () {
    // 加载菜单数据
    wx.showLoading({ title: '努力加载中' });
    fetch('/food/list').then(data => {
      wx.hideLoading();
      this.setData({
        foodList: data.list,
        promotion: data.promotion[0],
      });

      // 计算分类位置
      this.calculateCategoryPosition();
    }, () => {
      this.onLoad();
    });
  },

  // 计算各个分类的位置
  calculateCategoryPosition: function() {
    const query = wx.createSelectorQuery();
    query.select('.food').boundingClientRect(rect => {
      top = rect.top;
      height = rect.height;
    });
    query.selectAll('.food-category').boundingClientRect(res => {
      categoryPosition = [];
      res.forEach(rect => {
        categoryPosition.push(rect.top - top - height / 3);
      });
    });
    query.exec();
  },

  // 点击左侧菜单
  tapCategory: function (e) {
    const index = e.currentTarget.dataset.index;
    this.disableNextScroll = true;
    this.setData({
      activeIndex: index,
      tapIndex: index,
    });
  },

  // 右侧商品列表滚动事件
  onFoodScroll: function (e) {
    if (this.disableNextScroll) {
      this.disableNextScroll = false;
      return;
    }

    const scrollTop = e.detail.scrollTop;
    let activeIndex = 0;
    categoryPosition.forEach((item, i) => {
      if (scrollTop >= item) {
        activeIndex = i;
      }
    });
    
    if (activeIndex !== this.data.activeIndex) {
      this.setData({ activeIndex });
    }
  },

  // 添加到购物车方法
  addToCart(e) {
    const {category_index, index} = e.currentTarget.dataset;
    const food = this.data.foodList[category_index].food[index];
    const cartList = this.data.cartList;
    
    // 查找商品是否已在购物车中
    const existIndex = cartList.findIndex(item => item.id === food.id);
    
    if(existIndex > -1) {
      cartList[existIndex].number++;
    } else {
      cartList.push({
        id: food.id,
        name: food.name,
        price: parseFloat(food.price),
        number: 1
      });
    }

    // 更新购物车数据
    this.setData({
      cartList,
      cartPrice: this.data.cartPrice + parseFloat(food.price),
      cartNumber: this.data.cartNumber + 1
    });

    // 触发小球动画
    this.showCartBall(e);
  },

  // 显示/隐藏购物车
  toggleCart() {
    if(this.data.cartNumber > 0) {
      this.setData({
        showCart: !this.data.showCart
      });
    }
  },

  // 小球动画
  showCartBall(e) {
    // 获取点击位置
    const {clientX, clientY} = e.touches[0];
    
    this.setData({
      ['cartBall.show']: true,
      ['cartBall.x']: clientX,
      ['cartBall.y']: clientY
    });

    setTimeout(() => {
      this.setData({
        ['cartBall.show']: false
      });
    }, 400);
  }
});