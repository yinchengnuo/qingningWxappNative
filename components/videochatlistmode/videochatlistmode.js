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
    pullDownRefreshDistance: 0,
    pullDownRefreshing: false,
    refreshAnimationActive: 1
  },
  observers: {
    isShow(isShow) {
      if (isShow) {
        if (this.data.videochatList.length === 0) {
          videochatListModeRequest(this, api)
        }
      }
    }
  },
  methods: {
    reachBottom() {
      if (!this.data.requestLoading && this.data.page) {
        console.log('request')
        this.data.requestLoading = true
        videochatListModeRequest(this, api)
      }
    },
    touchEnd() {
      if (this.data.pullDownRefreshDistance > 60) {
        this.setData({
          pullDownRefreshing: true
        })
        console.log(2333)
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
        // this.requestInit()
      }
    },
    pullDownRefresh() {
      this.data.pullDown = true
      const query = this.createSelectorQuery()
      query.select('.list-mode-wrapper').boundingClientRect()
      query.exec((res) => {
        if (res[0].top - pullDownRefreshConst > 0) {
          const pullDownRefreshDistance = res[0].top - pullDownRefreshConst
          this.setData({
            pullDownRefreshDistance
          })
        }
      })
    },
  }
})
