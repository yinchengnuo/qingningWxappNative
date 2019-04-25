const app = getApp()
const api = app.globalData.api
const { videochatSiteModeRequest } = require('../../utils/request')
Component({
  properties: {
    isShow: {
      type: Boolean,
      value: 'default value',
    }
  },
  data: {
    activeVideochatList: [],
    videochat0: null,
    videochat1: null,
    videochat2: null,
    videochat3: null,
    videochat4: null,
    videochat5: null,
  },
  observers: {
    isShow(isShow) {
      if (isShow) {
        videochatSiteModeRequest(this, api, 'init')
      }
    }
  },
  methods: {
    play (e) {
      clearTimeout(this.data[e.target.id])
    },
    error (e) {
      console.log(e)
    },
    waiting (e) {
      this.data[e.target.id] = setTimeout(() => {
        videochatSiteModeRequest(this, api, +e.target.id.match(/\d$/)[0])
      }, 3333)
    },
    ended(e) {
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
