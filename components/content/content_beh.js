let contentBeh = Behavior({
  properties: {

  },
  data: {
    content:{
      page_size: 10,
      page: 1,
      more: true,
      empty: false,
      list: []
    }
  },

  methods: {
    setMoreData: function(content) { //上拉刷新的时候触发

    },
    more: function() { //返回是否还有更多
      return this.data.content.more
    },
    empty: function() { //返回是否为空
      return this.data.content.empty
    },
    initContent: function() { //初始化页面的时候触发
      this.setData({
        content: {
          page_size: 10,
          page: 1,
          more: true,
          empty: false,
          list: []
        }
      })
    }
  }
})


export {
  contentBeh
}