<template>
    <div id="app">
          <keep-alive>
              <router-view/>
          </keep-alive>
    </div>
</template>

<script>
export default {
    name: "Index",
    data() {
        return {};
    },
    mounted() {
        this.$bus.$on("duLoading", show => {
            duLoading && (show ? duLoading.show() : duLoading.hide());
        });
    }
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>

