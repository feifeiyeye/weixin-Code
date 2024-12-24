// pages/list/list.js
const app = getApp();
const fetch = app.fetch;

Page({
  data: {
    foodList: [],    // 保存分类和商品信息
    promotion: {},   // 保存优惠券信息
    activeIndex: 0,  // 当前激活的分类索引
    tapIndex: 0,     // 点击的分类索引
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
});