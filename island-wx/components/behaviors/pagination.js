/* Behavior 类似于mixins和traits的组件间代码复用机制 */
const paginationBev = Behavior({
	data: {
		dataArray: [],
		total: null, // 服务器返回数组的长度
		loading: false,
		noneResult: false,
	},
	methods: {
		// 更新数据
		setMoreData(addDataArray) {
			const tempArray = this.data.dataArray.concat(addDataArray)
			this.setData({
				dataArray: tempArray
			})
			// console.log('paginationBev-dataArray')
		},
		// 获取返回起始的记录数
		getCurrentStart() {
			return this.data.dataArray.length
		},
		// total用户传进来的 服务器返回来的数组
		setTotal(total) {
			this.data.total = total
			// total为零的时候表示没有搜索到数据
			if (total === 0) {
				this.setData({
					noneResult: true
				})
			}
		},
		// 是否还有更多的数据要加载
		hasMore() {
			if (this.data.dataArray.length >= this.data.total) {
				return false // 没有更多数据要加载了
			} else {
				return true
			}
		},
		// 初始化 --> 点击搜索框×时再进入 解决重复加载问题
		initialize() {
			// this.setData({}) 更新的数据会重新更新通知wxml对应变量的值,而this.data直接赋值不会更新
			this.setData({
				dataArray: [],
				noneResult: false
			})
			this.data.total = null
		},
		// 判断的锁状态
		isLocked() {
			return this.data.loading ? true : false
		},
		// 加锁
		locked() {
			this.setData({
				loading: true
			})
		},
		// 解锁
		unLocked() {
			this.setData({
				loading: false
			})
		}
	}
})

export { paginationBev }
