<template>
  <div :style="{ background: color, border: '0.01rem solid ' + border }" class="more-and-more" @click="jump">查看更多</div>
</template>

<script>
export default {
  name: 'MoreAndMore',
  props: {
    path: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    border: {
      type: String,
      default: '#d8d8d8',
    },
  },
  methods: {
    jump() {
      this.$emit('jump', '')
      if (this.path) {
        this.$router.push(this.path)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.more-and-more {
  text-align: center;
  font-weight: 500;
  color: #666;
  font-size: 0.24rem;
  padding: 0.14rem 0.4rem;
  line-height: 1;
  border-radius: 0.26rem;
  border: 0.01rem solid #d8d8d8;
  display: block;
  width: 2rem;
  margin: 0.4rem auto 0;
}
</style>
