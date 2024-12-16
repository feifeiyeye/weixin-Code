// index.js
Page({
    data:{
        imgUrl:'/images/guest.png',
        tempFilePath:null
    },
    changeImg:function(){
        wx.chooseMedia({
            count: 1,
            mediaType:['image'],
            sourceType:['album','camera'],
            success:res =>{
                var tempFilePath = res.tempFiles[0].tempFilePath
                this.setData({
                    tempFilePath: tempFilePath,
                    imgUrl: tempFilePath
                })
            }
        })
    },
    upload:function(){
        if(!this.data.tempFilePath){
            wx.showToast({
              title: '请您更改头像后上传',
              icon:'none',
              duration:2000
            })
            return
        }
        wx.uploadFile({
          filePath: this.data.tempFilePath,
          name: 'image',
          url: 'http://192.168.137.1:3000/upload',
          success:res =>{
              this.uploadFileUrl = JSON.parse(res.data).file
          }
        })
    },
    download:function(){
        if(!this.uploadFileUrl){
            wx.showToast({
              title: '请您上传头像之后再进行下载操作！',
              icon:'error',
              duration:2000,  
            })
            return
        }
        wx.showLoading({
          title: '图片下载中，请稍后.....',
        })
        wx.downloadFile({
          url: this.uploadFileUrl,
          success: res=>{
              wx.hideLoading()
              console.log('下载完成！')
              wx.previewImage({
                urls: [ res.tempFilePath ],
              })
          }
        })
    }
})
