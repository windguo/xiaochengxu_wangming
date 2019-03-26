var app = getApp();
Page({
	data: {
		navbarData: {
			title: "网名分类",
			showCapsule: false
		},
		height: app.globalData.height * 2 + 25,
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		contentArray: [],
		expertListi: [],
		expertList: [],
		expertListId: []
	},

	onLoad: function (options) {
		wx.showLoading({
			title: '加载中'
		})
		let _classid = [];
		let _expertListi = [];
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=class',
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				for (var i = 0; i < json.data.result.length; i++) {
					_expertListi.push(i)
					_classid.push(json.data.result[i].classid);
				};
				this.setData({
					expertList: json.data.result,
					expertListi: _expertListi,
					expertListId: _classid
				});
				wx.hideLoading();
			}
		});

	},
	onShareAppMessage: function (res) {
		return {
			title: '网名生成的分类列表,@你来看看有喜欢的分类么',
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
	}
})
