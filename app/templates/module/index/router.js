import Vue from 'vue'
import Router from 'vue-router'

import TheLanding from 'pages/TheLanding'

Vue.use(Router);
const router =  new Router({
    routes: [
        {
            path: '/',
            name: 'Landing',
            component: TheLanding
        },
        {
            path: '/prize',
            name: 'Prize',
            component: () => {
                duLoading.show();
                const theComponent = import('pages/ThePrize');
                theComponent.then(() => {
                    duLoading.hide();
                });
                return theComponent;
            },
        },
    ]
});

router.beforeEach((to, from, next) => {
    // 匹配不到路由从定向到默认路由
    if (!to.matched.length) {
        next("/");
        return;
    }
    // 设置分享
    yymap.nativeAppAdapter.initShare({
      title: "分享标题",
      text: "分享内容",
      url: location.href,
      weiboPic: "http://map.baidu.com/zt/y2016/weather/others/logo.png", // 分享图片是http
      weixinPic: "http://map.baidu.com/zt/y2016/weather/others/logo.png" // 分享图片是http
    });
    next();
})

export default router
