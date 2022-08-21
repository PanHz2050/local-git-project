// pages/popular/popular.js
import { BookModel } from '../../models/book'
import { random } from '../../utils/common'

const bookModel = new BookModel()
// const random = random
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		books: [],
		searching: false,
		more: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	async onLoad(options) {
		// Promise方式处理调用接口返回的数据
		const book = bookModel.getHotList()
		book.then((res) => {
			this.setData({
				books: res
			})
		})

		// book.wxml绑定book组件自定义事件 用户当前点击的ID号, 通过book组件(监听用户点击事件)发送到这book页面
		// wx.navigateTo({
		// 	url: `/pages/book-detail/book-detail?bid=${bid}`,
		// })

		// async await方式处理调用接口返回的数据
		// const count = await bookModel.getMyBookCount()
		// console.log(count);
	},

	onSearching(e) {
		// 控制显示搜索 <v-search /> 组件 
		this.setData({
			searching: true
		})
	},
	onCancel(e) {
		this.setData({
			searching: false
		})
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	// 通知<v-search />触底加载更多数据
	onReachBottom () {
		this.setData({
			more: random(16)
		})
		// console.log(this.data.more)
	}

})
