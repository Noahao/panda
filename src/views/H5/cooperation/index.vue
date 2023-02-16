<template>
  <H5Layout>
    <H5Banner channelCode="dwhz" />
    <!-- 国内合作 -->
    <div class="domestic">
      <div class="title">国内合作</div>
      <!-- <div class="list">
        <div class="item"  @click="jumpDetails(item, 'dwhz')" v-for="item in list" :key="item.id">
          <img :src="getUrl(item)" alt="" />
          <div class="box">
            <div class="title">{{ item.title }}</div>
            <div class="text" v-if="item.summary">{{ item.summary }}</div>
          </div>
        </div>
      </div> -->
      <img class="img" src="https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/map1_1667195989031.png" alt="" />

      <ul>
        <li v-for="item in textList" :key="item.id">
          <div>{{ item.label }}</div>
          <div>{{ item.time }}</div>
        </li>
      </ul>
      <MoreAndMore @jump="jump('gnhz')" />
      <!-- <div class="look " @click="jump('gnhz')">查看更多</div> -->
    </div>
    <!-- 国际合作 -->
    <div class="international">
      <img class="img" src="https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/en/国际合作map.png" alt="" />
      <div class="title">国际合作</div>
      <div class="text">实验室与全球保护机构繁育合作网络</div>
      <div class="content">
        <p v-if="details.summary" v-html="getText(details.summary)"></p>
        <div class="tab">
          <div class="item" v-for="item in tab" :key="item.id">
            <div :style="{ background: item.color }">
              <MyIcon :name="item.icon" color="#fff" size="0.4rem" />
            </div>
            <p>{{ item.name }}</p>
          </div>
        </div>
        <MoreAndMore @jump="jump('gjhz')" />
      </div>
    </div>
    <div class="empty"></div>
  </H5Layout>
</template>

<script>
import { getNewsList, getChannelDetail } from '@/service/apiList/common'
import MoreAndMore from '@/views/H5/components/MoreAndMore.vue'
export default {
  name: 'ComponentsIndex',
  inject: ['jumpDetails'],
  components: {
    MoreAndMore,
  },
  data() {
    return {
      list: [],
      tab: [
        {
          name: '繁育合作',
          icon: 'fanyuhezuo',
          color: '#F15929',
        },
        {
          name: '科研合作',
          icon: 'keyanhezuo',
          color: '#501A74',
        },
        {
          name: '合作平台',
          icon: 'hezuopingtai',
          color: '#00AEEF',
        },
        {
          name: '交流活动与人才培养',
          icon: 'jiaoliuhuodongyurencaipeiyang',
          color: '#15A98D',
        },
      ],
      textList: [
        {
          label: '西宁野生动物园',
          time: '2019年6月',
        },
        {
          label: '黔灵山公园管理处',
          time: '2018年4月',
        },
        {
          label: '云南野生动物园有限公司',
          time: '2016年4月',
        },
        {
          label: '济南野生动物世界有限公司',
          time: '2017年10月',
        },
        {
          label: '鄂尔多斯野生动物园',
          time: '2016年9月',
        },
      ],
      details: {},
      url: '',
    }
  },
  created() {
    this.getNewsList()
    this.getChannelDetail()
  },
  computed: {
    getUrl() {
      return (item) => {
        try {
          return item.imageUrls[0].url
        } catch (error) {
          return this.$Placeholder
        }
      }
    },
    getText() {
      return (text) => {
        if (text && text.length > 33) {
          return `<span>${text.substring(0, 24)}</span>
          <span>${text.substring(28, text.length)}</span>
          `
        }
        return `<span>${text}</span>
          `
      }
    },
  },
  methods: {
    async getNewsList() {
      const res = await getNewsList({
        channelCode: 'gnhz',
        pageSize: 3,
        currPage: 1,
      })
      if (res.code === 0) {
        this.list = res.datas
      }
    },
    async getChannelDetail() {
      const res = await getChannelDetail({
        channelCode: 'gjhz',
      })
      if (res.code === 0) {
        this.details = res.data
      }
    },
    // 跳转
    jump(channelCode) {
      getNewsList({
        channelCode,
      }).then((res) => {
        try {
          this.jumpDetails(res.datas[0], 'dwhz')
        } catch (error) {
          return ''
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.domestic {
  // text-align: center;
  margin-bottom: 0.79rem;
  > .title {
    padding: 0.79rem 0 0.5rem;
    font-weight: Bold;
    font-size: 0.46rem;
    text-align: center;
    color: #333333;
    line-height: 1;
  }
  // > .list {
  //   padding: 0 0.3rem;
  //   > .item {
  //     background: rgba(245, 245, 245, 1);
  //     margin-bottom: 0.4rem;
  //     > img {
  //       width: 100%;
  //       height: 3.83rem;
  //     }
  //     > .box {
  //       padding: 0.4rem 0.2rem;
  //       .title {
  //         font-weight: Bold;
  //         font-size: 0.26rem;
  //         line-height: 1;
  //         color: #333333;
  //         @include ellipsis();
  //       }
  //       .text {
  //         margin-top: 0.3rem;
  //         font-size: 0.24rem;
  //         color: #666666;
  //         line-height: 0.36rem;
  //         @include ellipsisLn(2);
  //       }
  //       .time {
  //         margin-top: 0.28rem;
  //         font-weight: 500;
  //         font-size: 0.2rem;
  //         color: #999999;
  //         line-height: 1;
  //       }
  //     }
  //   }
  // }
  .img {
    width: 6.73rem;
    height: 7.8rem;
    display: block;
    margin: auto;
  }
  ul {
    position: relative;
    top: -0.5rem;
    display: flex;
    flex-wrap: wrap;
    padding: 0 0.45rem;
    li {
      width: 50%;
      text-align: left;
      position: relative;
      padding: 0.16rem;
      &:first-child {
        width: 100%;
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0.35rem;
        width: 0.08rem;
        height: 0.08rem;
        border-radius: 50%;
        background: rgba(193, 193, 193, 1);
      }
      div {
        &:first-child {
          font-size: 0.24rem;
          color: #333;
        }
        &:last-child {
          margin-top: 0.1rem;
          font-size: 0.18rem;
          color: #999;
        }
      }
    }
  }
  .look {
    width: 2rem;
    margin: auto;
    padding: 0.18rem 0.52rem;
    line-height: 1;
    font-size: 0.24rem;
    background: #e6e6e6;
    color: #666666;
    &:hover {
      color: #fff;
      background: #fbb03f;
    }
  }
}
.international {
  width: 7.5rem;
  background: #f5f5f5;
  padding: 0 0.3rem;
  position: relative;
  img {
    position: absolute;
    z-index: 0;
    left: 0;
    width: 100%;
  }
  > .title {
    position: relative;
    padding: 0.79rem 0 0;
    font-weight: Bold;
    font-size: 0.46rem;
    text-align: center;
    color: #ffffff;
    line-height: 1;
  }
  > .text {
    position: relative;
    font-weight: 500;
    font-size: 0.2rem;
    color: #ffffff;
    opacity: 9;
    margin-top: 2.5rem;
  }
  > .content {
    position: relative;
    margin-top: 0.1rem;
    width: 6.9rem;
    background: #fff;
    padding: 0.9rem 0.33rem;
    p {
      margin-bottom: 0.5rem;
      font-size: 0.24rem;
      line-height: 0.36rem;
      color: #666;
      text-align: center;
      ::v-deep span {
        text-align: center;
        display: block;
        &:nth-child(2) {
          width: 5rem;
          @include ellipsis(5rem);
          margin: auto;
        }
      }
    }
    .tab {
      margin-bottom: 0.1rem;
      display: flex;
      .item {
        min-width: 1.5rem;
        div {
          margin: auto;
          width: 1rem;
          height: 1rem;
          border-radius: 0.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        p {
          margin-top: 0.24rem;
          font-weight: 500;
          font-size: 0.2rem;
          text-align: center;
          color: #333333;
          white-space: nowrap;
        }
        &:last-child {
          min-width: 1.7rem;
        }
      }
    }
    .look {
      width: 2rem;
      margin: auto;
      padding: 0.18rem 0.52rem;
      line-height: 1;
      font-size: 0.24rem;
      background: #e6e6e6;
      color: #666666;
      &:hover {
        color: #fff;
        background: #fbb03f;
      }
    }
  }
}
.empty {
  height: 0.87rem;
  width: 100%;
  background: #f5f5f5;
}
</style>
