import { Http } from '../utils/http-p'

class BookModel extends Http {
	// 下面的方法不是static, 调用的时候需要new实例化对象

	// 获取热门书籍(概要)
	getHotList() { 
		return this.request({
			url: 'book/hot_list'
		})
	}
	/*  
      书籍搜索search Parameters: start: 开始记录数，默认为0; count: 记录条数，默认为20,超过依然按照20条计算;
      summary: 返回完整或简介,默认为0,0为完整内容,1为简介; q:搜索内容,比如你想搜索python相关书籍,则输入python。
  */
	search(start, q) {
		return this.request({
			url: 'book/search?summary=1',
			data: {
				q: q,
				start: start
			}
		})
	}
	// 获取喜欢书籍数量
	getMyBookCount() {
		return this.request({
			url: 'book/favor/count'
		})
	}
	// 获取书籍详细信息
	getDetail(bid) {
		return this.request({
			url: `book/${bid}/detail`
		})
	}
	// 获取书籍点赞情况
	getLikeStatus(bid) {
		return this.request({
			url: `book/${bid}/favor`
		})
	}
	// 获取短评论
	getComments(bid) {
		return this.request({
			url: `book/${bid}/short_comment`
		})
	}

	// 提交评论
	postComment(bid, comment) {
		return this.request({
			url: 'book/add/short_comment',
			method: 'POST',
			data: JSON.stringify({
				book_id: bid,
				content: comment
			})
		})
	}
}

export { BookModel }
