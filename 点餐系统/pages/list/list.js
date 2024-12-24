// pages/list/list.js
const app = getApp();
const fetch = app.fetch;

Page({
  data: {
    foodList: [],    // 保存分类和商品信息
    promotion: {},   // 保存优惠券信息
    activeIndex: 0,  // 当前激活的分类索引
    tapIndex: 0,     // 点击的分类索引
    cartPrice: 0,  // 购物车总价格
    cartNumber: 0, // 购物车总数量
    cartList: [], // 购物车商品列表
    showCart: false, // 购物车显示状态
  },

  onLoad: function () {
    wx.showLoading({ title: '努力加载中' });
    fetch('/food/list').then(data => {
      wx.hideLoading();
      this.setData({
        foodList: data.list,
        promotion: data.promotion[0],
      });
      
      // 计算分类位置
      this.calculateCategoryPositions();
    }, () => {
      this.onLoad();
    });
  },

  // 计算各个分类的位置
  calculateCategoryPositions: function() {
    let top = 0;
    let height = 0;
    let categoryPosition = [];

    const query = wx.createSelectorQuery();
    query.select('.food').boundingClientRect(rect => {
      top = rect.top;
      height = rect.height;
    });
    query.selectAll('.food-category').boundingClientRect(res => {
      res.forEach(rect => {
        categoryPosition.push(rect.top - top - height / 3);
      });
    });
    query.exec();

    this.categoryPosition = categoryPosition;
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
    
    this.categoryPosition.forEach((item, i) => {
      if (scrollTop >= item) {
        activeIndex = i;
      }
    });

    if (activeIndex !== this.data.activeIndex) {
      this.setData({ activeIndex });
    }
  },

  // 添加购物车相关方法
  addToCart: function(e) {
    const category_index = e.currentTarget.dataset.category_index;
    const food_index = e.currentTarget.dataset.food_index;
    const food = this.data.foodList[category_index].food[food_index];
    
    // 使用 food.id 作为购物车列表的 key
    const cartList = this.data.cartList;
    const cartItem = cartList[food.id];

    if (cartItem) {
      cartItem.number++;
    } else {
      cartList[food.id] = {
        id: food.id,
        name: food.name,
        price: parseFloat(food.price),
        number: 1,
      };
    }

    this.setData({
      cartList,
      cartPrice: this.data.cartPrice + parseFloat(food.price),
      cartNumber: this.data.cartNumber + 1
    });
  },

  // 显示/隐藏购物车列表
  showCartList: function() {
    if (this.data.cartNumber > 0) {
      this.setData({
        showCart: !this.data.showCart
      });
    }
  },

  // 清空购物车
  clearCart: function() {
    this.setData({
      cartList: [],
      cartPrice: 0,
      cartNumber: 0,
      showCart: false
    });
  },

  // 修改商品数量
  changeNumber: function(e) {
    const index = e.currentTarget.dataset.index;
    const type = e.currentTarget.dataset.type;
    const cartList = this.data.cartList;
    const item = cartList[index];
    
    if (type === 'add') {
      item.number++;
      this.setData({
        cartList,
        cartPrice: this.data.cartPrice + item.price,
        cartNumber: this.data.cartNumber + 1
      });
    } else {
      item.number--;
      if (item.number === 0) {
        delete cartList[index];
      }
      this.setData({
        cartList,
        cartPrice: this.data.cartPrice - item.price,
        cartNumber: this.data.cartNumber - 1
      });
    }
  }
});