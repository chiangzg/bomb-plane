//@author Chiang
let logger = {
    debug: function (content) {
        if (DEBUG) {
            let date = (new Date).toLocaleDateString();
            console.log(date + '[Debug]: ' + content);
        }
    },
    info: function (content) {
        let date = (new Date).toLocaleDateString();
        console.log(date + '[Info]: ' + content);
    },
    error: function (content) {
        let date = (new Date).toLocaleDateString();
        console.error(date + '[Error]: ' + content);
    }
};

let objTool = {
    isEmpty: function (obj) {
        for (let key in obj) {
            return false;
        }
        return true;
    },
    existsKey: function (index, obj) {
        for (let key in obj) {
            if (index === key) {
                return true;
            }
        }
        return false;
    }
};

/**
 * 元素对象
 *
 * @param id
 * @constructor
 */
function ElementObj(id) {
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