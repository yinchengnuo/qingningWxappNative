const app = getApp()
const api = app.globalData.api
const { videochatSiteModeRequest } = require('../../utils/request')
Component({
  properties: {
    isShow: {
      type: Boolean,
      value: 'default value',
    },
    onVideochat: {
      type: Boolean,
      value: 'default value',
    }
  },
  data: {
    Android: app.globalData.Android,
    activeVideochatList: [],
    videochat0: null,
    videochat1: null,
    videochat2: null,
    waiting0: false,
    waiting1: false,
    waiting2: false,
    playing: [false, false, false],
    showRcCode: false
  },
  observers: {
    onVideochat (onVideochat) {
      if (onVideochat &&this.data.isShow) {
        videochatSiteModeRequest(this, api, 'init')
      }
      if (onVideochat === false) {
        this.setData({ activeVideochatList: [] })
      }
    },
    isShow(isShow) {
      if (isShow && this.data.onVideochat) {
        videochatSiteModeRequest(this, api, 'init')
      }
      if(isShow === false) {
        this.setData({ activeVideochatList: [] })
      }
    },
    activeVideochatList (sitemodeList) {
      if (sitemodeList.length) {
        app.globalData.sitemodeList = sitemodeList
        console.log(app.globalData.sitemodeList)
      }
    }
  },
  methods: {
    toVideochatWating (e) {
      wx.navigateTo({
        url: `../../pages/videochatwaitingroom/videochatwaitingroom?liveinfo=${e.currentTarget.dataset.liveinfo}`
      })
    },
    download () {
      this.setData({ showRcCode: true })
    },
    closeQrcode () {
      this.setData({ showRcCode: false })
    },
    play (e) {
      clearTimeout(this.data[e.target.id])
      const playing = this.data.playing
      playing[+e.target.id.match(/\d$/)[0]] = true
      this.setData({
        playing
      })
      this.data['waiting' + e.target.id.match(/\d$/)[0]] = false
    },
    error (e) {
      videochatSiteModeRequest(this, api, +e.target.id.match(/\d$/)[0])
    },
    waiting (e) {
      if (this.data['waiting' + e.target.id.match(/\d$/)[0]] === false) {
        this.data['waiting' + e.target.id.match(/\d$/)[0]] = true
        this.data[e.target.id] = setTimeout(() => {
          this.data['waiting' + e.target.id.match(/\d$/)[0]] = false
          videochatSiteModeRequest(this, api, +e.target.id.match(/\d$/)[0])
        }, 4567)
      }
    },
    ended(e) {
      if (e.target.id) {
        videochatSiteModeRequest(this, api, +e.target.id.match(/\d$/)[0])
      } else if (e.target.dataset) {
        videochatSiteModeRequest(this, api, e.target.dataset.index)
      }
    }
  },
  pageLifetimes: {
    show() {
      if (this.data.isShow && this.data.onVideochat) {
        videochatSiteModeRequest(this, api, 'init')
      }
    },
    hide() {
      this.setData({ activeVideochatList: [] })
    }
  }
})
