<template>
  <H5Layout>
    <H5Banner channelCode="dwzj" />
    <!-- ÄÌ°ÖÄÌÂè -->
    <div class="dads">
      <div class="title">ÄÌ°ÖÄÌÂè</div>
      <div class="item" @click="jumpDetails(item, 'dwzj')" v-for="item in list" :key="item.id">
        <img :src="item.imageUrls.length && item.imageUrls[0].url
          || $Placeholder" alt="" />
        <div class="box">
          <div class="name">{{ item.title }}</div>
          <div class="introduce" v-if="item.summary">{{ item.summary }}</div>
          <!-- <div class="time">{{ item.publishTime }}</div> -->
        </div>
      </div>
    </div>
    <MoreAndMore path="/h5/generalList?channelCode=nbnm&banner=dwzj" />
    <!-- ËÇÑø¶¯Ì¬ -->
    <Dynamic />
  </H5Layout>
</template>

<script>
import { getNewsList } from '@/service/apiList/common'
import Dynamic from '@/views/H5/animal/components/Dynamic.vue'
import MoreAndMore from '@/views/H5/components/MoreAndMore.vue'
export default {
  name: 'AnialHome',
  inject: ['jumpDetails'],
  components: {
    Dynamic,
    MoreAndMore
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
        channelCode: 'nbnm',
        pageSize: 3,
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
.dads {
  padding: 0 0.3rem;
  > .title {
    padding: 0.79rem 0 0.5rem;
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
    &:last-child{
      margin: 0;
    }
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
      text-indent: 0.48rem;
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
