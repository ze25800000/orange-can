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

    //收藏文章
    collect() {
        return this.updatePostData('collect');
    }

    updatePostData(category) {
        var itemData    = this.getPostItemById(),
            postData    = itemData.data,
            allPostData = this.getAllPostData();
        switch (category) {
            case 'collect':
                if (!postData.collectionStatus) {
                    postData.collectionNum++;
                    postData.collectionStatus = true;
                } else {
                    postData.collectionNum--;
                    postData.collectionStatus = false;
                }
                break;
            default:
                break;
        }
        allPostData[itemData.index] = postData;
        this.execSetStorageSync(allPostData);
        return postData;
    }
}

export {DBPost};