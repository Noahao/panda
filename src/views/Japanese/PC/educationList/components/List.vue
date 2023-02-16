<template>
  <div class="list-content">
    <div class="main-wrap">
      <div v-if="list.length > 0">
        <div v-if="channelCode == 'zs'" class="zs-wrap">
          <div class="list-box" v-for="(item, index) in list" :key="index" @click="item.channelCode === 'dxmkpzs' ? jump() : jumpDetails(item)">
            <p class="title">{{ getName(item, 'title') || getName(item, 'name') }}</p>
            <!--<p class="time">{{ getName(item, 'publishTime') }}</p>-->
          </div>
        </div>
        <div v-else-if="channelCode == 'sk'" class="sk-wrap">
          <div class="sk-list-wrap" v-for="(item, index) in list" :key="index">
            <div v-for="(item2, index2) in item" :key="index2" class="list-box">
              <div class="box" @click="jumpDetails(item2)">
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
        <div v-else>
          <div class="list-wrap">
            <div class="list-box" v-for="(item, index) in list" :key="index" @click="item.contentType === 'IMAGE' ? '' : jumpDetails(item)">
              <div class="img-box">
                <div class="img" :style="{'background-image': `url(${ getUrl(item) })`, 'background-repeat': 'no-repeat', 'background-size': 'cover'}"></div>
              </div>
              <template v-if="item.contentType === 'IMAGE'">
                <div class="xmgxc">
                  <img :preview="index" :src="item2.url" :large="item2.url" v-for="item2 in item.imageUrls" :key="item2.id" />
                </div>
              </template>
              <div class="text">
                <div class="title">{{ item.title }}</div>
                <div class="time">{{ item.publishTime }}</div>
              </div>
            </div>
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
    },
    dxmkpzs: {
      type: Object,
      default() {
        return {}
      }
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
        pageSize: 8,
      },
      total: 0
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
          return item.cover
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
  watch: {
    channelCode: {
      handler(val) {
        this.params.channelCode = val
        this.params.currPage = 1
        this.total = 0
        this.list = []
        val ? this.getList() : ''
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
    getList() {
      this.noData = false
      this.pageShow = false
      getSimplifyList(this.params).then(res => {
        if (res.code === 0) {
          try {
            if(this.channelCode === 'sk') {
              this.list = this.chunkArray(res.datas, 4)
            } else {
              this.list = res.datas
              this.list.push(this.dxmkpzs)
            }
            this.total = res.page.total
            document.title = res.datas[0].channelName
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
      this.$router.push({
        path: '/pc/details',
        query: {
          channelCode: 'education',
          id: item.id,
          tab: this.params.channelCode,
        },
      })
    },
    jump() {
      this.$router.push('/pc/list?channelCode=education&tab=dxmkpzs')
    }
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

        .img {
          width: 100%;
          height: 100%;
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
  .zs-wrap {
    width: 100%;
    padding: .6rem .6rem 0;

    .list-box {
      display: flex;
      margin-bottom: 0.27rem;
      padding-bottom: 0.24rem;
      padding-left: 0.2rem;
      align-items: center;
      cursor: pointer;
      justify-content: space-between;
      position: relative;
      border-bottom: 0.01rem dotted #dfdfdf;

      .title {
        color: #333;
        font-size: .2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        width: 70%;
      }
      .time {
        color: #999;
        font-size: 0.14rem;
      }
      &::after {
        position: absolute;
        left: 0;
        top: 20%;
        content: '';
        width: 0.06rem;
        height: 0.06rem;
        border: 0.01rem solid#666666;
        border-radius: 50%;
      }
      &:hover {
        .title {
          color: #15A98D;
        }
      }
    }
  }
  .sk-wrap {
    width: 100%;
    padding: .6rem .6rem 0;
    position: relative;

    .sk-list-wrap {
      width: 100%;
      display: inline-block;
      cursor: pointer;
      position: relative;
      z-index: 11;

      .list-box {
        width: 2rem;
        margin-bottom: .6rem;
        display: inline-block;

        .box {
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
          font-size: .18rem;
          color: #333333;
          margin-top: .65rem;
          height: 1rem;
        }
        &:not(:first-child) {
          margin-left: calc((100% - 8rem) / 3);
        }
      }
      .booth {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 1.85rem;
        z-index: 1;

        img {
          width: 100%;
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
</style>
