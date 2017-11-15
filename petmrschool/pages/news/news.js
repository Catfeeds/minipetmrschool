// pages/news/news.js
//获取应用实例  
var app = getApp();
//引入这个插件，使html内容自动转换成wxml内容
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data:{
    info:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var newsId = options.newsId;
    wx.request({
      url: app.d.ceshiUrl + '/Api/News/detail',
      method: 'post',
      data: {
        news_id: newsId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data 
        var status = res.data.status;
        if (status == 1) {
          var info = res.data.info;
          var content = info.content;
          //that.initProductData(data);
          WxParse.wxParse('content', 'html', content, that, 10);
          that.setData({
            info: info,
          });
        } else {
          wx.showToast({
            title: '没有找到相关信息.',
            duration: 2000,
          });
        }
      },
      error: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
        });
      },
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})