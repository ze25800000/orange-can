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
    }
});