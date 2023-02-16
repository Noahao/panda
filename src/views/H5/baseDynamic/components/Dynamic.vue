<template>
  <div class="dynamic">
    <div class="title">基地动态</div>
    <div class="tab">
      <div :class="{ active: index === i }" @click="clickIndex(i)" v-for="(item, i) in tabList" :key="i">
        {{ item.name }}
      </div>
    </div>
    <!-- “熊猫龙门阵”入驻成都大熊猫繁育研究基地扩建区  -->

    <!-- 基地动态 -->
    <template v-if="index === 0">
      <img v-if="list && list.length" @click="jumpDetails(list[0], 'jddt')" class="banner" :src="getUrl(list)" alt="" />
      <div class="list" v-if="list && list.length">
        <div class="item" @click="jumpDetails(item, 'jddt')" v-for="item in list" :key="item.id">
          <div class="title">{{ item.title }}</div>
          <div class="text" v-if="item.summary">{{ item.summary }}</div>
          <div class="time">{{ item.publishTime }}</div>
        </div>
      </div>
    </template>

    <!-- 单位公告 -->
    <template v-if="index === 1">
      <div v-if="list && list.length" class="top-title" @click="jumpDetails(list[0], 'jddt')">
        <div class="title">{{ list[0].title }}</div>
        <div class="info" v-if="list[0].summary">
          {{ list[0].summary }}
        </div>
      </div>

      <ul>
        <li @click="jumpDetails(item, 'jddt')" v-show="index !== 0" v-for="(item, index) in list" :key="index">{{ item.title }}</li>
      </ul>
    </template>
    <MoreAndMore :path="index === 0 ? '/h5/baseDynamic/list?channelCode=jddt1' : '/h5/baseDynamic/list?channelCode=dwgg'" />
    <ImgSkeleton v-show="isSkeleton && index === 0" :num="3" />
    <TextSkeleton v-show="isSkeleton && index === 1" :num="18" />
  </div>
</template>

<script>
import { getChannelSubset, getNewsList } from '@/service/apiList/common'
import ImgSkeleton from '@/components/h5Skeleton/ImgSkeleton.vue'
import TextSkeleton from '@/components/h5Skeleton/TextSkeleton.vue'
import MoreAndMore from '@/views/H5/components/MoreAndMore.vue'
export default {
  name: 'DynaMic',
  inject: ['jumpDetails'],
  components: {
    ImgSkeleton,
    TextSkeleton,
    MoreAndMore,
  },
  data() {
    return {
      index: 0,
      tabList: [],
      list: [],
      isSkeleton: false,
    }
  },
  computed: {
    getUrl() {
      return (list) => {
        try {
          return list[0].imageUrls[0].url
        } catch (error) {
          return this.$Placeholder
        }
      }
    },
  },
  async created() {
    await this.getChannelSubset()
    await this.getNewsList(this.tabList[0].channelCode, 4)
  },
  methods: {
    clickIndex(i) {
      this.index = i
      this.list = []
      this.getNewsList(this.tabList[i].channelCode, i === 0 ? 4 : 10)
    },
    async getChannelSubset() {
      const res = await getChannelSubset({ channelCode: 'jddt' })
      if (res.code === 0) {
        this.tabList = res.data.subset.filter((item) => {
          return item.name === '基地动态' || item.name === '单位公告'
        })
      }
    },
    async getNewsList(channelCode, pageSize) {
      this.isSkeleton = true
      const res = await getNewsList({ channelCode, pageSize, currPage: 1 })
      if (res.code === 0) {
        this.list = res.datas
      }
      this.isSkeleton = false
    },
  },
}
</script>

<style lang="scss" scoped>
.dynamic {
  padding: 0 0.3rem;
  > .title {
    text-align: center;
    font-weight: Bold;
    font-size: 0.46rem;
    color: #333333;
    padding: 0.79rem 0 0.5rem;
  }
  > .tab {
    display: flex;
    justify-content: center;
    margin-bottom: 0.5rem;
    div {
      text-align: center;
      line-height: 1;
      width: 2rem;
      padding: 0.19rem 0;
      color: #333333;
      font-size: 0.24rem;
      border: 0.01rem solid #d9d9d9;
      margin-left: 0.3rem;
      &:first-child {
        margin: 0;
      }
    }
    .active {
      color: #ffffff;
      border: 0.01rem solid #15a98d;
      background: #15a98d;
    }
  }
  > .banner {
    width: 6.9rem;
    height: 3.83rem;
  }
  > .list {
    .item {
      background: rgba(245, 245, 245, 1);
      padding: 0.4rem 0.2rem;
      margin-bottom: 0.2rem;
      &:last-child {
        margin: 0;
      }
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
  > .top-title {
    border-bottom: 0.01rem solid #dedede;
    padding-bottom: 0.4rem;
    > .title {
      font-weight: Bold;
      font-size: 0.26rem;
      color: #15a98d;
      @include ellipsis(100%);
    }
    > .info {
      margin-top: 0.3rem;
      color: #999999;
      font-size: 0.24rem;
      line-height: 0.36rem;
      @include ellipsisLn(2);
    }
  }
  > ul {
    padding: 0.4rem 0 0;
    li {
      font-weight: Bold;
      font-size: 0.26rem;
      color: #666666;
      padding: 0.1rem;
      position: relative;
      padding-left: 0.3rem;
      &::after {
        position: absolute;
        left: 0;
        top: 0.18rem;
        content: '';
        width: 0.14rem;
        height: 0.14rem;
        border-radius: 50%;
        border: 0.01rem solid #666666;
      }
      @include ellipsis(100%);
    }
  }
}
</style>
