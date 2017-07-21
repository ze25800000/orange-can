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
    }
});