// components/navi/navi.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		title: String,
		first: Boolean,
		latest: Boolean,
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		disLeftSrc: 'images/triangle.dis@left.png',
		leftSrc: 'images/triangle@left.png',
		disRightSrc: 'images/triangle.dis@right.png',
		rightSrc: 'images/triangle@right.png',
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onLeft(e) {
			if (!this.properties.latest) {
				this.triggerEvent('left', {
					behavior: 'onLeft111',
				})
			} 
		},
		onRight(e) {
			if (!this.properties.first) {
				this.triggerEvent('right', {
					behavior: 'onRight2222',
				})
			}
		},
	},
})
