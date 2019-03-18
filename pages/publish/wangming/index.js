var COMMONFN = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
	data: {
		navbarData: {
			title: '发布网名',
			showCapsule: true,
			back: true
		},
		height: app.globalData.height * 2 + 25,
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		sessionkey:'',
		rnd:'',
		bgPic: null,
		picChoosed: false,
		src: '',
		hidden: false,
		avatarArr:'',
		expertList:[],
		expertListi: [],
		expertList: [],
		expertListId: [],
		avatarFlag:true,
		imgs: [],
		list: '',
		upload_picture_list: [],
		upload_percent:'0',
		index:0,
		ftitleFlag:true,
		objectArray:[]
		
	},
	onLoad: function (options) {
		COMMONFN.checkIsLogin();
		wx.setNavigationBarTitle({
			title: '发布头像'
		});
		console.log('options----options',options);
    if (options.classid){
      console.log('111');
    }
		this.setData({
			sessionkey: wx.getStorageSync('storageSessionkey'),
			rnd: wx.getStorageSync('storageRnd'),
			usernames: wx.getStorageSync('storageLoginedUsernames')
		})
		this.fetchData();
	},
	fetchData: function () {
		var that = this
		that.setData({
			hidden: false
		})
		let _classid = []
		let _expertListi = []
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=class',
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('class---', json.data.result)
				that.setData({
					objectArray: json.data.result
				})
				wx.hideLoading()
			}
		})
	},
	cancel: function () {
		wx.switchTab({
			url: '../../my/index/index',
		})
	},
	formSubmit(e) {
		let _this = this;
		console.log('form发生了submit事件，携带数据为：', e.detail.value);
		// console.log('this.data.picsItems--', this.data.picsItems);return false;
		if (e.detail.value.title == ''){
			wx.showModal({
				content: '请输入网名',
				showCancel: false,
				confirmColor: '#ff5a00'
			})
			return false;
		}else{
			wx.showLoading({
				title: '发布中...'
			});
			console.log({
				sessionkey: this.data.sessionkey,
				title: e.detail.value.title,
				ftitle: e.detail.value.ftitle,
				ecmsfrom: 'xiaochengxu',
				username: this.data.usernames,
				enews: 'MAddInfo',
				rnd: this.data.rnd,
				mid: '7',
				classid: e.detail.value.classid,
				addnews: '提交'
			});
			wx.request({
				url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/publish.php',
				data: {
					sessionkey: this.data.sessionkey,
					title: e.detail.value.title,
					ftitle: e.detail.value.ftitle,
					ecmsfrom: 'xiaochengxu',
					username: this.data.usernames,
					enews: 'MAddInfo',
					rnd: this.data.rnd,
					mid: '7',
					classid: e.detail.value.classid,
					addnews: '提交'
				},
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				method: 'POST',
				dataType: 'json',
				success: (json) => {
					console.log('入库完毕');
					console.log('---===-----json====', json);
					wx.hideLoading();
					if (json.data.status == 1) {
						wx.showModal({
							content: json.data.message,
							cancelText:'我的发布',
							confirmText:'继续发布',
							confirmColor: '#ff5a00',
							success: function (res) {
								if (res.cancel) {
                  wx.redirectTo({
                    url: '../../my/publish/publish'
									});
								} else {
									wx.redirectTo({
                    url: '../../publish/wangming/index?classid=' + e.detail.value.classid
									});
								}
							}
						})
					}else{
						wx.showModal({
							title: '提示',
							content: json.data.message,
							success: function (res) {
								if (!res.cancel) {
									wx.redirectTo({
										url: '../../loginout/loginout'
									});
								}
							}
						})
					}
				}
			})
		}
		
	},
	bindPickerChange(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value);
		if (e.detail.value == 2 || e.detail.value == 7 || e.detail.value == 8){
			this.setData({
				index: e.detail.value,
				ftitleFlag:false
			})
		}else{
			this.setData({
				index: e.detail.value,
				ftitleFlag: true
			})
		}
	}
})
