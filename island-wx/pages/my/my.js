// pages/my/my.js
import { BookModel } from '../../models/book'
import { ClassicModel } from '../../models/classic'

const classicModel = new ClassicModel()
const bookModel = new BookModel()
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		bookCount: 0,
		userInfo: null,
		authorized: false,
		classics: null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {
		this.isAutoUserinfo()
		// this.userAuthorized()
	},

	// userAuthorized() {
	// 	// 是否获取到用户信息
	// 	wx.getSetting().then(res => {
	// 		// console.log(res.authSetting)
	// 		console.log(res)
	// 	})
	// },

	/**
	 * onShow可以频繁刷新，onLoad不能。
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		this.getMyBookCount()
		this.getMyFavor()
	},
	// 获取喜欢书籍数量
	async getMyBookCount() {
		const bookCount = await bookModel.getMyBookCount()
		this.setData({
			bookCount: bookCount.count
		})
	},
	// 获取我喜欢的期刊内容(我的页面用到) getMyFavor
	getMyFavor() {
		classicModel.getMyFavor(res => {
			this.setData({
				classics: res
			})
			// console.log(res)
		})
	},
	onJumpToDetail(e) {
		// 通过 <v-preview /> 组件获取 cid和type
		let cid = e.detail.cid
		let type = e.detail.type
		wx.navigateTo({
			url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
		})
	},
	// 获取用户个人信息
	getUserProfile(e) {
		let userinfo = wx.getStorageSync('userinfo')
		if (!userinfo) {
			// Promise方式实现
			wx.getUserProfile({ desc: '用于完善会员资料' }).then(
				res => {
					this.setData({
						userInfo: res.userInfo,
						authorized: true
					})
					wx.setStorageSync('userinfo', res.userInfo)
					// console.log(res)
				},
				err => {
					console.log('err -> ', err)
				}
			)
		}
		// wx.getUserProfile({
		// 	// desc 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
		// desc: '用于完善会员资料',
		// 	success: res => {
		// 		this.setData({
		// 			userInfo: res.userInfo,
		// 			authorized: true
		// 		})
		// 		console.log(res)
		// 	}
		// })
	},

	isAutoUserinfo() {
		let userinfo = wx.getStorageSync('userinfo')
		if (!userinfo) {
			this.setData({
				authorized: false
			})
		} else {
			this.setData({
				authorized: true,
				userInfo: userinfo
			})
		}
	},

	onJumpToAbout() {
		// wx.navigateTo({
		// 	url: '/pages/about/about'
		// })
		console.log('onJumpToAbout')
	},
	onJumpToStudy() {
		wx.navigateTo({
			url: '/pages/study/study'
		})
		// console.log('onStudy')
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {}
})
