<template>
  <H5Layout>
    <H5Banner channelCode="xmg" />
    <!-- 玩转熊猫谷 -->
    <HowToPlay />
    <!-- 要闻速递 -->
    <Courier />
  </H5Layout>
</template>

<script>
import HowToPlay from '@/views/H5/pandaValley/components/HowToPlay.vue'
import Courier from '@/views/H5/pandaValley/components/Courier.vue'
export default {
  name: 'PandaValley',
  components: {
    HowToPlay,
    Courier,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.dads {
  padding: 0 0.3rem;
  > .title {
    padding: 0.79rem 0.5rem;
    line-height: 1;
    font-weight: Bold;
    font-size: 0.46rem;
    text-align: center;
  }
  img {
    width: 6.9rem;
    height: 3.94rem;
  }
  .item {
    margin-bottom: 0.4rem;
  }
  .box {
    padding: 0.4rem 0.2rem 0.49rem;
    background: #f5f5f5;
    .name {
      font-weight: Bold;
      font-size: 0.26rem;
      line-height: 1;
      color: #333333;
      @include ellipsis();
    }
    .introduce {
      margin-top: 0.3rem;
      font-size: 0.24rem;
      color: #666666;
      line-height: 0.36rem;
      @include ellipsisLn(2);
    }
    .time {
      line-height: 1;
      margin-top: 0.41rem;
      font-weight: 500;
      font-size: 0.2rem;
      color: #999999;
    }
  }
}
</style>
