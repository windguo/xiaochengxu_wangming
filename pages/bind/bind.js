// pages/bind/bind.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		navbarData: {
			title: "绑定会员系统",
			showCapsule: true,
			back: true
		},
		height: getApp().globalData.height * 2 + 25,
		StatusBar: getApp().globalData.StatusBar,
		CustomBar: getApp().globalData.CustomBar,
		username:'',
		password:'',
		nickname: ''
	},
	username: function (e) {
		console.log('e.detail.valuee.detail.value', e.detail.value);
		this.setData({
			username: e.detail.value
		})
	},
	password: function (e) {
		console.log('e.detail.valuee.detail.value。password', e.detail.value);
		this.setData({
			password: e.detail.value
		})
	},
	confirmM: function (e) {
		wx.showLoading({
			title: '加载中'
		});
		console.log("姓名：" + this.data.username + "密码：" + this.data.password);
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/bind.php',
			header: { 'content-type': 'application/x-www-form-urlencoded' },
			method: 'POST',
			dataType: 'json',
			data: {
				sessionkey: wx.getStorageSync('storageSessionkey'),
				username: this.data.username,
				password: this.data.password
			},
			success: (res) => {
				console.log('json.data===v--bind', res);
				if (res.data.status == 1) {
					wx.setStorageSync('storageLogined', true);
					wx.setStorageSync('storageSessionkey', res.data.sessionkey);
					wx.setStorageSync('storageRnd', res.data.rnd);
					wx.getUserInfo({
						success: function (_res) {
							console.log('- getUserInfo -', res.data);
							wx.setStorageSync('storageLoginedUsernames', res.data.result.usernames);
							wx.setStorageSync('storageRnd', res.data.result.rnd);
							wx.setStorageSync('storageLoginedavAtarUrl', _res.userInfo.avatarUrl);
							wx.setStorageSync('storageLoginedNickName', _res.userInfo.nickName);
							wx.hideLoading();
							wx.showModal({
								content: res.data.message,
								showCancel: false,
								confirmColor: '#ff5a00'
							})
							wx.switchTab({
								url: '../index/index'
							});
						},
						fail: function () {
							console.log('failssss');
						}
					})
				} else if (res.data.status == '-3') {
					let _usernames = this.data.username + '_' + parseInt(Math.random() * 9999);
					wx.request({
						url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/register.php',
						header: { 'content-type': 'application/x-www-form-urlencoded' },
						method: 'POST',
						dataType: 'json',
						data: {
							sessionkey: wx.getStorageSync('storageSessionkey'),
							groupid: 1,
							tobind: '0',
							Submit: '马上注册',
							enews: 'register',
							clienttype: 'xiaochengxu',
							username: _usernames,
							email: 'xcx_' + parseInt(Math.random() * 9999999999) + '@163.com',
							password: this.data.password,
							repassword: this.data.password
						},
						success: (res) => {
							console.log('res--register--000----res', res.data);
							wx.getUserInfo({
								success: function (_res) {
									console.log('- getUser555555Info -', _res);
									wx.setStorageSync('storageLoginedUsernames', _usernames);
									wx.setStorageSync('storageLoginedavAtarUrl', _res.userInfo.avatarUrl);
									wx.setStorageSync('storageLoginedNickName', _res.userInfo.nickName);
									wx.setStorageSync('storageSessionkey', res.data.sessionkey);
									wx.setStorageSync('storageRnd', res.data.rnd);
									wx.hideLoading();
									wx.showModal({
										content: res.data.message+'爱头像会员成功，点击【确定】即可与微信绑定成功并返回【首页】',
										showCancel: false,
										confirmColor: '#ff5a00',
										success: function (res) {
											console.log(res)
											if (res.confirm) {
												wx.switchTab({
													url: '../index/index'
												});
											}
										}
									})
									
								},
								fail: function () {
									console.log('failssss');
								}
							})
						}
					})
				} else {
					wx.hideLoading();
					wx.showModal({
						content: res.data.message,
						showCancel: false,
						confirmColor: '#ff5a00'
					})
					setTimeout(function () {
						wx.hideToast()
					}, 2000);
					return false;
				}

			},
			fail: (res) => {
				console.log('fail---res', res);
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
	}
})