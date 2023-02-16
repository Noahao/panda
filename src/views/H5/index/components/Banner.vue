<template>
  <div class="banner" :style="{ background: 'url(' + info.coverImage + ') no-repeat' }">
    <div class="title">{{ info.name }}</div>
    <div class="info">{{ info.summary }}</div>
    <div class="head" v-if="list.length">
      <div class="bubble" v-for="(item, index) in list" :key="index">
        <img :src="(item.imageUrls.length && item.imageUrls[0].url) || $Placeholder" alt="" />
      </div>
    </div>
    <div class="one"></div>
  </div>
</template>

<script>
import { cardDetail, getNewsList } from '@/service/apiList/common'

export default {
  name: 'HomeBanner',
  data() {
    return {
      info: {},
      list: [],
    }
  },
  created() {
    this.cardDetail()
    this.getNewsList()
  },

  methods: {
    // 首页banner
    async cardDetail() {
      const res = await cardDetail()
      if (res.code === 0) {
        this.info = res.data
      }
    },
    // 熊猫大使头像
    async getNewsList() {
      const res = await getNewsList({
        channelCode: 'xmds',
        pageSize: 10,
        currPage: 1,
      })
      if (res.code === 0) {
        this.list = res.datas
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 12.14rem;
  background-size: 100% !important;
  position: relative;
  > .title {
    position: relative;
    z-index: 30;
    font-weight: Bold;
    font-size: 0.5rem;
    text-align: left;
    color: #ffffff;
    letter-spacing: 0.01rem;
    position: absolute;
    bottom: 2.56rem;
    right: 0.91rem;
  }
  > .info {
    font-weight: Bold;
    font-size: 0.32rem;
    height: 0.5rem;
    padding: 0 0.05rem;
    background: rgba(255, 255, 255, 0.3);
    color: #121412;
    text-align: center;
    line-height: 0.5rem;
    letter-spacing: 0.05rem;
    position: absolute;
    bottom: 1.78rem;
    right: 2.05rem;
  }
  > .head {
    position: absolute;
    bottom: 2.5rem;
    > div {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      text-align: center;
    }
    .bubble {
      animation: bubbleOne 10s ease-in infinite;
      line-height: 1.25rem;
      border-radius: 50%;
      height: 1.25rem;
      width: 1.25rem;
      left: 5.8rem;
      position: absolute;
      top: -1rem;
      pointer-events: none;
      opacity: 0;
      transition: all 400ms ease;
      img {
        width: 1.1rem;
        height: 1.1rem;
        border-radius: 50%;
      }
    }
    .bubble:nth-child(2n) {
      animation-name: bubbleFour;
      transform-origin: right center;
      animation-delay: 1s;
    }
    .bubble:nth-child(3n) {
      animation-name: bubbleOne;
      transform-origin: left center;
      animation-delay: 2s;
    }
    .bubble:nth-child(4n) {
      animation-name: bubbleFour;
      transform-origin: right center;
      animation-delay: 3s;
    }
    .bubble:nth-child(5n) {
      animation-name: bubbleOne;
      transform-origin: left center;
      animation-delay: 4s;
    }
    .bubble:nth-child(6n) {
      animation-name: bubbleFour;
      transform-origin: right center;
      animation-delay: 5s;
    }
    .bubble:nth-child(7n) {
      animation-name: bubbleOne;
      transform-origin: left center;
      animation-delay: 6s;
    }
    .bubble:nth-child(8n) {
      animation-name: bubbleFour;
      transform-origin: right center;
      animation-delay: 7s;
    }
    .bubble:nth-child(9n) {
      animation-name: bubbleOne;
      transform-origin: left center;
      animation-delay: 8s;
    }
    .bubble:nth-child(10n) {
      animation-name: bubbleFour;
      transform-origin: right center;
      animation-delay: 9s;
    }
    @keyframes bubbleOne {
      0% {
        transform: scale(1) translateX(0) translateY(2rem);
        opacity: 0;
      }
      20% {
        transform: scale(1) translateX(0) translateY(2rem);
        opacity: 1;
      }
      50% {
        transform: scale(0.5) translateY(0.5);
        opacity: 0.5;
      }
      100% {
        transform: scale(0) translateY(0);
        opacity: 0;
      }
    }
    @keyframes bubbleFour {
      0% {
        transform: scale(1) translateY(2rem);
        opacity: 0;
      }
      20% {
        transform: scale(1) translateX(0) translateY(2rem);
        opacity: 1;
      }
      50% {
        transform: scale(0) translateY(0.5);
        opacity: 0.5;
      }
      100% {
        transform: scale(0) translateY(0);
        opacity: 0;
      }
    }
  }
  .one {
    z-index: 20;
    position: absolute;
    bottom: 0.2rem;
    right: 1.7rem;
    &::after {
      position: absolute;
      left: 0.15rem;
      bottom: -0.05rem;
      content: '';
      width: 0.9rem;
      height: 0.3rem;
      background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/BT.png') no-repeat;
      background-size: 100%;
    }
  }
}
</style>
