$(function () {

    function sort_li(arr, num) {
        arr.filter(function (i) {
            if ((i + 1) % num == 0) {
                $(this).addClass('no-mr');
            }
        });
    }
    function fl_li(arr, num) {
        arr.filter(function (i) {
            if ((i + 1) % num == 0) {
                $(this).css('float', 'right');
            }
        });
    }
    function hide_li(arr, num) {
        arr.filter(function (i) {
            if ((i + 1) > num) {
                $(this).hide();
            }
        });
    }

    var cusBox = $('.i-custom .grid-box');
    cusBox.filter(function () {
        var bead_img = $(this).find('img.bead'),
            bead_box = $(this).find('.zhuzi-box .col-list li');
        //bead_img.attr('src',bead_box.first().attr('imgsrc'));
        bead_box.click(function () {
            bead_img.attr('src', $(this).attr('imgsrc'));
        });

    });



    var numBtn = true;
    $(window).scroll(function () {
        var sT = $(document).scrollTop();
        if (sT > 200) {
            //$('http://cn.power-sprayer.com/wp-content/themes/wenxinjidian-cn/js/.i-about .top').addClass('animated').addClass('fadeInUp');
        }
        if (sT > 1450) {
            if (numBtn) {
                setTimeout(function () {
                    var aNum = $('.i-number .column i');
                    aNum.filter(function () {
                        var maxNum = $(this).attr('num'),
                            $this = this;
                        $this.i = 0;
                        $this.speed = Math.ceil(maxNum / 100);
                        $this.timer = null;
                        $this.timer = setInterval(function () {
                            $this.innerText = $this.i;
                            if ($this.i > (maxNum - $this.speed)) {
                                clearInterval($this.timer);
                            }
                            $this.i = $this.i + $this.speed;
                        }, 20);
                    });
                }, 800);
            }
            numBtn = false;
        }
    });



    $('.mlztx').click(function () {
        $('.layer-form').fadeIn(200);
    });
    $('.layer-form .btn-hide-contact100 .fa-close').click(function () {
        $('.layer-form').fadeOut(200);
    });
    $('.layer-form .wpcf7-form').addClass('contact100-form');

    //杈规爮鐩稿叧鏁堟灉
    $('.sideBar .cat-list a').filter(function () {
        if ($(this).html() == $('.bread-crumbs span').html()) {
            $(this).addClass('active');
        }
    });


    var recomNum2 = 5;

    function setSwiperNum2() {
        if ($(window).width() < 768) {
            recomNum2 = 1;
        }
        else if ($(window).width() < 970) {
            recomNum2 = 3;
        }
        else {
            recomNum2 = 5;
        }
    }
    setSwiperNum2();
    $(window).resize(function () {
        setSwiperNum2();
    });

    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            waitForTransition: false,
        },
        speed: 2000,
        centeredSlides: true,
        slidesPerView: recomNum2,
        spaceBetween: 5,
    });



    var swiper2 = new Swiper('.i-cat-product .slideBox', {
        slidesPerView: 4.5,
        speed: 900,
        spaceBetween: 0,
        autoplay: true,
        loop: true
    });


    var swiper3 = new Swiper('.new-list .slideBox', {
        slidesPerView: 4,
        speed: 900,
        spaceBetween: 0,
        autoplay: false,
        loop: true
    });


});