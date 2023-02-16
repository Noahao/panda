<template>
  <div
    class="banner-jp"
    :style="{
      'background-image': 'url(' + getUrl(item.backgroundImg) + ')',
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
    }"
  >
    <div class="title">{{ item.summary }}</div>
    <div class="text">{{ strIntercept(item.name) }}</div>
  </div>
</template>

<script>
import { getChannelDetail } from '@/service/apiList/common'
export default {
  name: 'BannerJp',
  data() {
    return {
      item: {},
    }
  },
  computed: {
    getUrl() {
      return (url) => {
        if (url) {
          return url
        }
        return this.$Placeholder
      }
    },
    strIntercept() {
      return (item) => {
        try {
          return item.substring(0, item.indexOf('ги'))
        } catch (error) {
          return item
        }
      }
    }
  },
  watch: {
    $route: {
      handler(to) {
        this.getChannelDetail(to.query.channelCode)
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async getChannelDetail(channelCode) {
      const res = await getChannelDetail({ channelCode })
      if (res.code === 0) {
        this.item = res.data
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.banner-jp {
  width: 7.5rem;
  height: 4.22rem;
  overflow: hidden;
  text-align: center;
  .title {
    font-family: 'Edwardian Script ITC';
    margin: 1rem 0 0.3rem;
    font-size: 0.36rem;
    color: rgba(255, 255, 255, 0.75);
  }
  .text {
    font-size: 0.32rem;
    color: #ffffff;
  }
}
</style>
