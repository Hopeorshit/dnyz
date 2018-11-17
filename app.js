//app.js
App({
  onLaunch: function () {

  },
  globalData: {
    is_vol: wx.getStorageSync('is_vol')==1 ? true:false,
    indexRefresh:true,
  }
})