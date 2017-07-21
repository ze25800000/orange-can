class DBPost {
    constructor() {
        this.storageKeyName = 'postList';
    }

    //获得全部文章信息
    getAllPostData() {
        var res = wx.getStorageSync(this.storageKeyName);
        if (!res) {
            res = require('../data/data').postList;
            this.execSetStorageSync(res);
        }
        return res;
    }

    //本地缓存的 保存/更新
    execSetStorageSync(data) {
        wx.setStorageSync(this.storageKeyName, data);
    }
}

export {DBPost};