import {
  Apply_form
} from '../../model/apply_form.js'
let apply_form = new Apply_form();
Page({
  data: {
    category: {}//义诊类别
  },

  onLoad: function() {
    apply_form.categorAll((res) => {
      this.setData({
        category:res.data.category
      })
    })
  },

  /**
   * 点击选择类别
   */
  onPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 点击提交
   */
  onSubmitTap: function(event) {
    let value=event.detail.value;
    if (this._checkSubmit(value)){
     apply_form.orderPlace(value,(res)=>{
       wx.redirectTo({
         url: '/pages/user_order/user_order',
       })
     })
    }
  },
  /**
   * 发布有效性检测
   */
  _checkSubmit: function (value) {
    if (!value.name) {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      return false
    }
    if (!value.room) {
      wx.showToast({
        title: '请填写住址',
        icon: 'none'
      })
      return false
    }
    if (!value.phone) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      })
      return false
    }
    if (!value.category_id) {
      wx.showToast({
        title: '请选择目录',
        icon: 'none'
      })
      return false
    }
    if (!value.description) {
      wx.showToast({
        title: '请填写描述',
        icon: 'none'
      })
      return false
    }
    return true;
  },
  
})