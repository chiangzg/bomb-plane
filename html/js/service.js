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
            if ($.isEmptyObject(data) || !tool.existsKey('code', data)) {
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

/**
 * Api服务
 * @type {{isExistProgress: (function(): boolean), recoveryProgress: api.recoveryProgress}}
 */
let api = {
    //todo 是否存在未完成的进度
    isExistProgress: function () {
        return false;
    },
    //todo 恢复进度
    recoveryProgress: function () {
    },
};

/**
 * 初始化画板
 */
function initCanvas() {
    let draw = function (css) {
        let x, y;
        x = y = 10;
        let html = '';

        //ｙ轴坐标
        for (let i = 1; i <= y; i++) {
            for (let j = 1; j <= x; j++) {
                if (j === 1) {
                    html += '<div class="cell border-transparent">' + i + '</div>';
                }
                html += '<div class="cell cell-border ' + css + '" id="' + j + ',' + i + '"></div>';
            }
        }

        //ｘ轴坐标
        html += '<div class="cell"></div>';
        for (let i = 1; i <= 10; i++) {
            html += '<div class="cell border-transparent">' + i + '</div>'
        }

        return html;
    };


    //隐藏登录、显示信息板
    $('#login').hide();
    $('#info').show();
    //填充画板
    $('#sky').html(draw('cell-sky'));
    $('#sandTable').html(draw('cell-sandTable'));
}