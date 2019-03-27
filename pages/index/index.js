var app = getApp();
Page({
  onShareAppMessage: function (res) {
    return {
      title: '大家喜欢的精品网名小程序,赶紧来看看',
      // path:'/',
      imageUrl:'../../indexPic.png',
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
		page:1,
		todayUpdate: 0,
		total: 0,
		snewstime: '',
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		titleTop: app.globalData.StatusBar,
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertListi:[],
    expertList: [],
    expertListId:[],
    _windowWidth : wx.getSystemInfoSync().windowWidth,
    contentArray:[],
		wangmingArray: [],
		wangmingNewArray: [],
		contentArrayAd:[],
		hidden:false,
		indicatorDots:true,
		autoplay: true,
		interval: 5000,
		duration: 500,
		isPopping: false,//是否已经弹出
		animPlus: {},//旋转动画
		animCollect: {},//item位移,透明度
		animTranspond: {},//item位移,透明度
		animInput: {},//item位移,透明度
  },
	gifHidden: function () {
		this.setData({
			hidden: true
		})
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

		//统计数据
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=total',
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				this.setData({
					snewstime: json.data.result.newstime,
					todayUpdate: json.data.result.toady,
					total: json.data.result.count
				})
			}
		})

		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=column&classid=9999',
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('---======------', json.data.result);
				that.setData({
					wangmingNewArray: json.data.result
				});
				wx.hideLoading()
			}
		})

		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=column&classid=0',
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('---======------', json.data.result)
				that.setData({
					wangmingArray: json.data.result
				})
				wx.hideLoading()
			}
		})

    
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
	onPullDownRefresh: function () {
		wx.showLoading();
		let that = this;
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=column&classid=9999',
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('---======------', json.data.result);
				that.setData({
					wangmingNewArray: json.data.result
				});
				wx.hideLoading()
			}
		});
		//统计数据
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=total',
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				that.setData({
					snewstime: json.data.result.newstime,
					todayUpdate: json.data.result.toady,
					total: json.data.result.count
				})
			}
		})
	},
	searchPage:function(){
		wx.navigateTo({
			url: '../search/search'
		})
	},
	ad:function(){
		let that = this;
		wx.request({
			url: 'https://www.yishuzi.com.cn/e/api/xiaochengxu/wangming/?getJson=ad&adPage=index',
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
	scrolltolowerLoadDatas: function (e) {
		wx.showLoading({
			title: '加载中'
		});
		console.log('scrolltolowerLoadData', e)
		let that = this
		this.setData({
			page: that.data.page + 1
		})
		console.log('__scrolltolowerLoadData_this.data.page__', this.data.page);
		wx.request({
			url: 'https://www.yishuzi.com.cn/wangming_xiaochengxu_api/?getJson=column&classid=9999&page=' + this.data.page,
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				let _arr = [];
				let arr = json.data.result;
				_arr = that.data.wangmingNewArray.concat(arr);
				console.log('__arr__', _arr)
				that.setData({
					wangmingNewArray: _arr
				})
				wx.hideLoading()
			}
		})
	},
	//点击弹出
	plus: function () {
		if (this.data.isPopping) {
			//缩回动画
			this.popp();
			this.setData({
				isPopping: false
			})
		} else if (!this.data.isPopping) {
			//弹出动画
			this.takeback();
			this.setData({
				isPopping: true
			})
		}
	},
	//弹出动画
	popp: function () {
		//plus顺时针旋转
		var animationPlus = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		var animationcollect = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		var animationTranspond = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		var animationInput = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		animationPlus.rotateZ(0).step();
		animationcollect.translate(-50, -20).rotateZ(0).opacity(1).step();
		animationTranspond.translate(-50, 30).rotateZ(0).opacity(1).step();
		animationInput.translate(-50, 80).rotateZ(0).opacity(1).step();
		this.setData({
			animPlus: animationPlus.export(),
			animCollect: animationcollect.export(),
			animTranspond: animationTranspond.export(),
			animInput: animationInput.export(),
		})
	},
	//收回动画
	takeback: function () {
		//plus逆时针旋转
		var animationPlus = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		var animationcollect = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		var animationTranspond = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		var animationInput = wx.createAnimation({
			duration: 200,
			timingFunction: 'ease-out'
		})
		animationPlus.rotateZ(0).step();
		animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
		animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
		animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
		this.setData({
			animPlus: animationPlus.export(),
			animCollect: animationcollect.export(),
			animTranspond: animationTranspond.export(),
			animInput: animationInput.export(),
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