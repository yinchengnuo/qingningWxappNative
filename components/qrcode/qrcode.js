const app = getApp()

Component({
  properties: {
    showRcCode: {
      type: Boolean,
      value: 'default value',
    }
  },
  methods: {
    close() {
      this.triggerEvent('closeQrcode')
    }
  }
})
