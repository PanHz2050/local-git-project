// components/search/index.js
import { BookModel } from '../../models/book'
import { KeywordModel } from '../../models/keyword'
import { paginationBev } from '../behaviors/pagination'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
	/**
	 * 组件的属性列表
	 */
	// 使用行为组件
	behaviors: [paginationBev],
	properties: {
		more: {
			type: String,
			// observer监听 more属性的值有改变的时候就会执行自定义函数
			observer: 'loadMore'
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		historyWords: [],
		hotWords: [],
		searching: false, // 控制历史热门标签和搜索结果列表显示隐藏
		q: '', // q为搜索框的值
		loadingCenter: false // 控制初始加载动画显隐
		// dataArray: [], // behaviors已经继承了dataArray
		// loading: false, // 锁 控制加载更多 防止加载数据的问题 behaviors已经继承
		// noneResult: false // 没有搜索数据 behaviors已经继承
	},

	// 自定义组件的attached生命周期函数，从localStorage中获取搜索历史记录
	async attached() {
		// 获取本地缓存历史记录数据
		const historyWords = keywordModel.getHistory()
		// 获取获取热搜关键字(服务器)
		const hotWords = await keywordModel.getHot()
		this.setData({
			historyWords,
			hotWords: hotWords.hot
		})
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 加载更多
		async loadMore() {
			if (!this.data.q) {
				// q为空的情况
				return
			}
			if (this.isLocked()) {
				return // 解锁 this.data.loading = true
			}
			try {
				if (this.hasMore()) {
					this.locked() // this.data.loading = true 加锁
					const addDataArray = await bookModel.search(
						// length当前从服务器取回多少条的数据 const length = this.data.dataArray.length == getCurrentStart()
						this.getCurrentStart(),
						this.data.q
					)
					// const tempArray = this.data.dataArray.concat(addDataArray.books)
					// paginationBev 更新加载更多的数据  setMoreData(内部已经实现) == this.setData({}) == tempArray
					this.setMoreData(addDataArray.books)
					// this.setData({
					// 	dataArray: tempArray
					// })
					this.unLocked() // this.data.loading = false  解锁
				}
			} catch (error) {
				this.unLocked() // 断网 恢复后
			}
		},
		// 搜索功能 | 初次加载dataArray数据
		async onConfirm(e) {
			try {
				this._showResult() // 隐藏历史和热门搜索标签
				this._showLoadingCenter() // 数据加载之前 显示加载动画
				this.initialize() // 防止重复数据
				// word获取搜索框的值 const word = e.detail.value
				// text tag组件自定义传过来值 const text = e.detail.text
				const q = e.detail.value || e.detail.text
				// 获取搜索接口返回的数据 搜索0从第零页开始
				const dataArray = await bookModel.search(0, q)

				// 空数组处理,搜素结果为空 | 调用封装后的方法代替if
				// if (dataArray.books.length === 0) {
				// 	this.setData({
				// 		loadingCenter: false,
				// 		noneResult: true // 没有搜索数据
				// 	})
				// 	wx.showToast({
				// 		title: '无此内容QvQ~',
				// 		icon: 'none',
				// 		duration: 2000
				// 	})
				// 	return
				// }

				// dataArray初次赋值 | paginationBev
				this.setMoreData(dataArray.books)
				// 设置total
				this.setTotal(dataArray.total)
				this.setData({
					// dataArray: dataArray.books, setMoreData()代替this.setData
					q
				})
				// 添加搜索框值缓存
				keywordModel.addToHistory(q)
				this._hideLoadingCenter() // 数据加载之后关闭动画
				// console.log(dataArray)
			} catch (error) {
				this._hideLoadingCenter()
				this._showResult()
				// 处理搜索结果为空的情况
				this.setData({
					noneResult: true
				})
			}
		},
		// 清空输入框且关闭搜索页面结果
		onDelete(e) {
			this.initialize()
			this._closeResult()
		},
		// 关闭搜索面板
		onCancel(e) {
			this.initialize()
			// 发送给<v-search />
			this.triggerEvent('cancel', console.log('triggerEvent-cancel'))
		},

		/* -------------- 封装私有函数,增强可读性 ------------------- */

		_showResult() {
			// 隐藏历史和热门搜索标签
			this.setData({
				searching: true
			})
		},
		// 隐藏搜索结果,显示历史和热门搜索标签
		_closeResult() {
			this.setData({
				searching: false,
				q: ''
			})
		},
		_showLoadingCenter() {
			// 显示加载loading动画
			this.setData({
				loadingCenter: true
			})
		},
		_hideLoadingCenter() {
			this.setData({
				loadingCenter: false
			})
		}
	}

	/* ---------------- 分割线 ----------------------------- */

	// 加载更多(初始代码)
	// async _loadMore() {
	// 	if (!this.data.q) {
	// 		// q为空的情况
	// 		return
	// 	}
	// 	if (this.data.loading) {
	// 		// 解锁
	// 		return
	// 	}
	// 	// length当前从服务器取回多少条的数据
	// 	const length = this.data.dataArray.length
	// 	this.data.loading = true // 锁住
	// 	const addDataArray = await bookModel.search(length, this.data.q)
	// 	const tempArray = this.data.dataArray.concat(addDataArray.books)
	// 	this.setData({
	// 		dataArray: tempArray
	// 	})
	// 	this.data.loading = false // 解锁
	// 	console.log(tempArray)
	// },

	// // Promise方式 获取搜索接口返回的数据
	// bookModel.search(0, word || text).then((res) => {
	// 	// 返回空数组
	// 	if (res.books.length === 0) {
	// 		wx.showToast({
	// 			title: '无此内容QvQ~',
	// 			icon: 'none',
	// 			duration: 2000
	// 		})
	// 		return
	// 	}
	// 	this.setData({
	// 		dataArray: res.books
	// 	})
	// 	// 添加搜索框值缓存
	// 	keywordModel.addToHistory(word || text)
	// 	console.log(res.books)
	// })
})
