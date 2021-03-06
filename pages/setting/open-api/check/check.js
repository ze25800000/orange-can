// pages/setting/open-api/check/check.js
Page({
    data: {},
    onTap() {
        wx.login({
            success(loginRes) {
                wx.getUserInfo({
                    success: userRes => {
                        console.log(userRes);
                        wx.request({
                            url: "http://orangecan.cn/wxCheckUserInfo.php",
                            data: {
                                code: loginRes.code,
                                signature: userRes.signature,
                                rawData: userRes.rawData
                            },
                            success: res => {
                                console.log(res.data);
                            }
                        })
                    }
                })
            }
        })
    }
});