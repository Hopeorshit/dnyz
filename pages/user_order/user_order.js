import {
  randomStr
} from '../../utils/util.js'
Page({
  data: {

  },
  /**
   *用户评价完订单之后返回页面要刷新 
   */
  onShow: function() {
    this.setData({
      init: randomStr(16)
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
  onPullDownRefresh: function() { 
    console.log('下拉刷新')
    this.setData({
      init: randomStr(16)
    })
  },
  /**
   * 点击详情进行页面跳转
   * 由组件触发
   */
  onDetail: function(event) {
    let order_id = event.detail.order_id;
    let order_status = event.detail.order_status;
    wx.navigateTo({
      url: '../comment/comment?order_id=' + order_id + '&order_status=' + order_status,
    })
  }
})