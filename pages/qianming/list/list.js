// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		height: getApp().globalData.height * 2 + 25,
		StatusBar: getApp().globalData.StatusBar,
		CustomBar: getApp().globalData.CustomBar,
    contentArray: [],
    page: 1,
    expertListi: [],
    expertList: [],
    expertListId: [],
    winHeight: '',
    classname: '',
    classid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    });
		this.setData({
			navbarData: {
				title: decodeURIComponent(options.classname),
				showCapsule: true,
				back: true
			}
		});
    console.log('__options__', options)
    this.setData({
      classid: options.classid,
			classname: decodeURIComponent(options.classname)
    });
    this.winHeight();
    this.getListData(options.classid, this.data.page)
  },
  winHeight: function () {
    var that = this
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth
        var calc = clientHeight * rpxR
        that.setData({
          winHeight: calc
        })
      }
    })
  },
  getListData: function (classid, page) {
    let that = this
    console.log('__page__', this.data.page)
    console.log('https://www.yishuzi.com.cn/qianmingApi/?getJson=column&classid=' + classid + '&page=' + page)
    wx.request({
      url: 'https://www.yishuzi.com.cn/qianmingApi/?getJson=column&classid=' + classid + '&page=' + page,
      method: 'GET',
      dataType: 'json',
      success: (json) => {
        console.log('---======------', json.data.result)
        that.setData({
          contentArray: json.data.result
        })
        wx.hideLoading()
      }
    })
  },
	onShareAppMessage: function (res) {
		return {
			title: '签名说说的' + this.data.classname +'栏目列表,@你来看看有喜欢的么',
			imageUrl: '../../../images/classname/' + this.data.classid + '.png',
			success: (res) => {
				wx.showToast({
					content: '分享成功'
				});
			},
			fail: (res) => {
				wx.showToast({
					content: '分享失败,原因是' + res
				});
			}
		}
	},
  scrolltolowerLoadData: function (e) {
    wx.showLoading({
      title: '加载中'
    })
    console.log('scrolltolowerLoadData', e)
    let that = this
    this.setData({
      page: that.data.page + 1
    })
    wx.request({
      url: 'https://www.yishuzi.com.cn/qianmingApi/?getJson=column&classid=' + this.data.classid + '&page=' + that.data.page,
      method: 'GET',
      dataType: 'json',
      success: (json) => {
        let _arr = this.data.contentArray
        _arr = _arr.concat(json.data.result)
        console.log('__arr__', _arr)
        that.setData({
          contentArray: _arr
        })
        wx.hideLoading()
      }
    })
  }
})
