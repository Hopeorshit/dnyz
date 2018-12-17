// pages/index/index.js
import {
  Index
} from '../../model/index.js'
let index = new Index();
import {
  Token
} from '../../utils/token.js';
import {
  randomStr
} from '../../utils/util.js'
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_vol: false, //是否是志愿者,该值在切换志愿者身份的时候会变
    init_vol: false, //是否是志愿者,该值在当前页面不变,
    first_load: true, //第一次加载
    timesUp:false,//活动时间截止，按钮是否能点击
  },

  /**
   * 经测试发现：打开转发的微信小程序会重新执行onLoad
   * 但App.globalData 会保持上一个状态
   */
  onLoad: function() {
    app.globalData.indexRefresh = true;
  },
  

  onShow: function() {
    console.log('------------onShow-------------------------');
    let indexRefresh = app.globalData.indexRefresh;
    if (indexRefresh) {
      let token = new Token();
      token.verify((res) => {
        this.setData({
          first_load: false //获取用户身份之后进行对应身份的显示
        })
        app.globalData.is_vol = wx.getStorageSync('is_vol') == 1 ? true : false//从缓存中获取用户身份
        let is_vol = app.globalData.is_vol
        this.setData({
          is_vol: is_vol,
          init_vol: is_vol
        })
        if (is_vol) {
          wx.setNavigationBarTitle({
            title: '电脑义诊-志愿者',
          })
        }
        app.globalData.indexRefresh = false;
      });
    }
  },
  /**
   * 点击切换成志愿者
   */
  onChangeTap: function(event) {
    if (this.data.init_vol) {
      if (!this.data.is_vol) {
        wx.showLoading({
          title: '切换中'
        })
        let that = this;
        setTimeout(function() {
          that.setData({
            is_vol: !that.data.is_vol
          })
          wx.showToast({
            title: '您已成功切换至志愿者身份',
            icon: 'none'
          })
          wx.setNavigationBarTitle({
            title: '电脑义诊-志愿者',
          })
        }, 1500)
      } else {
        this.setData({
          is_vol: !this.data.is_vol
        })
        wx.setNavigationBarTitle({
          title: '电脑义诊',
        })
      }
    } else {
      wx.navigateTo({
        url: '../verify/verify',
      })
    }
  },

  /**
   * 我的订单相关按钮
   */
  onMyTap: function(event) {
    if (!this.data.is_vol) {
      wx.navigateTo({
        url: '../user_order/user_order',
      })
    } else {
      wx.navigateTo({
        url: '../volunteer_order/volunteer_order',
      })
    }
  },
  /**
   * 申请服务按钮
   */
  onApplyTab: function(event) {
    wx.navigateTo({
      url: '../apply_form/apply_form',
    })
  },
  /**
   * 上拉加载更多
   */
  onReachBottom: function() {
    console.log('上拉刷新');
    this.setData({
      load_more: randomStr(16)
    })
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() { //TODO 下拉刷新去触发父类可以通过 observer 来触发
    console.log('下拉刷新')
    this.setData({
      init: randomStr(16)
    })
  },

  /**
   * 分享该小程序
   */
  onShareAppMessage: function() {

  }
})