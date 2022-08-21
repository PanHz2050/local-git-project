import { classicBeh } from '../classic-beh'

// 定义音乐管理对象
const mMgr = wx.getBackgroundAudioManager()

// components/classic/music/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	behaviors: [classicBeh],
	properties: {
		src: String,
		title: String
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		playing: Boolean,
		playSrc: 'images/player@play.png',
		pauseSrc: 'images/player@pause.png'
	},

	/**
	 * 在组件实例进入页面节点树时执行
	 */
	attached(e) {
		this._recoverStatus()
		this._monitorSwitch()
	},

	detached: function (event) {
		// wx:if hidden
		// mMgr.stop()
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onPlay(e) {
			// 切换图片播放或者暂停
			if (!this.data.playing) {
				this.setData({
					playing: true
				})
				mMgr.src = this.properties.src
				mMgr.title = this.properties.title
			} else {
				this.setData({
					playing: false
				})
				mMgr.pause()
			}
			// console.log(e)
		},

		// 恢复状态,切换别的页面播放音乐
		_recoverStatus() {
			// mMgr.paused 当前是否暂停或停止
			if (mMgr.paused) {
				this.setData({
					playing: false
				})
				// 两个if,return结束,不加return有可能两个if的代码都会执行一遍
				return
			}
			// 对应当前期刊音乐的src
			if (mMgr.src == this.properties.src) {
				this.setData({
					playing: true
				})
			}
		},

		// 系统播放面板控制UI播放和暂停
		_monitorSwitch() {
			mMgr.onPlay(() => {
				this._recoverStatus()
			})
			mMgr.onPause(() => {
				this._recoverStatus()
			})
			mMgr.onStop(() => {
				this._recoverStatus()
			})
			mMgr.onEnded(() => {
				this._recoverStatus()
			})
		}
	}
})
