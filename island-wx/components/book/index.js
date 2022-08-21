// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e) {
      const bid = this.properties.book.id
      // console.log(bid)
      // 方式一 直接在这组件内容通过navigateTo跳转页面详情,这样降低了组件的通用性
      // bid发送到 book-detail页面 由onLoad(options)函数监听获取bid
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`,
      })
      // 方式二 发送自定义事件到book页面,在book页面跳转 
      // this.triggerEvent('bids', {
      //   bid
      // })
    }
  }
})
