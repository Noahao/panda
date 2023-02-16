<template>
  <div class="video" v-if="show">
    <MyIcon class="weibo" @click="close" name="guanbi-" color="#fff" size="0.3rem" />
    <video :src="url" autoplay controls="true" oncontextmenu="return false"></video>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getShow: {
      get() {
        return this.show
      },
      set(e) {
        return this.$emit('update:show', e)
      },
    },
  },
  methods: {
    close() {
      this.getShow = false
    },
  },
}
</script>

<style lang="scss" scoped>
.video {
  background: #000;
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100vh;
  video {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .weibo {
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
  }
}
</style>
