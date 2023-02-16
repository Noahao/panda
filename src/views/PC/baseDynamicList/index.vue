<template>
  <PCLayout>
    <div class="wrap">
      <PCBanner channelCode="jddt" />
      <TabList :tabList="tabList" :currentIndex="currentIndex" @itemClick="itemClick"/>
      <div class="list-wrap">
        <div v-if="tabList[currentIndex] && tabList[currentIndex].channelCode !== 'dwgg'">
          <div v-for="(item, index) in list" :key="index" class="list-box" @click="PCJumpDetails(item, 'jddt')">
            <div class="img" :style="{'background-image': `url(${getUrl(item)})`, 'background-size': 'cover'}"></div>
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
        <div v-else>
          <div v-for="(item, index) in list" :key="index" class="xmqw-box-ul">
            <div v-for="(item2, index2) in item" :key="index2" class="xmqw-box-li" @click="PCJumpDetails(item2, 'jddt')">
              <p class="title">{{ getName(item2, 'title') }}</p>
              <p class="time">{{ getName(item2, 'publishTime') }}</p>
            </div>
          </div>
        </div>
        <div class="ui5-pager-wrap invite-page">
          <!--分页功能-->
          <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="pagination.page"
            :page-size="pagination.limit"
            :page-sizes="pagination.sizes"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper" />
        </div>
      </div>
    </div>
  </PCLayout>
</template>

<script>
import TabList from '@/components/PCComponents/PCTabList.vue'
import { getChannelSubset, getNewsList } from '@/service/apiList/common'
export default {
  name: 'baseDynamicList',
  components: {
    TabList
  },
  data () {
    return {
      bannerText: {
        title: '基地动态',
        desc: '快速了解官方新闻动态和旅游活动相关资讯',
        banner: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/baseDynamic/banner.jpg'
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
    itemClick (item, index) {
      this.currentIndex = index
      this.$router.replace(`/pc/baseDynamic/list?channelCode=${this.tabList[this.currentIndex].channelCode}`)
      this.pagination.page = 1
      this.getNewsList()
    },
    async getChannelSubset() {
      const res = await getChannelSubset({
        channelCode: 'jddt',
      })
      try {
        if (res.code === 0) {
          this.tabList = res.data.subset
          this.tabList.forEach((item, index) => {
            if(location.href.includes(item.channelCode)) {
              this.currentIndex = index
            }
          })
          this.getNewsList()
        }
      } catch (error) {
        return ''
      }
    },
    getNewsList() {
      getNewsList({
        channelCode: this.tabList[this.currentIndex] ? this.tabList[this.currentIndex].channelCode : this.channelCode,
        pageSize: this.pagination.limit,
        currPage: this.pagination.page
      }).then(res => {
        if (res.code === 0) {
          document.title = res.datas[0].channelName
          this.pagination.total = res.page.total
          this.tabList[this.currentIndex].channelCode !== 'dwgg' ? this.list = res.datas : this.list = this.chunkArray(res.datas, 5)
        }
      })
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
    /*
     * 分页功能的操作
     * */
    sizeChange (val) {
      this.pagination.limit = val
      this.pagination.page = 1
      this.getNewsList()
    },
    currentChange (val) {
      this.pagination.page = val
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
          channelCode
        },
      })
    }
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
    height: 248px;
    padding: 34px 24px 34px 20px;
    display: flex;
    background: #F5F5F5;
    margin-bottom: 50px;
    cursor: pointer;

    .img {
      width: 320px;
      height: 180px;
      margin-right: 24px;
      flex-shrink: 0;
    }

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
  .xmqw-box-ul {
    padding-bottom: 43px;
    border-bottom: 1px solid #D9D9D9;
    margin-bottom: 57px;

    .xmqw-box-li {
      display: flex;
      justify-content: space-between;
      padding-bottom: 24px;
      padding-left: 20px;
      margin-top: 27px;
      position: relative;
      cursor: pointer;

      &:not(:last-child) {
        border-bottom: 1px dotted #DFDFDF;
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
  .ui5-pager-wrap {
    text-align: center;
    padding: 10px 0 60px;
  }
}
</style>
