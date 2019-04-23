const app = getApp()
const { smallvideoList } = require('../../smallvideoList')
Component({
  properties: {
    isShow: {
      type: Boolean,
      value: 'default value',
    }
  },
  data: {
    Android: app.globalData.Android,
    smallvideoList,
    nowIndex: 0,
    playing: false
  },
  observers: {
    isShow(isShow) {
      if (isShow) {
        wx.createVideoContext(`smallvideo${this.data.nowIndex}`, this).play()
      } else {
        wx.createVideoContext(`smallvideo${this.data.nowIndex}`, this).pause()
      }
    }
  },
  methods: {
    swiperMoveFinish(e) {
      if (e.detail.current !== this.data.nowIndex) {
        smallvideoList.forEach((e, i) => {
          wx.createVideoContext(`smallvideo${i}`, this).pause()
        })
        this.setData({ playing: false, nowIndex: e.detail.current })
        wx.createVideoContext(`smallvideo${this.data.nowIndex}`, this).play()
      }
    },
    play () {
      setTimeout(() => {
        this.setData({
          playing: true
        })
      }, 200)
    }
  }
})
