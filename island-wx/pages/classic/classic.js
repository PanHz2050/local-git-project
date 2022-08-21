import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Component({
	properties: {
		cid: Number,
		type: Number
	},

	data: {
		classicData: null,
		latest: true,
		first: false,
		// like状态相关初始数据
		likeCount: 0,
		likeStatus: false
	},
	// 组件生命周期函数-在组件实例进入页面节点树时执行)
	attached(options) {
		const cid = this.properties.cid
		const type = this.properties.type
 		if (!cid) {
			// 获取最新一期的期刊
			classicModel.getLatest(res => {
				// this._getLikeStatus(res.id, res.type)
				this.setData({
					classicData: res,
					// getLatest已经有了_getLikeStatus一次相关的点赞数据所以不用发送
					likeCount: res.fav_nums,
					likeStatus: res.like_status
				})
				// latestClassic latstIndex currentClassic currentIndex
				// console.log(res)
			})
		} else {
			classicModel.getById(cid, type, res => {
				this._getLikeStatus(res.id, res.type)
				this.setData({
					classicData: res,
					latest: classicModel.isLatest(res.index),
					first: classicModel.isFirst(res.index)
				})
			})
		}
	},
	methods: {
		onLike(e) {
			const behavior = e.detail.behavior
			likeModel.like(
				behavior,
				this.data.classicData.id,
				this.data.classicData.type
			)
			// console.log(this.data.classicData.id, this.data.classicData.type);
		},

	 onNext(e) {
			this._updataClassic('next')
		},

		onPrevious(e) {
			this._updataClassic('previous')

			// index 为当前期刊
			// let index = this.data.classicData.index
			// classicModel.getPrevious(index, (res) => {
			// 	this.setData({
			// 		classicData: res,
			// 		latest: classicModel.isLatest(res.index),
			// 		first: classicModel.isFirst(res.index)
			// 	})
			// 	console.log(res)
			// })
		},

		_updataClassic(nextOrPrevious) {
			const index = this.data.classicData.index
			classicModel.getClassic(index, nextOrPrevious, res => {
				this._getLikeStatus(res.id, res.type)
				this.setData({
					classicData: res,
					latest: classicModel.isLatest(res.index),
					first: classicModel.isFirst(res.index)
				})
				// console.log(res)
			})
		},

		// 独立更新like组件状态 _getLikeStatus应该在_updataClassic里面调用
		_getLikeStatus(artID, category) {
			likeModel.getClassicLikeStatus(category, artID, res => {
				// res回调已经拿到like状态相关数据
				this.setData({
					likeCount: res.fav_nums,
					likeStatus: res.like_status
				})
				// console.log(res)
			})
		}
	}
})
