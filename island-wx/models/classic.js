import { Http } from '../utils/http'

// 通过继承的方式 就不需要实例化了
class ClassicModel extends Http {
	// 获取最新一期期刊
	getLatest(sCallback) {
		this.request({
			url: 'classic/latest',
			success: res => {
				sCallback(res)
				// 把index写入本地缓存
				this._setLatestIndex(res.index)
				// 设置latest缓存内容
				let key = this._getKey(res.index)
				wx.setStorageSync(key, res)
			}
		})
	}

	// 重构 getNext getPrevious
	getClassic(index, nextOrPrevious, sCallback) {
		// 缓存中寻找 or API 写入缓存中
		// 设计key, 这个key确定是哪一期的期刊
		let key =
			nextOrPrevious == 'next'
				? this._getKey(index + 1)
				: this._getKey(index - 1)
		// 如果缓存有数据,就直接取
		let classic = wx.getStorageSync(key)
		// 如果没有找到classic缓存的数据,那么就向服务器发送请求
		if (!classic) {
			this.request({
				url: `classic/${index}/${nextOrPrevious}`,
				success: res => {
					// 请求到的数据写入缓存,index(res.index)是服务器加载回来的key,res对应的value
					wx.setStorageSync(this._getKey(res.index), res)
					sCallback(res)
					// console.log(res)
				}
			})
		} else {
			sCallback(classic)
		}
	}

	// 获取我喜欢的期刊内容(我的页面用到)
	getMyFavor(sCallback) {
		const params = {
			url: 'classic/favor',
			success: res => {
				sCallback(res)
			}
		}
		this.request(params)
	}
	// 获取某一期详细信息
	getById(cid, type, success) {
		let params = {
			url: `classic/${type}/${cid}`,
			success: success
		}
		this.request(params)
	}

	// 判断当前期刊是否为第一个
	isFirst(index) {
		// ==
		return index == 1 ? true : false
	}
	isLatest(index) {
		let latestIndex = this._getLatestIndex()
		return latestIndex == index ? true : false
	}

	_getLatestIndex() {
		let index = wx.getStorageSync('latest')
		return index
	}

	_setLatestIndex(index) {
		// 同步的写入缓存
		// key 确定key
		wx.setStorageSync('latest', index)
	}

	// index 当前期刊的序号
	_getKey(index) {
		let key = 'classic-' + index
		return key
	}
}

// 获取上一期期刊内容(原来)
// getPrevious(index, sCallback) {
// 	this.request({
// 		url: `classic/${index}/previous`,
// 		success: (res) => {
// 			sCallback(res)
// 		}
// 	})
// }

export { ClassicModel }
