import {DBPost} from "../../../db/DBPost";

Page({
    data: {
        useKeyboardFlag: true,
        keyboardInputValue: ""
    },
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
    },
    //切换语音和键盘输入
    switchInputType(event) {
        this.setData({
            useKeyboardFlag: !this.data.useKeyboardFlag
        });
    },
    //获取用户输入
    bindCommentInput(event) {
        let value = event.detail.value;
        /*let pos = event.detail.cursor;
        if (pos != -1) {
            let left = event.detail.value.slice(0, pos);
            pos      = left.replace(/qq/g, '*').length;
        }
        return {
            value: val.replace(/qq/g, '*'),
            cursor: pos
        }*/
        return value.replace(/qq/g, '*');
    }
});