function liveliveRequest(that, api, channel, init) {
    if (that.data[`${channel}Page`] || init === 'init') {
        api.urlQuerys.pageno = that.data[`${channel}Page`]
        api.urlQuerys._timestamp = Math.floor(+new Date() / 1000)
        let url = ''
        for (let prop in api.urlQuerys) {
            url += `${prop}=${api.urlQuerys[prop]}&`
        }
        url = `${api.api}${api[`${channel}Url`]}?${url.replace(/&$/, '')}`
        that.setData({
            requestLoading: true
        })
        wx.request({
            url,
            method: 'GET',
            success: (result) => {
                that.setData({
                    requestLoading: false
                })
                let liveList = that.data.liveList
                let requestInitSuccess = that.data.requestInitSuccess
                if (channel === 'tuijian') {
                    let tuijianPage = that.data.tuijianPage
                    if (init) {
                        liveList[0] = result.data.info
                        requestInitSuccess ++ 
                        that.setData({
                            liveList,
                            requestInitSuccess,
                            tuijianPage: 2
                        })
                    } else {
                        if (result.data.info.length) {
                            liveList[0] = liveList[0].concat(result.data.info)
                            tuijianPage++
                            that.setData({
                                liveList,
                                tuijianPage
                            })
                        } else {
                            tuijianPage = 0
                            that.setData({
                                tuijianPage
                            })
                        }
                    }
                } else if (channel === 'caiyi') {
                    let caiyiPage = that.data.caiyiPage
                    if (init) {
                        liveList[1] = result.data.info.channelList
                        requestInitSuccess ++ 
                        that.setData({
                            liveList,
                            requestInitSuccess,
                            caiyiPage: 2
                        })
                    } else {
                        if (result.data.info.channelList.length) {
                            liveList[1] = liveList[1].concat(result.data.info.channelList)
                            caiyiPage++
                            that.setData({
                                liveList,
                                caiyiPage
                            })
                        } else {
                            caiyiPage = 0
                            that.setData({
                                caiyiPage
                            })
                        }
                    }
                } else if (channel === 'meili') {
                    let meiliPage = that.data.meiliPage
                    if (init) {
                        liveList[2] = result.data.info
                        requestInitSuccess ++ 
                        that.setData({
                            liveList,
                            requestInitSuccess,
                            hangzhouPage: 2
                        })
                    } else {
                        if (result.data.info.length) {
                            liveList[2] = liveList[2].concat(result.data.info)
                            meiliPage++
                            that.setData({
                                liveList,
                                meiliPage
                            })
                        } else {
                            meiliPage = 0
                            that.setData({
                                meiliPage
                            })
                        }
                    }
                } else if (channel === 'hangzhou') {
                    let hangzhouPage = that.data.hangzhouPage
                    if (result.data.info) {
                        result.data.info.forEach((e) => {
                            e.fujin = '杭州'
                        })
                    }
                    if (init) {
                        liveList[3] = result.data.info
                        requestInitSuccess ++ 
                        that.setData({
                            liveList,
                            requestInitSuccess,
                            hangzhouPage: 2
                        })
                    } else {
                        if (result.data.info) {
                            liveList[3] = liveList[3].concat(result.data.info)
                            hangzhouPage++
                            that.setData({
                                liveList,
                                hangzhouPage
                            })
                        } else {
                            hangzhouPage = 0
                            that.setData({
                                hangzhouPage
                            })
                        }
                    }
                }
            }
        })
    }
}

module.exports = {
    liveliveRequest
}