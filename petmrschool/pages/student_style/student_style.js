// pages/student_style/student_style.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fengcai:[],
    page:2
  },

  /**
   * 生命周期函数--监听页面加载
   */

  fengcai:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../scenic/scenic?id=' + id
    });
  },

  onLoad: function (options) {
    //获取所有学员风采
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Web/getStuStyle',
      method: 'post',
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var list = res.data.list;
        // if (prolist == '') {
        //   wx.showToast({
        //     title: '没有更多数据！',
        //     duration: 2000
        //   });
        //   return false;
        // }
        //that.initProductData(data);
        that.setData({
          fengcai: list
        });
        //endInitData
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },

  //点击加载更多
  getMore: function (e) {
    var that = this;
    var page = that.data.page;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Web/getStulist',
      method: 'post',
      data: { page: page },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var list = res.data.list;
        if (list == '') {
          wx.showToast({
            title: '没有更多数据！',
            duration: 2000
          });
          return false;
        }
        //that.initProductData(data);
        that.setData({
          page: page + 1,
          fengcai: that.data.fengcai.concat(list)
        });
        //endInitData
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

})