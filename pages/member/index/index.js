const app = getApp();
Page({
	data: {
		navbarData: {
			title: "会员排行榜",
			showCapsule: true,
			home: true,
			back: true
		},
		height: app.globalData.height * 2 + 25,
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		winWidth: 0,
		winHeight: 0,
		contentPublishArray:[],
		contentUserfenArray: [],
		// tab切换  
		currentTab: 0,
		page:1,
		userfenPage:1,
		publishPage:1
	},
	onLoad: function () {
		var that = this;
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					winWidth: res.windowWidth,
					winHeight: res.windowHeight
				});
			}
		});
		// 获取最新注册会员
		this.getNewData();
	},
  getNewData:function(){
		let that = this
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=member_new&page=' + this.data.page,
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
	bindChange: function (e) {
		var that = this;
		wx.showLoading();
		that.setData({ currentTab: e.detail.current });
		if(e.detail.current == 1){
			wx.request({
				url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=member_article_number&page=' + this.data.publishPage,
				method: 'GET',
				dataType: 'json',
				success: (json) => {
					console.log('---======------', json.data.result)
					that.setData({
						contentPublishArray: json.data.result
					})
					wx.hideLoading()
				}
			})
		} else if (e.detail.current == 0){
			this.getNewData();
		} else if (e.detail.current == 2)(
			wx.request({
				url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=member_userfen&page=' + this.data.userfenPage,
				method: 'GET',
				dataType: 'json',
				success: (json) => {
					console.log('---======------', json.data.result)
					that.setData({
						contentUserfenArray: json.data.result
					})
					wx.hideLoading()
				}
			})
		)
	},
  /** 
   * 点击tab切换 
   */
	swichNav: function (e) {
		var that = this;
		if (this.data.currentTab === e.target.dataset.current) {
			return false;
		} else {
			that.setData({
				currentTab: e.target.dataset.current
			})
		}
	},
	scrolltolowerLoadData: function (e) {
		wx.showLoading({
			title: '加载中'
		})
		console.log('scrolltolowerLoadData', e)
		let that = this

		if(that.data.currentTab == 0){
			this.setData({
				page: that.data.page + 1
			});
			wx.request({
				url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=member_new&page=' + that.data.page,
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
		} else if (that.data.currentTab == 1){
			this.setData({
				publishPage: that.data.publishPage + 1
			});
			wx.request({
				url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=member_article_number&page=' + that.data.publishPage,
				method: 'GET',
				dataType: 'json',
				success: (json) => {
					let _arr = this.data.contentPublishArray
					_arr = _arr.concat(json.data.result)
					console.log('__arr__', _arr)
					that.setData({
						contentPublishArray: _arr
					})
					wx.hideLoading()
				}
			})
		} else if (that.data.currentTab == 2) {
			this.setData({
				userfenPage: that.data.userfenPage + 1
			});
			wx.request({
				url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=member_userfen&page=' + that.data.userfenPage,
				method: 'GET',
				dataType: 'json',
				success: (json) => {
					let _arr = this.data.contentUserfenArray
					_arr = _arr.concat(json.data.result)
					console.log('__arr__', _arr)
					that.setData({
						contentUserfenArray: _arr
					})
					wx.hideLoading()
				}
			})
		}
	}
})