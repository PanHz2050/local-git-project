import { Http } from '../utils/http'

class LikeModel extends Http {
	// 进行点赞 or 取消点赞 behavior == 'like' ? 'like' : 'like/cancel'
	like(behavior, artID, category) {
		let url = behavior == 'like' ? 'like' : 'like/cancel'
		this.request({
			url: url,
			method: 'POST',
			data: {
				artId: artID,
				type: category
			}
			/* 如果这里使用回调函数会导致报错params.success is not a function || 处理 ==> params.success && params.success(res)
			// params.success(res)
			// 因为这里不用传回调函数
			// success: (res) => {
			//   sCallBack(res)
			// }
			*/
		})
	}
	// 实时获取classic页面点赞状,点赞 不应该加入缓存
	// Parameters: type: 必填, 点赞类型 id: 必填, 点赞对象的id号
	getClassicLikeStatus(category, artID, sCallback) {
		this.request({
			url: `classic/${category}/${artID}/favor`,
			success: sCallback
		})
	}
}

export { LikeModel }
