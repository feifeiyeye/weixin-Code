var util = require('../../util/util.js');

const SAVE_VOICE = "保存录音";

var playTimeInterval;
var recordTimeInterval;

Page({
  data: {
    item: 0,
    tab: 0,
    state: 'running',
    playIndex: 0,
    playlist: [
      {
        id: 1,
        title: '苹果香',
        singer: '佚名',
        src: 'http://10.12.1.21:3000/1.mp3',
        coverImgUrl: '/images/2.jpg',
      },
      {
        id: 2,
        title: '龙的传人',
        singer: '小华',
        src: 'http://10.12.1.21:3000/2.mp3',
        coverImgUrl: '/images/3.jpg',
      },
      {
        id: 3,
        title: '小星星',
        singer: '小红',
        src: 'http://10.12.1.21:3000/3.mp3',
        coverImgUrl: '/images/cover.jpg',
      },
    ],
    play: {
      currentTime: '00:00',
      duration: '00:00',
      percent: 0,
      title: '',
      singer: '',
      coverImgUrl: '/images/cover.jpg',
    },
    // 录音器相关数据
    recording: false,
    playing: false,
    hasRecord: false,
    recordTime: 0,
    playTime: 0,
    formatedRecordTime: '00:00:00',
    formatedPlayTime: '00:00:00',
    saveVoice: SAVE_VOICE,
    tempFilePath: '',
  },

  audioBam: null,

  onReady: function () {
    this.audioBam = wx.getBackgroundAudioManager();
    this.setMusic(0);
    this.audioCtx = wx.createAudioContext('myAudio');
  },

  // 音乐播放器相关功能
  setMusic: function (index) {
    var music = this.data.playlist[index];
    this.audioBam.src = music.src;
    this.audioBam.title = music.title;
    this.setData({
      playIndex: index,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': '00:00',
      'play.duration': '00:00',
      'play.percent': 0,
      state: 'running',
    });
  },

  // 播放、暂停、下一首功能
  play: function () {
    this.audioBam.play();
    this.setData({ state: 'running' });
  },

  pause: function () {
    this.audioBam.pause();
    this.setData({ state: 'paused' });
  },

  next: function () {
    var index = this.data.playIndex >= this.data.playlist.length - 1 ? 0 : this.data.playIndex + 1;
    this.setMusic(index);
  },

  // 录音相关功能
  startRecord: function () {
    this.setData({ recording: true });

    var that = this;
    recordTimeInterval = setInterval(function () {
      var recordTime = that.data.recordTime + 1;
      that.setData({
        formatedRecordTime: util.formatTime(recordTime),
        recordTime: recordTime,
      });
    }, 1000);

    wx.startRecord({
      success: function (res) {
        that.setData({
          hasRecord: true,
          tempFilePath: res.tempFilePath,
          formatedPlayTime: util.formatTime(that.data.playTime),
        });
      },
      fail: function (res) {
        wx.showToast({ title: res.message, duration: 2000 });
      },
      complete: function () {
        that.setData({ recording: false });
        clearInterval(recordTimeInterval);
      },
    });
  },

  stopRecord: function () {
    wx.stopRecord();
  },

  playVoice: function () {
    var that = this;
    playTimeInterval = setInterval(function () {
      var playTime = that.data.playTime + 1;
      that.setData({
        playing: true,
        formatedPlayTime: util.formatTime(playTime),
        playTime: playTime,
      });
    }, 1000);

    wx.playVoice({
      filePath: this.data.tempFilePath,
      success: function () {
        clearInterval(playTimeInterval);
        that.setData({
          playing: false,
          formatedPlayTime: util.formatTime(0),
          playTime: 0,
        });
      },
    });
  },

  stopVoice: function () {
    clearInterval(playTimeInterval);
    this.setData({
      playing: false,
      formatedPlayTime: util.formatTime(0),
      playTime: 0,
    });
    wx.stopVoice();
  },

  saveVoice: function () {
    var that = this;
    wx.saveFile({
      tempFilePath: this.data.tempFilePath,
      success: function (res) {
        wx.showModal({
          title: "保存成功",
          content: "文件路径是" + res.savedFilePath,
        });
        that.setData({ tempFilePath: res.savedFilePath });
      },
    });
  },

  clear: function () {
    clearInterval(playTimeInterval);
    wx.stopVoice();
    this.setData({
      playing: false,
      hasRecord: false,
      tempFilePath: '',
      formatedRecordTime: util.formatTime(0),
      recordTime: 0,
      playTime: 0,
    });
  },
});
