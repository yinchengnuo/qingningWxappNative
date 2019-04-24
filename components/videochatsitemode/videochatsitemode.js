const app = getApp()
Component({
  properties: {
    isShow: {
      type: Boolean,
      value: 'default value',
    }
  },
  data: {
    videochatList: [],
    activeVideochatList: []
  },
  observers: {
    isShow(isShow) {
      if (isShow && !this.data.videochatList.length) {
        wx.request({
          url: 'https://api.96friend.cn/videoPair!getSingleVideoPairListV2Soft.htm?apptype=6&userid=26307780&pagesize=14&pageno=1',
          methods: 'GET',
          success: (result) => {
            let activeVideochatList = result.data.info.slice(0, 6)
            activeVideochatList.forEach((e) => {
              let url = e.streamurl
              e.streamurl = url.replace('rtmp://', 'http://')
            })
            this.setData({
              activeVideochatList
            })
            setTimeout(() => {
              this.data.activeVideochatList.forEach((e, i) => {
                console.log(`videochat${i}`)
                wx.createVideoContext(`videochat${i}`, this).play()
              })
            }, 0)
          }
        })
      } 
    }
  },
  methods: {
    ended(e) {
      console.log(e)
    },
    waiting (e) {
      console.log(e)
    }
  },
  created () {
    console.log('video-chat-created')
  },
  attached () {
    console.log('video-chat-attached')
  },
  ready () {
    console.log('video-chat-ready')
  },
  show () {
    console.log('video-chat-show')
  },
  hide () {
    console.log('video-chat-hide')
  }
})
