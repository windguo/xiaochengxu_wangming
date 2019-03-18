var COMMONFN = require('../../../utils/util.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		usernames: '',
		avatarUrl: '',
		userid:0,
		nickname: '',
		picsItems:[]
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		COMMONFN.checkIsLogin();
		this.setData({
			avatarUrl: wx.getStorageSync('storageLoginedavAtarUrl'),
			sessionkey: wx.getStorageSync('storageSessionkey'),
			rnd: wx.getStorageSync('storageRnd'),
			userid: wx.getStorageSync('storageLoginedUserId'),
			nickname: wx.getStorageSync('storageLoginedNickName'),
			usernames: wx.getStorageSync('storageLoginedUsernames')
		});
	},
	loginout:function(){
		console.log('退出');
		wx.redirectTo({
			url: '../../loginout/loginout',
		})
	},


	// 选择图片
	chooseImageTap: function () {
		console.log('this.data.图片数量', (this.data.picsItems).length);
		if ((this.data.picsItems).length >= 9) {
			wx.showModal({
				content: '最多只允许选择9张',
				showCancel: false,
				confirmColor: '#ff5a00'
			})
			return false;
		}
		let _this = this;
		wx.chooseImage({
			// 相关属性设置
			count: 9,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: function (res) {
				console.log('ssss---ssss---', res);
				var imgsrc = res.tempFilePaths[0];
				wx.redirectTo({
					url: '../../publish/cropper/cropper?src=' + imgsrc
				});
			}
		})
	}
})