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
    },
    //预览图片
    previewImg(event) {
        let commentIdx = event.currentTarget.dataset.commentIdx,
            imgIdx     = event.currentTarget.dataset.imgIdx,
            imgs       = this.data.comments[commentIdx].content.img;
        wx.previewImage({
            current: imgs[imgIdx],
            urls: imgs
        })
    }
});