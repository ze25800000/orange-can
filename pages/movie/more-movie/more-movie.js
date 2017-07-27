let app  = getApp();
let util = require('../../../utils/util');
Page({
    data: {
        movies: []
    },
    onLoad: function (options) {
        let category = options.category,
            dataUrl  = "";
        switch (category) {
            case "正在热映":
                dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
                break;
            case "即将上映":
                dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
                break;
            case "豆瓣 Top250":
                dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
                break;
        }
        this.data.requestUrl = dataUrl;
        util.http(dataUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },
    onReady() {
        wx.showNavigationBarLoading();
    },
    processDoubanData(moviesDouban) {
        let movies = [];
        for (var idx in moviesDouban.subjects) {
            var subject = moviesDouban.subjects[idx];
            var title   = subject.title;
            if (title.length >= 6) {
                //电影标题只取前6个字符
                title = title.substring(0, 6) + "...";
            }
            var temp = {
                stars: util.convertToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            };
            movies.push(temp);
        }
        let totalMovies = [];
        totalMovies     = this.data.movies.concat(movies);
        this.setData({
            movies: totalMovies
        });
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
    },
    onPullDownRefresh(event) {
        let refreshUrl   = this.data.requestUrl + "?start=0&count=20";
        //刷新页面后将后面所有初始化参数恢复到初始值
        this.data.movies = [];
        util.http(refreshUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },
    onReachBottom(event) {
        let totalCount = this.data.movies.length;
        //拼接下一组数据的URL
        let nextUrl    = this.data.requestUrl + "?start=" + totalCount + "&count=20";
        util.http(nextUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    }
});