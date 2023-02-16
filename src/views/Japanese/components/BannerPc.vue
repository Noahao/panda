<template>
  <div class="banner-jp" :style="{
    'background-image': 'url(' + getUrl(item.backgroundImg1) + ')',
    'background-size': 'cover',
    'background-repeat': 'no-repeat',
  }">
    <div class="title">{{ item.summary }}</div>
    <div class="desc">{{ strIntercept(item.name) }}</div>
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
  },
}
</script>

<style lang="scss" scoped>
.banner-jp {
  width: 100%;
  height: 6.4rem;
  margin-top: 1.2rem;
  overflow: hidden;
  background-image: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/Japanese/list/bg.jpg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  .title {
    font-family : 'Edwardian Script ITC';
    font-size: 0.56rem;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    margin: 1.6rem auto 0.3rem;
  }
  .desc {
    color: #ffffff;
    font-size: 32px;
    text-align: center;
    letter-spacing: .02rem;
  }
}
</style>
