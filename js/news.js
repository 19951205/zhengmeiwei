//http://test.zmw88.com/api/portal/lists/getCategoryPostLists?category_id=2&page=1
//addUrlPara('page', 1)
var page = parseInt(window.location.href.split('#').pop())
if (page > 1) {
	ajaxTest(page)
	console.log(page)
} else {
	ajaxTest(1)
}
function ajaxTest(num) {
	if($("#page" + num).children().length < 1) {
		$.ajax({
			url: baseUrl + "/api/portal/lists/getCategoryPostLists?category_id=2&page=" + num,
			type: "get",
			dataType: "json",
			success: function(res) {
				var html = '',
					htmlMain = '',
					res_ok = res.code,
					list = res.data.list,
					totalPage = Math.ceil(res.data.page_num / list.length);
				if(res_ok === 1) {
					for(var i = 1; i < totalPage + 1; i++) {
						html += '<div class="news-tab-main zmw-pro mgt100" id="page' + i + '"></div>'
					}
					$('#news-tab-list').append(html)
					for(var k = 0; k < list.length; k++) {
						var dates = list[k].published_time.split(' ')[0].split('-');
						htmlMain += '<div class="industry clearfix">' +
								'<div class="img pull-left w100">' +
								'<img src="' + list[k].more.thumbnail + '" />' +
								'</div>' +
								'<div class="main pull-left mgt100 w100">' +
								'<div class="zmw-base-data">' +
								'<p class="fs36 line35">' + dates[1] + '-' + dates[2] + '</p>' +
								'<span class="fs16 line20">' + dates[0] + '</span>' +
								'</div>' +
								'<div class="line mgt36"></div>' +
								'<div class="mgt36 industry-main">' +
								'<h2 class="fs24 line37">' + list[k].post_title + '</h2>' +
								'<p class="fs14 line24 mgt36">' + list[k].post_excerpt + '</p>' +
								'</div>' +
								'<div class="zmw-base-more mgt85">' +
								'<a href=' + baseUrl + '/article/' + list[k].id + '.html> 查看更多</a>' +
								'</div>' +
								'</div>' +
							'</div>'
					}
					$("#page" + num).append(htmlMain)
					$("#page" + num).addClass('active').siblings().removeClass('active')
					var winWidth = $(window).width();
					if(winWidth > 768) {
						var tabHeight = $('.industry').height() + 20;
						$('.industry .img').css({
							'height': tabHeight
						})
					}
				}
				//分页
				$("#page").paging({
					pageNo: num,
					totalPage: totalPage,
					totalSize: res.page_num,
					callback: function(num) {
						if($("#page" + num).children().length < 1) {
							$.ajax({
								url: baseUrl + "/api/portal/lists/getCategoryPostLists?category_id=2&page=" + num,
								type: "get",
								dataType: "json",
								success: function(res) {
									var html = '',
										htmlMain = '',
										res_ok = res.code,
										list = res.data.list,
										totalPage = Math.ceil(res.data.page_num / list.length);
									if(res_ok === 1) {
										for(var k = 0; k < list.length; k++) {
											var dates = list[k].published_time.split(' ')[0].split('-');
											htmlMain += '<div class="industry clearfix">' +
												'<div class="img pull-left w100">' +
												'<img src="' + list[k].more.thumbnail + '" />' +
												'</div>' +
												'<div class="main pull-left mgt100 w100">' +
												'<div class="zmw-base-data">' +
												'<p class="fs36 line35">' + dates[1] + '-' + dates[2] + '</p>' +
												'<span class="fs16 line20">' + dates[0] + '</span>' +
												'</div>' +
												'<div class="line mgt36"></div>' +
												'<div class="mgt36 industry-main">' +
												'<h2 class="fs24 line37">' + list[k].post_title + '</h2>' +
												'<p class="fs14 line24 mgt36">' + list[k].post_excerpt + '</p>' +
												'</div>' +
												'<div class="zmw-base-more mgt85">' +
												'<a href=' + baseUrl + '/article/' + list[k].id + '.html> 查看更多</a>' +
												'</div>' +
												'</div>' +
												'</div>'
										}
										$("#page" + num).append(htmlMain)
										var winWidth = $(window).width();
										if(winWidth > 768) {
											var tabHeight = $('#page' + num + ' .industry').height() + 20;
											$('#page' + num + ' .industry .img').css({
												'height': tabHeight
											})
										}
									}
								}
							})
						}
						window.location.hash=num
						$("#page" + num).addClass('active').siblings().removeClass('active')
						$(window).scrollTop(0)
					}
				})
			}
		})
	}
}