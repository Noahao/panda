<template>
  <div>
    <div class="list" v-if="list.length">
      <!-- 基地动态 焦点活动-->
      <div class="focus-activity" v-if="['jddt1', 'jdhd', 'xmqw'].includes(activeItem.channelCode)">
        <div class="focus-list">
          <div class="item" @click="jumpDetails(item, 'jddt')" v-for="item in list" :key="item.id">
            <img :src="(item.imageUrls.length && item.imageUrls[0].url) || $Placeholder" alt="" />
            <div class="box">
              <div class="title">{{ item.title }}</div>
              <div class="text" v-if="item.summary">{{ item.summary }}</div>
              <div class="time">{{ item.publishTime }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="list-box">
        <ul>
          <li @click="jumpDetails(item, 'jddt')" v-for="item in list" :key="item.id">{{ item.title }}</li>
        </ul>
      </div>
      <template v-if="list.length">
        <div class="paging" v-show="pageObj.currPage < totalPage && !isSkeleton">
          <div @click="page(1)">点击加载</div>
        </div>
        <div class="paging" v-show="params.currPage === totalPage && !isSkeleton">
          <!-- <div>没有更多数据啦</div> -->
        </div>
      </template>
    </div>
    <ImgSkeleton v-show="isSkeleton && params.currPage === 1 && ['jddt1', 'jdhd', 'xmqw'].includes(activeItem.channelCode)" :num="3" />
    <TextSkeleton v-show="isSkeleton && params.currPage === 1 && ['dwgg'].includes(activeItem.channelCode)" />
    <!-- 暂无数据 -->
    <NoData v-if="!isSkeleton && list.length === 0" />
  </div>
</template>

<script>
import { getNewsList } from '@/service/apiList/common'
import ImgSkeleton from '@/components/h5Skeleton/ImgSkeleton.vue'
import TextSkeleton from '@/components/h5Skeleton/TextSkeleton.vue'
import NoData from '@/components/NoData.vue'
import record from '@/mixin/record'
export default {
  mixins:[record],
  inject: ['jumpDetails'],
  name: 'ListBox',
  components: { ImgSkeleton, TextSkeleton, NoData },
  props: {
    activeItem: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      params: {
        channelCode: '',
        pageSize: 5,
        currPage: 1,
      },
      isSkeleton: false,
      list: [],
      totalPage: 0, // 分页数
    }
  },
  watch: {
    activeItem: {
      async handler(val) {
        this.params.currPage = 1
        this.list = []
        this.params.channelCode = val.channelCode || this.$route.query.channelCode
        if (this.$route.query.channelCode !== val.channelCode) {
          this.$router.replace(`/h5/baseDynamic/list?channelCode=${val.channelCode}`)
        } else {
          const obj = JSON.parse(sessionStorage.getItem('cache'))
          if(obj && obj.name === this.$route.fullPath) {
            // 第一次拿到前几页的数据
            this.params.channelCode = obj.params.channelCode
            this.params.pageSize = 5 * obj.params.currPage
            this.params.currPage = 1
            await this.getNewsList()
            // 下一次点击加载更多时在分页
            this.params = obj.params
            window.scrollTo(0,obj.top)
          }else {
            this.getNewsList()
          }
          this.removeCache()
        }
      },
      deep: true,
    },
  },
  methods: {
    async getNewsList() {
      this.isSkeleton = true
      const res = await getNewsList(this.params)
      if (res.code === 0) {
        this.totalPage = res.page.totalPage
        if (this.params.currPage === 1) {
          this.list = res.datas
        } else {
          this.list.push(...res.datas)
        }
        this.pageObj = res.page
      }
      this.isSkeleton = false
    },
    page(num) {
      this.params.currPage += num
      this.getNewsList()
    },
  },
}
</script>

<style lang="scss" scoped>
.list {
  padding: 0.1rem 0.3rem 0.79rem;
  .list-box {
    margin-bottom: 0.79rem;
    ul {
      padding: 0.5rem 0;
      border-bottom: 0.01rem solid #d9d9d9;
      li {
        color: #333333;
        font-size: 0.24rem;
        line-height: 0.6rem;
        position: relative;
        padding-left: 0.3rem;
        @include ellipsis();
        &:hover {
          color: #15a98d;
        }
        &::after {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(0, -50%);
          content: '';
          width: 0.1rem;
          height: 0.1rem;
          border: 0.02rem solid#666666;
          border-radius: 50%;
        }
      }
    }
  }
  .paging {
    margin: auto;
    display: flex;
    width: 4rem;
    justify-content: space-around;
    color: #666;
    div {
      font-weight: 500;
      font-size: 0.24rem;
      padding: 0.14rem 0.4rem;
      line-height: 1;
      border-radius: 0.26rem;
      border: 0.01rem solid #d8d8d8;
    }
  }
  .focus-activity {
    padding: 0.5rem 0 0;
    > .focus-list {
      > .item {
        background: rgba(245, 245, 245, 1);
        margin-bottom: 0.4rem;
        > img {
          width: 100%;
          height: 3.83rem;
        }
        > .box {
          padding: 0.4rem 0.2rem;
          .title {
            font-weight: Bold;
            font-size: 0.26rem;
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
}
</style>
