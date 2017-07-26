import {DBPost} from "../../../db/DBPost";

var app = getApp();
console.log(app);
Page({
    data: {
        isPlayingMusic: false
    },
    onLoad: function (options) {
        let postId    = options.id;
        this.dbPost   = new DBPost(postId);
        this.postData = this.dbPost.getPostItemById().data;
        this.setData({
            post: this.postData
        });
        this.addReadingTimes();
        this.setMusicMonitor();
        this.initMusicStatus();
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
    },
    onUpTap(event) {
        let newData = this.dbPost.up();
        this.setData({
            'post.upStatus': newData.upStatus,
            'post.upNum': newData.upNum
        });
    },
    onCommentTap(event) {
        let id = event.currentTarget.dataset.postId;
        wx.navigateTo({
            url: '../post-comment/post-comment?id=' + id
        });
    },
    addReadingTimes() {
        this.dbPost.addReadingTimes();
    },
    //切换音乐播放图标
    onMusicTap(event) {
        if (this.data.isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            });
            app.globalData.g_isPlayingMusic = false;
        } else {
            wx.playBackgroundAudio({
                dataUrl: this.postData.music.url,
                title: this.postData.music.title,
                coverImgUrl: this.postData.music.coverImg
            });
            this.setData({
                isPlayingMusic: true
            });
            app.globalData.g_isPlayingMusic     = true;
            app.globalData.g_currentMusicPostId = this.postData.postId;
        }
    },
    setMusicMonitor() {
        let that = this;
        wx.onBackgroundAudioStop(() => {
            that.setData({
                isPlayingMusic: false
            });
            app.globalData.g_isPlayingMusic = false;
        });
        wx.onBackgroundAudioPlay(() => {
            //只处理当前页面的音乐播放
            if (app.globalData.g_currentMusicPostId === this.postData.postId) {
                that.setData({
                    isPlayingMusic: true
                });
            }
            app.globalData.g_isPlayingMusic = true;
        });
        wx.onBackgroundAudioPause(() => {
            if (app.globalData.g_currentMusicPostId === this.postData.postId) {
                that.setData({
                    isPlayingMusic: false
                });
            }
            app.globalData.g_isPlayingMusic = false;
        });
    },
    initMusicStatus() {
        let currentPostId = this.postData.postId;
        if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId == currentPostId) {
            this.setData({
                isPlayingMusic: app.globalData.g_isPlayingMusic
            });
        } else {
            this.setData({
                isPlayingMusic: false
            });
        }
    }
});