<template>
   <div id="du-loading-container" class="du-loading-container">
        <div class="du-loading"></div>
    </div>
</template>

<script>
export default {
    name: "DuLoading",
    data () {
        return {
        }
    }
};
</script>

<style lang="scss" scoped>
    .du-loading-container {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 9999;
    }
    .du-loading {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        background-image: url("./duLoading.png");
        background-position: 0 0;
        background-size: 2000px 100px;
        animation: du-loading 1.5s steps(19) infinite;
        -webkit-animation: du-loading 1.5s steps(19) infinite; 
    }
    @keyframes du-loading {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: -1900px 0;
        }
    }
</style>


