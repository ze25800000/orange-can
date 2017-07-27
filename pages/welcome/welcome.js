Page({
    data: {},
    onLoad: function (options) {

    },
    onTapJump(event) {
        wx.switchTab({
          url: '../post/post',
        });
    }
});