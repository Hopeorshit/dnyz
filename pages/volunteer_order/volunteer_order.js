// pages/volunteer_order/volunteer_order.js
import {
  Volunteer_order
} from '../../model/volunteer_order.js'
let volunteer_order = new Volunteer_order();

Page({

  data: {

  },
  onLoad: function(options) {
    this._orderVolHttp();
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    this._orderVolHttp();
  },
  
  /**
   * http
   */
  _orderVolHttp: function() {
    volunteer_order.orderVol((res) => {
      this.setData({
        list: res.data.orders
      })
    })
  },


  //打电话
  onCallTap: function(event) {
    wx.makePhoneCall({
      phoneNumber: '14777310721',
    })
  }
})