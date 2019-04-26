const app = getApp()

Component({
  properties: {
    isShow: {
      type: Boolean,
      value: 'default value',
    }
  },
  data: {
    showRcCode: false,
    data: [
      {
        path: '../../images/about/1@2x.png'
      },
      {
        path: '../../images/about/2@2x.png'
      },
      {
        path: '../../images/about/3@2x.png'
      },
      {
        path: '../../images/about/4@2x.png'
      },
      {
        path: '../../images/about/5@2x.png'
      },
      {
        path: '../../images/about/6@2x.png'
      }
    ]
  },
  observers: {
    isShow(isShow) {
      if (isShow) {
        console.log('enter')
      }
    }
  },
  methods: {
    download() {
      this.setData({ showRcCode: true })
    },
    closeQrcode () {
      this.setData({ showRcCode: false })
    }
  }
})
