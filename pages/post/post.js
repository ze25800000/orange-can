var dataObj = require('../../data/data');
Page({
    data: {},
    onLoad: function (options) {
        this.setData({
            postList: dataObj.postList
        });
    }
});