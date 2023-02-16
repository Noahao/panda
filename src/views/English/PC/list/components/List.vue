<template>
  <div class="list">
    <div class="list-box">
      <!-- tab切换 -->
      <TabListPc @activeItem="activeItem" />
      <div class="flex-box">
        <!-- 志愿者之家，活动预约单独样式 -->
        <template v-if="['Volunteers', 'ActivityReservation'].includes($route.query.tab)">
          <div v-for="(item, index) in dataList" :key="index" class="list-box-s" @click="jumpDetails(item)">
            <div class="img" :style="{'background-image': `url(${getUrl(item)})`, 'background-size': 'cover'}"></div>
            <div class="text">
              <div class="title">{{ item.title }}</div>
              <div class="summary" v-if="item.summary">{{ item.summary }}</div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="item" @click="item.contentType === 'IMAGE' ? '' : jumpDetails(item)" v-for="item in dataList" :key="item.id">
            <div class="img">
              <img class="img" :src="setUrl(item) || $Placeholder" alt="" />
            </div>
            <template v-if="item.contentType === 'IMAGE'">
              <div class="xmgxc">
                <img @click="picture(item)" :src="setUrl(item) || $Placeholder" alt="" />
              </div>
            </template>
            <div class="box">
              <div class="title">{{ item.title }}</div>
              <div class="text">
                {{ item.summary }}
              </div>
              <div class="time" v-show="['NewsCenter'].includes($route.query.channelCode) || ['Activities'].includes($route.query.tab)">
                {{ item.publishTime }}
              </div>
            </div>
          </div>
        </template>
        <!-- 数组 -->
      </div>
      <el-pagination v-if="total" background layout="prev, pager, next" :current-page="params.currPage" :page-size="params.pageSize" @current-change="handleCurrentChange" :total="total" />

      <!-- 暂无数据 -->
      <!-- <img
        v-if="!isSkeleton && dataList.length === 0"
        class="no-data"
        src="https://file.daqsoft.com/uploadfile/server/geekui/padna/h5/en/ea214dcc-f5ee-4288-932d-5fefc39f7f3f.gif"
        alt=""
      /> -->
      <Notice v-model="isNotice" v-if="imgList.length" :list="imgList"/>
    </div>
  </div>
</template>

<script>
import TabListPc from '@/views/English/components/TabListPc.vue'
import { getSimplifyList } from '@/service/apiList/common'
import Notice from '@/components/Notice/index.vue'
import record from '@/mixin/record'
export default {
  name: 'EnList',
  mixins:[record],
  components: {
    TabListPc,
    Notice
  },
  data() {
    return {
      params: {
        channelCode: '',
        pageSize: 6,
        currPage: 1,
      },
      isSkeleton: false,
      isNotice: false,
      total: 0,
      dataList: [],
      imgList: [],
    }
  },
  computed: {
    setUrl() {
      return (item) => {
        if (item.contentType === 'IMAGE') {
          return item.imageUrls[0].url
        }
        if (item.contentType === 'VIDEO') {
          return item.video.imgUrl
        }
        return item.cover
      }
    },
    getUrl() {
      return (item) => {
        try {
          return item.cover || item.video.imgUrl
        } catch (error) {
          return this.$Placeholder
        }
      }
    },
  },
  methods: {
    activeItem(item) {
      this.params.channelCode = item
      this.params.currPage = 1
      const obj = JSON.parse(sessionStorage.getItem('cache'))
      if(obj && obj.name === this.$route.fullPath) {
        this.params.channelCode = obj.params.channelCode
        this.params.currPage = obj.params.currPage
        this.getList()
        setTimeout(() => {
          window.scrollTo(0, obj.top)
        },400)
      }else {
        this.getList()
      }
      this.removeCache()
      this.getList()
    },
    picture(item) {
      this.imgList = []
      this.isNotice = true
      this.imgList = item.imageUrls
    },
    async getList() {
      this.isSkeleton = true
      const res = await getSimplifyList(this.params)
      if (res.code === 0) {
        this.dataList = res.datas
        this.total = res.page.total
        this.$previewRefresh()
      }
      this.isSkeleton = false
    },
    handleCurrentChange(val) {
      this.params.currPage = val
      this.dataList = []
      this.getList()
    },
    // 跳转详情
    jumpDetails(item) {
      this.$router.push({
        path: '/pc/details',
        query: {
          channelCode: this.$route.query.channelCode,
          id: item.id,
          tab: this.params.channelCode,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.list {
  margin-top: calc(-100vh + 1.4rem);
  padding-bottom: 0.6rem;
  left: 0;
  &-box {
    min-height: 10rem;
    padding: 0.8rem 0.5rem 1.2rem;
    margin: 0.6rem auto 0;
    width: 16.2rem;
    background: rgba(255, 255, 255);
    position: relative;
    .flex-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .item {
      margin-top: 0.49rem;
      width: 7.4rem;
      position: relative;
      cursor: pointer;
      &:nth-child(-n + 2) {
        margin: 0;
      }
      .img {
        overflow: hidden;
        img {
          transition: all 0.5s ease 0.1s;
        }
      }
      &:hover {
        img {
          transform: scale(1.3);
        }
        .title {
          color: #15a98d !important;
        }
      }
      img {
        width: 7.4rem;
        height: 3.7rem;
        position: relative;
      }
      .xmgxc {
        position: absolute;
        top: 0;
        opacity: 0;
        z-index: 10;
        height: 3.7rem;
        width: 7.4rem;
        overflow: hidden;
      }
      .box {
        width: 7.4rem;
        max-height: 2.71rem;
        padding: 0.3rem 0 0;
        .title {
          line-height: 0.48rem;
          color: #333;
          font-size: 0.3rem;
          font-weight: bold;
          @include ellipsisLn(2);
        }
        .text {
          font-size: 0.22rem;
          color: #666;
          line-height: 0.36rem;
          @include ellipsisLn(2);
        }
        .time {
          margin-top: 0.2rem;
          font-size: 0.22rem;
          color: #666;
          line-height: 0.36rem;
        }
      }
    }
  }
  .el-pagination {
    position: absolute;
    bottom: 0.5rem;
    width: 100%;
    text-align: center;
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
      color: #15a98d ;
    }
  }
  .no-data {
    width: 6rem;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}
.list-box-s {
    width: 100%;
    height: 2.4rem;
    padding: 0.34rem 0.24rem;
    display: flex;
    background: #F5F5F5;
    margin-bottom: 0.5rem;
    cursor: pointer;

    .img {
      width:3.2rem;
      height: 1.8rem;
      margin-right: 0.24rem;
      flex-shrink: 0;
    }

    .text {
      .title {
        color: #333333;
        font-weight: bold;
        font-size: 0.24rem;
        margin: 0.1rem 0 0.2rem;
      }
      .summary {
        font-size: 16px;
        color: #666666;
        @include ellipsisLn(2);
        margin: 0 0 0.3rem;
        line-height: 0.28rem;
      }
      .nav {
        display: flex;
        color: #999999;
        font-size: 0.14rem;
        align-items: center;

        img {
          width: 0.14rem;
        }
        .address {
          margin: 0 0.1rem 0 0.15rem;
        }
        .time {
          margin-left: 0.1rem;
        }
      }
    }

    &:hover {
      background: white;
      box-shadow: 0 0 0.4rem 0 rgba(0, 0, 0, 0.1);

      .text {
        .title {
          color: #15A98D;
        }
      }
    }
  }
</style>
