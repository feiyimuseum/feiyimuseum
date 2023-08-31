document.addEventListener('DOMContentLoaded', function () {
	const login = new Vue({
		el: '#login-box',
		data: {
			username: '',
			password: '',
			confirmPassword: '',
			alertMessage: '操作结果',
			isSignUpActive: false,
			showAlert: false, //用于控制显示提示框
			loggedIn: false, //登录状态
		},
		methods: {
			// 判断用户名和密码长度
			checkLength(input, minLength) {
				if (input.length < minLength) {
					this.alertMessage =
						input === this.username
							? '用户名必须大于等于2位'
							: '密码必须大于等于6位';
					this.showAlert = true; // 显示提示框
					return false;
				}
				return true;
			},

			reg() {
				event.preventDefault(); // 阻止默认提交事件
				// 用户名、密码数据双向联动
				const {
					username,
					password,
					confirmPassword,
					isSignUpActive,
					showAlert,
				} = this;

				// 判断用户名和密码是否为空
				if (username.trim() === '' || password.trim() === '') {
					this.showAlert = true;
					this.alertMessage = '用户名和密码不能为空';
					setTimeout(() => {
						this.showAlert = false;
					}, 3000);
					return; // 阻止后续操作
				}

				// 判断用户名和密码长度
				if (!this.checkLength(username, 2)) {
					this.showAlert = true;
					this.alertMessage = '用户名必须大于等于2位';
					setTimeout(() => {
						this.showAlert = false;
					}, 3000);
					return; // 阻止后续操作
				}
				if (!this.checkLength(password, 6)) {
					this.showAlert = true;
					this.alertMessage = '密码必须大于等于6位';
					setTimeout(() => {
						this.showAlert = false;
					}, 3000);
					return; // 阻止后续操作
				}

				// 判断两次密码是否一致
				if (password !== confirmPassword) {
					this.showAlert = true;
					this.alertMessage = '两次输入的密码不一致';
					setTimeout(() => {
						this.showAlert = false;
					}, 3000);
					return; // 阻止后续操作
				}

				// 存储username和password到localStorage
				localStorage.setItem('username', this.username);
				localStorage.setItem('password', this.password);
				this.showAlert = true;
				this.alertMessage = '注册成功！';
				setTimeout(() => {
					window.location.href = './index.html';
					this.showAlert = false;
				}, 1000);
			},

			login() {
				// 用户名、密码数据双向联动
				const { username, password, isSignUpActive, showAlert } = this;

				if (!this.checkLength(username, 2)) {
					setTimeout(() => {
						this.showAlert = false;
					}, 3000); // 3秒后隐藏提示框
					return;
				}
				if (!this.checkLength(password, 6)) {
					setTimeout(() => {
						this.showAlert = false;
					}, 3000); // 3秒后隐藏提示框
					return;
				}

				// 判断localStorage中是否有username，有则校验username和password，没有则发送axios请求
				const storedUsername = localStorage.getItem('username');
				if (storedUsername) {
					// 已经注册过，校验用户名和密码
					const storedPassword = localStorage.getItem('password');
					if (username === storedUsername && password === storedPassword) {
						// 登录成功，将alert的值改为：登录成功！
						this.showAlert = true;
						this.alertMessage = '登录成功！';
						this.loggedIn = true; // 设置为已登录状态
						setTimeout(() => {
							this.showAlert = false;
							window.location.href = './index.html';
						}, 1000); // 1秒后隐藏提示框
					} else {
						this.showAlert = true;
						this.alertMessage = '账号或密码错误！';
						setTimeout(() => {
							this.showAlert = false;
						}, 1000); // 1秒后隐藏提示框
					}
				} else {
					// 基于axios提交用户名和密码
					axios({
						url: 'http://hmajax.itheima.net/api/login',
						method: 'POST',
						data: {
							username,
							password,
						},
					})
						.then((result) => {
							console.log(result);
							console.log(result.data.message);
							this.showAlert = true;
							this.loggedIn = true; // 设置为已登录状态
							this.alertMessage = result.data.message;
						})
						.catch((error) => {
							console.log(error);
							console.log(error.response.data.message);
							this.showAlert = true;
							this.alertMessage = error.response.data.message;
						});
				}
			},
			focus() {
				// 当输入框获得焦点时，将'focus'类添加到输入框
				const inputElement = event.target;
				inputElement.classList.add('focus');
			},
			blur() {
				// 当输入框失去焦点时，且输入框为空时，从输入框中移除'focus'类
				const inputElement = event.target;
				if (inputElement.value.trim() === '') {
					inputElement.classList.remove('focus');
				}
			},

			// 切换登录注册面板
			togglePanel(panel) {
				// 根据点击的按钮切换登录和注册面板
				// 如果 panel 等于 'signUp'，意味着点击的是“注册”按钮，所以 isSignUpActive 将被设置为 true，表示“注册”面板应该处于激活状态。
				this.isSignUpActive = panel === 'signUp';
				this.clearInput();
			},

			clearInput() {
				// 清空输入框内容
				this.username = '';
				this.password = '';
				this.confirmPassword = '';
			},
			// 添加一个方法用于退出登录
			logout() {
				localStorage.removeItem('username');
				localStorage.removeItem('password');
				this.loggedIn = false; // 设置为未登录状态
				window.location.href = './index.html';
			},
		},
	});
});
