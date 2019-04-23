const app = getApp()

Component({
  properties: {
    title: {
      type: String,
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
    console.log('navigationbar-created')
  },
  attached () {
    console.log('navigationbar-attached')
  },
  ready () {
    console.log('navigationbar-ready')
  },
  show () {
    console.log('navigationbar-show')
  },
  hide () {
    console.log('navigationbar-hide')
  }
})
