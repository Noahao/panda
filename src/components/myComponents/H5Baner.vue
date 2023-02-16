<template>
  <div
    class="banner"
    :style="{
      background: 'url(' + getUrl(banner.backgroundImg) + ') no-repeat',
    }"
  >
    <div class="title wow pulse">{{ banner.name }}</div>
    <p class="text wow pulse" data-wow-duration="1s">{{ banner.summary }}</p>
    <p class="icon">
      <MyIcon name="shubiao" size="0.4rem" />
    </p>
  </div>
</template>

<script>
import { getChannelDetail } from '@/service/apiList/common'
export default {
  name: 'H5Banner',
  props: {
    channelCode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      banner: {},
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
  },
  created() {
    this.getChannelDetail()
  },
  methods: {
    async getChannelDetail() {
      const res = await getChannelDetail({
        channelCode: this.channelCode,
      })
      if (res.code === 0) {
        this.banner = res.data
      }
    },
  },
  watch: {
    channelCode: {
      handler(to) {
        if (to) {
          this.getChannelDetail()
        }
      },
      immediate: true,
      deep: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  width: 7.5rem;
  height: 4.22rem;
  background-size: 100% !important;
  text-align: center;
  color: #fff;
  .title {
    padding-top: 2.24rem;
    line-height: 1;
    font-weight: Bold;
    font-size: 0.4rem;
  }
  .text {
    padding: 0.28rem 0 0.38rem;
    font-weight: 500;
    line-height: 1;
    font-size: 0.3rem;
  }
  .icon {
    -webkit-animation: bounce-down 1.6s linear infinite;
    animation: bounce-down 1.6s linear infinite;
  }
  @keyframes bounce-down {
    25% {
      transform: translateY(-0.04rem);
    }
    50%,
    100% {
      transform: translateY(0);
    }
    75% {
      transform: translateY(0.04rem);
    }
  }
}
</style>
