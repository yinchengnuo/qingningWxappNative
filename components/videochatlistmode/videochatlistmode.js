const app = getApp()
const windowWidth = app.globalData.systemInfo.windowWidth
const api = app.globalData.api
const { videochatListModeRequest } = require('../../utils/request')
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
    videochatList: [],
    page: 1,
    requestLoading: false,
    initTop: 0,  //下拉初始位置
    pullDownRefreshDistance: 0,  //下拉刷新的距离
    pullDownStopDistance: 0,  //手指松开时下拉刷新的距离
    pullDownRefreshing: false,
    refreshAnimationActive: 1,
    refreshAnimationActiveTimer: null,
    showRcCode: false
  },
  observers: {
    isShow(isShow) {
      if (isShow) {
        if (this.data.videochatList.length === 0) {
          videochatListModeRequest(this, api)
          this.data.requestLoading = true
        }
      }
    },
    videochatList (listmodeList) {
      app.globalData.listmodeList = listmodeList
    }
  },
  methods: {
    download () {
      this.setData({ showRcCode: true })
    },
    closeQrcode () {
      this.setData({ showRcCode: false })
    },
    toVideochatWating (e) {
      wx.navigateTo({
        url: `../../pages/videochatwaitingroom/videochatwaitingroom?liveinfo=${e.currentTarget.dataset.liveinfo}`
      })
    },
    reachBottom() {
      if (!this.data.requestLoading && this.data.page) {
        this.data.requestLoading = true
        videochatListModeRequest(this, api)
      }
    },
    touchEnd() {
      if (this.data.pullDownRefreshDistance > 80) {
        this.setData({
          pullDownRefreshing: true,
          pullDownStopDistance: this.data.pullDownRefreshDistance
        })
        let refreshAnimationActive = this.data.refreshAnimationActive
        this.data.refreshAnimationActiveTimer = setInterval(() => {
          refreshAnimationActive ++ 
          if (refreshAnimationActive === 4) {
            refreshAnimationActive = 1
          }
          this.setData({
            refreshAnimationActive
          })
        }, 333) 
        videochatListModeRequest(this, api, 'init')
      }
    },
    pullDownRefresh() {
      const query = this.createSelectorQuery()
      query.select('.list-mode-wrapper').boundingClientRect()
      query.exec((res) => {
        const pullDownRefreshDistance = res[0].top - this.data.initTop
        this.setData({
          pullDownRefreshDistance
        })
      })
    },
    getTop () {
      if (this.data.initTop === 0) {
        const query = this.createSelectorQuery()
        query.select('.list-mode-wrapper').boundingClientRect()
        query.exec((res) => {
          this.data.initTop = res[0].top
        })
      }
    }
  },
  pageLifetimes: {
    show() {
      if (this.data.isShow && this.data.onVideochat) {
        if (app.globalData.listmodeEndedIndex) {
          let videochatList = this.data.videochatList
          videochatList.splice(app.globalData.listmodeEndedIndex, 1)
          clearInterval(app.globalData.listmodeEndeTimer)
          this.setData({ videochatList })
          app.globalData.listmodeEndedIndex = null
        }
      }
    }
  }
})
