// 导航栏
$(document).ready(function () {
	$('.menu a').click(function () {
		$('.sw-headnav').toggleClass('show');
	});

	$('.nav_close').click(function () {
		$('.sw-headnav').removeClass('show');
	});
});

// 获取用户名
document.addEventListener('DOMContentLoaded', function () {
	const userNameElement = document.getElementById('userName');
	console.log(userNameElement); // 查看是否能够正确找到元素

	const userName = new Vue({
		el: '#userName',
		data: {
			localStorageUsername: localStorage.getItem('username'),
		},
	});
});
// 回到顶部
document.addEventListener('DOMContentLoaded', function () {
	const toTopButton = document.getElementById('toTop');

	if (toTopButton) {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 80) {
				toTopButton.style.transform = 'translateY(0)';
			} else {
				toTopButton.style.transform = 'translateY(200%)';
			}
		});

		toTopButton.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		});
	}
});
