//index.js
Page({
  data: {
    colors: [],
    cutIndex: -1,
    cutPercent: 0,
    max: [1,2,3,4,5],
    value: 0,
    disabled: Boolean,
    star: "★",
    activeColor:'#fc6',
    margin: 2,
    fontSize: 25
  },
  onLoad: function (options) {
  },
  onReady: function () {
    // Do something when page ready.
  },
  onShow: function () {
    // Do something when page show.
  },
  onHide: function () {
    // Do something when page hide.
  },
  onUnload: function () {
    // Do something when page close.
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
  },
   handleClick: function (i, force) {
      if (!this.disabled || force) {
        if (this.value === i + 1) {
          this.value = i
          this.updateStyle()
        } else {
          this.value = i + 1
        }
      }
    },
    updateStyle: function () {
      for (var j = 0; j < this.max; j++) {
        if (j <= this.value - 1) {
          this.colors.$set(j, this.activeColor)
        } else {
          this.colors.$set(j, '#ccc')
        }
      }
    }
})