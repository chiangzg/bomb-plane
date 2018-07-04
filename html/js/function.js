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
    existsKey: function (index, obj) {
        for (let key in obj) {
            if (index === key) {
                return true;
            }
        }
        return false;
    }
};
