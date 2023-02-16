<template>
  <div class="list-content">
    <div class="main-wrap">
      <div class="list-wrap" v-if="list.length > 0 && !arr.includes(channelCode)">
        <div class="list-box" v-for="(item, index) in list" :key="index" @click="item.contentType === 'IMAGE' ? '' : jumpDetails(item)">
          <div class="img-box">
            <img :src="getUrl(item)" alt="" />
          </div>
          <template v-if="item.contentType === 'IMAGE'">
            <div class="xmgxc">
              <img :preview="index" :src="item2.url" :large="item2.url" v-for="item2 in item.imageUrls" :key="item2.id" />
            </div>
          </template>
          <div class="text">
            <div class="title">{{ item.title }}</div>
            <div class="time" v-if="isShow.includes(params.channelCode)">{{ item.publishTime }}</div>
          </div>
        </div>
      </div>
      <div class="list-wrap2" v-if="list.length > 0 && arr.includes(channelCode)">
        <div v-for="(item, index) in list" :key="index" class="list-box2" @click="item.contentType === 'IMAGE' ? '' : jumpDetails(item)">
          <div class="img" :style="{'background-image': `url(${getUrl(item)})`, 'background-size': 'cover'}" v-if="params.channelCode !== 'dxmkpzs' || channelCode !== 'dxmkpzs'"></div>
          <div class="text">
            <div class="title">{{ item.title }}</div>
            <div class="summary" v-if="item.summary">{{ getDesc(item.summary) }}</div>
            <!--<div class="nav">
              <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/baseDynamicList/img02.png" alt="" />
              <p class="address">{{ item.createCompany }}</p>
            </div>-->
          </div>
        </div>
      </div>
      <!--<div v-if="list.length == 0 && noData" class="no-data">
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panad/01065f5c-b833-4a97-ad2b-404a2e506fc0.gif" alt="" />
      </div>-->
      <div class="small-box">
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/Japanese/list/small-panda.png"
             class="small-panda" alt="" :class="{'fix-class': fixClass}" />
        <span class="trans-box"></span>
      </div>
      <div class="page" v-if="list.length && pageShow">
        <!--分页功能-->
        <el-pagination
          background
          @current-change="currentChange"
          :current-page="params.currPage"
          :page-size="params.pageSize"
          :total="total"
          layout="prev, pager, next" />
      </div>
    </div>
  </div>
</template>

<script>
import { getSimplifyList } from '@/service/apiList/common'
export default {
  name: 'JpList',
  props: {
    channelCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: [
        /*{
          cover: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/Japanese/list/img01.jpg',
          title: '初心を忘れず、ボランティア活動を継続 ― 成都パンダ基地で2021年科学普及ボランティア?フェスティバルを開催',
          time: '2021-12-10 '
        },*/
      ],
      fixClass: false,
      noData: false,
      pageShow: false,
      params: {
        channelCode: '',
        currPage: 1,
        pageSize: 4,
      },
      total: 0,
      arr: ['zyzzj', 'hdyy', 'nbnm', 'sydt', 'dxmkpzs', 'kpcg'],
      isShow: ['zxxw', 'sj', 'xmyw', 'xmhd', 'ywsd', 'kpdt'],
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll, true)
  },
  computed: {
    getUrl() {
      return (item) => {
        try {
          if (item.contentType === 'IMAGE') {
            return item.imageUrls[0].url
          }
          if (item.video) {
            return item.video.imgUrl
          }
          return item.cover
        } catch (error) {
          return this.$Placeholder
        }
      }
    },
    strIntercept() {
      return (item) => {
        try {
          return item.includes('（') ? item.substring(0, item.indexOf('（')) : item
        } catch (error) {
          return item
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
  watch: {
    // channelCode: {
    //   handler(val) {
    //     // this.params.channelCode = val
    //     // this.params.currPage = 1
    //     // this.total = 0
    //     // this.list = []
    //     // val ? this.getList() : ''
    //   },
    //   immediate: true,
    //   deep: true,
    // },
    $route: {
      handler(to) {
        if (to) {
          this.params.channelCode = to.query.tab
          this.total = 0
          this.list = []

          if(sessionStorage.getItem('from') && window.location.href.includes(JSON.parse(sessionStorage.getItem('from')).tab)) {
            this.params.currPage = Number(JSON.parse(sessionStorage.getItem('from')).currPage)
            this.params.pageSize = Number(JSON.parse(sessionStorage.getItem('from')).pageSize)
            this.getList()
            sessionStorage.removeItem('from')
          } else {
            this.params.currPage = 1
            this.getList()
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handleScroll() {
      let scrolltop = document.querySelector('.trans-box') ? document.querySelector('.trans-box').getBoundingClientRect().top : ''
      let height = document.querySelector('.header-wrap') ? document.querySelector('.header-wrap').offsetHeight : ''
      if(scrolltop <= height) {
        if(!this.fixClass) {
          this.fixClass = true
        }
      } else {
        if(this.fixClass) {
          this.fixClass = false
        }
      }
    },
    getList() {
      this.list = []
      this.noData = false
      this.pageShow = false
      getSimplifyList(this.params).then(res => {
        if (res.code === 0) {
          try {
            this.total = res.page.total
            document.title = this.strIntercept(res.datas[0].channelName)
            this.list = res.datas
          } catch (error) {
            this.list = []
            return ''
          }
        }
      }).finally(() => {
        this.noData = true
        this.pageShow = true
        this.$previewRefresh()
      })
    },
    currentChange(val) {
      this.params.currPage = val
      this.getList()
    },
    // 跳转详情
    jumpDetails(item) {
      let obj = {
        currPage: this.params.currPage,
        pageSize: this.params.pageSize,
        tab: this.$route.query.channelCode
      }
      sessionStorage.setItem('from', JSON.stringify(obj))
      this.$router.push({
        path: '/pc/details',
        query: {
          channelCode: this.$route.query.channelCode,
          id: item.id,
          tab: this.params.channelCode,
        },
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.list-content {
  position: relative;
  margin-top: calc(-100vh + 1.2rem);
  left: 0;
}
.main-wrap {
  width: 13.6rem;
  margin: auto;
  top: -0.8rem;
  position: relative;
  background: #ffffff;
  min-height: 6rem;

  .list-wrap {
    width: 100%;
    padding: .6rem .6rem 0;
    display: flex;
    flex-wrap: wrap;
    background: #ffffff;
    justify-content: space-between;

    .list-box {
      width: 5.9rem;
      margin-bottom: .49rem;
      cursor: pointer;
      position: relative;

      &:hover {
        .img-box {
          .img {
            transform: scale(1.2);
          }
        }
        .text {
          .title {
            color: #15A98D;
          }
        }
      }
      .img-box {
        width: 100%;
        height: 3.3rem;
        overflow: hidden;

        img {
          width: 100%;
          transition: all .25s;
        }
      }
      .text {
        overflow: hidden;

        .title {
          color: #333333;
          height: .48rem;
          @include ellipsisLn(2);
          margin: .26rem 0;
          font-size: .18rem;
          letter-spacing: 0.01rem;
          line-height: 0.24rem;
          transition: all .25s;
          font-weight: bold;
        }
        .time {
          font-size: .16rem;
          color: #999999;
        }
      }
      .xmgxc {
        position: absolute;
        top: 0;
        opacity: 0;
        z-index: 10;
        height: 100%;
        width: 100%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .list-wrap2 {
    width: 100%;
    padding: .6rem .6rem 0;
    background: #ffffff;
    .list-box2 {
      width: 100%;
      height: 2.48rem;
      padding: 0.34rem 0.24rem 0.34rem 0.2rem;
      display: flex;
      background: #F5F5F5;
      margin-bottom: .5rem;
      cursor: pointer;

      .img {
        width: 3.2rem;
        height: 1.8rem;
        margin-right: .24rem;
        flex-shrink: 0;
      }

      .text {
        .title {
          color: #333333;
          font-weight: bold;
          font-size: .24rem;
          margin: .1rem 0 .4rem;
        }
        .summary {
          font-size: .16rem;
          color: #666666;
          @include ellipsisLn(3);
          margin: 0 0 .3rem;
          line-height: .28rem;
          text-indent: 1em;
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
  .no-data {
    width: 4rem;
    margin: auto;
    padding-top: 1rem;
    position: relative;
    z-index: 10;
    img {
      width: 100%;
    }
  }
  .page {
    text-align: center;
    padding: .11rem 0 .6rem;
  }
  /*::v-deep .el-pager li.active {}*/
}
.small-box {
  .small-panda {
    position: absolute;
    width: .58rem;
    display: inline-flex;
    top: 3.96rem;
    right: -0.32rem;
    z-index: -1;
  }
  .fix-class {
    position: fixed;
    top: 1.2rem;
    right: 2.46rem;
  }
  .trans-box {
    position: absolute;
    width: .01rem;
    height: .01rem;
    display: inline-flex;
    top: 3.96rem;
    right: -0.32rem;
    z-index: -1;
    opacity: 0;
  }
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #15a98d;
}
::v-deep .el-pagination .el-pager .active {
  &:hover {
    color: #fff !important;
  }
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled) {
  &:hover {
    color: #15a98d;
  }
}
</style>
