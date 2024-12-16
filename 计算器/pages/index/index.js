Page({
  data: {
      num: '0',
      op: '',
  },

  // 保存上次运算结果
  result: null,
  isClear: false,

  // 数字按钮处理事件
  numBtn: function(e) {
      var num = e.target.dataset.val;
      if (this.data.num === '0' || this.isClear) {
          this.setData({ num: num });
          this.isClear = false;
      } else {
          this.setData({ num: this.data.num + num });
      }
  },

  // 计算按钮事件
  opBtn: function(e) {
      var op = this.data.op;
      var num = Number(this.data.num);
      this.setData({ op: e.target.dataset.val });

      // 判断是否重复计算
      if (this.isClear) {
          return;
      }

      this.isClear = true;
      if (this.result === null) {
          this.result = num;
          return;
      }

      switch (op) {
          case '+':
              this.result += num;
              break;
          case '-':
              this.result -= num;
              break;
          case '*':
              this.result *= num;
              break;
          case '/':
              if (num !== 0) {
                  this.result /= num;
              } else {
                  wx.showToast({ title: '除数不能为0', icon: 'none' });
                  return;
              }
              break;
          case '%':
              this.result %= num;
              break;
          default:
              return;
      }
      this.setData({ num: this.result + '' });
  },

  // 清空数字、删除数字、添加“.”事件处理函数
  dotBtn: function() {
      if (this.isClear) {
          this.setData({ num: '0.' });
          this.isClear = false;
      } else if (this.data.num.indexOf('.') === -1) {
          this.setData({ num: this.data.num + '.' });
      }
  },

  delBtn: function() {
      var num = this.data.num.substr(0, this.data.num.length - 1);
      this.setData({ num: num || '0' });
  },

  resBtn: function() {
      this.result = null;
      this.isClear = false;
      this.setData({ num: '0', op: '' });
  }
});
