// pages/apply/apply-order.js
Page({
  data:{ 
    //radio信息
    radioItems: [
      {name: '1', value: '个人', checked: 'true'},
      {name: '2', value: '公司'},
    ],
    hidden: false,
    //checkbox信息
    checkboxItems: [
      {name: '1', value: '支付订单代表阅读并同意'},
    ],
    noItems: [
      {name: '', value: ' '},
    ],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  radioChange: function(e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.radioItems.length; i ++) {
      if (checked.indexOf(this.data.radioItems[i].value) !== -1) {
        changed['radioItems['+i+'].checked'] = true
      } else {
        changed['radioItems['+i+'].checked'] = false
      }
    }
    this.setData(changed)
  },
  //chcekbox
  noChange: function(e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.noItems.length; i ++) {
      if (checked.indexOf(this.data.noItems[i].name) !== -1) {
        changed['noItems['+i+'].checked'] = true
      } else {
        changed['noItems['+i+'].checked'] = false
      }
    }
    this.setData(changed)
  },
  checkboxChange: function(e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.checkboxItems.length; i ++) {
      if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
        changed['checkboxItems['+i+'].checked'] = true
      } else {
        changed['checkboxItems['+i+'].checked'] = false
      }
    }
    this.setData(changed)
  },
})