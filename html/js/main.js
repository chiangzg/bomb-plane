//@author Chiang

//点击login
function login(userName) {
    logger.debug(userName);
    srv.connect(userName, function (data) {
        if (!data.status) {
            alert(data.message);
            return;
        }

        //登录用户存入locate
        localStorage.setItem(cacheUserKey, userName);
        //初始化画板
        initCanvas();
        (new ElementObj('login')).show(false);
    });
    return false;
}

//刷新页面恢复链接
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

let DEBUG = true;
let srvUrl = 'ws://127.0.0.1:8000';
let srv = null;
let cacheUserKey = 'bp_user_name_key';
window.onload = function () {
    srv = new Socket(srvUrl);
    reload();
};
