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
        util.http(dataUrl, this.processDoubanData);
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
        this.setData({
            movies
        });
    }
});