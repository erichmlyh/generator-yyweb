<template>
   <div id="part-loading-container" class="part-loading-container">
        <div class="part-loading"></div>
    </div>
</template>

<script>
export default {
    name: "PartLoading",
    data () {
        return {
        }
    }
};
</script>

<style lang="scss" scoped>
    .part-loading-container {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.6);
        z-index: 9998;
    }
    .part-loading {
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 28px;
        background: url("./loading.gif") no-repeat center;
        background-size: 100%;
    }
</style>


