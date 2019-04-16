var COMMONFN = require('../../utils/util.js');
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
		titleTop: app.globalData.StatusBar+6,
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar + 10,
		id:null,
		classid:null,
		diggFlag:false,
		diggtop:'',
		favaFlag: false,
		contentArray:[],
		autoplay: true,
		interval: 5000,
		duration: 500,
		sessionkey: '',
		rnd: '',
		usernames: '',
		favaid:null,
		state:'',
		height: '',
		index: 1,
		autoplay: false,
		countDownNum: '3000',
		detail: {},
		id: ''
	},
	_back: function () {
		wx.navigateBack({
			delta: 1,
		})
	},
	_home: function () {
		wx.switchTab({
			url: '/pages/index/index'
		})
	},
	onLoad: function (options) {
		COMMONFN.checkIsLogin();
		console.log('__options__',options);
		wx.showLoading({
			title: '加载中'
		});
		this.setData({
			height: wx.getSystemInfoSync().windowHeight,
			id:options.id,
			classid:options.classid,
			state: options.state || '',
			sessionkey: wx.getStorageSync('storageSessionkey'),
			rnd: wx.getStorageSync('storageRnd'),
			usernames: wx.getStorageSync('storageLoginedUsernames'),
			userid: wx.getStorageSync('storageLoginedUserId')
		})
		this.getContent(options.classid,options.id);
		this.ad();
		this.check_fava_article();
		if (this.data.state == 3){
			this.setData({
				navbarData: {
					title: "网名详情页",
					showCapsule: true,
					home: true,
					back: false
				},
			})
		}
	},
	// 检测是否已经收藏
	check_fava_article:function(){
		let that = this;
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=check_fava_article&id=' + this.data.id + '&classid=' + this.data.classid + '&userid=' + this.data.userid,
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('---======check_fava_article------', json.data);
				if (json.data.status == 1){
					console.log('收藏过了');
					console.log('json.data.result.favaid--', json.data.result.favaid);
					that.setData({
						favaFlag:true,
						favaid: json.data.result.favaid
					})
				}else{
					that.setData({
						favaFlag: false
					})
				}
			}
		})
	},
	diggtopFn:function(e){
		wx.showLoading({
			title: '点赞中...',
			mask: true
		})
		let _this = this;
		console.log('eeee-',e);
		console.log('https://www.yishuzi.com.cn/wangming_xiaochengxu_api_root/e/public/digg/index.php?afrom=xiaochengxu&dotop=1&doajax=1&ajaxarea=diggnum&id=' + this.data.id + '&classid=' + this.data.classid);
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api_root/e/public/digg/index.php?afrom=xiaochengxu&dotop=1&doajax=1&ajaxarea=diggnum&id=' + this.data.id + '&classid=' + this.data.classid,
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('---======diggtopFn------', json.data);
				_this.setData({
					diggFlag:true,
					diggtop: Number(_this.data.diggtop) + 1
				})
				wx.showModal({
					content: json.data.message,
					mask:true
				})
				wx.hideLoading()
			}
		})
	},
	// 加入收藏
	favaFn: function (e) {
		wx.showLoading({
			title: '收藏中...',
			mask: true
		})
		let _this = this;
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/fava.php',
			data: {
				sessionkey: this.data.sessionkey,
				ecmsfrom: 'xiaochengxu',
				username: this.data.usernames,
				enews: 'AddFava',
				rnd: this.data.rnd,
				classid: this.data.classid,
				id: this.data.id,
				Submit: '收藏'
			},
			header: { 'content-type': 'application/x-www-form-urlencoded' },
			method: 'POST',
			dataType: 'json',
			success: (json) => {
				console.log('---======favaFn------', json.data);
				_this.setData({
					favaFlag: true,
					favaid: json.data.result.favaid
				})
				wx.showModal({
					title: json.data.message,
					content:'请到【我的】-【我的收藏】查看收藏的网名',
					mask:true
				})
				console.log('this.data.favaid---',this.data.favaid);
				wx.hideLoading()
			}
		})
	},
	// 移除收藏
	favaDisFn: function (e) {
		wx.showLoading({
			title: '移除收藏中...',
			mask: true
		})
		let _this = this;
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/fava.php',
			data: {
				sessionkey: this.data.sessionkey,
				ecmsfrom: 'xiaochengxu',
				username: this.data.usernames,
				enews: 'DelFava',
				rnd: this.data.rnd,
				classid: this.data.classid,
				id: this.data.id,
				favaid: this.data.favaid,
				Submit: '收藏'
			},
			header: { 'content-type': 'application/x-www-form-urlencoded' },
			method: 'POST',
			dataType: 'json',
			success: (json) => {
				console.log('---======favaDisFn------', json.data);
				_this.setData({
					favaFlag: false
				})
				wx.showModal({
					content: json.data.message,
					mask:true
				})
				wx.hideLoading()
			}
		})
	},
	getContent: function (classid,id) {
		console.log('https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=content&classid=' + classid + '&id=' + id)
		let that = this;
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=content&classid=' + classid+'&id=' + id,
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('json.data.result---', json.data.result)
				that.setData({
					detail: json.data.result
				});
				that.getList();
				wx.hideLoading()
			}
		})
	},
	onSlideChangeEnd: function (e) {
		var that = this;
		that.setData({
			index: e.detail.current + 1,
			diggFlag:false,
			favaFlag:false
		});
		console.log('this.data.detail.randId--', this.data.detail.randId);
		console.log('heightheight',this.data.height);
		// wx.redirectTo({
		// 	url: '../detail/detail?id=' + that.data.detail.randId + '&classid=' + that.data.detail.classid
		// })
		this.getContent(this.data.classid,this.data.detail.randId);
		this.ad();
	},
	getList:function(){
		console.log('https://www.yishuzi.com.cn/wangming_xiaochengxu_api/creat/?getJson=c&keyword=' + this.data.detail.title + '&ftitle=' + this.data.detail.ftitle);
		let that = this;
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/creat/?getJson=c&keyword=' + encodeURIComponent(this.data.detail.title) + '&ftitle=' + encodeURIComponent(this.data.detail.ftitle),
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
	onShareAppMessage: function (res) {
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log(res.target)
		}
		return {
			title: this.data.detail.title + ' ' + this.data.detail.ftitle + '的网名分享给你咯，你也来选个吧。',
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