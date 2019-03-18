var app = getApp();
Page({
  onShareAppMessage: function (res) {
    return {
      title: '大家喜欢的个性签名,赶紧来看看',
			imageUrl: '../../../qianmingPic.png',
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
  data: {
		navbarData: {
			title: "签名说说",
			showCapsule: false
		},
		height: getApp().globalData.height * 2 + 25,
		StatusBar: getApp().globalData.StatusBar,
		CustomBar: getApp().globalData.CustomBar,
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertListi:[],
    expertList: [],
    expertListId:[],
    _windowWidth : wx.getSystemInfoSync().windowWidth,
    contentArray:[],
		contentArrayAd:[],
		autoplay: true,
		interval: 5000,
		duration: 500
  },
	searchSubmit(e) {
		wx.showLoading({
			title: '搜索中'
		});
		console.log('form发生了submit事件，携带数据为：', e.detail.value);
		if (e.detail.value.keyword == '') {
			wx.showModal({
				content: '请输入您的关键字',
				showCancel: false,
				confirmColor: '#ff5a00'
			})
		};
		wx.navigateTo({
			url: '../search/search?keyword=' + e.detail.value.keyword
		})
	},
  copyTBL: function (e) {
    console.log('wwweeee',e);
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
  onLoad: function () {
		wx.showLoading({
			title: '加载中'
		});
    let _classid = [];
    let _expertListi = [];
    wx.request({
      url: 'https://www.yishuzi.com.cn/qianmingApi/?getJson=class',
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
          expertListId:_classid
        });
				wx.hideLoading();
      }
    });
		// 头像数据
		wx.request({
			url: 'https://www.yishuzi.com.cn/aitouxiang_xiaochengxu_api/?getJson=texts&classid=0',
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				that.setData({
					contentArray: json.data.result
				})
				wx.hideLoading()
			}
		});
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 98;
        that.setData({
          winHeight: calc
        });
      }
    });
		// 获取广告
		this.ad();
		// 爱爆笑数据
		wx.request({
			url: 'https://www.yishuzi.com.cn/jianjie8_xiaochengxu_api/xiaochengxu/duanzi/?getJson=column&classid=0',
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('json.data.result---', json)
				let _newArr = []
				for (let index = 0; index < json.data.result.length; index++) {
					_newArr.push({
						classid: json.data.result[index].classid,
						id: json.data.result[index].id,
						smalltext: json.data.result[index].smalltext.replace(/<[^<>]+>/g, '')
					})
				}
				console.log('===', _newArr)
				that.setData({
					contentArrayBaoxiao: _newArr
				})
				wx.hideLoading()
			}
		})
  },
	ad:function(){
		let that = this;
		wx.request({
			url: 'https://www.yishuzi.com.cn/e/api/xiaochengxu/yishuzi_shengcheng/?getJson=ad&adPage=index',
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
  scrolltolowerLoadData: function(e){
		wx.showLoading({
			title: '加载中'
		})
    console.log('scrolltolowerLoadData', e);
    this.getListData(this.data.expertListId[this.data.currentTab],true);
  }
})