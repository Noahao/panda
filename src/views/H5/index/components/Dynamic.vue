<template>
  <div>
    <div class="dynamic" v-if="list && list.length">
      <TitleBox title="基地动态" path="/h5/baseDynamic/list?channelCode=jddt1" />
      <div class="dynamic-list">
        <div class="item" @click="jumpDetails(item, 'jddt')" v-for="(item, index) in list" :key="item.id">
          <div class="img-box" v-if="index === 0">
            <img :src="(item.imageUrls.length && item.imageUrls[0].url) || $Placeholder" alt="" />
            <div class="bg">{{ item.title }}</div>
          </div>
          <span v-else>{{ item.title }}</span>
        </div>
      </div>
    </div>
    <TextSkeleton v-else />
  </div>
</template>

<script>
import { getNewsList } from '@/service/apiList/common'
import TitleBox from '@/views/H5/index/components/TitleBox.vue'
import TextSkeleton from '@/components/h5Skeleton/TextSkeleton.vue'
export default {
  name: 'DynamicHome',
  inject: ['jumpDetails'],
  components: {
    TitleBox,
    TextSkeleton,
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
    // 熊猫大使头像
    async getNewsList() {
      const res = await getNewsList({
        channelCode: 'jddt1',
        pageSize: 5,
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
.dynamic {
  &-list {
    padding: 0 0.32rem 0.79rem;
    .img-box {
      width: 6.9rem;
      height: 3.83rem;
      overflow: hidden;
      position: relative;
      .bg {
        padding: 0.28rem 0.25rem;
        position: absolute;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        line-height: 1;
        color: #ffffff;
        font-weight: Bold;
        font-size: 0.26rem;
        @include ellipsis(100%);
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .item {
      padding: 0.4rem 0 0.79rem;
      font-weight: Bold;
      font-size: 0.26rem;
      color: #666666;
      padding: 0.1rem;
      position: relative;
      padding-left: 0.3rem;
      @include ellipsis(100%);
      &:not(:first-child) {
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
        &:hover {
          color: #15a98d;
        }
      }
      &:first-child {
        padding: 0 0 0.2rem;
      }
    }
  }
}
</style>
