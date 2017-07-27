let util = require('../../utils/util');
let app  = getApp();
Page({
    data: {
        data: {
            inTheaters: {},
            comingSoon: {},
            top250: {}
        }
    },

    onLoad: function (options) {
        let doubanBase    = app.globalData.doubanBase;
        let inTheatersUrl = doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3';
        let comingSoonUrl = doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3';
        let top250Url     = doubanBase + '/v2/movie/top250' + '?start=0&count=3';
        this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
        this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
        this.getMovieListData(top250Url, "top250", "豆瓣 Top250");
    },
    getMovieListData(url, settedKey, categoryTitle) {
        let that = this;
        wx.request({
            url: url,
            method: 'GET',
            header: {
                "content-type": "json"
            },
            success(res) {
                that.processDoubanData(res.data, settedKey, categoryTitle);
            },
            fail(error) {
                console.log(error);
            }
        });
    },
    processDoubanData(moviesDouban, settedKey, categoryTitle) {
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
        var readyData        = {};
        readyData[settedKey] = {
            categoryTitle: categoryTitle,
            movies: movies
        };
        this.setData(readyData);
    }
});