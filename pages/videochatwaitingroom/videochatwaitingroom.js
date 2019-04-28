const app = getApp()
const systemInfo = app.globalData.systemInfo

Page({
  data: {
    Android: app.globalData.Android,
    coverImageLeft: (app.globalData.systemInfo.screenHeight - app.globalData.systemInfo.screenWidth) / 2,
    liveroominfo: null,
    playing: false,
    showPlayer: false,
    showRcCode: false,
    backDelay: 3,
    liveended: false,
    listmodeEndedIndex: 0,
  },
  play () {
    setTimeout(() => {
      this.setData({
        playing: true
      })
    }, 200)
  },
  back () {
    wx.navigateBack({ delta: 0 })
  },
  download () {
    this.setData({ showRcCode: true })
  },
  closeQrcode () {
    this.setData({ showRcCode: false })
  },
  toUserIndex (e) {
    wx.navigateTo({
      url: `../userindex/userindex?name=${e.currentTarget.dataset.userinfo}`
    })
  },
  ended () {
    app.globalData.listmodeEndedIndex = this.data.listmodeEndedIndex
    this.setData({ liveended: true, showPlayer: false })
    app.globalData.listmodeEndeTimer = setInterval(() => {
      this.setData({ backDelay: this.data.backDelay - 1 })
      if (this.data.backDelay === 0) {
        clearInterval(app.globalData.listmodeEndeTimer)
        wx.navigateBack({ delta: 0 })
      }
    }, 1000)
  },
  onLoad (option) {
    if (option.liveinfo.split('-')[0] === 'sitemode') {
      this.setData({ liveroominfo: app.globalData.sitemodeList[option.liveinfo.split('-')[1]], listmodeEndedIndex: +option.liveinfo.split('-')[1] })
      wx.createVideoContext('videochat-watingroom-player').play()
    } else if (option.liveinfo.split('-')[0] === 'listmode') {
      this.setData({ liveroominfo: app.globalData.listmodeList[option.liveinfo.split('-')[1]], listmodeEndedIndex: +option.liveinfo.split('-')[1] })
      wx.createVideoContext('videochat-watingroom-player').play()
    }
    setTimeout(() => {
      this.setData({ showPlayer: true })
    }, 200)
  }
})