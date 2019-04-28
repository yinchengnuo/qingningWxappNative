//app.js
App({
  onLaunch(options) {
    try {
      this.globalData.systemInfo = wx.getSystemInfoSync()
      if (this.globalData.systemInfo.system.match(/Android/)) {
        this.globalData.Android = false
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
      videochatUrl: 'videoPair!getSingleVideoPairListV2Soft.htm',
      urlQuerys: {
        apptype: 6,
        _timestamp: null,
        userid: 100001,
        type: 1,
        pagesize: 14,
        pageno: null,
        cversion: 29011505
      }
    },
    liveList: [],
    sitemodeList: [],
    listmodeList: [],
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
    ],
    userIndex: {
      name: '甜心柠',
      sex: 0,
      headpic: [
        'http://img2.96friend.cn/d3/photos/2019/03/25/19/pic_1553512580885_3d84976b-062f-44e8-b324-cefc88dedf41_org.jpg@!fc_640_640',
        'http://img2.96friend.cn/d3/photos/2019/03/25/19/pic_1553512594493_54dd47e5-7874-485b-b050-c88f9eaf0049_org.jpg@!fc_640_640',
        'http://img2.96friend.cn/d3/photos/2019/03/25/19/pic_1553512614512_d08117b8-83c3-4dd9-8456-6fdb4e5ea6e1_org.jpg@!fc_640_640',
        'http://img2.96friend.cn/d3/photos/2019/03/25/19/pic_1553512624923_29e97e33-0b10-44cc-95be-e6ed807650e0_org.jpg@!fc_640_640',
        'http://img2.96friend.cn/d3/photos/2019/03/25/19/pic_1553512637003_a8ddb0ad-7a05-4a2d-90e2-422ed9d58a05_org.jpg@!fc_640_640',
        'http://img2.96friend.cn/d3/photos/2019/03/25/19/pic_1553512649766_3cdfe078-d73c-4e86-bf4e-abef49e4950e_org.jpg@!fc_640_640',
        'http://img2.96friend.cn/d3/photos/2019/03/25/19/pic_1553512658632_d2abd280-b0e8-43b0-b6b0-a7ba73092faa_org.jpg@!fc_640_640',
        'http://img2.96friend.cn/d3/photos/2019/03/25/19/pic_1553512669241_56476096-7f19-491b-8858-ebeb4c2e6247_org.jpg@!fc_640_640'
      ],
      Mlevel: 9,
      Vlevel: 6,
      introduction: '小哥哥，来找我玩呗🤐====小哥哥，来找我玩呗🤐====小哥哥，来找我玩呗🤐',
      age: 18,
      type: '双子座',
      localtion: '杭州市',
      lables: ['美容师', '00后', '萝莉']
    },
    listmodeEndedIndex: null,
    listmodeEndeTimer: null
  }
})