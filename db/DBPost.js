let util = require('../utils/util');

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

    //获取文章评论数据
    getCommentData() {
        let itemData = this.getPostItemById().data;
        itemData.comments.sort(this.compareWithTime);
        let len = itemData.comments.length,
            comment;
        for (let i = 0; i < len; i++) {
            //将comment中的时间戳转换成课阅读格式
            comment = itemData.comments[i];

            comment.create_time = util.getDiffTime(comment.create_time, true);
        }
        return itemData.comments;
    }

    //收藏文章
    collect() {
        return this.updatePostData('collect');
    }

    //点赞或者取消点赞
    up() {
        let data = this.updatePostData('up');
        return data;
    }

    //发表评论
    newComment(newComment) {
        this.updatePostData('comment', newComment);
    }

    updatePostData(category, newComment) {
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
            case 'up':
                if (!postData.upStatus) {
                    postData.upNum++;
                    postData.upStatus = true;
                } else {
                    postData.upNum--;
                    postData.upStatus = false;
                }
                break;
            case 'comment':
                postData.comments.push(newComment);
                postData.commentNum++;
                break;
            default:
                break;
        }
        allPostData[itemData.index] = postData;
        this.execSetStorageSync(allPostData);
        return postData;
    }

    compareWithTime(value1, value2) {
        let flag = parseFloat(value1.create_time) - parseFloat(value2.create_time);
        if (flag < 0) {
            return 1;
        } else if (flag > 0) {
            return -1;
        } else {
            return 0;
        }
    }
}

export {DBPost};