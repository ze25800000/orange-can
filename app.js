App({
    onLaunch() {
        var storageData = wx.getStorageSync('postList');
        if (!storageData) {
            var dataObj = require('data/data');
            wx.clearStorageSync();
        }
        wx.setStorageSync('postList', dataObj.postList);
    }
});