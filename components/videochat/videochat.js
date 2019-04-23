const app = getApp()
Component({
  properties: {
    isShow: {
      type: Boolean,
      value: 'default value',
    }
  },
  data: {
    someData: {}
  },
  methods: {
    customMethod() {}
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
