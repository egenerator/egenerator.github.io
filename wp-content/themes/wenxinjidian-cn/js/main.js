var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息  
            trident: u.indexOf('Trident') > -1, //IE内核 
            presto: u.indexOf('Presto') > -1, //opera内核 
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核 
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端 
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器 
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 
            iPad: u.indexOf('iPad') > -1, //是否iPad   
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部 
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
function isMobile() {
    if (browser.versions.mobile || browser.versions.ios || browser.versions.android ||
        browser.versions.iPhone || browser.versions.iPad) {
        return true;
    }
    return false;
}
console.log(window.location.host + '/m' + window.location.pathname)
if (isMobile()) { window.location = window.location.protocol + '//' + window.location.host + '/m' + window.location.pathname }
; $(function () {

    //wow.js扩展
    $('.animate-father').filter(function () {
        var sChil = $(this).attr('data-child'),
            sEffect = $(this).attr('data-effect'),
            sDelay = Number($(this).attr('data-delay')),
            initDelay = 0;
        $(this).find(sChil).addClass('wow').addClass(sEffect);
        $(this).find(sChil).filter(function () {
            initDelay += sDelay;
            $(this).attr('data-wow-delay', initDelay + 's');
        });
    });

    new WOW().init();

    $('.side-menu a').filter(function () {
        if ($(this).html() == $('.bread-crumbs span').html()) {
            $(this).addClass('active');
        }
    });



    $('.mlztx').click(function () {
        $('.layer-form').fadeIn(200);
    });
    $('.layer-form .btn-hide-contact100 .fa-close').click(function () {
        $('.layer-form').fadeOut(200);
    });
    $('.layer-form .wpcf7-form').addClass('contact100-form');

    //鏉堣鐖惄绋垮彠閺佸牊鐏�
    $('.sideBar .cat-list a').filter(function () {
        if ($(this).html() == $('.bread-crumbs span').html()) {
            $(this).addClass('active');
        }
    });


    var bigLi = $('#header');
    $(window).scroll(function () {
        var sT = $(document).scrollTop();
        if (sT > 120) {
            bigLi.addClass('h-header');
        }
        else {
            bigLi.removeClass('h-header');
        }
    });


    var dropLi = $('.menu>li,.language');
    dropLi.hover(function () {
        var subMenu = $(this).find('.sub-menu');
        subMenu.stop(true, false).slideDown(300);
    }, function () {
        var subMenu = $(this).find('.sub-menu');
        subMenu.stop(true, false).slideUp(200);
    });
    var oSerBtn = $('.h-search'),
        oSerBox = $('.search-box'),
        oSerClose = oSerBox.find('.close');
    oSerBtn.click(function () {
        oSerBox.fadeIn(200);
    });
    oSerClose.click(function () {
        oSerBox.hide();
    });



    $('.proFaq .faqBox').filter(function () {
        var oBtn = $(this).find('.faq-tit').find('.icon'),
            oAbst = $(this).find('.abst');
        oBtn.click(function () {
            $(this).toggleClass('active');
            oAbst.slideToggle(400);
        });
    });


    var rUl = $('.prodet-recomm .i-solution .scroll-box ul'),
        rALi = rUl.find('li'),
        rLen = rALi.length,
        rArrL = $('.prodet-recomm .arr-l'),
        rArrR = $('.prodet-recomm .arr-r'),
        rW = rALi.first().outerWidth(true),
        rI = 0;

    rArrR.click(function () {
        rI++;
        if (rI > (rLen - 5)) {
            rI = 0;
        }
        rUl.stop(true, false).animate({
            'margin-left': -rW * rI
        }, 400);
    });
    rArrL.click(function () {
        rI--;
        if (rI < 0) {
            rI = 0;
        }
        rUl.stop(true, false).animate({
            'margin-left': -rW * rI
        }, 400);
    });


    // tab
    var aProTabLi = $('.prodet-box-two .tab-list span'),
        aProTabBox = $('.prodet-box-two .tab-box .detBox ');

    aProTabLi.first().addClass('active');
    aProTabBox.first().show();

    aProTabLi.click(function () {
        var i = $(this).index();
        aProTabLi.removeClass('active');
        $(this).addClass('active');
        aProTabBox.hide();
        aProTabBox.eq(i).stop(false, true).fadeIn(400);
    });


    showScroll();
    function showScroll() {
        $(window).scroll(function () {
            var scrollValue = $(window).scrollTop();
            scrollValue > 100 ? $('div[class=scroll]').fadeIn() : $('div[class=scroll]').fadeOut();
        });
        $('#scroll').click(function () {
            $("html,body").animate({ scrollTop: 0 }, 200);
        });
    }


    //*************mobile-header*************//

    $('.menubtn').on('click', function (e) {

        e.stopPropagation();

        $(this).toggleClass('active');

        $(".navigateli >li").removeClass('on');

        $(".menudowns").hide();

        if ($(this).hasClass('active')) {

            $(".navigate").animate({ 'left': 0 }, 400);

            $('.sideLayer').fadeIn(200);

        } else {

            $(".navigate").animate({ 'left': '-100%' }, 400);

            $('.sideLayer').hide();

        }

        $('http://cn.power-sprayer.com/wp-content/themes/wenxinjidian-cn/js/.navigateli .fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');

    });

    $(".navigateli >li >a").on("click", function (e) {

        var $navMobile = $(".navigate"),

            $navA = $navMobile.find(".navigateli >li >a"),

            $mSubnav = $navMobile.find(".menudowns");

        var hjcur = $(this);

        var hjDD = $(this).parents("li");

        if (hjDD.find(".menudowns").size() > 0) {

            if (hjDD.hasClass("on")) {

                $navMobile.slideUp();

                hjDD.find(".menudowns").stop(false, false).slideUp();

                hjDD.removeClass("on");

                $navMobile.slideUp();

            } else {

                $navA.parents('li').removeClass("on");

                $mSubnav.stop(false, false).slideUp();

                hjDD.find(".menudowns").stop(false, false).slideDown();

                hjDD.addClass("on");

                e.preventDefault();

            }

        }

    });

    $(".navigateli >li").filter(function () {

        var subMenu = $(this).find('.menudowns');

        if (subMenu.length) {

            var arrDown = $(this).find('.fa');

            arrDown.show();

            $(this).click(function () {

                arrDown.removeClass('fa-chevron-down').addClass('fa-chevron-up');

            });

        }

    });

    $('#inner-head .mb-lan').click(function () {

        $('#inner-head .mb-lanList').slideToggle(400);

    });



    $(document).click(function (e) {

        $('#lanSelBox, .more_lang').removeClass('active');

    });



    $('#lanSelBox .current_lang').click(function (e) {

        e.stopPropagation();

        $(this).parent().toggleClass('active');



        setTimeout(function () {

            $('.more_lang').toggleClass('active');

        }, 5);

    });



    $('.mb-lan').click(function () {

        $('.mb-lanList').slideToggle(400);

    });



});