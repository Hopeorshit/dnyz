// pages/index/index.js
import {
  Index
} from '../../model/index.js'
let index = new Index();
import {
  Token
} from '../../utils/token.js';
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_vol: false, //是否是志愿者,该值在切换志愿者身份的时候会变
    init_vol: false, //是否是志愿者,该值在当前页面不变,
    first_load: true, //第一次加载
    loading: false, //是否正在加载中,
    content: {} //列表相关数据
  },

  onLoad: function() {

  },


  onShow: function() {
    let token = new Token();
    token.verify((res) => {
      app.globalData.is_vol = wx.getStorageSync('is_vol') == 1 ? true : false
      this.setData({
        first_load: false
      })
      let indexRefresh = app.globalData.indexRefresh;
      if (indexRefresh) {
        let is_vol = app.globalData.is_vol
        this.setData({
          is_vol: is_vol,
          init_vol: is_vol
        })
        if (is_vol) {
          wx.setNavigationBarTitle({
            title: '电脑义诊-志愿者',
          })
          this._initData(); //TODO 组件attached的时候可以触发
          this._orderUnTokenHttp();
          app.globalData.indexRefresh = false;
        }
      }
    });
  },

  /*
   *初始化列表相关数据
   */
  _initData() {
    this.setData({
      content: {
        page_size: 10,
        list: [],
        page: 1,
        more: true, //初始化还有更多
        empty: false, //
      }
    })
  },



  /**
   * 获取所有没有被接的单子
   */
  _orderUnTokenHttp: function() {
    this.setData({
      loading: true,
    })
    let content = this.data.content;
    index.orderUnToken(content.page, content.page_size, (res) => {
      let contentList = content.list;
      let data = res.data;
      content.list = contentList.concat(data.list);
      content.more = data.list.length == content.page_size ? true : false;
      content.page = content.page + 1;
      console.log(content.list)
      content.empty = content.list.length > 0 ? false : true,
        this.setData({
          content: content,
          loading: false
        })

    })
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
          that._initData();
          that._orderUnTokenHttp(); //TODO 改变组件属性来触发
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
      let that = this;
      setTimeout(function() {
        that._initData(); //TODO 改变属性来触发
        that._orderUnTokenHttp();
      }, 1500)
    })
  },
  /**
   * 上拉加载更多
   */
  onReachBottom: function() {
    console.log('bottom')
    if (this.data.content.more) {
      this._orderUnTokenHttp();//TODO 下拉刷新去触发父类可以通过 observer 来触发
    }
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() { //TODO 下拉刷新去触发父类可以通过 observer 来触发
    this._initData();
    this._orderUnTokenHttp();
  },


  /**
   * 分享该小程序
   */
  onShareAppMessage: function() {

  }
})