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
		classid:1,
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
		if ((options.classid && options.classid == 3) || (options.classid && options.classid == 8) || (options.classid && options.classid == 9) || (options.classid && options.classid == 10)){
      this.setData({
				ftitleFlag: false,
				classid: options.classid
			})
		} else if (options.classid){
			this.setData({
				classid:options.classid,
				ftitleFlag: true
			})
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
				console.log('class---', json.data.result);
				let _classid = [];
				for(let i=0;i<(json.data.result).length;i++){
					_classid.push(json.data.result[i].classid);
				};
				for (let _a = 0; _a < _classid.length;_a++){
					if (_classid[_a] == that.data.classid){
						console.log('---', _classid[_a]);
						that.setData({
							index: _classid[_a]-1
						});
						console.log(that.data.index);
					}
				}
				console.log('_classid_',_classid);
				that.setData({
					objectArray: json.data.result
				});
				console.log('0000----000----',that.data.index);
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
		//获取formId
		console.log('e.detail.formId---e.detail.formId---',e.detail.formId);
		if (e.detail.value.title == ''){
			wx.showModal({
				content: '请输入网名',
				showCancel: false,
				confirmColor: '#ff5a00'
			})
			return false;
		}else{
			wx.showLoading({
				title: '发布中...',
				mask:true
			});
			console.log({
				sessionkey: this.data.sessionkey,
				title: e.detail.value.title,
				ftitle: e.detail.value.ftitle,
				ecmsfrom: 'xiaochengxu',
				username: this.data.usernames,
				enews: 'MAddInfo',
				rnd: this.data.rnd,
				formid: e.detail.formId,
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
					formid: e.detail.formId,
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
						wx.showToast({
							title: json.data.message,
							icon: 'success',
							duration: 2000,
							mask: true
						})
						// wx.showModal({
						// 	content: json.data.message,
						// 	cancelText:'我的发布',
						// 	confirmText:'继续发布',
						// 	confirmColor: '#ff5a00',
						// 	success: function (res) {
						// 		if (res.cancel) {
            //       wx.redirectTo({
            //         url: '../../my/publish/publish'
						// 			});
						// 		} else {
						// 			wx.redirectTo({
            //         url: '../../publish/wangming/index?classid=' + e.detail.value.classid
						// 			});
						// 		}
						// 	}
						// })
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
		if (e.detail.value == 2 || e.detail.value == 7 || e.detail.value == 8 || e.detail.value == 9){
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
