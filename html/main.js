var canvas = null;
window.onload = function () {
	canvas = new Element('sky');
	initCanvas();
};

function Element (id) {
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
		for (var i = 0; i < y; i++) {
			for (var j = 0; j < x; j++) {
				html += '<div class="size" id="' + j + i + '"></div>';
			}
		}	

		return html;
	};
	
	let content = '<div>' + draw() + '</div><br>' + '<hr><br><div>' + draw() + '<dir>';
	canvas.html(content);
}

