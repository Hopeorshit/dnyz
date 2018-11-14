//app.js
import { Token } from 'utils/token.js';
App({
  onLaunch: function () {
    var token = new Token();
    token.verify();
  },
  globalData: {
    is_vol: wx.getStorageSync('is_vol')==1 ? true:false,
    indexRefresh:true
  }
})