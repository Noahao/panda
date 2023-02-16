<template>
  <div class="list-content">
    <div class="main-wrap">
      <div v-if="list.length > 0">
        <div v-if="channelCode == 'zs'" class="zs-wrap">
          <div class="list-box" v-for="(item, index) in list" :key="index" @click="item.channelCode === 'dxmkpzs' ? jump() : jumpDetails(item)">
            <p class="title">{{ getName(item, 'title', 'name') }}</p>
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
                <!--<div class="time">{{ item.publishTime }}</div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 点击加载 -->
      <!--<template v-if="list.length">
        <div class="paging" v-show="params.currPage < total && !isSkeleton">
          <div @click="page(1)">クリックして追加ロード</div>
        </div>
        <div class="paging" v-show="params.currPage === total && !isSkeleton">
          <div>これ以上のデータはありません</div>
        </div>
      </template>-->
      <!-- 骨架屏 -->
      <ImgSkeleton v-show="isSkeleton && params.currPage === 1" :num="3" />
    </div>
  </div>
</template>

<script>
import { getSimplifyList } from '@/service/apiList/common'
import ImgSkeleton from '@/components/h5Skeleton/ImgSkeleton.vue'
export default {
  name: 'JpList',
  components: {
    ImgSkeleton
  },
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
        pageSize: 4,
      },
      isSkeleton: false,
      noMore: false,
      total: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
    /**
     * [滚动加载]
     */
    window.addEventListener('scroll', this.scrollHander)
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
      return (item, title, name) => {
        try {
          return item[title] || item[name]
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
    page(num) {
      this.params.currPage += num
      this.getList()
    },
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
              if (this.params.currPage === 1) {
                this.list = this.chunkArray(res.datas, 2)
              } else {
                this.list = this.list.concat(this.chunkArray(res.datas, 2))
              }
            } else {
              if (this.params.currPage === 1) {
                this.list = res.datas
              } else {
                this.list.push(...res.datas)
              }
              this.list.push(this.dxmkpzs)
            }
            this.total = res.page.totalPage
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
        path: '/h5/details',
        query: {
          channelCode: 'education',
          id: item.id,
          tab: this.params.channelCode,
        },
      })
    },
    jump() {
      this.$router.push('/h5/list?channelCode=education&tab=dxmkpzs')
    },
    /**
     * [获取滚动条当前的位置]
     * @return {[Number]} [scrollTop]
     */
    getScrollTop () {
      let scrollTop = 0
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
      } else if (document.body) {
        scrollTop = document.body.scrollTop
      }
      return scrollTop
    },
    /**
     * [获取当前可视范围的高度]
     * @return {[Number]} [clientHeight]
     */
    getClientHeight () {
      let clientHeight = 0
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(
          document.body.clientHeight,
          document.documentElement.clientHeight
        )
      } else {
        clientHeight = Math.max(
          document.body.clientHeight,
          document.documentElement.clientHeight
        )
      }
      return clientHeight
    },
    /**
     * [获取当前可视范围的高度]
     * @return {[Number]} [clientHeight]
     */
    getScrollHeight () {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      )
    },
    scrollHander () {
      // 华为p40滚动加载有问题 把这个高度加高了一点 以前是120
      // 判断是否到达可滚动加载
      if (
        this.getScrollTop() + this.getClientHeight() + 160 >=
        this.getScrollHeight()
      ) {
        if (this.total <= this.params.currPage) {
          this.noMore = true
        } else {
          this.params.currPage++
          this.getList()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-content {
  position: relative;
  margin-top: calc(-100vh + 1.2rem);
  left: 0;
  bottom: -0.4rem;
}
.main-wrap {
  width: 100%;
  margin: auto;
  top: -0.8rem;
  position: relative;
  background: #ffffff;
  min-height: 6rem;
  padding-bottom: .2rem;

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
          margin: .1rem 0 0;
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
      position: relative;
      display: flex;
      justify-content: space-between;
      margin-bottom: .5rem;

      .booth {
        width: 100%;
        position: absolute;
        left: 0;
        top: 3.3rem;
        z-index: 1;

        img {
          width: 100%;
        }
      }

      .list-box {
        display: inline-block;
        cursor: pointer;
        width: 40%;

        .box {
          width: 100%;
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
          margin-top: .45rem;
        }
      }
    }
  }
  .paging {
    margin: auto;
    display: flex;
    justify-content: space-around;
    color: #666;
    div {
      font-weight: 500;
      font-size: 0.24rem;
      padding: 0.14rem 0.4rem;
      line-height: 1;
      border-radius: 0.26rem;
      border: 0.01rem solid #d8d8d8;
    }
  }
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
