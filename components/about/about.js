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
    console.log('about-created')
  },
  attached () {
    console.log('about-attached')
  },
  ready () {
    console.log('about-ready')
  },
  show () {
    console.log('about-show')
  },
  hide () {
    console.log('about-hide')
  }
})
