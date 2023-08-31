$(document).ready(function () {
	$('.sHoverItem').hover(
		function () {
			$(this).find('.mask').stop().animate(
				{
					height: '100%',
					opacity: 1,
				},
				300
			);
		},
		function () {
			$(this).find('.mask').stop().animate(
				{
					height: 0,
					opacity: 0,
				},
				300
			);
		}
	);
});
