//@author Chiang
let DEBUG = true;
let srvUrl = 'ws://127.0.0.1:8000';
let srv = null;
let cacheUserKey = 'bp_user_name_key';
let planeList = {'plane1': [], 'plane2': [], 'plane3': []};

$(document).ready(function () {
    srv = new Socket(srvUrl);
    reload();

    /**
     * 刷新页面恢复链接
     */
    function reload() {
        let user = localStorage.getItem(cacheUserKey);
        if (user) {
            if (confirm('是否恢复[' + user + ']的链接？')) {
                login(user);
            } else {
                localStorage.removeItem(cacheUserKey);
            }
        }
    }

    /**
     * 登录
     * @param username
     */
    function login(username) {
        srv.connect(username, function (data) {
            if (!data.status) {
                alert(data.message);
                return;
            }
            localStorage.setItem(cacheUserKey, username);
            initCanvas();
            //todo 判断是否有进行中的对战，如果存在恢复游戏进度
            if (api.isExistProgress()) {
                api.recoveryProgress();
            } else {
                //画图按钮开启
                $('#draw-plane').removeAttr('disabled');
            }
        });
    }

    /**
     * 画飞机
     */
    $('#draw-plane').click(function () {
        //坐标集合
        let sky = $('#sky');
        let draw = $(this);

        //重置
        if (parseInt($(this).val()) === 1) {
            planeList = {'plane1': [], 'plane2': [], 'plane3': []};
            //重置cell背景
            sky.children('.cell').removeClass('bg-plane1 bg-plane2 bg-plane3');
            return;
        }

        draw.val(1);
        draw.html('重新绘制');
        sky.addClass('border-draw');

        //选中
        $('.cell-sky').click(function () {
            let cell = $(this);
            let pushPoint = function (key) {
                let id = cell.prop('id');
                if (planeList[key].indexOf(id) > -1) {
                    return;
                }
                planeList[key].push(id);
                logger.debug('add point ' + key + ': ' + planeList[key]);
            };
            let pointCount = function () {
                return planeList.plane1.length + planeList.plane2.length + planeList.plane3.length;
            };

            let count = pointCount();
            if (count <= 29) {
                if (count >= 0 && count <= 9) {
                    pushPoint('plane1');
                    cell.addClass('bg-plane1')
                } else if (count >= 9 && count <= 19) {
                    pushPoint('plane2');
                    cell.addClass('bg-plane2')
                } else if (count >= 19 && count <= 29) {
                    pushPoint('plane3');
                    cell.addClass('bg-plane3')
                }
            }

            //画板准备完毕
            if (pointCount() >= 29) {
                sky.children('.cell-sky').unbind('click');
                $('#start').removeAttr('disabled');
            }
            //todo 触发游戏准备动作
        });
    });

    /**
     * 登录事件
     */
    $('#form').submit(function () {
        let username = $('#username').val();
        logger.debug('login username: ' + username);
        login(username);
        return false;
    });
});
