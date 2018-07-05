function showLi() {
	$('.product-main-list > li').click(function(){
		var imgHtml = $(this).find('.list-left').html(),
			h4Html = $(this).find('.list-right-main > h4').text(),
			pHtml = $(this).find('.list-right-main > p').text(),
		    ulHtml = $(this).find('.list-right-main > ul').html();
		$('#dialog-main .list-left').html(imgHtml);
		$('#dialog-main .list-right-main h4 > b').text(h4Html);
		$('#dialog-main .list-right-main ul').html(ulHtml);
		$('#dialog-main .introduce > p').text(pHtml);
		$('.dialog-main').css('zIndex',8888)
		//弹窗的位置
	    var divHeight = $('#dialog-main').outerHeight() + $('.dialog-close').outerHeight(),
	    	winheight = $(window).innerHeight(),winWidth = $(window).innerWidth(),
	    	scrollTop = $(window).scrollTop();
		$('#dialog-main').animate({'marginTop': (winheight-divHeight)/2,'opacity': 1},300)
		$('.dialog-close,.dialog-main').animate({'opacity': 1},400)
		//弹窗背景 的位置
		var diaHeight = $('#dialog-main').outerHeight(),diaWidthh =  $('#dialog-main').outerWidth(),
			diaLeft = $('#dialog-main').offset().left,diaTop =  $('#dialog-main').offset().left;
		$('.xianzhi').css({'width':diaWidthh,'height':diaHeight,'left':diaLeft});
		$('.xianzhi').animate({'top': (winheight-divHeight)/2,'opacity': 1},300);
		$('#dialog-main-body').css({'top':-(winheight-divHeight)/2-scrollTop,'left': -diaLeft,'width': winWidth})
		$(window).scroll(function(){
			var	scrollTop = $(window).scrollTop();
			$('#dialog-main-body').css({'top':-(winheight-divHeight)/2-scrollTop})
		})
	})
	$('.dialog-close img,.dialog-main').click(function(){
		$('#dialog-main').animate({'marginTop': 0,'opacity': 0},300)
		$('.dialog-close,.dialog-main').animate({'opacity': 0},400,function(){
			$('.dialog-main').css('zIndex',-2)
		})
		$('.xianzhi').animate({'top': 0,'opacity': 0},300);
		$(window).off('scroll')
	})
	$('#dialog-main').click(function(){
		return false;
	})
}
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
	$('.zmw-base-scroll').css({'top': posTop, 'marginTop': -marTop})
}
window.onload =function() {
	var windowW = $(window).width();
	if (windowW > 991) {
		showLi();
	}
	bannerLeft()
	var content = $('.nav-list-body').html();
	$('#dialog-main-body').append(content)
}
window.onresize = function () {
	bannerLeft()
	var windowW = $(window).width();
	if (windowW > 991) {
		var diaHeight = $('#dialog-main').outerHeight(),diaWidthh =  $('#dialog-main').outerWidth(),
			diaLeft = $('#dialog-main').offset().left,diaTop =  $('#dialog-main').offset().left,
			winWidth = $(window).innerWidth(),
			scrollTop = $(window).scrollTop();
		var divHeight = $('#dialog-main').outerHeight() + $('.dialog-close').outerHeight(),
	    	winheight = $(window).innerHeight(),winWidth = $(window).innerWidth();
		$('.xianzhi').css({'width':diaWidthh,'height':diaHeight,'left':diaLeft});
		$('#dialog-main-body').css({'top':-diaTop-scrollTop,'left': -diaLeft,'width': winWidth})
	}
}

