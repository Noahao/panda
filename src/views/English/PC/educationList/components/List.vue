<template>
  <div class="list">
    <div class="list-box">
      <!-- tab切换 -->
      <TabListPc @activeItem="activeItem" />
      <div class="flex-box">
        <!-- 知识 -->
        <div class="zs-list" v-if="params.channelCode === 'zs'">
          <div class="item" @click="jumpDetails(item)" v-for="item in dataList" :key="item.id">
            <div class="title">{{ item.title }}</div>
            <!--<div class="time">{{ item.publishTime }}</div>-->
          </div>
          <div class="item" @click="jump">
            <p class="title">panda knowledge</p>
          </div>
        </div>
        <!-- 书刊 -->
        <div class="sj-list" v-if="params.channelCode === 'sj'">
          <div class="sk-list-wrap" v-for="(item, index) in dataList" :key="index">
            <div @click="jumpDetails(item2)" v-for="(item2, index2) in item" :key="index2" class="item">
              <div class="box">
                <div class="img-box">
                  <img class="cloud-img" :src="setUrl(item2)"/>
                </div>
                <div class="name">{{ item2 && item2.title }}</div>
              </div>
            </div>
            <div class="booth">
              <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/education/img10.png" alt="" />
            </div>
          </div>
        </div>
        <!-- xm资料库 -->
        <div v-if="params.channelCode === 'dxmkpzs'">
          <div class="dxmkpzs-wrap">
            <div v-for="(item, index) in dataList" :key="index" class="list-box-s" @click="jumpDetails(item)">
              <div class="text">
                <div class="title">{{ item.title }}</div>
                <div class="summary" v-if="item.summary">{{ item.summary }}</div>
                <!-- <div class="nav">
                  <p class="time">{{ item.publishTime }}</p>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-pagination v-if="total" background layout="prev, pager, next" :page-size="params.pageSize" @current-change="handleCurrentChange" :total="total" />

      <!-- 暂无数据 -->
      <!-- <img
        v-if="!isSkeleton && dataList.length === 0"
        class="no-data"
        src="https://file.daqsoft.com/uploadfile/server/geekui/padna/h5/en/ea214dcc-f5ee-4288-932d-5fefc39f7f3f.gif"
        alt=""
      /> -->
    </div>
  </div>
</template>

<script>
import TabListPc from './TabListPc.vue'
import { getSimplifyList } from '@/service/apiList/common'
export default {
  name: 'EnList',
  components: {
    TabListPc,
  },
  data() {
    return {
      params: {
        channelCode: '',
        pageSize: 8,
        currPage: 1,
      },
      isSkeleton: false,
      total: 0,
      dataList: [],
    }
  },
  computed: {
    setUrl() {
      return (item) => {
        try {
          return item.cover

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
      if(item === 'sj') {
        this.params.pageSize = 10
      } else {
        this.params.pageSize = 8
      }
      this.dataList = []
      this.getList()
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
    async getList() {
      this.isSkeleton = true
      const res = await getSimplifyList(this.params)
      if (res.code === 0) {
        if(this.params.channelCode === 'sj') {
          this.dataList = this.chunkArray(res.datas, 5)
        } else {
          this.dataList = res.datas
        }
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
    jump() {
      window.location.href = location.href + '&kpzl=true'
    },
    // 跳转详情
    jumpDetails(item) {
      this.$router.push({
        path: '/pc/details',
        query: {
          channelCode: this.$route.query.channelCode,
          id: item.id,
          tab: this.$route.query.tab,
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
      .zs-list {
        .item {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding-bottom: 0.24rem;
          margin-bottom: 0.27rem;
          cursor: pointer;
          border-bottom: 0.01rem dotted #DFDFDF;
          .title {
            position: relative;
            color: #333;
            font-size: 0.2rem;
            flex: 1;
            padding-left: 0.2rem;
            @include ellipsis();
            &::after {
              position: absolute;
              left: 0;
              top: 0.1rem;
              content: "";
              width: 0.06rem;
              height: 0.06rem;
              border: 0.01rem solid #666666;
              border-radius: 50%;
            }
            &:hover {
              color: #15a98d;
            }
          }
          .time {
            color: #999;
            font-size: 0.14rem;
          }
        }
      }
      .sj-list {
        width: 100%;
        position: relative;
        .sk-list-wrap {
          height: 4rem;
          width: 100%;
          display: inline-block;
          cursor: pointer;
          position: relative;
          z-index: 11;

          .item {
            width: 2rem;
            margin-bottom: 0.6rem;
            display: inline-block;
            .box {
              margin: auto;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              position: relative;
              z-index: 10;
              img {
                width: 100%;
                height: 2.5rem;
              }
            }
            .name {
              text-align: center;
              font-weight: Bold;
              font-size: 0.18rem;
              color: #333333;
              margin-top: 0.65rem;
              @include ellipsisLn(2);
            }
            &:first-child {
              margin-left: 0.5rem;
            }
            &:not(:first-child) {
              margin-left: calc((100% - 10rem) / 5);
            }
          }
          .booth {
            width: 100%;
            position: absolute;
            bottom: 0;
            top: 2.4rem;
            z-index: 1;

            img {
              width: 100%;
            }
          }
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
  ::v-deep .btn-prev .active {
    &:hover {
      color: #fff!important;
    }
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
  .no-data {
    width: 6rem;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  .dxmkpzs-wrap {
    .list-box-s {
      width: 100%;
      max-height: 2.09rem;
      padding: 0.34rem 0.24rem 0.34rem 0.2rem;
      display: flex;
      background: #F5F5F5;
      margin-bottom: 0.5rem;
      cursor: pointer;

      .text {
        .title {
          color: #333333;
          font-weight: bold;
          font-size: 0.24rem;
          margin: 0.1rem 0 0.2rem;
        }
        .summary {
          font-size: 0.16rem;
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
  }
}
</style>
