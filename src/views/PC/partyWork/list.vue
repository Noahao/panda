<template>
  <PCLayout>
    <div class="wrap">
      <PCBanner channelCode="djgz" />
      <TabList :tabList="tabList" :currentIndex="currentIndex" @itemClick="itemClick"/>
      <div class="list-wrap">
        <div>
          <div v-for="(item, index) in list" :key="index" class="list-box" @click="PCJumpDetails(item, 'djgz')">
            <div class="text">
              <div class="title">{{ item.title }}</div>
              <div class="summary" v-if="item.summary">{{ getDesc(item.summary) }}</div>
              <div class="nav">
                <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/baseDynamicList/img02.png" alt="" />
                <p class="address">{{ item.createCompany }}</p>
                <span style="font-weight: bold;">·</span>
                <p class="time">{{ item.publishTime }}</p>
              </div>
            </div>
          </div>
        </div>
        <pagination :pagination="pagination" @pageChange="pageChange"/>
      </div>
    </div>
  </PCLayout>
</template>

<script>
import TabList from '@/components/PCComponents/PCTabList.vue'
import pagination from '@/components/PCComponents/PCPagination.vue'
import { getNewsList, getChannelSubset } from '@/service/apiList/common'
export default {
  name: 'partyWorkList',
  components: {
    TabList,
    pagination
  },
  data () {
    return {
      bannerText: {
        title: '党建工作',
        desc: '传播党的声音，推动党的工作，展现党的形象',
        banner: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/partyWork/banner.jpg'
      },
      tabList: [],
      currentIndex: 0,
      list: [],
      pagination: {
        page: 1,
        limit: 5,
        total: 0,
        sizes: [5, 10 ,15, 20]
      },
      channelCode: ''
    }
  },
  computed: {
    getName() {
      return (item, name) => {
        try {
          return item[name]
        } catch (error) {
          return ''
        }
      }
    },
    getDesc() {
      return (desc) => {
        let reg = /\s+/g
        let trimStr = desc.replace(reg,'')
        return trimStr
      }
    }
  },
  mounted() {
    // this.getChannelSubset()
  },
  methods: {
    async getChannelSubset() {
      const res = await getChannelSubset({
        channelCode: 'ddjs',
      })
      if (res.code === 0) {
        this.tabList = res.data.subset
        this.tabList.forEach((item, index) => {
          if(location.href.includes(item.channelCode)) {
            this.currentIndex = index
          }
        })
        this.getNewsList()
      }
    },
    itemClick(item, index) {
      this.currentIndex = index
      this.$router.replace(`/pc/partyWork/list?channelCode=${this.tabList[this.currentIndex].channelCode}`)
      this.pagination.page = 1
      this.getNewsList()
    },
    async getNewsList() {
      const res = await getNewsList({
        channelCode: this.tabList[this.currentIndex] ? this.tabList[this.currentIndex].channelCode : this.channelCode,
        pageSize: this.pagination.limit,
        currPage: this.pagination.page
      })
      if (res.code === 0) {
        this.pagination.total = res.page.total
        this.list = res.datas
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
          parent: 'ddjs'
        },
      })
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
.list-wrap {
  max-width: 1660px;
  min-width: 1360px;
  margin: auto;

  .list-box {
    width: 100%;
    height: 209px;
    padding: 34px 24px 34px 20px;
    display: flex;
    background: #F5F5F5;
    margin-bottom: 50px;
    cursor: pointer;

    .text {
      .title {
        color: #333333;
        font-weight: bold;
        font-size: 24px;
        margin: 10px 0 20px;
      }
      .summary {
        font-size: 16px;
        color: #666666;
        @include ellipsisLn(2);
        margin: 0 0 30px;
        line-height: 28px;
        white-space: pre-wrap;
        text-indent: 2em;
      }
      .nav {
        display: flex;
        color: #999999;
        font-size: 14px;
        align-items: center;

        img {
          width: 14px;
        }
        .address {
          margin: 0 10px 0 15px;
        }
        .time {
          margin-left: 10px;
        }
      }
    }

    &:hover {
      background: white;
      box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.1);

      .text {
        .title {
          color: #15A98D;
        }
      }
    }
  }
}
</style>
