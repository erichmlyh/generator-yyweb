<template>
  <div class="layer-container" ref="layer" :style='{height: height+"px"}'
        @click.self="clickLayer" 
        @touchmove.self.prevent>
      <slot></slot>  
  </div>
</template>

<script>
function hasChild(parentNode, childName) {
  for(let i=0; i<parentNode.children.length; i++) {
    if (parentNode.children[i].tagName === childName || hasChild(parentNode.children[i], childName)) {
      return true;
    }
  }
  return false;
}
var parent = null, changeHeight = false;
var parentStyleHeight = 0;
export default {
  name: "Layer",
  data() {
    return {
      height: document.documentElement.clientHeight
    };
  },
  props: {
  },
  mounted() {
    parent = this.$refs.layer.parentElement;
    parentStyleHeight = parent.style.height;
    window.addEventListener('resize', function () {
        this.height = document.documentElement.clientHeight;
    }.bind(this));
  },
  updated() {
    changeHeight = parent.clientHeight>this.height && hasChild(this.$refs.layer, "INPUT");
    if (changeHeight) {
      parent.style.height = this.height + "px";
      parent.style.overflowY = "hidden";
      if (!parent.style.position || parent.style.position == "static") {
        parent.style.position = "relative";
      }
    }
  },
  destroyed() {
   if (changeHeight) {
     parent.style.height = parentStyleHeight;
     parent.style.overflowY = "";
   }
  },
  methods: {
    clickLayer(e) {
      this.$emit("clickLayer");
    }
  }
};
</script>

<style lang="scss" scoped>
.layer-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  -webkit-overflow-scrolling: touch;
  z-index: 1000;
}
</style>
