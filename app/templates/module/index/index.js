import 'css/reset.css'
import 'css/_base.scss'
import 'css/duLoading.scss'

import fastClick from "@lib/fastclick"

import { Promise } from 'es6-promise'
window.Promise = Promise;

import Vue from 'vue'
import router from './router'
import Index from './Index.vue'

import vLog from 'common/vLog'
Vue.use(vLog);

import 'common/toast/toast.css';
import Toast from 'common/toast';
Vue.use(Toast, {
	defaultType: 'bottom',
	duration: 2500,
	wordWrap: false,
	width: 'auto'
});

import cache from 'js/cache'

// 横屏观看
yymap.ui.orientationTip.init();
fastClick.attach(document.body, {}); // fastClick

Vue.prototype.$bus = new Vue(); // 注册全局事件
Vue.prototype.$cache = cache; // 注册全局缓存

Vue.config.productionTip = false;

new Vue({
	el: '#app',
	router,
	template: '<Index/>',
	components: {
		Index,
	}
});

