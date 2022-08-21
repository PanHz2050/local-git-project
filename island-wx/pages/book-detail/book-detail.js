// pages/book-detail/book-detail.js
// 业务逻辑在model中处理, pages页面处理前端UI交互,数据绑定
import { BookModel } from '../../models/book'
import { LikeModel } from '../../models/like'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		comments: [],
		book: null,
		likeStatus: false,
		likeCount: 0,
		posting: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	async onLoad(options) {
		wx.showLoading({
			title: '正在加载'
		})
		// id外部(components->book/index.js组件)传递过的参数
		const bid = options.bid
		// console.log('bid =>', bid)
		// 获取书籍详细信息
		const details = await bookModel.getDetail(bid)
		// 获取书籍点赞情况
		const likeStatus = await bookModel.getLikeStatus(bid)
		// 获取书籍短评
		// const comments = await bookModel.getComments(bid)

		// Promise方式来获取书籍短评
		bookModel.getComments(bid).then(res => {
			this.setData({
				comments: res.comments
			})
		})

		// 数据绑定更新
		this.setData({
			book: details,
			likeStatus: likeStatus.like_status,
			likeCount: likeStatus.fav_nums
		})

		// 返回新的Promise 合体
		Promise.race([details, likeStatus]).then(() => {
			wx.hideLoading()
			// console.log(res)
		})
	},
	// 书籍内容点赞 400为书籍的类型
	onLike(e) {
		const like_or_cancel = e.detail.behavior
		likeModel.like(like_or_cancel, this.data.book.id, 400)
		// console.log(e)
	},
	// 控制显示或者隐藏短评面板
	onFakePost(e) {
		this.setData({
			posting: true
		})
	},
	onCancel(e) {
		this.setData({
			posting: false
		})
	},
	// 短评事件
	onPost(e) {
		// tag内容text 或者|| input输入的内容
		const comment = e.detail.text || e.detail.value

		// 文本检测处理
		if (!comment) {
			return
		}
		if (comment.length > 12) {
			wx.showToast({
				title: '评论最多12个字',
				icon: 'none'
			})
			return
		}
		// 提交短评
		bookModel.postComment(this.data.book.id, comment).then(res => {
			wx.showToast({
				title: '+ 1',
				icon: 'none'
			})
			// 新增点击tag内容
			this.data.comments.unshift({
				content: comment,
				nums: 1
			})
			// 数据更新setData comments
			this.setData({
				comments: this.data.comments,
				posting: false
			})
		})
		// console.log(comment);
	}

	/**
	 * 用户点击右上角分享
	 */
	// onShareAppMessage: function () {}
})
