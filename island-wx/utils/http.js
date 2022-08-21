import { config } from '../config.js'
import { Base64 } from '../utils/base64'
import { Token } from '../models/token'

const tips = {
	1: '抱歉, 出现了一个错误',
	1005: 'appkey无效,appkey无效,appkey无效~',
	3000: '期刊不存在'
}

// Http 需要通过回调函数获取接口返回的数据
class Http {
	// params是js对象
	request(params) {
		if (!params.method) {
			params.method = 'GET'
		}
		wx.request({
			url: config.api_base_url + params.url,
			method: params.method,
			data: params.data,
			header: {
				'content-type': 'application/json',
				// appkey: config.appkey,
				Authorization: this._encode()
				// authorization: `Bearer ${this._encode()}`
			},
			success: res => {
				let code = res.statusCode.toString()
				if (code.startsWith('2')) {
					// 导致报错params.success is not a function || 处理 ==> params.success && params.success(res)
					params.success && params.success(res.data)
					// params.success(res) //原来
				} else {
					let error_code = res.data.error_code
					this._showError(error_code)
					console.log('请求失败')
				}
				// console.log(code)
			},
			fail: () => {
				this._showError(1)
			}
		})
		// console.log(that)
	}

	_encode() {
		const token = wx.getStorageSync('token')
		// const result = Base64.encode(token + ':')
		const result = Base64.encode(token)
		// console.log('result1231', result)
		return 'Basic ' + result
		// return token
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
