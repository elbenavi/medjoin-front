(function ($) {

    'use strict';

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };


    $(document).ready(function (e) {

        // global
        var Modernizr = window.Modernizr;

        // support for CSS Transitions & transforms
        var support = Modernizr.csstransitions && Modernizr.csstransforms;
        var support3d = Modernizr.csstransforms3d;
        // transition end event name and transform name
        // transition end event name
        var transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
		transformNames = {
		    'WebkitTransform': '-webkit-transform',
		    'MozTransform': '-moz-transform',
		    'OTransform': '-o-transform',
		    'msTransform': '-ms-transform',
		    'transform': 'transform'
		};

        if (support) {
            this.transEndEventName = transEndEventNames[Modernizr.prefixed('transition')] + '.PMMain';
            this.transformName = transformNames[Modernizr.prefixed('transform')];
            //console.log('this.transformName = ' + this.transformName);
        }

        runParallax();


        /* ==========================================================================
           Homepage slider
           ========================================================================== */
        if ($('#pm-slider').length > 0) {

            $('#pm-slider').PMSlider({
                speed: 700,
                easing: 'ease',
                loop: true,
                controlNav: true, //false = no bullets / true = bullets
                controlNavThumbs: false,
                animation: 'slide',
                fullScreen: false,
                slideshow: true,
                slideshowSpeed: 7000,
                pauseOnHover: true,
                arrows: true,
                fixedHeight: true,
                fixedHeightValue: 755,
                touch: true,
                progressBar: false
            });

        }

        /* ==========================================================================
           Back to top button
           ========================================================================== */
        $('#back-top').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });


        /* ==========================================================================
           When the window is scrolled, do
           ========================================================================== */
        $(window).scroll(function () {
            animateMilestones();
            animateProgressBars();
            //toggle back to top btn
            if ($(this).scrollTop() > 50) {
                if (support) {
                    $('#back-top').css({ bottom: 10 });
                } else {
                    $('#back-top').animate({ bottom: 10 });
                }
            } else {
                if (support) {
                    $('#back-top').css({ bottom: -70 });
                } else {
                    $('#back-top').animate({ bottom: -70 });
                }
            }

            //toggle fixed nav
            if ($(window).width() > 991) {

                if ($(this).scrollTop() > 190) {

                    $('.pm-nav-container').addClass('fixed');

                } else {

                    $('.pm-nav-container').removeClass('fixed');

                }

            }

        });

        /* ==========================================================================
	   Staff post item
	   ========================================================================== */
        if ($(".pm-staff-profile-container").length > 0) {

            $(".pm-staff-profile-container").each(function (index, element) {

                var $this = $(element),
                expandBtn = $this.find('.pm-staff-profile-expander'),
                quoteBox = $this.find('.pm-staff-profile-quote'),
                socialIcons = $this.find('.pm-staff-profile-icons'),
                isActive = false;

                expandBtn.click(function (e) {

                    e.preventDefault();

                    if (!isActive) {

                        isActive = true

                        expandBtn.removeClass('fa fa-plus').addClass('fa fa-close');

                        quoteBox.css({
                            'top': 0
                        });

                        socialIcons.css({
                            'opacity': 0,
                            'right': -70
                        });


                    } else {

                        isActive = false;

                        expandBtn.removeClass('fa fa-close').addClass('fa fa-plus');

                        quoteBox.css({
                            'top': 290
                        });

                        socialIcons.css({
                            'opacity': 1,
                            'right': 15
                        });

                    }


                });

            });

        }

        animateMilestones();
        animateProgressBars();

        function animateMilestones() {

            $(".milestone:in-viewport").each(function () {

                var $t = $(this);
                var n = $t.find(".milestone-value").attr("data-stop");
                var r = parseInt($t.find(".milestone-value").attr("data-speed"));

                if (!$t.hasClass("already-animated")) {
                    $t.addClass("already-animated");
                    $({
                        countNum: $t.find(".milestone-value").text()
                    }).animate({
                        countNum: n
                    }, {
                        duration: r,
                        easing: "linear",
                        step: function () {
                            $t.find(".milestone-value").text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $t.find(".milestone-value").text(this.countNum);
                        }
                    });
                }

            });

        }
        /* ==========================================================================
	   animateProgressBars
	   ========================================================================== */

        function animateProgressBars() {

            $(".pm-progress-bar .pm-progress-bar-outer:in-viewport").each(function () {

                var $t = $(this),
				progressID = $t.attr('id'),
				numID = progressID.substr(progressID.lastIndexOf("-") + 1),
				targetDesc = '#pm-progress-bar-desc-' + numID,
				$target = $(targetDesc).find('span'),
				$diamond = $(targetDesc).find('.pm-progress-bar-diamond'),
				dataWidth = $t.attr("data-width");


                if (!$t.hasClass("already-animated")) {

                    $t.addClass("already-animated");
                    $t.animate({
                        width: dataWidth + "%"
                    }, 2000);
                    $target.animate({
                        "left": dataWidth + "%",
                        "opacity": 1
                    }, 2000);
                    $diamond.animate({
                        "left": dataWidth + "%",
                        "opacity": 1
                    }, 2000);

                }

            });

        }
        
        /* ==========================================================================
           isTouchDevice - return true if it is a touch device
           ========================================================================== */

        function isTouchDevice() {
            return !!('ontouchstart' in window) || (!!('onmsgesturechange' in window) && !!window.navigator.maxTouchPoints);
        }


        //dont load parallax on mobile devices
        function runParallax() {

            //enforce check to make sure we are not on a mobile device
            if (!isMobile.any()) {

                //stellar parallax
                $.stellar({
                    horizontalOffset: 0,
                    verticalOffset: 0,
                    horizontalScrolling: false,
                });

                $('.pm-parallax-panel').stellar();


            }

        }//end of function




    }); //end of document ready


})(jQuery);

