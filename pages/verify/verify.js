import {
  Verify
} from '../../model/verify.js'
let verify = new Verify();
let app=getApp();
Page({

  data: {

  },

  onLoad: function(options) {

  },
  /**
   * 点击验证按钮
   */
  onSubmitTap: function(event) {
    let value = event.detail.value;
    if (this._checkSubmit(value)) {
      verify.verify(value.student_id, value.name, (res) => {
        this._handleRes(res,(res)=>{
          wx.showToast({
            title: '验证成功',
          })
          wx.setStorageSync('is_vol',1);
          app.globalData.indexRefresh=true;
          app.globalData.is_vol=true;
          setTimeout(function(){
            wx.navigateBack()
          },1500)
        });
      })
    }
  },
  /**
   *检测提交数据的有效性 
   */
  _checkSubmit: function(value) {
    if (!value.student_id) {
      wx.showToast({
        title: '请填写学号',
        icon: 'none'
      })
      return false
    }
    if (!value.name) {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      return false
    }
    return true;
  },
  /**
   * 对返回结果进行处理
   */
  _handleRes:function(res,callBack){
    if(res.code!=201){
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
    }else{
      callBack && callBack(res)
    }
  }

})