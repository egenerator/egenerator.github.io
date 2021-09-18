$(function() {
	var sideBtn = $('#header .side-btn'),
		oSideMenu = $('#header .side-menu'),
		oSideClose = $('#header .side-close');
	sideBtn.click(function() {
		oSideMenu.stop(true, false).animate({
			'left': 0
		}, 400);
	});
	oSideClose.click(function() {
		oSideMenu.stop(true, false).animate({
			'left': '-100%'
		}, 500);
	});
	
	var aHeadLi = $('#header .side-menu .list>li');
	aHeadLi.click(function() {
		$(this).toggleClass('active');
		$(this).find('dl').stop(true, false).slideToggle(400);
	});
	
	var oSerBtn = $('.h-search'),
		oSerBox = $('.search-box'),
		oSerClose = oSerBox.find('.close');
	oSerBtn.click(function() {
		oSerBox.fadeIn(200);
	});
	oSerClose.click(function() {
		oSerBox.hide();
	});
	
});