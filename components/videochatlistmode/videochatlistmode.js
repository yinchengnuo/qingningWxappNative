const app = getApp()
const windowWidth = app.globalData.systemInfo.windowWidth
const pullDownRefreshConst = windowWidth * 0.31 - 1.25
const api = app.globalData.api
const { videochatListModeRequest } = require('../../utils/request')
Component({
  properties: {
    isShow: {
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
    }
  },
  methods: {
    download () {
      this.setData({ showRcCode: true })
    },
    closeQrcode () {
      this.setData({ showRcCode: false })
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
        console.log(this.data.pullDownRefreshDistance)
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
  }
})
