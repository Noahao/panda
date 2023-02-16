<template>
  <PCLayout>
    <div class="wrap">
      <PCBanner channelCode="kpjy" />
      <TabList :tabList="tabList" :currentIndex="currentIndex" @itemClick="itemClick"/>
      <div v-if="tabList[currentIndex] && tabList[currentIndex].channelCode === 'zl'">
        <div class="zl-list-wrap" v-for="(item, index) in list" :key="index">
          <div v-for="(item2, index2) in item" :key="index2" class="list-box">
            <div class="box" @click="PCJumpDetails(item2, 'kpjy')">
              <div class="img-box">
                <img class="cloud-img" :src="getUrl(item2)"/>
              </div>
              <div class="name">{{ item2 && item2.title }}</div>
            </div>
          </div>
          <div class="booth">
            <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/education/img10.png" alt="" />
          </div>
        </div>
      </div>
      <div v-else-if="tabList[currentIndex] && tabList[currentIndex].channelCode === 'sp'">
        <el-row type="flex" class="xmbz-wrap">
          <el-col :span="6" v-for="(item, index) in list" :key="index" class="xmbz-list-box">
            <div @click="PCJumpDetails(item, 'kpjy')" style="height: 100%">
              <img class="img" :src="getUrl(item)" alt=""/>
            </div>
            <div class="xmbz-title">{{ item.title }}</div>
          </el-col>
        </el-row>
      </div>
      <div v-else class="xmqw-box-ul">
        <div v-for="(item, index) in list" :key="index" class="xmqw-box-li">
          <div v-if="item.channelCode !== 'dxmkpzs'" @click="PCJumpDetails(item, 'kpjy')">
            <p class="title">{{ getName(item, 'title') }}</p>
            <!--<p class="time">{{ getName(item, 'publishTime') }}</p>-->
          </div>
          <div v-else @click="jump">
            <p class="title">{{ getName(item, 'title') }}</p>
            <p class="time">{{ getName(item, 'publishTime') }}</p>
          </div>
        </div>
      </div>
      <pagination :pagination="pagination" @pageChange="pageChange"/>
    </div>
  </PCLayout>
</template>

<script>
import TabList from '@/components/PCComponents/PCTabList.vue'
import pagination from '@/components/PCComponents/PCPagination.vue'
import { getNewsList, getChannelSubset } from '@/service/apiList/common'
export default {
  name: 'educationList',
  components: {
    TabList,
    pagination
  },
  data () {
    return {
      bannerText: {
        title: '科普教育',
        desc: '提供科学、权威、准确的科普信息内容，让科技知识在网上和生活中流行',
        banner: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/education/banner.jpg'
      },
      tabList: [],
      currentIndex: 0,
      list: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        sizes: [5, 10 ,15, 20]
      }
    }
  },
  computed: {
    getUrl() {
      return (list) => {
        try {
          return list.imageUrls[0].url
        } catch (error) {
          return this.$Placeholder
        }
      }
    },
    getName() {
      return (item, name) => {
        try {
          return item[name]
        } catch (error) {
          return ''
        }
      }
    }
  },
  mounted () {
    // this.getChannelSubset()
  },
  methods: {
    async getChannelSubset() {
      const res = await getChannelSubset({
        channelCode: 'kpzlk',
      })
      if (res.code === 0) {
        this.tabList = res.data.subset.filter(item => item.name !== '大熊猫科普知识')
        this.getDefault()
        this.getNewsList()
      }
    },
    itemClick (item, index) {
      this.currentIndex = index
      this.$router.push({
        path: this.$route.path,
        query: {
          channelCode: item.channelCode
        }
      })
      this.getNewsList()
    },
    async getNewsList() {
      const res = await getNewsList({
        channelCode: this.tabList[this.currentIndex].channelCode,
        pageSize: this.pagination.limit,
        currPage: this.pagination.page
      })
      if (res.code === 0) {
        this.pagination.total = res.page.total
        if(this.tabList[this.currentIndex].channelCode === 'zl') {
          this.list = this.chunkArray(res.datas, 5)
        } else if(this.tabList[this.currentIndex].channelCode === 'zs') {
          this.list = res.datas
          this.list.push({
            title: '大熊猫科普知识',
            channelCode: 'dxmkpzs',
            time: ''
          })
          this.pagination.total += 1
        } else {
          this.list = res.datas
        }
      }
    },
    chunkArray (arr, chunkCount) {
      const chunks = []
      const chunkSize = Math.ceil(arr.length / chunkCount)
      let num = 0
      while(num < chunkSize) {
        const chunk = arr.slice(num * chunkCount, chunkCount * (num + 1))
        chunks.push(chunk)
        num++
      }
      return chunks
    },
    jump() {
      this.$router.push('/pc/generalList?channelCode=dxmkpzs&banner=kpjy')
    },
    pageChange (val) {
      this.pagination = val
      this.getNewsList()
    },
    PCJumpDetails(item, channelCode) {
      let obj = {
        currPage: this.pagination.page,
        pageSize: this.pagination.limit,
        tab: this.tabList[this.currentIndex].channelCode
      }
      sessionStorage.setItem('from', JSON.stringify(obj))
      this.$router.push({
        path: '/pc/details',
        query: {
          id: item.id,
          channelCode: channelCode,
          parent: 'kpzlk'
        },
      })
    },
    getDefault() {
      if(location.href.includes('channelCode')) {
        let str = location.href.substring(location.href.lastIndexOf('channelCode=') + 12, location.href.length)
        this.tabList.forEach((item, index) => {
          if(item.channelCode === str) {
            this.itemClick(item, index)
          }
        })
      }
    },
  },
  watch: {
    $route: {
      handler(to) {
        if (to) {
          if(sessionStorage.getItem('from') && window.location.href.includes(JSON.parse(sessionStorage.getItem('from')).tab)) {
            this.pagination.page = Number(JSON.parse(sessionStorage.getItem('from')).currPage)
            this.pagination.limit = Number(JSON.parse(sessionStorage.getItem('from')).pageSize)
            this.channelCode = JSON.parse(sessionStorage.getItem('from')).channelCode
            this.getChannelSubset()
            sessionStorage.removeItem('from')
          } else {
            this.pagination.page = 1
            this.getChannelSubset()
          }
        }
      },
      immediate: true,
      deep: true,
    },
  }
}
</script>

<style lang="scss" scoped>
.zl-list-wrap {
  max-width: 1660px;
  min-width: 1360px;
  margin: 0 auto 60px !important;
  position: relative;
  padding: 0 60px;

  .booth {
    width: 100%;
    position: absolute;
    left: 0;
    top: 276px;
    z-index: -5;

    img {
      width: 100%;
    }
  }

  .list-box {
    display: inline-block;
    cursor: pointer;

    &:not(:nth-child(5n - 4)) {
      margin-left: calc((100% - 1045px) / 4);
    }
    .box {
      width: 209px;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      img {
        width: 100%;
      }
    }
    .name {
      text-align: center;
      font-weight: Bold;
      font-size: 18px;
      color: #333333;
      margin-top: 65px;
    }
  }
}
.xmqw-box-ul {
  max-width: 1660px;
  min-width: 1360px;
  margin: auto;

  .xmqw-box-li {
    padding-bottom: 24px;
    padding-left: 20px;
    margin-bottom: 27px;
    position: relative;
    cursor: pointer;
    border-bottom: 1px dotted #DFDFDF;

    div {
      display: flex;
      justify-content: space-between;
    }
    &::after {
      position: absolute;
      left: 0;
      top: 20%;
      content: '';
      width: 6px;
      height: 6px;
      border: 1px solid#666666;
      border-radius: 50%;
    }
    .title {
      color: #333333;
      font-size: 20px;
      @include ellipsisLn(1);
      width: 70%;
    }
    .time {
      color: #999999;
      font-size: 14px;
    }
    &:hover {
      .title {
        color: #15A98D;
      }
    }
  }
}
.xmbz-wrap {
  width: 1398px;
  flex-wrap: wrap;
  margin: auto;
  .xmbz-list-box {
    width: 426px;
    height: 240px;
    cursor: pointer;
    margin-bottom: 60px;
    position: relative;

    &:hover {
      .xmbz-title {
        color: #15A98D;
      }
    }
    &:nth-child(3n + 2) {
      margin: 0 60px;
    }
    .img {
      width: 100%;
      height: 100%;
    }
    .xmbz-title {
      width: 100%;
      height: 60px;
      background: rgba(0, 0, 0, 0.3);
      color: #ffffff;
      font-weight: bold;
      font-size: 18px;
      text-align: center;
      line-height: 60px;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
