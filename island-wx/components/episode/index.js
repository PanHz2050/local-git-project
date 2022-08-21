// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
      // 不要在observer中修改自身属性值
      observer(newVal, oldVal, index) {
        let val = newVal < 10 ? '0' + newVal : newVal
        this.setData({
          _index: val
        })
        // console.log(val)
      }
    },
    pubdate: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',],
    year: '',
    month: '',
    _index: ''
  },

  attached() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()

    this.setData({
      year,
      month: this.data.months[month]
    })
    // console.log(year)
  },

  /**
   * 组件的方法列表
   */
  methods: {
   
  }
})
