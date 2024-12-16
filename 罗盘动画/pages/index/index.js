var x1, x2, angle = 0;

Page({
  data: {
    animation: null
  },

  // Create animation object on page show
  onShow: function () {
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    });
  },

  // Start of touch event
  start: function(e) {
    x1 = e.touches[0].clientX;
  },

  // End of touch event, calculate rotation based on swipe direction
  end: function(e) {
    x2 = e.changedTouches[0].clientX;
    if (x1 < x2) {
      angle += 80;
    } else {
      angle -= 80;
    }
    this.setData({
      animation: this.animation.rotate(angle).step().export()
    });
  },

  // Animation methods
  rotate: function() {
    this.animation.rotate(Math.random() * 720 - 360).step();
    this.setData({ animation: this.animation.export() });
  },

  scale: function() {
    this.animation.scale(Math.random() * 2).step();
    this.setData({ animation: this.animation.export() });
  },

  translate: function () {
    this.animation.translate(Math.random() * 100 - 50, Math.random() * 100 - 50).step();
    this.setData({ animation: this.animation.export() });
  },

  skew: function() {
    this.animation.skew(Math.random() * 90, Math.random() * 90).step();
    this.setData({ animation: this.animation.export() });
  },

  // Combined animations
  rotateAndScale: function () {
    this.animation.rotate(Math.random() * 720 - 360);
    this.animation.scale(Math.random() * 2).step();
    this.setData({ animation: this.animation.export() });
  },

  rotateThenScale: function () {
    this.animation.rotate(Math.random() * 720 - 360).step();
    this.animation.scale(Math.random() * 2).step();
    this.setData({ animation: this.animation.export() });
  },

  // Multiple animations at once
  all: function() {
    this.animation.rotate(Math.random() * 720 - 360)
                   .scale(Math.random() * 2)
                   .translate(Math.random() * 100 - 50, Math.random() * 100 - 50)
                   .skew(Math.random() * 90, Math.random() * 90).step();
    this.setData({ animation: this.animation.export() });
  },

  // Sequential animations
  allOrder: function () {
    this.animation.rotate(Math.random() * 720 - 360).step()
                   .scale(Math.random() * 2).step()
                   .translate(Math.random() * 100 - 50, Math.random() * 100 - 50).step()
                   .skew(Math.random() * 90, Math.random() * 90).step();
    this.setData({ animation: this.animation.export() });
  },

  // Reset all animations to initial state
  reset: function() {
    this.animation.rotate(0).scale(1).translate(0, 0).skew(0, 0).step({duration: 0});
    this.setData({ animation: this.animation.export() });
  }
});
