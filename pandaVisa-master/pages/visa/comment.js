var app = getApp()
Page({
  data: {
    rater: {
      fraction: 4,
      float: 0.2
    },
    commentList: []
  },
  onLoad: function () {
    var commentList = app.globalData.detailReviews
    for (var i in commentList) {
      var score = commentList[i].score.toString().split('.')
      if (score[1] == '' || score[1] == undefined) {
        score[1] = 0;
      } else {
        score[1] = '0.' + score[1]
      }
      commentList[i].rater = { float: score[1], fraction: score[0] }
    }
    this.setData({
      commentList: commentList
    })
  }
})