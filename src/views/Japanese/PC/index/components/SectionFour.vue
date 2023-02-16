<template>
  <div class="section-four">
    <div class="main-title wow fadeIn">
      {{ obj.channelCode }}
    </div>
    <p class="name wow fadeIn">{{ strIntercept(obj.name) }}</p>
    <div class="tab-wrap">
      <div class="tab-box wow fadeIn" v-for="(item, index) in tab" :key="index" :class="{active: index === currentIndex}" @click="tabClick(item, index)">
        {{ strIntercept(item.name) }}
      </div>
    </div>
    <div class="list-wrap">
      <div class="list-box wow fadeInLeft" :data-wow-delay="getDelay(index)" v-for="(item, index) in list" :key="index" @click="listClick(item)">
        <MyIcon name="jiantou1" color="#666666" size="0.1rem"/>
        <p class="time">{{ item.publishTime }}</p>
        <p class="title">{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getSimplifyList, channelcrumbs } from '@/service/apiList/common'
export default {
  name: 'SectionFour',
  data () {
    return {
      obj: {},
      tab: [],
      currentIndex: 0,
      list: [
        /*{
          time: '2021-12-10',
          title: '初心を忘れず、ボランティア活動を継続 ― 成都パンダ基地で2021年科学普及ボランティア?フェスティバルを開催'
        }*/
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
    },
    getDelay() {
      return (index) => {
        try {
          return `${index / 3}s`
        } catch (error) {
          return '0.1s'
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
          // this.list.push(res.datas[0])
        }
      })
    },
    tabClick(item, index) {
      this.currentIndex = index
      this.getList(item.channelCode)
    },
    listClick(item) {
      this.$router.push({
        path: '/pc/details',
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
.section-four {
  width: 100%;
  height: 7.6rem;
  background-image: url("https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/Japanese/index/bg4.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  position: relative;
  overflow: hidden;

  .main-title {
    font-family: 'Edwardian Script ITC';
    text-align: center;
    font-size: 1.6rem;
    color: rgba(238, 238, 238, 1);
    margin: .79rem auto 0;
  }
  .name {
    font-size: 0.32rem;
    text-align: center;
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
      cursor: pointer;

      &:hover {
        color: #ffffff;
        background: #15A98D;
      }
    }
    .active {
      color: #ffffff;
      background: #15A98D;
    }
  }
  .list-wrap {
    width: 12.06rem;
    margin: auto;

    .list-box {
      display: flex;
      border-bottom: 0.01rem dotted #DDDDDD;
      padding: 0 0.12rem 0.21rem;
      margin:  0 0 0.21rem;
      align-items: baseline;
      cursor: pointer;

      &:hover {
        .title, i, .time {
          color: #15A98D !important;
        }
      }
      i {
        transform: rotateY(180deg);
      }
      .time, .title {
        color: #333333;
        font-size: .18rem;
      }
      .time {
        margin: 0 0.3rem;
      }
      .title {
        @include ellipsisLn(1);
      }
    }
  }
}
</style>
