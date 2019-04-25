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
    activeVideochatList: [],
    videochat0: null,
    videochat1: null,
    videochat2: null,
    waiting0: false,
    waiting1: false,
    waiting2: false,
    playing: [false, false, false]
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
    }
  },
  methods: {
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
      // videochatSiteModeRequest(this, api, +e.target.id.match(/\d$/)[0])
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
