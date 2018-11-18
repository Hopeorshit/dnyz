import {
  Comment
} from '../../model/comment.js'
let comment = new Comment();

Page({
  data: {
    Score: 0, //已经点亮的星星数
    noScore: 5, //没有点亮的星星数
    detail: '',
  },
  onLoad: function(options) {
    console.log(options);
    let order_id = options.order_id;
    this.setData({
      order_id: order_id,
      order_status:options.order_status
    })
    comment.volInfo(order_id, (res) => {
      this.setData({
        vol: res.data.vol
      })
    })
  },


  onScoreTap: function(event) {
    var nowStar = event.currentTarget.dataset.score; //当前点的星星的状态,初始值为空星星
    // console.log("in_xin:"+in_xin);
    var score; //评分数
    if (nowStar === 'noStar') { //如果点的星星是空的
      score = Number(event.currentTarget.id) + this.data.Score; //
      // console.log("else_one_2:"+score);
    } else { //如果点的星星是满的
      score = Number(event.currentTarget.id); //
      // console.log("if_one_2:"+score);
    }
    // console.log(score);
    this.setData({
      Score: score,
      noScore: 5 - score
    })
  },
  //评价输入控制
  onDetailInput: function(e) {
    // console.log(e.detail.value);
    this.setData({
      detail: e.detail.value
    })
  },

  //提交评价内容
  onSubmitTap: function(event) {
    console.log(event)
    let value = event.detail.value;
    if(this.checkSubmit(value)){  
      comment.orderComment(this.data.order_id, this.data.Score, value.detail, (res) => {
        wx.showToast({
          title: '评价成功',
        })
        setTimeout(function() {
          wx.navigateBack()
        }, 1500)
      })
    }
  },

  /**
   * 检测评价表单
   */
  checkSubmit:function(value){
    if (this.data.Score == 0) {
      wx.showToast({
        title: '动动手指头点下星星呗',
        icon: 'none'
      })
      return false
    }
    if (!value.detail) {
      wx.showToast({
        title: '您的留言对我们至关重要',
        icon: 'none'
      })
      return false
    }

    return true
  }



})