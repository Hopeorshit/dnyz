import {
  User_order
} from '../../model/user_order.js'
let user_order = new User_order();

Page({

  data: {
    list: null //用户订单
  },

  onShow: function(options) {
    this._user_orderHttp();
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    this._user_orderHttp();
  },

  /**
   * http
   */
  _user_orderHttp: function() {
    user_order.orderUser((res) => {
      this.setData({
        list: res.data.orders
      })
    })
  },
  /**
   * 
   */
  onCommentTap: function(event) {
    let order_id = event.currentTarget.dataset.order_id;
    wx.navigateTo({
      url: '../comment/comment?order_id=' + order_id,
    })
  }
})