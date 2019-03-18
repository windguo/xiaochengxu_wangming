var COMMONFN = require('../../../utils/util.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		usernames: '',
		avatarUrl: '',
		userid: 0,
		contentArray:[],
		page:1,
		dataHidden:false,
		winHeight:''
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
		COMMONFN.checkIsLogin();
		wx.setNavigationBarTitle({
			title: '我的收藏',
		});
		this.setData({
			avatarUrl: wx.getStorageSync('storageLoginedavAtarUrl'),
			sessionkey: wx.getStorageSync('storageSessionkey'),
			rnd: wx.getStorageSync('storageRnd'),
			userid: wx.getStorageSync('storageLoginedUserId'),
			usernames: wx.getStorageSync('storageLoginedUsernames')
		});
		console.log('usernamesusernames--==--', this.data.usernames);
		if (!this.data.usernames) {
			wx.redirectTo({
				url: '../../login/login'
			});
		};
		this.winHeight();
		this.getFavas();
	},
	getFavas:function(){
		let that = this;
		wx.request({
			url: 'https://www.yishuzi.com.cn/aitouxiang_xiaochengxu_api/?getJson=myfavas&userid=' + this.data.userid,
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('getFavas--json', json.data.result);
				that.setData({
					contentArray:json.data.result
				});
				if (json.data.result.length > 0){
					that.setData({
						dataHidden: true
					});
				}
				wx.hideLoading();
			}
		})
	},
	// 移除收藏
	removeFavas:function(e){
		let picurl = e.currentTarget.dataset.id;
		console.log('移除id=' + picurl + '的收藏');
		var nowidx = e.currentTarget.dataset.idx;//当前索引
		var oldarr = this.data.contentArray;//循环内容
		oldarr.splice(nowidx, 1);    //删除当前索引的内容，这样就能删除view了
		this.setData({
			contentArray: oldarr
		})
		let that = this;
		wx.request({
			url: 'https://www.yishuzi.com.cn/aitouxiang_xiaochengxu_api/?getJson=myfavas_removeOne&picUrl=' + picurl,
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('removeFavas--json', json.data);
				that.setData({
					contentArray: oldarr
				});
			}
		})
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
		wx.request({
			url: 'https://www.yishuzi.com.cn/aitouxiang_xiaochengxu_api/?getJson=myfavas&userid=' + this.data.userid + '&page=' + that.data.page,
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