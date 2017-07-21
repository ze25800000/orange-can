import {DBPost} from "../../db/DBPost"

Page({
    data: {},
    onLoad: function () {
        let dbData = new DBPost();
        this.setData({
            postList: dbData.getAllPostData()
        });
    },
    onTapToDetail(event) {
        let postId = event.currentTarget.dataset.postId;
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + postId
        });
    }
});