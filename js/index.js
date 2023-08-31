// 轮播图

$(function () {
	$('.home .focus .ul').slick({
		autoplay: true,
		autoplaySpeed: 1500,
		speed: 800,
		dots: true,
		arrows: true,
		fade: true,
		cssEase: 'cubic-bezier(0.5,0,0.3,1)',
		pauseOnHover: false,
		prevArrow: '.home .prev a',
		nextArrow: '.home .next a',
		// appendDots:".home .nav",
	});

	$('.home .focus .ul').on(
		'beforeChange',
		function (event, slick, currentSlide) {
			$('.home .focus .box').removeClass('box2');
			$('.home .focus .slick-current .box').addClass('box1');
			$('.home .focus .box').removeClass('box0');
		}
	);
	$('.home .focus .ul').on(
		'afterChange',
		function (event, slick, currentSlide) {
			$('.home .focus .box').removeClass('box1');
			$('.home .focus .slick-current .box').addClass('box0');

			if ($('.home .focus .ul .slick-current').find('video').size() > 0) {
				$('.home .focus .ul .slick-current').find('video')[0].play();
				$('.home .focus .icon').addClass('icon_play');
				$('.home .focus .ul').slick('slickPause');
				$('.home .focus .ul .slick-current')
					.find('video')
					.bind('ended', function () {
						$('.home .focus .ul').slick('slickPlay');
						$('.home .focus .icon').removeClass('icon_play');
						setTimeout(function () {
							$('.home .focus .ul').slick('slickNext');
						}, 100);
					});
			} else {
				$('.home .focus .ul video').each(function () {
					var $vd = $(this).get(0);
					$vd.pause();
					$('.home .focus .icon').removeClass('icon_play');
					$('.home .focus .ul').slick('slickPlay');
				});
			}
		}
	);
});

// 大事件
$(document).ready(function () {
	// 初始时隐藏除了 2022 年以外的所有 contListAbout 元素
	$('.contListAbout').not("[data-value='2022']").hide();

	// 当点击年份链接时
	$('.year').click(function () {
		// 获取被点击链接的 data-value 属性值
		var year = $(this).data('value');

		// 隐藏所有 contListAbout 元素
		$('.contListAbout').hide();

		// 显示与对应年份相关的 contListAbout 元素
		$(".contListAbout[data-value='" + year + "']").show();

		// 从所有链接中移除 'cur' 类，并将其添加到被点击的链接上
		$('.year').removeClass('cur');
		$(this).addClass('cur');
	});
});
