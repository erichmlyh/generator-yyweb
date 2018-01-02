let sendlog = (str) => {
    str = str.replace(/'/g, "");
    console.log(str);
    str && opntj && opntj.send && opntj.send(str);
};
var vLog = {};
vLog.install = function(Vue) {
    Vue.directive('log', {
        bind (el, binding) {
            el.addEventListener("click", () => {
                sendlog(el.dataset.log || binding.value || binding.expression)
            }, false);
        },
        update (el, binding) {
            el.dataset.log = binding.value;
        }
    });
};

export default vLog;