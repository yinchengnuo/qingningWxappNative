const app = getApp()
const systemInfo = app.globalData.systemInfo

Page({
  data: {
    onLiveList: true,
    onSmallVideo: false,
    onVidedoChat: false,
    onAbout: false,
    navigationBarTitle: '直播'
  },
  tap(e) {
    if (e.currentTarget.dataset.state === 'live-list') {
      this.setData({
        onLiveList: true,
        onSmallVideo: false,
        onVidedoChat: false,
        onAbout: false,
        navigationBarTitle: '直播'
      })
    } else if (e.currentTarget.dataset.state === 'small-video') {
      this.setData({
        onLiveList: false,
        onSmallVideo: true,
        onVidedoChat: false,
        onAbout: false,
        navigationBarTitle: '小视频'
      })
    } else if (e.currentTarget.dataset.state === 'video-chat') {
      this.setData({
        onLiveList: false,
        onSmallVideo: false,
        onVidedoChat: true,
        onAbout: false,
        navigationBarTitle: '视频聊'
      })
    } else if (e.currentTarget.dataset.state === 'about') {
      this.setData({
        onLiveList: false,
        onSmallVideo: false,
        onVidedoChat: false,
        onAbout: true,
        navigationBarTitle: '关于富聊'
      })
    }
  }
})