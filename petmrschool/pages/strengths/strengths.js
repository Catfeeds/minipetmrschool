// pages/teachers/teachers.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    }, 
    left:[
      {
        'ming':'LKBB',
        'm':'国家人社部资格认证特级宠物美容师二恶烷若',
        'mc':'尊宠首席美容师 ',
        'mi': '广东科贸学院特聘专家讲师',
        'cheng':'芝加哥艺术学院  纯艺术',
        'img':'../../images/33.png',
    },
          {
            'ming': 'LKBB',
            'm': '国家人社部资格认证特级宠物美容师二恶烷若',
            'mc': '尊宠首席美容师 ',
            'mi': '广东科贸学院特聘专家讲师',
            'cheng': '芝加哥艺术学院  纯艺术',
        'img': '../../images/44.png',
      },
    ],

    right: [
      {
        'ming': 'LKBB',
        'mc': '尊宠首席美容师 ',
        'mi': '广东科贸学院特聘专家讲师',
        'cheng': '芝加哥艺术学院  纯艺术',
        'img':'../../images/33.png',
      }, {
        'ming': 'LKBB',
        'mc': '尊宠首席美容师 ',
        'mi': '广东科贸学院特聘专家讲师',
        'cheng': '芝加哥艺术学院  纯艺术',
        'img': '../../images/44.png',
      }
    ],
    ri: [
      {
        'ming': 'LKBB',
        'm': '国家人社部资格认证特级宠物美容师二恶烷若',
        'mc': '尊宠首席美容师 ',
        'mi': '广东科贸学院特聘专家讲师',
        'cheng': '芝加哥艺术学院  纯艺术',
        'img': '../../images/44.png',
      }, {
        'ming': 'LKBB',
        'm': '国家人社部资格认证特级宠物美容师二恶烷若',
        'mc': '尊宠首席美容师 ',
        'mi': '广东科贸学院特聘专家讲师',
        'cheng': '芝加哥艺术学院  纯艺术',
        'img': '../../images/33.png',
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },


  tabFun: function (e) {
    //获取触发事件组件的dataset属性 
    var _datasetId = e.target.dataset.id;
    console.log("----" + _datasetId + "----");
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });
  }, 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  }
})