// components/star/star.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     count:Number,
     detail:String
  },

  /**
   *组件附加 
   */
  attached:function(){
    let countArr=new Array(this.data.count);
    this.setData({
      countArr:countArr
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
     countArr:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
