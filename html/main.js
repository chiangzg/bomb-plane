var canvas = null;
window.onload = function () {
	canvas = new Element('sky');
	initCanvas();
	connect();
};

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
	
	let content = '<div>' + draw() + '</div><br>' + '<hr><br><div>' + draw() + '<dir>';
	canvas.html(content);
}

function connect() {
	let socket = new WebSocket('ws://127.0.0.1:8000');
	socket.onopen = function(event) {
		//todo 通过用户设置id，上传给服务器,返回登录成功时开始房间配对
		console.log(event);
	};

	socket.onmessage = function(event) {
		console.log(event.data);
	};
}
