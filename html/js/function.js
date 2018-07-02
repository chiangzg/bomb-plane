//@author Chiang
function debug(content) {
    if (DEBUG) {
        let date = (new Date).toLocaleDateString();
        console.log(date + '[Debug]: ' + content);
    }
}

function info(content) {
    let date = (new Date).toLocaleDateString();
    console.log(date + '[Info]: ' + content);
}

function error(content) {
    let date = (new Date).toLocaleDateString();
    console.error(date + '[Error]: ' + content);
}

