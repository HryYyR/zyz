var moveX = 0;
var moveY = 0;
var stepX = 1;
var stepY = 0.5;
var directionX = 0;
var directionY = 0;

function changePos() {
	var img = document.getElementById("float");
	var height = document.documentElement.clientHeight;
	var width = document.documentElement.clientWidth;
	var imgHeight = document.getElementById("floatImg").height;
	var imgWidth = document.getElementById("floatImg").width;

	img.style.left = parseInt(moveX + document.documentElement.scrollLeft) + "px";

	img.style.top = parseInt(moveY + document.documentElement.scrollTop) + "px";

	if (directionY == 0) {
		moveY += stepY;
	} else {
		moveY -= stepY;
	}
	if (moveY < 0) {
		directionY = 0;
		moveY = 0;
	}
	if (moveY > (height - imgHeight)) {
		directionY = 1;
		moveY = (height - imgHeight);
	}

	if (directionX == 0) {
		moveX += stepX;
	} else {
		moveX -= stepX;
	}
	if (moveX < 0) {
		directionX = 0;
		moveX = 0;
	}
	if (moveX > (width - imgWidth)) {
		directionX = 1;
		moveX = (width - imgWidth);
	}
}
// float = setInterval("changePos()", 10);
$(function() {

	$("#float").mouseenter(function() {
		clearInterval(float)
		$(".drop").stop().animate({
			opacity: "1"
		})
	});
	$("#float").mouseleave(function() {
		float = setInterval("changePos()", 10);
		$(".drop").stop().animate({
			opacity: "0"
		})
	});

	$(".drop").click(function() {
		$("#float").css({
			"display": "none"
		})
	})

	window.onscroll = function() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if (scrollTop >= 105) {
			$(".el-menu-demo").css({
					"position": "fixed",
					"margin-top": "-100px"
					// "width":"100%"
				}

			)

		} else {
			$(".el-menu-demo").css({
					"position": "relative",
					"margin-top": "0px"
				}

			)
		}

	}

	// 自适应
	function zsy() {
		let w = document.documentElement.clientWidth;
		let i = document.getElementsByClassName("fc_body")
		let j = $(".el-menu-demo")
		if (w > 1851) {
			for (var y = 0; y < i.length; y++) {
				i[y].style.width = 42 + "%"
			}
			// j.css({
			// 	"padding": "0 33.5%"
			// })
		}
		if (w > 1450 && w < 1850) {
			i[0].style.width = 530 + "px"
			i[1].style.width = 570 + "px"
			i[2].style.width = 530 + "px"
			i[3].style.width = 500 + "px"
			// j.css({
			// 	"padding": "0 30.5%"
			// })
		}
		if (w < 1449) {

			i[0].style.width = 420 + "px"
			i[1].style.width = 480 + "px"
			i[2].style.width = 420 + "px"
			i[3].style.width = 380 + "px"
			// j.css({
			// 	"padding": "0 27%"
			// })
		}
		// console.log(w++);
	}
	window.onresize = function() {
		try {
			zsy()
		} catch (err) {
			return
		}
	}
	var aLink = document.getElementsByTagName('a');
	for (var i = 10; i < aLink.length; i++) {
		aLink[i].target = '_blank';
	}
})
