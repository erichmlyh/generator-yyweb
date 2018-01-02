import { origin } from 'origin'
import jsonp from 'common/jsonp'

const address = {
    info: origin + "/template/info",         // 用户首页接口
}

export default function api(url, params = {}, options = {}) {
    return jsonp(address[url], Object.assign({}, naa.phoneinfo, params), { timeout: options.timeout || 3000 });
}