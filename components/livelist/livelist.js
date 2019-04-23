const app = getApp()
const windowWidth = app.globalData.systemInfo.windowWidth
const pullDownRefreshConst = windowWidth * 0.31 - 1.25
const api = app.globalData.api
const { liveliveRequest } = require('../../utils/request')

Component({
  properties: {
    isShow: {
      type: Boolean,
      value: 'default value',
    }
  },
  data: {
    tuijianPage: 1, 
    caiyiPage: 1,
    meiliPage: 1,
    hangzhouPage: 1,
    liveList: [
      [],
      [],
      [],
      []
    ],
    nowIndex: 0,  //左右切换轮播图的当前inex
    computedPosition: 0,  //滑块的计算位置
    swiperMoving: false,  //isFirstSwipe的判断变量
    isFirstSwipe: true,  //左右切换轮播图是否是初次滑动
    swiperStartIndex: 0,  //左右切换轮播图滑动的初始位置
    pullDownRefreshDistance: 0,  //下拉刷新的距离
    refreshAnimationActive: 1,  //下拉刷新时longing小圆点的动态class
    refreshAnimationActiveTimer: null,  //下拉刷新时longing小圆点的定时器引用
    requestInitSuccess: 0,  //初始请求或下来刷新状态
    requestLoading: false,  //是否正在等待一个网络请求
    pullDownRefreshing: false  //触发下拉刷新后网络请求状态
  },
  observers: {
    isShow(isShow) {
      if (!this.data.liveList[0].length) {
        this.requestInit()
      }
    },
    liveList (liveList) {
      liveList.forEach((e) => {
        if (e) {
          e.forEach((e) => {
            e.streamUrl = e.streamUrl.replace('rtmp://', 'http://')
          })
        }
      })
      app.globalData.liveList = liveList
    },
    requestInitSuccess (requestInitSuccess) {
      if (requestInitSuccess === 4) {
        this.setData({
          requestInitSuccess: 0,
          pullDownRefreshing: false
        })
        clearInterval(this.data.refreshAnimationActiveTimer)
      }
    }
  },
  methods: {
    toLiveRoom (e) {
      wx.navigateTo({
        url: `../../pages/liveroom/liveroom?channel=${this.data.nowIndex}&globalActiveIndex=${e.currentTarget.dataset.liveinfo}`
      })
    },
    pullDownRefresh() {
      this.data.pullDown = true
      const query = this.createSelectorQuery()
      query.select('.live-list-swiper-wrapper').boundingClientRect()
      query.exec((res) => {
        if (res[0].top - pullDownRefreshConst > 0) {
          const pullDownRefreshDistance = res[0].top - pullDownRefreshConst
          this.setData({
            pullDownRefreshDistance
          })
        }
      })
    },
    reachBottom () {
      if (!this.data.requestLoading) {
        if (this.data.nowIndex === 0) {
          liveliveRequest(this, api, 'tuijian')
        } else if (this.data.nowIndex === 1) {
          liveliveRequest(this, api, 'caiyi')
        } else if (this.data.nowIndex === 2) {
          liveliveRequest(this, api, 'meili')
        } else if (this.data.nowIndex === 3) {
          liveliveRequest(this, api, 'hangzhou')
        }
      }
    },
    touchEnd() {
      if (this.data.pullDownRefreshDistance > 60) {
        this.setData({
          pullDownRefreshing: true
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
        this.requestInit()
      }
    },
    requestInit() {
      if (!this.data.requestLoading) {
        this.data.tuijianPage = 1
        this.data.caiyiPage = 1
        this.data.meiliPage = 1
        this.data.hangzhouPage = 1
        liveliveRequest(this, api, 'tuijian', 'init')
        liveliveRequest(this, api, 'caiyi', 'init')
        liveliveRequest(this, api, 'meili', 'init')
        liveliveRequest(this, api, 'hangzhou', 'init')
      }
    },
    tapChangeIndex(e) {
      this.setData({
        nowIndex: +e.currentTarget.dataset.index
      })
    },
    swipeChangeIndex(e) {
      this.setData({
        nowIndex: +e.detail.currentItemId
      })
    },
    swipePositionChange(e) {
      if (!this.data.swiperMoving) {
        let swiperStartIndex;
        if (this.data.isFirstSwipe) {
          swiperStartIndex = 0
        } else {
          swiperStartIndex = this.data.nowIndex
          this.setData({
            swiperStartIndex
          })
        }
      }
      let swiperStartIndex = this.data.swiperStartIndex
      this.setData({
        swiperMoving: true,
        computedPosition: swiperStartIndex * 125 + e.detail.dx / (windowWidth / 750) / 6
      })
    },
    swipePositionChangeFinish() {
      this.data.swiperStartIndex = this.data.nowIndex
      this.data.isFirstSwipe = false
    }
  },
  created() {
    // console.log('live-list-created')
  },
  attached() {
    // console.log('live-list-attached')
  },
  ready() {
    // console.log('live-list-ready')
  },
  show() {
    // console.log('live-list-show')
  },
  hide() {
    // console.log('live-list-hide')
  }
})