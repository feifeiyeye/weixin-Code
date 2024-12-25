module.exports = function (iconClass, page) {
  var busPos = {}
  
  // 初始化购物车位置
  function initCartPosition() {
    return new Promise((resolve) => {
      wx.createSelectorQuery().select(iconClass).boundingClientRect(rect => {
        if (rect) {
          busPos.x = rect.left + rect.width/2
          busPos.y = rect.top + rect.height/2
          resolve(true)
        } else {
          console.warn('购物车图标未找到')
          resolve(false)
        }
      }).exec()
    })
  }

  return {
    async start(e) {
      // 确保获取到购物车位置
      if (!busPos.x) {
        const success = await initCartPosition()
        if (!success) return
      }

      // 手指点击位置
      var finger = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }

      // 计算抛物线顶点
      var topPoint = {
        y: Math.min(finger.y, busPos.y) - 150
      }

      // 使用二次贝塞尔曲线，控制点在起点和终点之间
      var controlPoint = {
        x: (finger.x + busPos.x) / 2,
        y: topPoint.y
      }

      // 计算贝塞尔曲线轨迹点
      var points = quadraticBezier(
        finger,
        controlPoint,
        busPos,
        40  // 增加采样点数量使动画更流畅
      )

      // 设置小球初始位置
      page.setData({
        'cartBall.show': true,
        'cartBall.x': finger.x,
        'cartBall.y': finger.y
      })

      // 执行动画
      var i = 0
      var timer = setInterval(function () {
        if (i >= points.length) {
          clearInterval(timer)
          page.setData({
            'cartBall.show': false
          })
          return
        }
        page.setData({
          'cartBall.x': points[i].x,
          'cartBall.y': points[i].y
        })
        i++
      }, 16)  // 约60fps的刷新率
    }
  }

  // 二次贝塞尔曲线计算
  function quadraticBezier(p0, p1, p2, segments) {
    var points = []
    for (var i = 0; i <= segments; i++) {
      var t = i / segments
      points.push({
        x: Math.pow(1 - t, 2) * p0.x + 
           2 * (1 - t) * t * p1.x + 
           Math.pow(t, 2) * p2.x,
        y: Math.pow(1 - t, 2) * p0.y + 
           2 * (1 - t) * t * p1.y + 
           Math.pow(t, 2) * p2.y
      })
    }
    return points
  }
}