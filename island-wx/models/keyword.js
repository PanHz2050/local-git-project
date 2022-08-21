import { Http } from "../utils/http-p"

// search 搜索数据处理
class KeywordModel extends Http {
	// 实例属性
	// key='q' setStorageSync(key,value)
	key = 'q'
	maxLength = 10

	getHistory() {
		// 获取缓存数据 words: []
		const words = wx.getStorageSync(this.key)
		// 如果words不进行判断处理,下面调用words.includes()会报错
		if (!words) {
			return []
		}
		// 最后返回空值处理后的数组
		const r = words.filter((s) => {
			return s && s.trim()  // 注：IE9(不包含IE9)以下的版本没有trim()方法
		})
		return r
		// return words
	}

	// 从服务器获取获取热搜关键字
	getHot() {
    return this.request({
      url: 'book/hot_keyword'
    })
  }

	// 历史记录写入缓存
	addToHistory(keyword) {
    // 空值处理
		if (keyword === '') {
			return
		}
		// words get到一组数组数据
		let words = this.getHistory()
		// 确定输入的keyword是否在缓存数据中
		const has = words.includes(keyword)
		// 队列 栈
		// 判断是否存在缓存元素
		if (!has) {
			// 数组末尾删除,keyword数组第一位
			const length = words.length
			if (length >= this.maxLength) {
				// 删除末尾数组元素
				words.pop()
			}
			// 添加元素在数组首位 
			words.unshift(keyword)
			// 添加缓存数据
			wx.setStorageSync(this.key, words)
		}
	}
}
// value 应该为数组
// wx.setStorageSync(this.key, value)

export { KeywordModel }
