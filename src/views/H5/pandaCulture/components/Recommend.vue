<template>
  <div style="background: #f5f5f5">
    <div class="recommend">
      <div class="title">为你推荐</div>
      <div class="text">品质旅游，文化探秘；生活的品质没有界限！</div>
    </div>
    <div class="tab-list">
      <div @click="tabClick(item)" v-for="item in tab" :key="item.id" :class="tabItem.channelCode === item.channelCode ? 'active' : ''">
        <MyIcon :name="item.summary" size="0.42rem" />
        <p>{{ item.name }}</p>
      </div>
    </div>
    <div class="list">
      <div class="item" @click="jumpDetails(item, 'xmwh')" v-for="item in list" :key="item.id">
        <div class="img">
          <img :src="item.cover || $Placeholder" alt="" />
        </div>
        <div class="title">{{ item.title }}</div>
      </div>
      <div class="button" @click="jump">查看更多</div>
    </div>
  </div>
</template>

<script>
import { getChannelSubset, getSimplifyList } from '@/service/apiList/common'
export default {
  name: 'RecomMend',
  inject: ['jumpDetails'],
  data() {
    return {
      tab: [],
      list: [],
      tabItem: {},
    }
  },
  created() {
    this.getChannelSubset()
  },
  methods: {
    async getChannelSubset() {
      const res = await getChannelSubset({
        channelCode: 'xmwh',
      })
      if (res.code === 0 && res.data.subset) {
        this.tab = res.data.subset.filter((item) => {
          return item.name !== '熊猫活动' && item.name !== '熊猫艺术团'
        })
        this.tabItem = this.tab[0]
        this.getNewsList(this.tab[0].channelCode)
      }
    },
    async getNewsList(channelCode) {
      const res = await getSimplifyList({
        channelCode: channelCode,
        pageSize: 3,
        currPage: 1,
      })
      if (res.code === 0) {
        this.list = res.datas
      }
    },
    tabClick(item) {
      if (item.url && item.url.includes('?details')) {
        getSimplifyList({ channelCode: item.channelCode }).then((res) => {
          try {
            this.jumpDetails(res.datas[0], 'xmwh')
          } catch (error) {
            return ''
          }
        })
      } else {
        this.tabItem = item
        this.list = []
        this.getNewsList(item.channelCode)
        // this.$router.push(item.url)
      }
    },
    jump() {
      this.$router.push(this.tabItem.url)
    },
  },
}
</script>

<style lang="scss" scoped>
.recommend {
  width: 7.5rem;
  height: 7.5rem;
  background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/为你推荐banner.png') no-repeat;
  background-size: 100%;
  > .title {
    padding: 4.58rem 0 0 0.33rem;
    font-weight: Bold;
    font-size: 0.46rem;
    line-height: 1;
    color: #ffffff;
  }
  > .text {
    padding: 0.18rem 0 0 0.33rem;
    line-height: 1;
    font-weight: 500;
    font-size: 0.3rem;
    color: #ffffff;
  }
}
.active {
  background: #15a98d !important;
  i {
    color: #ffffff;
  }
  p {
    color: #ffffff !important;
  }
}
.tab-list {
  margin-top: -0.6rem;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  > div {
    min-width: 2rem;
    height: 1.4rem;
    margin-left: 0.3rem;
    background: rgba(255, 255, 255, 1);
    text-align: center;
    padding-top: 0.3rem;
    p {
      font-weight: 500;
      margin-top: 0.2rem;
      font-size: 0.24rem;
      color: #333333;
    }
  }
}
.list {
  margin: auto;
  margin-top: 0.79rem;
  padding-bottom: 0.79rem;
  .item {
    margin: 0 auto 0.4rem;
    width: 6.9rem;
    &:last-child {
      margin-bottom: 0;
    }
    .img {
      width: 6.9rem;
      height: 3.94rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      width: 6.9rem;
      height: 1rem;
      background: rgba(255, 255, 255, 1);
      color: #333333;
      line-height: 1rem;
      text-align: center;
      font-size: 0.26rem;
    }
  }
}
.button {
  font-weight: 500;
  font-size: 0.24rem;
  padding: 0.18rem 0;
  color: #fff;
  margin: auto;
  line-height: 1;
  width: 2rem;
  background: #15a98d;
  text-align: center;
}
</style>
