var app = getApp();
Page({
	data: {
		navbarData: {
			title:"网名详情页",
			showCapsule: true,
			home:true,
			back: true
		},
		onclick:0,
		height: app.globalData.height * 2 + 25,
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		id:null,
		title:'加载中...',
		ftitle: '',
		contentArray:[],
		autoplay: true,
		interval: 5000,
		duration: 500
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log('__options__',options);
		wx.showLoading({
			title: '加载中'
		})
		this.getContent(options.id);
		this.ad();
	},
	getContent:function(id){
		let that = this;
		console.log('https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=content&id=' + id);
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=content&id=' + id,
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('__json__', json.data.result);
				that.setData({
					title:json.data.result.title,
					onclick: json.data.result.onclick,
					ftitle: json.data.result.ftitle
				});
				this.getList();
				wx.hideLoading();
			}
		})
	},
	getList:function(){
		console.log('https://www.yishuzi.com.cn/wangming_xiaochengxu_api/creat/?getJson=c&keyword=' + this.data.title + '&ftitle=' + this.data.ftitle);
		let that = this;
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/creat/?getJson=c&keyword=' + encodeURIComponent(this.data.title) + '&ftitle=' + encodeURIComponent(this.data.ftitle),
			method: 'GET',
			dataType: 'json',
			header:{
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: (json) => {
				console.log('__json__',json.data.result);
				that.setData({
					contentArray:json.data.result
				})
				wx.hideLoading();
			}
		})
	},
	returnHome:function(){
		wx.switchTab({
			url: '../index/index'
		})
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
	ad: function () {
		let that = this;
		wx.request({
			url: 'https://www.yishuzi.com.cn/e/api/xiaochengxu/wangming/?getJson=ad&adPage=detail',
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('json.data.result---', json)
				that.setData({
					contentArrayAd: json.data.result
				})
				wx.hideLoading()
			}
		})
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function (res) {
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log(res.target)
		}
		return {
			title: this.data.title + ' ' + this.data.ftitle + '的网名分享给你咯，你也来选个吧。',
			url:'../detail/detail?id=' + this.data.id,
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
})