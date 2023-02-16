<template>
  <div class="text-skeleton">
    <div v-for="item in num" :key="item.id"></div>
  </div>
</template>

<script>
export default {
  name: 'TextSkeleton',
  props: {
    num: {
      type: Number,
      default: 10,
    },
  },
}
</script>

<style lang="scss" scoped>
.text-skeleton {
  background: #fff;
  padding: 0.3rem 0.3rem;
  animation: skeleton-blink 1.2s ease-in-out infinite;
  div {
    width: 100%;
    height: 0.32rem;
    background: #f2f3f5;
    margin-bottom: 0.12rem;
    &:last-child {
      margin: 0;
    }
  }
  @keyframes skeleton-blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
