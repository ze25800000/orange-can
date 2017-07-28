Page({
    data: {},

    onLoad: function (options) {

    },
    onTap() {
        wx.login({
            success(res) {
                console.log(res);
                console.log("code:" + res.code);
                wx.request({
                    url: "http://orangecan.cn/wxlogin.php",
                    data: {
                        code: res.code
                    },
                    success: res => {
                        console.log(res.data);
                    }
                });
            }
        });
    }
});