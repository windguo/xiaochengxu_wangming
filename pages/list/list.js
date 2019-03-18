var app = getApp();
Page({
  data: {
		height: app.globalData.height * 2 + 25,
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
    contentArray: [],
    page: 1,
    expertListi: [],
    expertList: [],
    expertListId: [],
    winHeight: '',
    classname: '',
    classid: '',
		userid:0,
		username:"",
		state:null
  },
	diggtopFn:function(e){
		let _this = this;
		console.log('eeee-',e);
		console.log('https://www.yishuzi.com.cn/wangming_xiaochengxu_api_root/e/public/digg/index.php?afrom=xiaochengxu&dotop=1&doajax=1&ajaxarea=diggnum&id=' + e.currentTarget.dataset.id + '&classid=' + e.currentTarget.dataset.classid);
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api_root/e/public/digg/index.php?afrom=xiaochengxu&dotop=1&doajax=1&ajaxarea=diggnum&id=' + e.currentTarget.dataset.id + '&classid=' + e.currentTarget.dataset.classid,
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('---======diggtopFn------', json.data.status)
				_this.setData({
					digg:{
						id: e.currentTarget.dataset.id
					}
				})
				wx.hideLoading()
			}
		})
	},
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    })
    console.log('__options__', options);
		if (options.state == "2"){
			this.setData({
				userid:options.userid,
				state: options.state,
				navbarData:{
					title:options.username + '发布的网名',
					showCapsule: true,
					back:true
				}
			});
			this.getUserContent();
		}else{
			this.setData({
				classid: options.classid,
				classname: decodeURIComponent(options.classname),
				userid: wx.getStorageSync('storageLoginedUserId'),
				navbarData: {
					title: decodeURIComponent(options.classname),
					showCapsule: true,
					back:true
				}
			});
			this.getListData(options.classid, this.data.page)
		}
    this.winHeight();
    
  },
	getUserContent:function(){
		let that = this;
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=article&userid=' + this.data.userid,
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
    console.log('https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=column&classid=' + classid + '&page=' + page)
    wx.request({
      url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=column&classid=' + classid + '&page=' + page,
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
			title: '网名生成的' + this.data.classname +'栏目列表,@你来看看有喜欢的么',
			imageUrl: '../../images/classname/' + this.data.classid + '.png',
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
    });
		
    if(this.data.state == 2){
			wx.request({
				url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=article&userid=' + this.data.userid + '&page=' + this.data.page,
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
		}else{
			wx.request({
				url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=column&classid=' + this.data.classid + '&page=' + that.data.page,
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
  }
})
