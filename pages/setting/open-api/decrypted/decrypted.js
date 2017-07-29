Page({

    data: {},
    onTap() {
        wx.login({
            success(loginRes) {
                wx.getUserInfo({
                    success: userRes => {
                        wx.request({
                            url: "http://orangecan.cn/wxDecryptUserInfo.php",
                            data: {
                                code: loginRes.code,
                                encryptedData: userRes.encryptedData,
                                iv: userRes.iv
                            },
                            success: res => {
                                console.log(res.data);
                            }
                        });
                    }
                });
            }
        });
    }
});