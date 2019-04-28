const app = getApp()
let liveList = null
Page({
  data: {
    Android: app.globalData.Android,
    coverImageLeft: (app.globalData.systemInfo.screenHeight - app.globalData.systemInfo.screenWidth) / 2,
    swiperList: [],
    audienceList: [],
    activityImages: [],
    danmuList: [],
    alertWatcherName: '',
    globalActiveIndex: 0,
    currentIndex: 1,
    playing: false,
    alertHidden: true,
    showRcCode: false
  },
  play () {
    console.log(2333)
    setTimeout(() => {
      this.setData({
        playing: true
      })
    }, 200)
  },
  swiperMoveFinish (e) {
    const now = e.detail.current
    const pre = this.data.currentIndex
    const swiperList = this.data.swiperList
    const audienceList = []
    if (now !== pre) {
      this.setData({
        playing: false
      })
      const getGlobalActiveIndex = () => {
        if (this.data.globalActiveIndex === -1) {
          this.data.globalActiveIndex = liveList.length - 1
        } 
        if (this.data.globalActiveIndex === liveList.length) {
          this.data.globalActiveIndex = 0
        }
      }
      const globalActiveIndexAdd = (now, index) => {
        this.data.globalActiveIndex ++
        getGlobalActiveIndex()
        swiperList[index] = liveList[this.data.globalActiveIndex + 1] ? liveList[this.data.globalActiveIndex + 1] : liveList[0]
        typeof swiperList[now].audienceNums === 'number' ? 0 :  swiperList[now].audienceNums = 9
        for (let i = 0; i < swiperList[now].audienceNums; i ++) {
          audienceList.push(0)
        }
        this.setData({ swiperList, audienceList, currentIndex: now })
      }
      const globalActiveIndexRed = (now, index) => {
        this.data.globalActiveIndex --
        getGlobalActiveIndex()
        swiperList[index] = liveList[this.data.globalActiveIndex - 1] ? liveList[this.data.globalActiveIndex - 1] : liveList[liveList.length - 1]
        typeof swiperList[now].audienceNums === 'number' ? 0 :  swiperList[now].audienceNums = 9
        for (let i = 0; i < swiperList[now].audienceNums; i ++) {
          audienceList.push(0)
        }
        this.setData({ swiperList, audienceList, currentIndex: now })
      }
      const nowZer = () => {
        if (pre === 1) {
          globalActiveIndexRed(0, 2)
        }
        if (pre === 2) {
          globalActiveIndexAdd(0, 1)
        }
      }
      const nowOne = () => {
        if (now > pre) {
          globalActiveIndexAdd(1, 2)
        }
        if (now < pre) {
          globalActiveIndexRed(1, 0)
        }
      }
      const nowTwo = () => {
        if (pre === 1) {
          globalActiveIndexAdd(2, 0)
        }
        if (pre === 0) {
          globalActiveIndexRed(2, 1)
        }
      }
      switch (now) {
        case 0: {
          nowZer()
        }
        break
        case 1: {
          nowOne()
        }
        break
        case 2: {
          nowTwo()
        }
        break
      }
      wx.createVideoContext(`video${now}`).play()
    }
  },
  showWatcherInfo (e) {
    if (+e.currentTarget.dataset.wacther || +e.currentTarget.dataset.wacther === 0) {
      this.setData({ alertWatcherName: '尹成诺（' + (+e.currentTarget.dataset.wacther + 1) + '）', alertHidden: false })
    } else {
      this.setData({ alertWatcherName: e.currentTarget.dataset.wacther, alertHidden: false })
    }
  },
  hideWatcherInfo () {
    this.setData({ alertHidden: true })
  },
  toUserIndex (e) {
    wx.navigateTo({
      url: `../userindex/userindex?name=${e.currentTarget.dataset.userinfo}`
    })
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
  onLoad (option) {
    liveList = app.globalData.liveList[option.channel]
    const activityImages = app.globalData.activityImages
    const danmuList = app.globalData.danmuList
    const globalActiveIndex = +option.globalActiveIndex
    const swiperList = []
    const audienceList = []
    swiperList[0] = liveList[globalActiveIndex - 1] ? liveList[globalActiveIndex - 1] : liveList[liveList.length - 1]
    swiperList[1] = liveList[globalActiveIndex]
    swiperList[2] = liveList[globalActiveIndex + 1] ? liveList[globalActiveIndex + 1] : liveList[0]
    typeof swiperList[1].audienceNums === 'number' ? 0 :  swiperList[1].audienceNums = 9
    for (let i = 0; i < swiperList[1].audienceNums; i ++) {
      audienceList.push(0)
    }
    this.setData({ swiperList, audienceList, danmuList, activityImages, globalActiveIndex })
    wx.createVideoContext('video1').play()
  }
})