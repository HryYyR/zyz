$(function() {

	(function get() {
		// 数据
		var index = 1
		var name = ['张三', '里斯', '王五', '赵六', '力气']
		var img = [1, 2, 3]
		var id = [1527, 1211, 1527, 1728, 1987, 1203]
		var rank = [123, 120, 119, 99, 89, 88]
		// 前三的渲染
		for (var i = 0; i < 3; i++) {
			let scope = `<li class="phb_li">
							<div class="li_index"><img src="./img/${img[i]}.svg"></div>
							<div class="li_name">${name[i]}</div>
							<div class="li_id">${id[i]}</div>
							<div class="li_rank"><img src="./img/rank.svg">${rank[i]}</div>
						</li>`
			$(".phb_ul").append(scope)
			index++
		}
		// 后面所有的渲染
		for (var i = 3; i < 5; i++) {
			let scope = `<li class="phb_li">
							<div class="li_index">${index}</div>
							<div class="li_name">${name[i]}</div>
							<div class="li_id">${id[i]}</div>
							<div class="li_rank"><img src="./img/rank.svg">${rank[i]}</div>
						</li>`
			$(".phb_ul").append(scope)
			index++
		}
	})()

})
