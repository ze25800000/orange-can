Page({
    data: {},
    onLoad: function (options) {

    },
    onTapJump(event) {
        wx.redirectTo({
            url: '../post/post'
        });
    }
});