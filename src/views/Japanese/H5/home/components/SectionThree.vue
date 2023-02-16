<template>
  <div class="section-three">
    <p class="news">{{ obj.channelCode }}</p>
    <p class="main-title">{{ strIntercept(obj.name) }}</p>
    <div class="tab-wrap">
      <div class="tab-box" v-for="(item, index) in tab" :key="index" :class="{active: index === currentIndex}" @click="tabClick(item, index)">
        {{ strIntercept(item.name) }}
      </div>
    </div>
    <div class="list-wrap">
      <div class="list-box" v-for="(item, index) in list" :key="index" @click="listClick(item)">
        <p class="title">{{ item.title }}</p>
        <p class="time">{{ item.publishTime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getSimplifyList, channelcrumbs } from '@/service/apiList/common'
export default {
  name: 'SectionThree',
  data () {
    return {
      obj: {},
      tab: [],
      currentIndex: 0,
      list: [
        /*{
          time: '2021-12-10',
          title: '初心を忘れず、ボランティア活動を継続 ― 成都パンダ基地で2021年科学普及ボランティア?フェスティバルを開催'
        },*/
      ]
    }
  },
  computed: {
    strIntercept() {
      return (item) => {
        try {
          return item.substring(0, item.indexOf('（'))
        } catch (error) {
          return item
        }
      }
    }
  },
  mounted() {
    this.getChannelcrumbs()
  },
  methods: {
    async getChannelcrumbs () {
      const res = await channelcrumbs({ channelCode: 'baseDynamic' })
      if (res.code === 0) {
        this.obj = res.data
        this.tab = res.data.subset
        this.getList(res.data.subset[0].channelCode)
      }
    },
    getList(code) {
      getSimplifyList({
        channelCode: code,
        currPage: 1,
        pageSize: 4,
      }).then(res => {
        if (res.code === 0) {
          this.list = res.datas
        }
      })
    },
    tabClick(item, index) {
      this.currentIndex = index
      this.getList(item.channelCode)
    },
    listClick(item) {
      this.$router.push({
        path: '/h5/details',
        query: {
          id: item.id,
          channelCode: 'baseDynamic',
          tab: this.tab[this.currentIndex].channelCode,
        },
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.section-three {
  background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/H5/index/bg3.jpg') no-repeat;
  width: 7.5rem;
  min-height: 9.7rem;
  background-size: 100%;
  position: relative;
  padding: .8rem 0 0;

  .news {
    font-family: 'Edwardian Script ITC';
    color: #D4D4D4;
    font-size: 1rem;
    text-align: center;
    white-space: nowrap;
  }
  .main-title {
    color: #000000;
    font-size: .24rem;
    font-weight: bold;
    text-align: center;
    margin: 0;
  }
  .tab-wrap {
    display: flex;
    justify-content: center;
    margin: .4rem 0 .5rem;

    .tab-box {
      width: 1.6rem;
      height: 0.4rem;
      background: #ffffff;
      border: 0.01rem solid #DDDDDD;
      text-align: center;
      line-height: 0.4rem;
      margin: 0 .2rem;
      color: #333333;
      font-size: .18rem;
    }
    .active {
      color: #ffffff;
      background: #15A98D;
    }
  }
  .list-wrap {
    margin: auto;
    padding: 0 .3rem;

    .list-box {
      margin-top: .2rem;
      padding-bottom: .2rem;

      .time {
        color: #999999;
        font-size: .18rem;
        padding: 0 .2rem;
        margin-top: .2rem;
      }
      .title {
        @include ellipsisLn(2);
        color: #333333;
        font-size: .2rem;
        line-height: .26rem;
        padding: 0 .2rem;
      }
      &:not(:last-child) {
        border-bottom: 0.01rem dotted #DDDDDD;
      }
    }
  }
}
</style>
