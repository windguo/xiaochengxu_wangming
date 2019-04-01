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
		publishPage:1
	},
	onLoad: function () {
		wx.showLoading({
			title: '加载中...'
		});
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
		wx.showLoading({
			title: '加载中...'
		});
    this.setData({
      page:1
    })
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
		wx.showLoading({
			title: '加载中...'
		});
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
		}
	},
  copyTBL: function (e) {
    console.log('wwweeee', e);
    var self = this;
    wx.setClipboardData({
      data: e.currentTarget.dataset.text.trim(),
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功',
            })
          }
        })
      }
    })
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
		} 
	}
})