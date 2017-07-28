App({
    onLaunch() {
        // var storageData = wx.getStorageSync('postList');
        // if (!storageData) {
        //     var dataObj = require('data/data');
        //     wx.clearStorageSync();
        // }
        // wx.setStorageSync('postList', dataObj.postList);
        this._getUserInfo();
    },
    globalData: {
        g_isPlayingMusic: false,
        g_currentMusicPostId: null,
        doubanBase: "https://api.douban.com",
        g_userInfo: null
    },
    _getUserInfo() {
        let userInfoStorage = wx.getStorageSync('user');
        if (!userInfoStorage) {
            //如果缓存中没有用户信息，那么获取用户信息
            let that = this;
            wx.login({
                success() {
                    wx.getUserInfo({
                        success(res) {
                            that.globalData.g_userInfo = res.userInfo;
                            //将用户的基本信息保存在缓存中
                            wx.setStorageSync('user', res.userInfo);
                        },
                        fail(res) {
                            console.log(res);
                        }
                    });
                }
            })
        } else {
            this.globalData.g_userInfo = userInfoStorage;
        }
    }
});