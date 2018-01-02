<template>
    <div id="landing" class="the-landing" @touchmove.prevent>
        <p>我是落地页</p>
        <p></p>
        <p @click='goPage("prize")'>去我的奖品列表页</p>
    </div>
</template>

<script>
import preload from "common/preload"
import api from "js/api"

export default {
    name: 'Landing',
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
        goPage (page) {
            this.$router.push(page);
        }
    }
}
</script>

<style lang="scss">
    @import "../css/rem.scss";
    .the-landing {
    }
</style>