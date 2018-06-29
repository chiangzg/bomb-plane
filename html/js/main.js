//@author Chiang
function Element(id) {
	this.self = document.getElementById(id);
	this.html = function (html = null){
		if (html == null) {
			return this.self.innerHTML;
		} else {
			this.self.innerHTML = html;
			return;
		}
	};
	this.setStyle = function (style) {
		this.self.setAttribute('style', style);
	};
	this.show = function (isShow = true) {
		if (isShow) {
			this.self.style.display = '';
		} else {
			this.self.style.display = 'none';
		}

	};
} 

function info(content) {
	if (debug) {
		let date = (new Date).toLocaleDateString();
		console.log(date + '[info]: ' + content);
	}
}

function error(content) {
	let date = (new Date).toLocaleDateString();
	console.error(date + '[error]: ' + content);
}

function initCanvas() {
	let draw = function () {
		let x = y = 10;
		let html = '';
		for (let i = 0; i < y; i++) {
			for (let j = 0; j < x; j++) {
				html += '<div class="size" id="' + j + i + '"></div>';
			}
		}	

		return html;
	};
	
	(new Element('login')).show(false);
	let content = '<div>' + draw() + '</div><br>' + '<hr><br><div>' + draw() + '<dir>';
	canvas.html(content);
}

function connect(id) {
	let socket = new WebSocket('ws://127.0.0.1:8000');
	socket.onopen = function(event) {
		socket.send(JSON.stringify({"id": id}));
	};

	socket.onmessage = function(event) {
		data = {};
		if (event.data) {
			data = JSON.parse(event.data);
		}
		
		//处理返回值
		handleResp(data);
	};

	socket.onclose = function(event) {
		alert('服务器断开连接!');
	};
}

//data.code, data.message, data.data
function handleResp(data) {

	//todo 登录成功后，进入匹配阶段（或者指定id对战），然后在渲染画面
	info(data.code);
	switch (data.code) {
		case 1:
			initCanvas();
			break;
		default:
			alert('系统错误');
	}
}

function login(form) {
	let username = form.username.value;
	info(username);

	//todo 登录后id保存本地，预防刷新页面恢复登录
	connect(username);
	return false;
}

let canvas = null;
let debug = true;
window.onload = function () {
	canvas = new Element('sky');
};
