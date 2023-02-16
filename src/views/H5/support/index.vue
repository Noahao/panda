<template>
  <H5Layout>
    <H5Banner channelCode="axzc" />
    <!-- 爱心支持 -->
    <div class="support">
      <div class="title">爱心支持</div>
      <p v-if="details.summary" v-html="getText(details.summary)"></p>
      <div class="button">
        <div @click="jump(item, 'axzc')" v-for="item in tabList" :key="item.id">
          {{ item.title }}
        </div>
      </div>
    </div>
    <!-- 现存大熊猫 -->
    <Survive />
    <!-- 爱心名录 -->
    <div class="love">
      <div class="title">爱心名录</div>
      <div class="text" v-if="loveDetails.summary">
        <p v-html="getText(loveDetails.summary)"></p>
      </div>
      <img :src="loveDetails.backgroundImg || $Placeholder" alt="" />
    </div>
  </H5Layout>
</template>
<script>
import { getChannelDetail, getNewsList } from '@/service/apiList/common'
import Survive from '@/views/H5/support/components/Survive.vue'
export default {
  name: 'SupportIndex',
  inject: ['jumpDetails'],
  components: {
    Survive,
  },
  data() {
    return {
      details: {},
      loveDetails: {},
      tabList: [
        {
          title: '捐助我们',
          channelCode: 'jzwm',
        },
        {
          title: '爱心名录',
          channelCode: 'axml',
        },
      ],
    }
  },
  computed: {
    getText() {
      return (text) => {
        if (text && text.length > 33) {
          return `<span>${text.substring(0, 29)}</span>
          <span>${text.substring(29, text.length)}</span>
          `
        }
        return `<span>${text}</span>
          `
      }
    },
  },
  created() {
    this.getChannelDetail()
    this.getLoveDetail()
  },
  methods: {
    // 爱心支持
    async getChannelDetail() {
      const res = await getChannelDetail({
        channelCode: 'axzc1',
      })
      if (res.code === 0) {
        this.details = res.data
      }
    },
    jump(item) {
      getNewsList({
        channelCode: item.channelCode,
      }).then((res) => {
        try {
          this.jumpDetails(res.datas[0], 'axzc')
        } catch (error) {
          return ''
        }
      })
    },
    // 爱心名录
    async getLoveDetail() {
      const res = await getChannelDetail({
        channelCode: 'axml',
      })
      if (res.code === 0) {
        this.loveDetails = res.data
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.support {
  text-align: center;
  > .title {
    font-weight: Bold;
    font-size: 0.46rem;
    color: #333333;
    line-height: 1;
    padding: 0.79rem 0 0.5rem;
  }
  p {
    font-size: 0.24rem;
    color: #333333;
    line-height: 0.36rem;
    margin-bottom: 0.5rem;
    ::v-deep span {
      text-align: center;
      display: block;
      &:nth-child(2) {
        width: 5rem;
        @include ellipsis(5rem);
        margin: auto;
      }
    }
  }
  > .button {
    margin-bottom: 0.79rem;
    display: flex;
    justify-content: center;
    div {
      color: #fff;
      font-size: 0.24rem;
      padding: 0.18rem 0.53rem;
      line-height: 1;
      &:first-child {
        background: #15a98d;
      }
      &:last-child {
        margin-left: 0.3rem;
        background: #fbb03f;
      }
    }
  }
}
.love {
  text-align: center;
  > .title {
    padding: 0.79rem 0 0.5rem;
    font-weight: Bold;
    font-size: 0.46rem;
    text-align: center;
  }
  > .text {
    text-align: center;
    line-height: 0.36rem;
    color: #333333;
    font-size: 0.24rem;
    margin-bottom: 0.6rem;
    p {
      font-size: 0.24rem;
      color: #333333;
      line-height: 0.36rem;
      margin-bottom: 0.5rem;
      ::v-deep span {
        text-align: center;
        display: block;
        &:nth-child(2) {
          width: 5rem;
          @include ellipsis(5rem);
          margin: auto;
        }
      }
    }
  }
  img {
    width: 6.49rem;
  }
}
</style>
