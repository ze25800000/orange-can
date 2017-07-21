class DBPost {
    constructor(postId) {
        this.storageKeyName = 'postList';
        this.postId         = postId;
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

    //获取指定id号的文章数据
    getPostItemById() {
        let postData = this.getAllPostData();
        for (let i = 0; i < postData.length; i++) {
            if (this.postId == postData[i].postId) {
                return {
                    index: i,
                    data: postData[i]
                };
            }
        }
    }
}

export {DBPost};