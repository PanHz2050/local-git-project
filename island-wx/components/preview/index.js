// components/preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classic: {
      type: Object,
      // newVal表示每一个classic[i]
      observer(newVal) {
        if (newVal) {
          // const let 是块级作用域 把typeText提前到外面 或者 使用 var
          var typeText = {
            100: '电影',
            200: '音乐',
            300: '句子'
          } [newVal.type]
          // var typeText2 = {
          //   100: '电影',
          //   200: '音乐',
          //   300: '句子'
          // }
          // var typeText3 = typeText2[newVal.type]
        }

        this.setData({
          typeText
        })

      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  attached() {
    // console.log(this.properties.classic)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      this.triggerEvent('tapping', {
        cid: this.properties.classic.id,
        type: this.properties.classic.type
      })
    }
  }
})