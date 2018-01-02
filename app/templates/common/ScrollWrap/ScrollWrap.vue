<template>
  <div class="scroll-wrap" 
        @touchstart="touchstart"
        @touchmove="touchmove"
        @scroll="scroll">
        <slot></slot>
    </div>
</template>

<script>
var touchScreenY = 0;
var state = {
    isTop: false,
    isBottom: false,
    isDown: false,
    isUp: false
};
export default {
  name: 'ScrollWrap',
  data () {
    return {
    }
  },
  props: {
  },
  methods: {
    touchstart (e) {
        touchScreenY = e.touches[0].screenY;
     },
     touchmove (e) {
        if ((e.touches[0].screenY - touchScreenY)>5) {
            state.isDown = false;
            state.isUp = true;
        }
        if ((e.touches[0].screenY - touchScreenY)<-5) {
            state.isDown = true;
            state.isUp = false;
        }

        if (state.isTop && state.isUp) {
            e.preventDefault();
        }
        if (state.isBottom && state.isDown) {
            e.preventDefault();
        }
     },
     scroll (e) {
        var scrollTop = e.currentTarget.scrollTop;
        state.isTop = (scrollTop == 0);
        state.isBottom = (scrollTop+e.currentTarget.clientHeight == e.currentTarget.scrollHeight);
     }
  },
}
</script>

