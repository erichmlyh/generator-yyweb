/**
 * @file jsonp
 * @author liyanghua
 */
const config = {
    callback: 'callback',
}

function generateCB() {
    return 'jsonp' + (+new Date);
}

function removeCB(_name) {
    try {
        delete window[_name];
    } catch (e) {
        window[_name] = undefined;
    }
}

function createScript(_url, _id) {
    const script = document.createElement('script');
    script.setAttribute('src', _url);
    script.id = _id;
    document.getElementsByTagName('head')[0].appendChild(script);
    return script;
}

function removeScipt(_id) {
    const script = document.getElementById(_id);
    document.getElementsByTagName('head')[0].removeChild(script);
}

function jsonp(_url, params = {}, options = {}) {
    return new Promise((resolve, reject) => {
        const jsonp = options.callback || config.callback,
            cb = generateCB(), // get callback function name
            scriptId = cb;
        let timer = null;
        let query = [];
        Object.keys(params).forEach(key => {
            query.push(`${key}=${params[key]}`);
        });
        query.push(`${jsonp}=${cb}`);
        _url = _url + (/\?/.test(_url)?"&":"?") + `${query.join('&')}`;

        // 注册回调
        window[cb] = (res) => {
            timer && clearTimeout(timer);
            if (res && "string" === typeof res) {
                res = JSON.parse(res);
            }
            if (res && res.errno == 0) {
                resolve(res);
            } else {
                reject(res);
            }
            removeScipt(scriptId);
            removeCB(cb);
        }

        let script = createScript(_url, scriptId);
        // 超时
        if (options.timeout > 0) {
            timer = setTimeout(() => {
                reject({
                    errno: -1,
                    errmsg: 'timeout',
                    data: {}
                })
            }, options.timeout);
        }
        // 下载失败
        script.addEventListener("error", (e)=>{
            reject({
                errno: -2,
                errmsg: 'network error',
                data: {}
            })
        });
    })
}

export default jsonp