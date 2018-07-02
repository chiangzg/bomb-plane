//@author Chiang
function Element(id) {
    let self = document.getElementById(id);
    this.html = function (html = null) {
        if (html == null) {
            return self.innerHTML;
        } else {
            self.innerHTML = html;
            return null;
        }
    };
    this.setStyle = function (style) {
        self.setAttribute('style', style);
    };
    this.show = function (isShow = true) {
        if (isShow) {
            self.style.display = '';
        } else {
            self.style.display = 'none';
        }

    };
}

//todo 把请求服务封装在service.js内部
function Socket(srvUrl) {
    let url = srvUrl;
    let socket;
    let requestData = function (code, data) {
        return JSON.stringify({
            'code': code,
            'data': data,
        });
    };
    //login
    this.connect = function (userName) {
        socket = new WebSocket(url);
        socket.onopen = function (event) {
            socket.send(requestData(0, {"id": userName}));
        };
        socket.onmessage = function (event) {
            data = {};
            if (event.data) {
                data = JSON.parse(event.data);
            }
            //处理返回值
            handleResp(data);
        };
        socket.onclose = function (event) {
            info('Connection is closed!');
        };
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

//data.code, data.message, data.data
//todo service.js 封装处理逻辑，Socket对象隐藏在service.js内，对外只暴露service
function handleResp(data) {
    let login = function (data) {
        if (data.status) {
            (new Element('login')).show(false);
            initCanvas();
        }
    };

    //todo 登录成功后，进入匹配阶段（或者指定id对战），然后在渲染画面
    debug(data.code);
    switch (data.code) {
        case 0:
            login(data);
            break;
        default:
            alert('系统错误');
    }
}

//点击login
function login(form) {
    let username = form.username.value;
    debug(username);

    //todo 登录后id保存本地，预防刷新页面恢复登录
    socket.connect(username);
    return false;
}

let canvas = null;
let DEBUG = true;
let srvUrl = 'ws://127.0.0.1:8000';
let socket = null;
window.onload = function () {
    canvas = new Element('sky');
    socket = new Socket(srvUrl);
};
