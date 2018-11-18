// pages/volunteer_order/volunteer_order.js
import {
  randomStr
} from '../../utils/util.js'

Page({
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

})