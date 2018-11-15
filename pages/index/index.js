// pages/index/index.js
import {
  Index
} from '../../model/index.js'
let index = new Index();

let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_vol: false, //是否是志愿者,该值再切换志愿者身份的时候会变
    init_vol: false //是否是志愿者,该值在当前页面不变
  },

  onLoad: function() {

  },

  onShow: function() {
    let indexRefresh = app.globalData.indexRefresh;
    if (indexRefresh) {
      let is_vol = app.globalData.is_vol
      this.setData({
        is_vol: is_vol,
        init_vol: is_vol
      })
      if (is_vol) {
        this._orderUnTokenHttp(() => {
          app.globalData.indexRefresh = false;
        });
      }
    }
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    this._orderUnTokenHttp();
  },

  /**
   * 获取所有没有被接的单子
   */
  _orderUnTokenHttp: function(callBack) {
    index.orderUnToken((res) => {
      this.setData({
        list: res.data.orders
      })
      callBack && callBack()
    })
  },

  /**
   * 点击切换成志愿者
   */
  onChangeTap: function(event) {
    if (this.data.init_vol) {
      this.setData({
        is_vol: !this.data.is_vol
      })
      if (this.data.is_vol) {
        wx.showLoading({
          title: '切换中'
        })
        let that=this;
        setTimeout(function() {
          that._orderUnTokenHttp();
          wx.showToast({
            title: '您已成功切换至志愿者身份',
            icon: 'none'
          })
        }, 1500)
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
   * 接单按钮
   */
  onTakeOrder: function(event) {
    let order_id = event.currentTarget.dataset.order_id;
    index.orderTake(order_id, (res) => {
      if (res.code !== 201) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '接单成功',
        })
      }
      let that=this;
      setTimeout(function() {
        that._orderUnTokenHttp();
      },1500)
    })
  }


})