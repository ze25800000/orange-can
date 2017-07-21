import {DBPost} from "../../../db/DBPost";

Page({
    data: {},
    onLoad: function (options) {
        let postId    = options.id;
        this.dbPost   = new DBPost(postId);
        this.postData = this.dbPost.getPostItemById().data;
        this.setData({
            post: this.postData
        });
    },
    onReady() {
        wx.setNavigationBarTitle({
            title: this.postData.title
        });
    },
    onCollectionTap(event) {
        let newData = this.dbPost.collect();
        //重新绑定参数，注意不要将整个newData全部作为setData的参数
        //应当有选择地更新部分数据
        this.setData({
            'post.collectionStatus': newData.collectionStatus,
            'post.collectionNum': newData.collectionNum
        });
        wx.showToast({
            title: newData.collectionStatus ? "收藏成功" : "取消收藏",
            duration: 1000,
            icon: 'success',
            mask: true
        });
    }
});