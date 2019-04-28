const app = getApp()

Page({
  data: {
    userinfo: null,
    showRcCode: false
  },
  download () {
    this.setData({ showRcCode: true })
  },
  closeQrcode () {
    this.setData({ showRcCode: false })
  },
  onLoad (option) {
    const userinfo = app.globalData.userIndex
    userinfo.name = option.name
    this.setData({ userinfo })
  }
})