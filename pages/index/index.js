const app = getApp()
const systemInfo = app.globalData.systemInfo

Page({
  data: {
    onLiveList: true,
    onSmallVideo: false,
    onVidedoChat: false,
    onAbout: false,
    Android: app.globalData.Android,
    known: false
  },
  tap(e) {
    if (e.currentTarget.dataset.state === 'live-list') {
      this.setData({
        onLiveList: true,
        onSmallVideo: false,
        onVidedoChat: false,
        onAbout: false
      })
    } else if (e.currentTarget.dataset.state === 'small-video') {
      this.setData({
        onLiveList: false,
        onSmallVideo: true,
        onVidedoChat: false,
        onAbout: false
      })
    } else if (e.currentTarget.dataset.state === 'video-chat') {
      this.setData({
        onLiveList: false,
        onSmallVideo: false,
        onVidedoChat: true,
        onAbout: false
      })
    } else if (e.currentTarget.dataset.state === 'about') {
      this.setData({
        onLiveList: false,
        onSmallVideo: false,
        onVidedoChat: false,
        onAbout: true
      })
    }
  },
  knowBugs () {
    this.setData({ known: true })
  },
  toBUGS () {
    wx.navigateTo({
      url: `../bugs/bugs`
    })
  }
})