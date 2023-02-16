<template>
  <PClayoutJp>
    <div class="banner-jp" :style="{
      'background-image': 'url(' + getUrl(bannerItem.backgroundImg1) + ')',
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
    }">
      <div class="title">{{ bannerItem.summary }}</div>
      <div class="desc">{{ strIntercept(bannerItem.name) }}</div>
    </div>
    <div class="list-wrap">
      <div v-for="(item, index) in tabList" :key="index" v-show="item.channelCode !== 'dxmkpzs'" class="list-box" :class="{active: current === item.channelCode}" @click="tabClick(item)">
        {{ strIntercept(item.name) }}
      </div>
    </div>
    <!-- ±³¾°Í¼ -->
    <img class="img" src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/Japanese/list/bg2.jpg" alt="" />
    <List :channelCode="channelCode" :dxmkpzs="dxmkpzs"/>
  </PClayoutJp>
</template>

<script>
import { getChannelDetail, getChannelSubset } from '@/service/apiList/common'
import List from './components/List.vue'
export default {
  name: 'listIndex',
  components: {
    List
  },
  data () {
    return {
      channelCode: '',
      bannerItem: {},
      activeItem: 'kpzlk',
      tabList: [],
      current: '',
      dxmkpzs: {}
    }
  },
  computed: {
    getUrl() {
      return (url) => {
        if (url) {
          return url
        }
        return this.$Placeholder
      }
    },
    strIntercept() {
      return (item) => {
        try {
          return item.includes('£¨') ? item.substring(0, item.indexOf('£¨')) : item
        } catch (error) {
          return item
        }
      }
    }
  },
  created() {
    this.getChannelDetail('education')
    this.getChannelSubset('kpzlk')
  },
  methods: {
    getDefault() {
      if(location.href.includes('channelCode')) {
        let str = location.href.substring(location.href.lastIndexOf('channelCode=') + 12, location.href.length)
        this.tabList.forEach(item => {
          if(item.channelCode === str) {
            this.tabClick(item)
          }
        })
      }
    },
    async getChannelDetail(channelCode) {
      const res = await getChannelDetail({ channelCode })
      if (res.code === 0) {
        this.bannerItem = res.data
      }
    },
    tabClick(item) {
      document.title = this.strIntercept(item.name)
      this.current = item.channelCode
      this.channelCode = item.channelCode
      this.$router.push({
        path: this.$route.path,
        query: {
          channelCode: item.channelCode
        }
      })
    },
    async getChannelSubset(channelCode) {
      const res = await getChannelSubset({
        channelCode,
      })
      if (res.code === 0) {
        this.tabList = res.data.subset
        this.current = this.tabList[0].channelCode
        this.channelCode = this.tabList[0].channelCode
        this.tabList.forEach(item => {
          if(item.channelCode === 'dxmkpzs') {
            this.dxmkpzs = item
          }
        })
        this.getDefault()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .banner-jp {
    width: 100%;
    height: 6.4rem;
    margin-top: 1.2rem;
    overflow: hidden;
    background-image: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/Japanese/list/bg.jpg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    .title {
      font-family : 'Edwardian Script ITC';
      font-size: 0.56rem;
      color: rgba(255, 255, 255, 0.8);
      text-align: center;
      margin: 1.6rem auto 0.3rem;
    }
    .desc {
      color: #ffffff;
      font-size: 32px;
      text-align: center;
      letter-spacing: .02rem;
    }
  }
  .list-wrap {
    width: 13.6rem;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: 4.2rem;
    left: 50%;
    transform: translateX(-50%);
    justify-content: center;

    .list-box {
      padding: 0 .2rem;
      height: .4rem;
      text-align: center;
      line-height: .4rem;
      font-size: .18rem;
      border-radius: .2rem;
      margin-right: .2rem;
      cursor: pointer;
      color: #ffffff;

      &:hover {
        background: #15a98d;
      }
    }
    .active {
      background: #15a98d;
    }
  }
  .img {
    width: 100%;
    height: calc(100vh - 1.2rem);
    position: sticky;
    top: 1.2rem;
    left: 0;
    z-index: -1;
  }
  .main {
    width: 100%;
    height: 15.5rem;
    background-image: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/Japanese/list/bg2.jpg');
    background-size: cover;
    background-position: center bottom;
    background-repeat: no-repeat;
  }
</style>
