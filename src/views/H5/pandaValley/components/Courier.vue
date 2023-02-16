<template>
  <div class="courier">
    <div class="title">ÒªÎÅËÙµÝ</div>
    <div class="list">
      <div class="item" @click="jumpDetails(item, 'xmg')" v-for="item in list" :key="item.id">
        <img :src="(item.imageUrls && item.imageUrls[0].url) || $Placeholder" alt="" />
        <div class="box">
          <div class="title">{{ item.title }}</div>
          <div class="text" v-if="item.summary">{{ item.summary }}</div>
          <div class="time">{{ item.publishTime }}</div>
        </div>
      </div>
    </div>
    <MoreAndMore path="/h5/generalList?channelCode=ywsd&banner=xmwh" />
  </div>
</template>

<script>
import { getNewsList } from '@/service/apiList/common'
import MoreAndMore from '@/views/H5/components/MoreAndMore.vue'
export default {
  name: 'CourierCom',
  inject: ['jumpDetails'],
  components: {
    MoreAndMore,
  },
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
    async getNewsList() {
      const res = await getNewsList({
        channelCode: 'ywsd',
        pageSize: 4,
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
.courier {
   padding: 0 0.3rem 0.4rem;
  > .title {
    text-align: center;
    font-weight: Bold;
    font-size: 0.46rem;
    color: #333333;
    padding: 0.79rem 0 0.4rem;
  }
  > .list {
    > .item {
      background: rgba(245, 245, 245, 1);
      margin-bottom: 0.2rem;
      &:last-child {
        margin: 0;
      }
      > img {
        width: 100%;
        height: 3.83rem;
      }
      > .box {
        padding: 0.4rem 0.2rem;
        .title {
          font-weight: Bold;
          font-size: 0.26rem;
          line-height: 1;
          color: #333333;
          @include ellipsis();
        }
        .text {
          text-indent: 0.48rem;
          margin-top: 0.3rem;
          font-size: 0.24rem;
          color: #666666;
          line-height: 0.36rem;
          @include ellipsisLn(2);
        }
        .time {
          margin-top: 0.28rem;
          font-weight: 500;
          font-size: 0.2rem;
          color: #999999;
          line-height: 1;
        }
      }
    }
  }
}
</style>
