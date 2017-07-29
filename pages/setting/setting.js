let app = getApp();
Page({
    data: {
        cache: [
            {iconurl: '/images/icon/wx_app_clear.png', title: '缓存清理', tap: 'clearCache'}
        ],
        device: [
            {iconurl: '/images/icon/wx_app_cellphone.png', title: '系统信息', tap: 'showSystemInfo'},
            {iconurl: '/images/icon/wx_app_network.png', title: '网络状态', tap: 'showNetWork'},
            {iconurl: '/images/icon/wx_app_location.png', title: '地图显示', tap: 'showMap'},
            {iconurl: '/images/icon/wx_app_compass.png', title: '指南针', tap: 'showCompass'},
            {iconurl: '/images/icon/wx_app_lonlat.png', title: '当前位置、速度', tap: 'showLonLat'},
            {iconurl: '/images/icon/wx_app_shake.png', title: '摇一摇', tap: 'shake'},
            {iconurl: '/images/icon/wx_app_scan_code.png', title: '二维码', tap: 'scanQRCode'}
        ],
        api: [
            {iconurl: '/images/icon/wx_app_list.png', title: '下载pdf、word文档', tap: 'downloadDocumentList'},
            {iconurl: '', title: '用户登陆', tap: 'login'},
            {iconurl: '', title: '校验用户信息', tap: 'check'},
            {iconurl: '', title: '获取用户加密信息', tap: 'decrypted'},
            {iconurl: '', title: '模板消息', tap: 'tplMessage'},
            {iconurl: '', title: '微信支付', tap: 'wxPay'}
        ],
        others: [
            {iconurl: '', title: 'wx:key示例', tap: 'showWxKeyDemo'},
            {iconurl: '', title: 'scroll-view高级用法演示', tap: 'showScrollViewDemo'}
        ],
        compassVal: 0,
        compassHidden: true,
        shakeInfo: {
            gravityModalHidden: true,
            num: 0,
            enabled: false
        },
        shakeData: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    onLoad: function (options) {
        this.setData({
            userInfo: app.globalData.g_userInfo
        });
    },
    showModal(title, content, callback) {
        wx.showModal({
            title: title,
            content: content,
            confirmColor: '#1f4ba5',
            cancelColor: '#7f8389',
            success(res) {
                if (res.confirm) {
                    callback && callback();
                }
            }
        })
    },
    //显示系统信息
    showSystemInfo: function () {
        wx.navigateTo({
            url: 'device/device'
        });
    },
    //缓存清理
    clearCache() {
        this.showModal('缓存清楚', '确定要清楚本地缓存么？', function () {
            wx.clearStorage({
                success(msg) {
                    wx.showToast({
                        title: '缓存清楚成功',
                        duration: 1000,
                        mask: true,
                        icon: "success"
                    });
                },
                fail(e) {
                    console.log(e);
                }
            });
        })
    },
    //获取网络状态
    showNetWork() {
        let that = this;
        wx.getNetworkType({
            success(res) {
                let networkType = res.networkType;
                that.showModal('网络状态', '您当前的网络：' + networkType)
            }
        });
    },
    //获取当前位置经纬度和速度
    getLonLat(callback) {
        let that = this;
        wx.getLocation({
            type: 'gcj02',
            success: res => {
                callback(res.longitude, res.latitude, res.speed);
            }
        });
    },
    //显示当前位置坐标与当前速度
    showLonLat: function () {
        var that = this;
        this.getLonLat(function (lon, lat, speed) {
            var lonStr = lon >= 0 ? '东经' : '西经',
                latStr = lat >= 0 ? '北纬' : '南纬';
            lon        = lon.toFixed(2);
            lat        = lat.toFixed(2);
            lonStr += lon;
            latStr += lat;
            speed      = (speed || 0).toFixed(2);
            that.showModal('当前位置和速度', '当前位置：' + lonStr + ',' + latStr + '。速度:' + speed + 'm/s');
        });
    },
    //在地图上显示当前位置
    showMap() {
        this.getLonLat((lon, lat) => {
            wx.openLocation({
                latitude: lat,
                longitude: lon,
                scale: 15,
                name: '海底捞',
                address: "xx街xx号",
                fail() {
                    wx.showToast({
                        title: '地图打开失败',
                        duration: 1000,
                        icon: "cancel"
                    })
                }
            })
        })
    },

    //显示罗盘
    showCompass: function () {
        var that = this;
        this.setData({
            compassHidden: false
        });
        wx.onCompassChange(function (res) {
            console.log(res);
            if (!that.data.compassHidden) {
                that.setData({compassVal: res.direction.toFixed(2)});
            }
        });
    },

    //隐藏罗盘
    hideCompass: function () {
        this.setData({
            compassHidden: true
        });
    },
    //摇一摇
    shake: function () {
        var that = this;
        //启用摇一摇
        this.gravityModalConfirm(true);

        wx.onAccelerometerChange(function (res) {
            //摇一摇核心代码，判断手机晃动幅度
            var x     = res.x.toFixed(4),
                y     = res.y.toFixed(4),
                z     = res.z.toFixed(4);
            var flagX = that.getDelFlag(x, that.data.shakeData.x),
                flagY = that.getDelFlag(y, that.data.shakeData.y),
                flagZ = that.getDelFlag(z, that.data.shakeData.z);

            that.data.shakeData = {
                x: res.x.toFixed(4),
                y: res.y.toFixed(4),
                z: res.z.toFixed(4)
            };
            if (flagX && flagY || flagX && flagZ || flagY && flagZ) {
                // 如果摇一摇幅度足够大，则认为摇一摇成功
                if (that.data.shakeInfo.enabled) {
                    that.data.shakeInfo.enabled = false;
                    that.playShakeAudio();
                }
            }
        });
    },

    //启用或者停用摇一摇功能
    gravityModalConfirm: function (flag) {
        if (flag !== true) {
            flag = false;
        }
        var that = this;
        this.setData({
            shakeInfo: {
                gravityModalHidden: !that.data.shakeInfo.gravityModalHidden,
                num: 0,
                enabled: flag
            }
        })
    },

    //计算摇一摇的偏移量
    getDelFlag: function (val1, val2) {
        return (Math.abs(val1 - val2) >= 1);
    },

    // 摇一摇成功后播放声音并累加摇一摇次数
    playShakeAudio: function () {
        var that = this;
        wx.playBackgroundAudio({
            dataUrl: 'http://7xqnxu.com1.z0.glb.clouddn.com/wx_app_shake.mp3',
            title: '',
            coverImgUrl: ''
        });
        wx.onBackgroundAudioStop(function () {
            that.data.shakeInfo.num++;
            that.setData({
                shakeInfo: {
                    num: that.data.shakeInfo.num,
                    enabled: true,
                    gravityModalHidden: false
                }
            });
        });
    },
    //扫码
    scanQRCode() {
        let that = this;
        wx.scanCode({
            success(res) {
                console.log(res);
                that.showModal('扫描二维码/条形码', res.result, false);
            },
            fail(){
                that.showModal('扫描二维码/条形码', "扫码失败", false)
            }
        })
    },
    //用户登录
    login(){
        wx.navigateTo({
            url: '/pages/setting/open-api/login/login'
        });
    },
    //用户信息校验
    check(){
        wx.navigateTo({
            url: '/pages/setting/open-api/check/check'
        });
    }
});