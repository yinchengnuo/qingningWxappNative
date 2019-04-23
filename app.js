//app.js
App({
  onLaunch(options) {
    try {
      this.globalData.systemInfo = wx.getSystemInfoSync()
      console.log(this.globalData.systemInfo)
      if (this.globalData.systemInfo.system.match(/Android/)) {
        this.globalData.Android = true
      }
    } catch (e) {
      console.log('系统信息获取失败')
    }
  },
  globalData: {
    systemInfo: null,
    Android: null,
    api: {
      api: 'https://api.96friend.cn/',
      tuijianUrl: 'videoLive!getRecommendList.htm',
      caiyiUrl: 'videoLiveChannel!getChannelVideoLiveList.htm',
      meiliUrl: 'videoLive!getCharmList.htm',
      hangzhouUrl: 'videoLive!getLiveSameCityList.htm',
      urlQuerys: {
        apptype: 6,
        _timestamp: null,
        userid: 100001,
        type: 1,
        pagesize: 14,
        pageno: null,
        cversion: 29011505
      },
      liveList: []
    },
    activityImages: [
      '../../images/activity/1.jpg',
      '../../images/activity/2.jpg',
      '../../images/activity/3.jpg',
      '../../images/activity/4.jpg',
      '../../images/activity/5.jpg'
    ],
    danmuList: [
      {
        name: '曹烽华',
        vlevel: 9,
        text: '送了一个你的保护伞'
      },
      {
        name: '叶剑辉',
        vlevel: 9,
        text: '送了一个幸运风车'
      },
      {
        name: '邵万钱',
        vlevel: 9,
        text: '送了一个海洋之心'
      },
      {
        name: '唐封臣',
        vlevel: 9,
        text: '送了一个旋转木马'
      },
      {
        name: '尹成诺',
        vlevel: 9,
        text: '送了一个爱的法拉利'
      }
    ]
  }
})