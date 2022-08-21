// components/tag/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	// 插槽属性设置
	options: {
		multipleSlots: true
	},
	// 外部样式类
	externalClasses: ['tag-class'],
	properties: {
		text: String,
		style1: String
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		blue: 'blue',
		red: 'red',
		toggleColor: false
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onTap(e) {
			this.triggerEvent('tapping', {
				text: this.properties.text
			})
			// console.log(this.properties.text)

			// 切换每条短评颜色状态
			// let toggleColor = this.data.toggleColor

			// this.setData({
			//   style1: `blue`,
			//   toggleColor: true
			// })

			// if (toggleColor) {
			//   this.setData({
			//     style1: `red`,
			//     toggleColor: false
			//   })
			// }
		}
	}
})
