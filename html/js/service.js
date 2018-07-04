//@author Chiang
/**
 * Socket
 *
 * @param srvUrl
 * @constructor
 */
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
    this.connect = function (userName, callback) {
        socket = new WebSocket(url);
        socket.onopen = function (event) {
            socket.send(requestData(0, {"id": userName}));
        };
        socket.onmessage = function (event) {
            data = JSON.parse(event.data);
            if (objTool.isEmpty(data) || !objTool.existsKey('code', data)) {
                logger.error('connect result:' + JSON.stringify(data));
                throw "connect result error!";
            }
            callback(data);
        };
        socket.onclose = function (event) {
            logger.info('Connection is closed!');
        };
    };
}

//初始化画板
function initCanvas() {
    let draw = function () {
        let x, y;
        x = y = 10;
        let html = '';
        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                html += '<div class="size" id="' + j + i + '"></div>';
            }
        }

        return html;
    };

    let content = '<div>' + draw() + '</div><br>' + '<hr><br><div>' + draw() + '<dir>';
    (new ElementObj('sky')).html(content);
}