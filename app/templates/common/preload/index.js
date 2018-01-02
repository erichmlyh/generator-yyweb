/**
 * @file preload
 * @author liyanghua
 */
class Preload {
    constructor(options, callback) {
        let { imgUrls = [], timeout = 1e4, retryTimes=1} = options;
        this.length = imgUrls.length;
        this.callback = callback || function(){};
        
        if (!this.length) {
            this.callback(true);
            return;
        }
        
        imgUrls.forEach((url) => {
            this.loadingImg(url, retryTimes);
        });
        
        if (timeout) {
            this.timer = setTimeout(() => {
                this.callback(false);     
            }, timeout);
        }
    }
    loadingImg (url, retryTimes = 1) {
        var that = this;
        var img = new Image();
        img.onload = function () {
            img.onload = null;
            that.isOk();
        };
        img.onerror = function () {
            if (retryTimes > 0) {
                that.loadingImg(url, --retryTimes);
            }
        }
        img.src = url;
    }
    isOk () {
        if ((--this.length <= 0) && typeof this.callback === 'function') {
            this.timer && clearTimeout(this.timer);
            this.callback(true);
        }
    }
}

export default function(options) {
    if (Object.prototype.toString.call(options) == "[object Array]") {
        options = {imgUrls: options};
    }
    return new Promise((resolve, reject) => {
        new Preload(options, (done)=>{
            done ? resolve(done) : reject(done);
        });
    });
}
