<template>
  <div class="education-list">
    <div class="list-box">
      <!-- tab切换 -->
      <TabList @activeItem="activeItem" />
      <!-- 学习 -->
      <div v-if="['zs'].includes(params.channelCode)" class="list">
        <div class="item" @click="jumpDetails(item, 'kpjy')" v-for="item in construction" :key="item.id">
          <p class="title">{{ item.title }}</p>
          <p class="text" v-if="item.summary">{{ item.summary }}</p>
        </div>
        <div class="item" @click="jump">
          <p class="title">panda knowledge</p>
        </div>
      </div>
      <!-- 资料 -->
      <div class="the-booth" v-if="['sj'].includes(params.channelCode)">
        <div class="box">
          <div class="box-list" @click="jumpDetails(item, 'kpjy')" v-for="(item, index) in construction" :key="item.id">
            <div class="item">
              <img :src="item.cover || $Placeholder" alt="" />
              <div>{{ item.title }}</div>
            </div>
            <img v-if="(index + 1) % 2 !== 0" class="img" src="https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/展台.png" alt="" />
          </div>
        </div>
      </div>
      <div class="the-booth-s" v-if="['dxmkpzs'].includes(params.channelCode)">
        <div class="item" @click="jumpDetails(item, 'kpjy')" v-for="item in construction" :key="item.id">
          <div class="box">
            <div class="title">{{ item.title }}</div>
            <div class="text" v-if="item.summary">{{ item.summary }}</div>
          </div>
        </div>
      </div>
      <!-- 点击加载 -->
      <template v-if="construction.length">
        <div class="paging" v-show="params.currPage < totalPage && !isSkeleton">
          <div @click="page(1)">Click on the load</div>
        </div>
        <!-- <div class="paging" v-show="params.currPage === totalPage && !isSkeleton">
          <div>We don't have any more data</div>
        </div> -->
      </template>
      <!-- 暂无数据 -->
      <TextSkeleton v-show="isSkeleton && params.currPage === 1" :num="10" />
      <!-- 暂无数据 -->
      <!-- <img v-if="!isSkeleton && construction.length === 0" class="no-data" src="https://file.daqsoft.com/uploadfile/server/geekui/padna/h5/en/ea214dcc-f5ee-4288-932d-5fefc39f7f3f.gif" alt=""/> -->
    </div>
  </div>
</template>

<script>
import TabList from './TabList.vue'
import TextSkeleton from '@/components/h5Skeleton/TextSkeleton.vue'
import { getSimplifyList } from '@/service/apiList/common'
export default {
  name: 'EnList',
  components: {
    TabList,
    TextSkeleton
  },
  data() {
    return {
      params: {
        channelCode: '',
        pageSize: 6,

        currPage: 1,
      },
      totalPage: 0,
      isSkeleton: false,
      construction: [],
    }
  },
  computed: {
    setUrl() {
      return (item) => {
        try {
          return item.cover
        } catch (error) {
          return this.$Placeholder
        }
      }
    },
  },
  methods: {
    activeItem(item) {
      this.params.channelCode = item
      this.params.currPage = 1
      this.construction = []
      this.getList(this.params)
    },
    async getList(params) {
      this.isSkeleton = true
      const res = await getSimplifyList(params)
      if (res.code === 0) {
        this.totalPage = res.page.totalPage
        if (this.params.currPage === 1) {
          this.construction = res.datas
        } else {
          this.construction.push(...res.datas)
        }
      }
      this.isSkeleton = false
    },
    page(num) {
      this.params.currPage += num
      this.getList(this.params)
    },
    jump() {
      window.location.href = location.href + '&kpzl=true'
    },
    // 跳转详情
    jumpDetails(item) {
      this.$router.push({
        path: '/h5/details',
        query: {
          channelCode: this.$route.query.channelCode,
          id: item.id,
          tab: this.$route.query.tab,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.education-list {
  // padding-top: 0.49rem;
  height: 100%;
  padding-bottom: 0.64rem;
  .list-box {
    padding: 0.58rem 0 0.32rem;
    width: 7.5rem;
     height: 100%;
    border-radius: 0.3rem;
    > .list {
      padding: 0 0.3rem 0;
      > .item {
        padding: 0.35rem 0.3rem;
        width: 6.9rem;
        max-height: 1.8rem;
        background: rgb(245, 245, 245);
        margin-bottom: 0.3rem;
        .title {
          line-height: 1;
          font-weight: Bold;
          font-size: 0.26rem;
          color: #333333;
          @include ellipsis();
        }
        .text {
          margin-top: 0.2rem;
          font-size: 0.24rem;
          color: 0.24rem;
          line-height: 0.36rem;
          color: #666666;
          @include ellipsisLn(2);
        }
      }
    }
    > .the-booth {
      margin: 0.5rem 0.28rem 0;
      .box {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        .box-list {
          margin-bottom: 0.54rem;
          width: 50%;
        }
        .img {
          margin-top: -0.9rem;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 6.72rem;
          height: 0.59rem;
        }
        .item {
          position: relative;
          text-align: center;
          img {
            width: 2.09rem;
            height: 2.78rem;
            margin-bottom: -0.12rem;
          }
          div {
            margin-top: 0.6rem;
            font-weight: Bold;
            font-size: 0.24rem;
            text-align: center;
            color: #333333;
            @include ellipsis();
          }
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
      white-space: nowrap;
      line-height: 1;
      border-radius: 0.26rem;
      border: 0.01rem solid #d8d8d8;
    }
  }
  .no-data {
    height: 3.83rem;;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  .the-booth-s {
    margin: 0 0 0.4rem;
    padding: 0 0.3rem;
    .item {
      background: rgba(245, 245, 245, 1);
      margin-bottom: 0.4rem;
    }
    .box {
      padding: 0.4rem 0.2rem;
      .title {
        font-weight: Bold;
        font-size: 0.26rem;
        line-height: 1;
        color: #333333;
        @include ellipsis();
      }
      .text {
        margin-top: 0.3rem;
        font-size: 0.24rem;
        color: #666666;
        line-height: 0.36rem;
        @include ellipsisLn(2);
      }
    }
  }
}
</style>
