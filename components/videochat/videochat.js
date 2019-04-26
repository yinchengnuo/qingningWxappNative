const app = getApp()
Component({
  properties: {
    isShow: {
      type: Boolean,
      value: 'default value',
    }
  },
  data: {
    onSiteMode: true,
    onListMode: false,
    onVideochat: false
  },
  observers: {
    isShow(isShow) {
      this.setData({ onVideochat: isShow })
    }
  },
  methods: {
    switchMode () {
      this.setData({ onSiteMode: !this.data.onSiteMode, onListMode: !this.data.onListMode })
    }
  }
})
