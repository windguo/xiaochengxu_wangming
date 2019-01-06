// pages/wangming_shangbiao/wangming_shangbiao.js
Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '来看看我生成的翅膀艺术网名生成 ' + this.data.result,
      imageUrl: 'https://www.yishuzi.com.cn/e/api/creat/get.php?getJson=showPic&font=1&text=翅膀艺术网名生成&fontSize=24&width=300&height=225&fontColor=ff5a00',
      success: (res) => {
        wx.showToast({
          title: '转发成功'
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '转发失败，原因是' + res
        })
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    resultFuhao: '',
    resultName: '',
    result: '',
    array: ['꧁꫞꯭天使꯭꫞꧂', '꧁༺天使༻꧂', '꧁༺༽༾ཊ天使ཏ༿༼༻꧂', '꧁༺ཌ༈天使༈ད༻꧂', '༺ཌ༈天使༈ད༻', '༺ཌༀൢ天使ༀད༻', '༺ཌༀཉི天使༃ༀད༻', '༺࿈天使࿈༻', '༺༽༾ཊ天使ཏ༿༼༻', '༺ཌ༈天使༈ད༻', '꧁꫞꯭天使꯭꫞꧂', '꧁༺天使༻꧂', '꧁༺༽༾ཊ天使ཏ༿༼༻꧂', '꧁༺ཌ༈天使༈ད༻꧂', '༺ཌ༈天使༈ད༻', '༺ཌༀൢ天使ༀད༻', '༺࿈天使࿈༻', '༺ཌༀཉི天使༃ༀད༻', '╰︶﹉⋛⋋⊱⋋๑天使๑⋌⊰⋌⋚﹉︶╯', '╰︶﹉๑天使๑﹉︶╯', '╰⋛⋋⊱⋋天使⋌⊰⋌⋚╯', '╰⋛⋋⊱๑天使๑⊰⋌⋚╯', '╰⊱⋛⋋天使⋌⋚⊰╯', '⊹⊱⋛⋋天使⋌⋚⊰⊹', '︶﹌⋛天使⋚﹌︶', '☜☞天使☜☞', '⋛⊱天使⊰⋚', '◥天使◤', '☜天使☞', 'ε天使з', '༺天使༻', 'ʚ天使ɞ'],
    objectArray: [
      {
        id: 0,
        name: '꧁꫞꯭天使꯭꫞꧂'
      }, {
        id: 1,
        name: '꧁༺天使༻꧂'
      }, {
        id: 2,
        name: '꧁༺༽༾ཊ天使ཏ༿༼༻꧂'
      }, {
        id: 3,
        name: '꧁༺ཌ༈天使༈ད༻꧂'
      }, {
        id: 4,
        name: '༺ཌ༈天使༈ད༻'
      }, {
        id: 5,
        name: '༺ཌༀൢ天使ༀད༻'
      }, {
        id: 6,
        name: '༺ཌༀཉི天使༃ༀད༻'
      }, {
        id: 7,
        name: '༺࿈天使࿈༻'
      }, {
        id: 8,
        name: '༺༽༾ཊ天使ཏ༿༼༻'
      }, {
        id: 9,
        name: '༺ཌ༈天使༈ད༻'
      }, {
        id: 10,
        name: '꧁꫞꯭天使꯭꫞꧂'
      }, {
        id: 11,
        name: '꧁༺天使༻꧂'
      }, {
        id: 12,
        name: '꧁༺༽༾ཊ天使ཏ༿༼༻꧂'
      }, {
        id: 13,
        name: '꧁༺ཌ༈天使༈ད༻꧂'
      }, {
        id: 14,
        name: '༺ཌ༈天使༈ད༻'
      }, {
        id: 15,
        name: '༺ཌༀൢ天使ༀད༻'
      }, {
        id: 16,
        name: '༺ཌༀཉི天使༃ༀད༻'
      }, {
        id: 17,
        name: '༺࿈天使࿈༻'
      },
      {
        id: 18,
        name: '╰︶﹉⋛⋋⊱⋋๑天使๑⋌⊰⋌⋚﹉︶╯'
      },
      {
        id: 19,
        name: '╰︶﹉⋛⋋⊱⋋๑天使๑⋌⊰⋌⋚﹉︶╯'
      },
      {
        id: 20,
        name: '╰︶﹉๑天使๑﹉︶╯'
      },
      {
        id: 21,
        name: '╰⋛⋋⊱⋋天使⋌⊰⋌⋚╯'
      },
      {
        id: 22,
        name: '╰⋛⋋⊱๑天使๑⊰⋌⋚╯'
      },
      {
        id: 23,
        name: '╰⊱⋛⋋天使⋌⋚⊰╯'
      },
      {
        id: 24,
        name: '⊹⊱⋛⋋天使⋌⋚⊰⊹'
      },
      {
        id: 25,
        name: '︶﹌⋛天使⋚﹌︶'
      }
      ,
      {
        id: 26,
        name: '☜☞天使☜☞'
      }
      ,
      {
        id: 27,
        name: '⋛⊱天使⊰⋚'
      }
      ,
      {
        id: 28,
        name: '◥天使◤'
      }
      ,
      {
        id: 29,
        name: '☜天使☞'
      },
      {
        id: 30,
        name: 'ε天使з'
      },
      {
        id: 31,
        name: '༺天使༻'
      }, {
        id: 32,
        name: 'ʚ天使ɞ'
      }
    ],
    index: 0
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '翅膀艺术网名生成'
    })
  },
  inputNameFn: function (e) {
    console.log('__inputNameFn__', e)
    this.setData({
      resultName: e.detail.value
    })
  },
  creatName: function () {
    let __name = this.data.resultName
    if (__name == '') {
      wx.showModal({
        content: '请输入您的昵称',
        showCancel: false,
        confirmColor: '#ff5a00'
      })
    }
    let _a = this.data.array[this.data.index]
    let _results = _a.replace('天使', __name)
    this.setData({
      result: _results
    })
  },
  copyTBL: function (e) {
    console.log('wwweeee', e)
    var self = this
    wx.setClipboardData({
      data: e.currentTarget.dataset.text.trim(),
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {}
})
