var app = getApp();
Page({
	data: {
		url: ''
	},
	onLoad: function (options) {
		wx.setNavigationBarTitle({
			title: '关于我们'
		});
	},
	previewImage: function (e) {
		wx.previewImage({
			urls: ['' + this.data.url + '']
		})
	},
	_back:function(){
		wx.navigateBack({
			delta: 1,
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
	}
})