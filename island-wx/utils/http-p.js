// Promise改写Http
import { config } from '../config.js'
import { Token } from '../models/token'
import { Base64 } from 'js-base64'

const tips = {
	1: '抱歉, 出现了一个错误',
	1005: 'appkey无效,appkey无效,appkey无效~',
	3000: '期刊不存在'
}

class Http {
	/**
	 * 重构request 传入一个对象 {url, data = {}, method = 'GET'}
	 * @param {Object} param
	 * @return
	 */
	request({ url, data = {}, method = 'GET' }) {
		return new Promise((resolve, reject) => {
			this._request(url, resolve, reject, data, method)
		})
	}

	// 必填参数必须在默认参数之前
	_request(url, resolve, reject, data = {}, method = 'GET') {
		wx.request({
			url: config.api_base_url + url,
			method: method,
			data: data,
			header: {
				'content-type': 'application/json',
				appkey: config.appkey,
				Authorization: `Basic ${this._encode()}`
			},
			success: res => {
				const code = res.statusCode.toString()
				if (code.startsWith('2')) {
					// resolve 改变状态
					resolve(res.data)
				} else {
					reject()
					const error_code = res.data.error_code
					this._showError(error_code)
					console.log('请求失败')
				}
			},
			fail: err => {
				reject()
				this._showError(1)
			}
		})
		// console.log(that)
	}

	_encode() {
		const token = wx.getStorageSync('token')
		const result = Base64.encode(token + ':')
		// console.log(result)
		return result
	}

	_refetch(...param) {
		let token = new Token()
		token.getTokenFromServer((token) => {
			this._request(...param, true)
		})
	}

	_showError(error_code) {
		if (!error_code) {
			error_code = 1
		}
		wx.showToast({
			title: tips[error_code],
			icon: 'none',
			duration: 1000
		})
	}
}

export { Http }
