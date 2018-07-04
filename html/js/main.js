//@author Chiang
let DEBUG = true;
let srvUrl = 'ws://127.0.0.1:8000';
let srv = null;
let cacheUserKey = 'bp_user_name_key';

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
        logger.debug('start draw-plane');

        $(this).html('重新绘制');
        $('#sky').addClass('border-draw');

        //启动绘制轨迹
        $('.cell-sky').click(function () {
            let cell, cellId;
            cell = $(this);
            cellId = cell.prop('id');

            if (parseInt(cell.val()) !== 1) {
                logger.debug('add cell-sky id: [' + cellId + '] value: ' + cell.val());
                //增加选中背景、加入坐标ary
                cell.val(1);
                cell.addClass('bg-selected');
            } else {
                logger.debug('remove cell-sky id: [' + cellId + '] value: ' + cell.val());
                //移除背景、从坐标ary中去除
                cell.val(0);
                cell.removeClass('bg-selected');
            }
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
