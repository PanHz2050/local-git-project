// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
    },
    count: {
      type: Number,
    },
    readOnly:{
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // like: true,
    // count:99,
    yesSrc: './images/like.png',
    noSrc: './images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(e) {
      // 控制是否点击like组件
      if (this.properties.readOnly) {
        return
      }
      // 这里不能用const
      let like = this.properties.like
      let count = this.properties.count
      // 因为count尝试改变like和count的值
      count = like ? count - 1 : count + 1

      this.setData({
        count: count,
        like: !like,
      })

      // 自定义事件
      let behavior = this.properties.like?'like':'cancel'
      this.triggerEvent('like', {
        behavior
      })
      // console.log(e)
    }
  }
})