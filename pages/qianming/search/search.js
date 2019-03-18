// pages/search/search.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		navbarData: {
			title: "说说搜索结果",
			showCapsule: true,
			back: true
		},
		height: getApp().globalData.height * 2 + 25,
		StatusBar: getApp().globalData.StatusBar,
		CustomBar: getApp().globalData.CustomBar,
		contentArray:[],
		page: 1,
		keyword:'',
		resu:'',
		winHeight: "",//窗口高度
	},
	searchSubmit(e) {
		console.log('form发生了submit事件，携带数据为：', e.detail.value);
		if (e.detail.value.keyword == '') {
			wx.showModal({
				content: '请输入您的关键字',
				showCancel: false,
				confirmColor: '#ff5a00'
			})
		};
		wx.redirectTo({
			url: '../search/search?keyword=' + e.detail.value.keyword
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
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log('voptions.keywordoptions.keyword', options.keyword);
		wx.showLoading({
			title: '加载中'
		});
		let that = this;
		this.setData({
			keyword: decodeURIComponent(options.keyword)
		})
		console.log('https://www.yishuzi.com.cn/qianmingApi/?getJson=search&key=' + decodeURIComponent(options.keyword) + '&page=' + this.data.page);
		wx.request({
			url: 'https://www.yishuzi.com.cn/qianmingApi/?getJson=search&key=' + decodeURIComponent(options.keyword) + '&page=' + this.data.page,
			header: { 'content-type': 'application/x-www-form-urlencoded' },
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('wssss====s===', JSON.stringify(json.data.result) === '[]');
				if (JSON.stringify(json.data.result) === '[]'){
					that.setData({
						resu:'暂无内容, 请更换关键字'
					})
				}else{
					that.setData({
						contentArray:json.data.result
					})
				}
				wx.hideLoading();
			}
		});
		this.winHeight();
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
			url: 'https://www.yishuzi.com.cn/qianmingApi/?getJson=search&key=' + this.data.keyword + '&page=' + that.data.page,
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