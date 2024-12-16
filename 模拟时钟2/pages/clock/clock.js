Page({
  data: {
    hourDeg: 0,
    minuteDeg: 0,
    secondDeg: 0
  },

  onLoad: function() {
    this.updateClock();
    // 每秒更新一次时钟
    setInterval(() => {
      this.updateClock();
    }, 1000);
  },

  updateClock: function() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // 计算指针角度
    const secondDeg = seconds * 6; // 秒针每秒转动6度
    const minuteDeg = minutes * 6 + seconds * 0.1; // 分针每分钟转动6度，考虑秒针影响
    const hourDeg = hours * 30 + minutes * 0.5; // 时针每小时转动30度，考虑分针影响

    this.setData({
      hourDeg,
      minuteDeg,
      secondDeg
    });
  }
}); 