<template>
  <div class="survive">
    <img class="banner" :src="existing.backgroundImg || $Placeholder" alt="" />
    <div class="title">ÏÖ´æ´óÐÜÃ¨</div>
    <div class="nums">
      <div class="nums-box" v-for="item in existingList" :key="item.id">
        <div>{{ item.summary }}</div>
        <div>{{ item.name }}</div>
      </div>
    </div>
    <p class="text">
      {{ existing.summary }}
    </p>

    <img class="banner" :src="careOf.backgroundImg || $Placeholder" alt="" />
    <div class="title">¹Ø°®ÐÜÃ¨¡¤·îÏ×°®ÐÄ</div>
    <div class="nums">
      <div class="nums-boxs" v-for="item in careOfList" :key="item.id">
        <div>{{ item.summary }}</div>
        <div>{{ item.name }}</div>
      </div>
    </div>
    <p class="text">
      {{ careOf.summary }}
    </p>
  </div>
</template>

<script>
import { getChannelDetail, getChannelSubset } from '@/service/apiList/common'
export default {
  name: 'surVive',
  data() {
    return {
      existing: {},
      careOf: {},
      careOfList: [],
      existingList: [],
    }
  },
  created() {
    this.getChannelDetail()
    this.getExistingSubset()
    this.getCareOf()
    this.getCareOfSubset()
  },
  methods: {
    async getChannelDetail() {
      const res = await getChannelDetail({ channelCode: 'xcdxm' })
      if (res.code === 0) {
        this.existing = res.data
      }
    },
    async getExistingSubset() {
      const res = await getChannelSubset({ channelCode: 'xcdxm' })
      if (res.code === 0) {
        this.existingList = res.data.subset
      }
    },
    // À¸Ä¿ÏêÇé
    async getCareOf() {
      const res = await getChannelDetail({ channelCode: 'gaxmfxax' })
      if (res.code === 0) {
        this.careOf = res.data
      }
    },
    async getCareOfSubset() {
      const res = await getChannelSubset({ channelCode: 'gaxmfxax' })
      if (res.code === 0) {
        this.careOfList = res.data.subset
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.survive {
  background: #f5f5f5;
  .banner {
    width: 7.5rem;
    height: 4.6rem;
  }
  > .title {
    font-weight: Bold;
    font-size: 0.4rem;
    color: #333333;
    line-height: 1;
    padding: 0.79rem 0 0.59rem;
    margin: 0 0.3rem;
    border-bottom: 0.01rem solid #333333;
  }
  > .nums {
    display: flex;
    margin: 0 0.3rem;
    padding: 0.57rem 0 0.43rem;
    border-bottom: 0.01rem solid #d0d0d0;
    .nums-box {
      margin-right: 1.55rem;
      text-align: center;
      &:last-child {
        margin: 0;
      }
      div {
        &:first-child {
          font-weight: Bold;
          font-size: 0.6rem;
          color: #15a98d;
          line-height: 1;
        }
        &:last-child {
          margin-top: 0.16rem;
          font-weight: 500;
          font-size: 0.2rem;
          color: #333333;
        }
      }
    }
    .nums-boxs {
      margin-right: 0.9rem;
      text-align: center;
      &:last-child {
        margin: 0;
      }
      div {
        &:first-child {
          font-weight: Bold;
          font-size: 0.6rem;
          color: #15a98d;
          line-height: 1;
        }
        &:last-child {
          margin-top: 0.16rem;
          font-weight: 500;
          font-size: 0.2rem;
          color: #333333;
        }
      }
    }
  }
  > .text {
    padding: 0.6rem 0.3rem 0.84rem;
    font-size: 0.24rem;
    color: #333;
    line-height: 0.36rem;
  }
}
</style>
