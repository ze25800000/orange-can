import {DBPost} from "../../../db/DBPost";

Page({
    data: {},
    onLoad: function (options) {
        let postId   = options.id;
        this.dbPost  = new DBPost(postId);
        let comments = this.dbPost.getCommentData();
        console.log(comments);
        this.setData({
            comments
        });
    }
});