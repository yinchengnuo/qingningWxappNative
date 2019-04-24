const app = getApp()
Component({
  properties: {
    isShow: {
      type: Boolean,
      value: 'default value',
    }
  },
  data: {
    onSiteMode: false,
    onListMode: false
  },
  observers: {
    isShow(isShow) {
      if (this.data.onListMode === this.data.onSiteMode && isShow) {
        this.setData({ onSiteMode: !this.data.onSiteMode })
      }
    }
  },
  methods: {
    switchMode () {
      this.setData({ onSiteMode: !this.data.onSiteMode, onListMode: !this.data.onListMode })
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
