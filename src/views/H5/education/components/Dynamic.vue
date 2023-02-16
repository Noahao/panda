<template>
  <div class="dynamic">
    <div v-if="list && list.length">
      <div class="title">科普动态</div>
      <img class="banner" @click="jumpDetails(list[0], 'kpjy')" :src="getImg(list)" alt="" />
      <div class="list">
        <div class="item" @click="jumpDetails(item, 'kpjy')" v-for="item in list" :key="item.id">
          <p class="titles">{{ item.title }}</p>
          <p class="text">{{ item.summary }}</p>
          <p class="time">{{ item.publishTime }}</p>
        </div>
      </div>
    </div>
    <MoreAndMore path="/h5/generalList?channelCode=kpdt&banner=kpjy" />
    <!-- 科普资料库 -->
    <template v-if="bankList && bankList.length">
      <div style="margin-top: 0.4rem" class="title">科普资料库</div>
      <div class="the-booth">
        <div class="box">
          <div class="box-list" @click="jump(item, 'kpjy')" v-for="(item, index) in bankList" :key="item.id">
            <div class="item">
              <img :src="(item.imageUrls.length && item.imageUrls[0].url) || $Placeholder" alt="" />
              <div>{{ item.title }}</div>
            </div>
            <img v-if="(index + 1) % 2 !== 0" class="img" src="https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/展台.png" alt="" />
          </div>
        </div>
        <MoreAndMore path="/h5/education/list" />
      </div>
    </template>
  </div>
</template>

<script>
import { getNewsList } from '@/service/apiList/common'
import MoreAndMore from '@/views/H5/components/MoreAndMore.vue'
export default {
  name: 'DynaMic',
  inject: ['jumpDetails'],
  components: {
    MoreAndMore,
  },
  data() {
    return {
      list: [],
      bankList: [],
    }
  },
  created() {
    this.getNewsList()
    this.getbank()
  },
  computed: {
    getImg() {
      return (list) => {
        try {
          return list[0].imageUrls[0].url
        } catch (error) {
          return this.$Placeholder
        }
      }
    },
  },
  methods: {
    async getNewsList() {
      const res = await getNewsList({
        channelCode: 'kpdt',
        pageSize: 4,
        currPage: 1,
      })
      if (res.code === 0) {
        if (res.datas.length) {
          this.list = res.datas
        }
      }
    },
    async getbank() {
      const res = await getNewsList({
        channelCode: 'zl',
        pageSize: 4,
        currPage: 1,
      })
      if (res.code === 0) {
        this.bankList = res.datas
      }
    },
    jump(item) {
      this.$router.push({
        path: '/h5/details',
        query: {
          id: item.id,
          channelCode:'kpjy',
          tab:'kpzlk',
        },
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.dynamic {
  padding: 0 0.3rem;
  .title {
    font-weight: Bold;
    font-size: 0.46rem;
    color: #333333;
    text-align: center;
    line-height: 1;
    margin: 0.79rem 0 0.5rem;
  }
  .banner {
    width: 6.9rem;
    height: 3.83rem;
  }
  .list {
    .item {
      padding: 0.4rem 0.21rem;
      max-height: 2.43rem;
      background: rgba(245, 245, 245, 1);
      margin-bottom: 0.2rem;
      &:last-child {
        margin: 0;
      }
      .titles {
        font-weight: Bold;
        font-size: 0.26rem;
        line-height: 1;
        color: #333333;
        @include ellipsis();
      }
      .text {
        text-indent: 0.48rem;
        margin-top: 0.28rem;
        font-size: 0.24rem;
        color: #666666;
        @include ellipsisLn(2);
      }
      .time {
        margin-top: 0.28rem;
        font-weight: 500;
        line-height: 1;
        font-size: 0.2rem;
        color: #999999;
      }
    }
  }
  .the-booth {
    margin: 0 0.28rem 0.79rem;
    .box {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .box-list {
        margin-bottom: 0.54rem;
        width: 50%;
        &:nth-child(n + 3) {
          margin: 0;
        }
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
        margin-left: 0.1rem;
        text-align: center;
        img {
          width: 2.09rem;
          height: 2.78rem;
        }
        div {
          margin-top: 0.6rem;
          font-weight: Bold;
          font-size: 0.24rem;
          text-align: center;
          color: #333333;
        }
      }
    }
  }
}
</style>
