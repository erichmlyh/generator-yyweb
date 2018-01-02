<template>
    <div id="prize" class="the-prize" @touchmove.prevent>
        <p>我是奖品列表页</p>
    </div>
</template>

<script>
import preload from "common/preload"
import api from "js/api"

export default {
    name: 'Prize',
    data() {
        return {
        };
    },
    created() {
        var storage = localStorage || {};
        this.$bus.$emit("duLoading", true); // 显示loading
        Promise.all([
            api('info').then((json) => {
            }, (json)=>{
            }),
            preload([])
        ]).finally(()=>{
            this.$bus.$emit("duLoading", false);
        });
        
    },
    methods: {
       
    }
}
</script>

<style lang="scss">
    @import "../css/rem.scss";
    .the-prize {
    }
</style>