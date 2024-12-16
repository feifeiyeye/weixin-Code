// pages/smile/index.js
Page({
  onReady: function() {
    // 使用 wx.createCanvasContext 获取绘图上下文
    const ctx = wx.createCanvasContext('smileCanvas');

    // 绘制脸的轮廓
    ctx.arc(100, 100, 80, 0, 2 * Math.PI);
    ctx.setStrokeStyle('#000000');
    ctx.stroke();

    // 绘制眼睛
    ctx.beginPath();
    ctx.arc(75, 75, 10, 0, 2 * Math.PI);
    ctx.setFillStyle('#000000');
    ctx.fill();

    ctx.beginPath();
    ctx.arc(125, 75, 10, 0, 2 * Math.PI);
    ctx.setFillStyle('#000000');
    ctx.fill();

    // 绘制嘴巴
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();

    // 绘制结束后调用 draw 方法
    ctx.draw();
  }
})
