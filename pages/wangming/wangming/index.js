Page({
	data:{
		navbarData: {
			title: "网名生成",
			showCapsule: false
		},
		height: getApp().globalData.height * 2 + 25,
		StatusBar: getApp().globalData.StatusBar,
		CustomBar: getApp().globalData.CustomBar
	},
	onLoad: function () {
		// wx.showLoading({});
		wx.setNavigationBarTitle({
			title: '网名生成'
		})
	}
})