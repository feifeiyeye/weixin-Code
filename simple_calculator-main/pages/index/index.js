// index.js
import c from "./SimpleCalculator";
// 获取应用实例
const app = getApp()
let isOpe = true
const calc = new c.SimpleCalculator();
Page({
  data: {
    inputStr: "",
    currentDigit: "",

  },
  bac() {
    this.setData({
      inputStr: "",
      currentDigit: ""
    })
    isOpe = true
    wx.vibrateShort()
  },
  // 切换正负
  bSign() {
    this.setData({
      currentDigit: -1 * this.data.currentDigit
    })
    wx.vibrateShort()
  },
  // 求余
  bRemainder() {
    if (isOpe) return
    this.setData({
      inputStr: this.data.inputStr + this.data.currentDigit + "%"
    })
    isOpe = true
    wx.vibrateShort()
  },
  // 除法
  bDivision() {
    if (isOpe) return
    this.setData({
      inputStr: this.data.inputStr + this.data.currentDigit + "÷"
    })
    isOpe = true
    wx.vibrateShort()
  },
  // 乘法
  bMultiplication() {
    if (isOpe) return
    this.setData({
      inputStr: this.data.inputStr + this.data.currentDigit + "×"
    })
    isOpe = true
    wx.vibrateShort()
  },
  // 减法
  bSubtraction() {
    let input = this.data.inputStr
    if (!isOpe) {
      input += this.data.currentDigit
    }
    this.setData({
      inputStr: input + "−"
    })
    isOpe = true
    wx.vibrateShort()
  },
  // 加法
  bAddition() {
    let input = this.data.inputStr
    if (!isOpe) {
      input += this.data.currentDigit
    }
    this.setData({
      inputStr: input + "+"
    })
    isOpe = true
    wx.vibrateShort()
  },
  // =
  bequal() {
    let result = 0
    if (this.data.inputStr === "") {
      result = this.data.currentDigit || 0
    } else {
      result = calc.startCalc(this.data.inputStr + this.data.currentDigit) || "错误"
    }
    this.setData({
      inputStr: "",
      currentDigit: result
    })
    isOpe = false
    wx.vibrateShort()
  },
  // 7
  b7() {
    this.setData({
      currentDigit: isOpe ? "7" : this.data.currentDigit += "7"
    })
    isOpe = false
    wx.vibrateShort()
  },
  // 8
  b8() {
    this.setData({
      currentDigit: isOpe ? "8" : this.data.currentDigit += "8"
    })
    isOpe = false
    wx.vibrateShort()
  },
  // 9
  b9() {
    this.setData({
      currentDigit: isOpe ? "9" : this.data.currentDigit += "9"
    })
    isOpe = false
    wx.vibrateShort()
  },
  // 4
  b4() {
    this.setData({
      currentDigit: isOpe ? "4" : this.data.currentDigit += "4"
    })
    isOpe = false
    wx.vibrateShort()
  },
  // 5
  b5() {
    this.setData({
      currentDigit: isOpe ? "5" : this.data.currentDigit += "5"
    })
    isOpe = false
    wx.vibrateShort()
  },
  // 6
  b6() {
    this.setData({
      currentDigit: isOpe ? "6" : this.data.currentDigit += "6"
    })
    isOpe = false
    wx.vibrateShort()
  },
  // 1
  b1() {
    this.setData({
      currentDigit: isOpe ? "1" : this.data.currentDigit += "1"
    })
    isOpe = false
    wx.vibrateShort()
  },
  // 2
  b2() {
    this.setData({
      currentDigit: isOpe ? "2" : this.data.currentDigit += "2"
    })
    isOpe = false
    wx.vibrateShort()
  },
  // 3
  b3() {
    this.setData({
      currentDigit: isOpe ? "3" : this.data.currentDigit += "3"
    })
    isOpe = false
    wx.vibrateShort()
  },
  // 0
  b0() {
    this.setData({
      currentDigit: isOpe ? "0" : this.data.currentDigit += "0"
    })
    isOpe = false
    wx.vibrateShort()
  },
  // .
  bPoint() {
    this.setData({
      currentDigit: isOpe ? "." : this.data.currentDigit += "."
    })
    isOpe = false
    wx.vibrateShort()
  },
})
