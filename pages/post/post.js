import {DBPost} from "../../db/DBPost"

Page({
    data: {},
    onLoad: function () {
        let dbData = new DBPost();
        this.setData({
            postList: dbData.getAllPostData()
        });
    }
});