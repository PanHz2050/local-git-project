import { Token } from './models/token'
// app.js test111 ~
App({
	onLaunch() {
		// 展示本地存储能力
		// const logs = wx.getStorageSync('logs') || []
		// logs.unshift(Date.now())
		// wx.setStorageSync('logs', logs)

		// 登录
		// wx.login({
		//   success: res => {
		//     // 发送 res.code 到后台换取 openId, sessionKey, unionId
		//     console.log(res);
		//   }
		// })

		// console.log(this.globalData.userInfoA);

		const token = new Token()
		token.verify()
		
	},
	globalData: {
		userInfoA: {
			a: 'abc'
		}
	}
})
