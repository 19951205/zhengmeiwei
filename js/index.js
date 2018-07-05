var baseUrl = 'http://test.zmw88.com'
//定义banner左边的高
function bannerLeft() {
	//左右的字体距离顶部高度
	var marTop = $('.zmw-base-scroll').height()/2,
		marLR = $('.zmw-base-scroll').width()/2,
		posTop = $('#banner').height()/2 + $('.zmw-nav').height(),
		winWindow = $(window).width(),
		posLeft = (winWindow - $('.zmw-banner').width())/4;
	$('.zmw-base-lscroll').css({'left':posLeft,'marginLeft': -marLR});
	$('.zmw-base-rscroll').css({'right':posLeft,'marginRight': -marLR});
	$('.zmw-base-scroll').animate({'top': posTop, 'marginTop': -marTop},500)
	var pHeight = $('#bannerYou .item > div').eq(0).find('.main .texts p').height();
	$('#bannerYou .item > div .main .texts p').height(pHeight)
}
window.onresize = function () {
	bannerLeft()
}
$(function() {
	$.ajax({
		type:"get",
		url: baseUrl + "/api/portal/lists/getslides",
		async:true,
		dataType: 'json',
		success: function(res){
			var html='', res_ok = res.code;
			if (res_ok === 1){
				for (var i = 0; i < res.data.length; i++) {
					html += '<div class="bowen img '+ res.code +'">'+
								'<img src="image/bo.png"/>'+
							'</div>'+
							'<div class="item">'+
								'<img src="'+ baseUrl + '/upload/'+res.data[i].image +'" />'+
								'<div class="text">'+
									'<p class="fs48 line48">'+ res.data[i].title +'</p>'+
									'<p class="fs16 line40">'+ res.data[i].description +'</p>'+
								'</div>'+
							'</div>'
				}
				$('#banner > div.carousel-inner').append(html)
				var num = $('#banner .item').length;
				$('#banner .num b').text('0' + num);
				$('#banner > div.carousel-inner .item').eq(0).addClass('active')
				document.title = num
				//执行侧面的字母定位
				bannerLeft()
			}
		}
	});
	//banner总数动态数字
	$('#banner').on('slide.bs.carousel', function(event) {
		var $hoder = $('#banner').find('.item'),
			$items = $(event.relatedTarget);
		//getIndex就是轮播到当前位置的索引
		var getIndex = $hoder.index($items) + 1;
		$('#banner .num span').text('0' + getIndex);
	});
	//banner的左右滑动
	// 获取界面上的轮播图容器
	var $carousels = $('.carousel');
	var startX, endX;
	var offset = 50;
	// 注册滑动事件
	$carousels.on('touchstart', function(e) {
		startX = e.originalEvent.touches[0].clientX;
	});

	$carousels.on('touchmove', function(e) {
		endX = e.originalEvent.touches[0].clientX;
	});
	$carousels.on('touchend', function(e) {
		var distance = Math.abs(startX - endX);
		if(distance > offset) {
			$(this).carousel(startX > endX ? 'next' : 'prev');
		}
	});
	$('#btn').click(function(){
		$('#nav-lists').animate({'left': 0}, 300)
		$('.nav-list-body').animate({'left': '-50%'}, 300)
	})
	$('.nav-close img, #nav-lists').click(function(){
		$('#nav-lists').animate({'left': '100%'}, 300)
		$('.nav-list-body').animate({'left': 0}, 300)
	})
})
