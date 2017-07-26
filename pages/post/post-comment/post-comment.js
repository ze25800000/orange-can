import {DBPost} from "../../../db/DBPost";

Page({
    data: {
        //控制使用键盘还是发送音量
        useKeyboardFlag: true,
        //控制input组件的初始值
        keyboardInputValue: "",
        //控制是否显示图片选择面板
        sendMoreMsgFlag: false,
        //保存已经选择的图片
        chooseFiles: []
    },
    onLoad: function (options) {
        let postId   = options.id;
        this.dbPost  = new DBPost(postId);
        let comments = this.dbPost.getCommentData();
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
        let value                    = event.detail.value;
        this.data.keyboardInputValue = value;

    },
    //提交用户评论
    submitComment(event) {
        let newData = {
            username: "杨泽",
            avatar: "/images/avatar/avatar-3.png",
            create_time: new Date().getTime() / 1000,
            content: {
                txt: this.data.keyboardInputValue
            }
        };
        if (!newData.content.txt) {
            return;
        }
        //保存新评论到缓存数据库中
        this.dbPost.newComment(newData);
        //显示操作结果
        this.showCommitSuccessToast();
        //重新渲染并绑定所有评论
        this.bindCommentData();
        //恢复初始状态
        this.resetAllDefaultStatus();
    },
    //显示选择照片、拍照等按钮
    sendMoreMsg() {
        this.setData({
            sendMoreMsgFlag: !this.data.sendMoreMsgFlag
        });
    },
    //选择本地照片与拍照
    chooseImage(event) {
        //已经选择的图片数组
        let imgArr    = this.data.chooseFiles;
        //只能上传三张照片，包括拍照
        let leftCount = 3 - imgArr.length;
        if (leftCount <= 0) {
            return;
        }
        let sourceType = [event.currentTarget.dataset.category],
            that       = this;
        wx.chooseImage({
            count: leftCount,
            sourceType: sourceType,
            success(res){
                that.setData({
                    chooseFiles: imgArr.concat(res.tempFilePaths)
                });
            }
        })
    },
    //重新渲染并绑定所有评论
    bindCommentData() {
        let comments = this.dbPost.getCommentData();
        this.setData({
            comments
        });
    },
    //评论成功
    showCommitSuccessToast() {
        wx.showToast({
            title: '评论成功',
            duration: 1000,
            icon: "success"
        });
    },
    //将所有相关的按钮状态、输入状态都恢复到初始化状态
    resetAllDefaultStatus() {
        //清空评论框
        this.setData({
            keyboardInputValue: ''
        });
    }
});