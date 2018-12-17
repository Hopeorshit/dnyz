import {
  Apply_form
} from '../../model/apply_form.js'
let apply_form = new Apply_form();
Page({
  data: {
    category: {}, //义诊类别，
    submiting: true //表示是否正在提交中 防止重复提交。 TODO: 活动结束，按钮无法点击
  },

  onLoad: function() {
    apply_form.categorAll((res) => {
      this.setData({
        category: res.data.category
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
    let value = event.detail.value;
    if (this._checkSubmit(value)) {
      wx.showLoading({
        title: '提交中',
      })
      this.setData({
        submiting:true
      })
      apply_form.orderPlace(value, (res) => {
        wx.hideLoading();
        if (res.code == 201) {
          wx.showToast({
            title: '提交成功',
          })
          this.setData({
            submiting: false
          })
          setTimeout(function() {
            wx.redirectTo({
              url: '/pages/user_order/user_order',
            })
          }, 1500);
        }else{
          wx.showToast({
            title: '提交失败',
            icon:'none'
          })
          wx.hideLoading();
        }
      })
    }
  },
  /**
   * 发布有效性检测
   */
  _checkSubmit: function(value) {
    console.log(value);
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
    if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value.phone)) {
      wx.showToast({
        title: '请填写正确的手机号',
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