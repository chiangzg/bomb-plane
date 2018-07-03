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
