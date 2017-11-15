var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sex:1,
    courseIndex:0,
    courseList:[],
    courseId:[],
    coursePrice: [],
    cid:0,
    currId:0,
    cprice:0.00,
    title: ''
  },


  reg: function (e) {
    var that = this;
    var info = e.detail.value;
    console.log(info);
    var courseId = info.cid;
    var tel = info.tel;
    if (courseId==0){
      wx.showToast({
        title: '请选择报名课程！',
        duration: 2000
      });
      return false;
    }
    if (!tel) {
      wx.showToast({
        title: '请输入您的联系方式！',
        duration: 2000
      });
      return false;
    }

    wx.request({
      url: app.d.ceshiUrl + '/Api/Course/course',
      data: {
        uid: app.d.userId,
        truename: info.truename,
        course_id: info.cid,
        sex: that.data.sex,
        age: info.age,
        weixin: info.weixin,
        qq: info.qq,
        address: info.address,
        tel: tel,
        email: info.email,
        remark: info.remark,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        var status = res.data.status;
        var cid = parseInt(that.data.cid);
        var price = parseFloat(info.cprice);
        if (status == 1) {
          if (cid>0 && price>0){
            //发起微信支付
            wx.showToast({
              title: '正在发起微信支付...',
              icon: 'loading',
              duration: 2000
            });
            setTimeout(function(e){
              that.wxpay();
            },2500);
          }else{
            wx.showToast({
              title: '报名成功！',
              duration: 2000
            });
          }
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },

  /**
   * 获取性别
   */
  radioChange: function (e) {
    var sex = e.detail.value;
    this.setData({
      sex: sex
    });
  },

  /**
   * 获取培训课程
   */
  bindChangeCourse: function (e) {
    this.setData({
      courseIndex: e.detail.value,
      cid: e.detail.value,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取所有的培训课程
    var that = this;
    var courseId = options.couserId;
    var yuprice = options.cprice;
    var title = options.title;
    that.setData({
      cid: courseId,
      currId: courseId,
      cprice: yuprice,
      title: title,
    });
    wx.request({
      url: app.d.ceshiUrl + '/Api/Course/getlist',
      method: 'post',
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var list = res.data.list;
        var cArr = [];
        var cId = [];
        var cPrice = [];
        cArr.push('请选择');
        cId.push('0');
        cPrice.push('0.00');
        for (var i = 0; i < list.length; i++) {
          cArr.push(list[i].title);
          cId.push(list[i].id);
          cPrice.push(list[i].yu_price);
        }
        that.setData({
          courseList: cArr,
          courseId: cId,
          coursePrice: cPrice,
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },

  //调起微信支付
  wxpay: function (e) {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Wxpay/buycourse',
      data: {
        course_id: that.data.cid,
        uid: app.d.userId,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (res) {
        if (res.data.status == 1) {
          var order = res.data.arr;
          wx.requestPayment({
            timeStamp: order.timeStamp,
            nonceStr: order.nonceStr,
            package: order.package,
            signType: 'MD5',
            paySign: order.paySign,
            success: function (res) {
              wx.showToast({
                title: "报名成功!",
                duration: 2000,
              });
              // setTimeout(function () {
              //   wx.navigateTo({
              //     url: '../user/dingdan?currentTab=1&otype=deliver',
              //   });
              // }, 2500);
            },
            fail: function (res) {
              wx.showToast({
                title: res,
                duration: 3000
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！err:wxpay',
          duration: 2000
        });
      }
    })
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

})