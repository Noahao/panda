<template>
  <PCLayout>
    <div class="wrap">
      <PCBanner :channelCode="bannerObj.banner" />
      <!--<TabList :tabList="tabList" :currentIndex="currentIndex" @itemClick="itemClick"/>-->
      <div v-if="list.length">
        <div class="wrap-title" v-if="list[0]">{{ list[0].channelName || list[0][0].channelName }}</div>
        <div class="list-wrap" v-if="bannerObj">
          <div v-if="picture.includes(bannerObj.channelCode)">
            <div class="desc" v-if="xmystSummary" v-html="xmystSummary"></div>
            <el-row type="flex" class="xmbz-wrap">
              <el-col :span="6" v-for="(item, index) in list" :key="index" class="xmbz-list-box">
                <div v-if="['xmgxc', 'xmbz'].includes(bannerObj.channelCode)" style="height: 100%">
                  <img class="img" :src="getUrl(item)" alt="" @click="pictureClick(item)"/>
                  <div class="xmgxc-wrap" v-if="pictureShow">
                    <MyIcon name="guanbi-" color="#fff" size="36px" class="close" @click="pictureShow = false"/>
                    <swiper class="my-swiper" :options="swiperOption" ref="mySwiper2">
                      <swiper-slide v-for="(item2, index2) in swiperList" :key="index2">
                        <div :style="{'height': clientHeight, 'position': 'relative'}">
                          <img :src="item2.url" alt="" class="img-list"/>
                        </div>
                      </swiper-slide>
                    </swiper>
                    <div class="swiper-button btn-left" v-if="swiperList.length > 1">
                      <MyIcon name="xianxingzuojiantou" color="#fff" size="36px"/>
                    </div>
                    <div class="swiper-button btn-right" v-if="swiperList.length > 1">
                      <MyIcon name="xianxingyoujiantou" color="#fff" size="36px"/>
                    </div>
                    <!--<img :src="item2.url" :preview="1" :large="item2.url || $Placeholder" v-for="item2 in item.imageUrls" :key="item2.id" />-->
                  </div>
                </div>
                <div v-else @click="PCJumpDetails(item, bannerObj.banner)" style="height: 100%">
                  <img class="img" :src="getUrl(item)" alt=""/>
                </div>
                <div class="xmbz-title" @click="['xmgxc', 'xmbz'].includes(bannerObj.channelCode) ? pictureClick(item) : PCJumpDetails(item, bannerObj.banner)">{{ item.title }}</div>
              </el-col>
            </el-row>
          </div>
          <div v-else-if="bannerObj.channelCode === 'dxmkpzs'">
            <div class="dxmkpzs-wrap">
              <div v-for="(item, index) in list" :key="index" class="list-box" @click="PCJumpDetails2(item, 'kpjy')">
                <div class="text">
                  <div class="title">{{ item.title }}</div>
                  <div class="summary" v-if="item.summary">{{ getDesc(item.summary) }}</div>
                  <div class="nav">
                    <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/baseDynamicList/img02.png" alt="" />
                    <p class="address">{{ item.createCompany }}</p>
                  </div>
                </div>
              </div>
            </div>
            <pagination :pagination="pagination" @pageChange="pageChange"/>
          </div>
          <div v-else-if="bannerObj.channelCode === 'swzl'">
            <div v-for="(item, index) in list" :key="index" class="swzl-box-ul">
              <div v-for="(item2, index2) in item" :key="index2" class="xmqw-box-li" @click="PCJumpDetails(item2, 'ykfw')">
                <p class="title">{{ getName(item2, 'title') }}</p>
                <p class="time">{{ getName(item2, 'publishTime') }}</p>
              </div>
            </div>
            <pagination :pagination="pagination" @pageChange="pageChange"/>
          </div>
          <div v-else>
            <div v-for="(item, index) in list" :key="index" class="list-box" @click="PCJumpDetails(item, bannerObj.banner)">
              <div class="img" :style="{'background-image': `url(${getUrl(item)})`, 'background-size': 'cover'}"></div>
              <div class="text">
                <div class="title">{{ item.title }}</div>
                <div class="summary" v-if="item.summary">{{ getDesc(item.summary) }}</div>
                <div class="nav" v-if="!['nbnm', 'gnhz', 'kpcg'].includes(bannerObj.channelCode)">
                  <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/baseDynamicList/img02.png" alt="" />
                  <p class="address">{{ item.createCompany }}</p>
                  <span style="font-weight: bold;" v-if="!noTime.includes(bannerObj.channelCode)">¡¤</span>
                  <p class="time" v-if="!noTime.includes(bannerObj.channelCode)">{{ item.publishTime }}</p>
                </div>
              </div>
            </div>
            <pagination :pagination="pagination" @pageChange="pageChange"/>
          </div>
        </div>
      </div>
      <!--<div v-else class="no-data">
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panad/01065f5c-b833-4a97-ad2b-404a2e506fc0.gif" alt="" />
      </div>-->
    </div>
  </PCLayout>
</template>

<script>
import pagination from '@/components/PCComponents/PCPagination.vue'
import { getSimplifyList, channelcrumbs } from '@/service/apiList/common'
export default {
  name: 'generalList',
  components: {
    pagination
  },
  data() {
    return {
      xmystSummary: '',
      tabList: [],
      currentIndex: 0,
      list: [],
      pagination: {
        page: 1,
        limit: 5,
        total: 0,
        sizes: [5, 10 ,15, 20]
      },
      swiperOption: {
        effect: 'fade',
        slidesPerView: 'auto',
        loop: true,
        fadeEffect: {
          crossFade: true,
        },
        navigation: {
          prevEl: '.btn-left',
          nextEl: '.btn-right',
        }
      },
      bannerObj: {
        channelCode: '',
        banner: '',
      },
      picture: ['xmbz', 'xmsp', 'xmgxc', 'xmsp', 'xmyy', 'xmyst', 'xmys', 'xmmsg', 'xmyl'],
      noTime: ['hdyy', 'zyzzj'],
      swiperList: [],
      pictureShow: false,
      clientHeight: document.documentElement.clientHeight + 'px'
    }
  },
  computed: {
    getUrl() {
      return (item) => {
        try {
          return item.cover || item.video.imgUrl
        } catch (error) {
          return this.$Placeholder
        }
      }
    },
    getText() {
      return (text) => {
        if (text && text.length > 69) {
          return `<span>${text.substring(0, 69)}</span><span>${text.substring(69, text.length)}</span>`
        }
        return `<span>${text}</span>`
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
    this.getNewsList()
  },
  methods: {
    itemClick(item, index) {
      this.currentIndex = index
      this.$router.replace(`/pc/generalList?channelCode=${this.bannerObj.channelCode}`)
      this.getNewsList()
    },
    async getNewsList() {
      this.list = []
      const res = await getSimplifyList({
        channelCode: this.bannerObj.channelCode,
        pageSize: this.picture.includes(this.bannerObj.channelCode) ? 100 : this.pagination.limit,
        currPage: this.pagination.page
      })
      if (res.code === 0) {
        document.title = res.datas[0].channelName
        this.pagination.total = res.page.total
        this.bannerObj.channelCode !== 'swzl' ? this.list = res.datas : this.list = this.chunkArray(res.datas, 5)
        this.$previewRefresh()
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
    pictureClick(item) {
      this.swiperList = []
      this.swiperList = item.imageUrls
      this.pictureShow = true
    },
    pageChange (val) {
      this.pagination = val
      this.getNewsList()
    },
    PCJumpDetails2(item, channelCode) {
      let obj = {
        currPage: this.pagination.page,
        pageSize: this.pagination.limit,
        tab: this.$route.query.channelCode
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
    PCJumpDetails(item, channelCode) {
      let obj = {
        currPage: this.pagination.page,
        pageSize: this.pagination.limit,
        tab: this.$route.query.channelCode
      }
      sessionStorage.setItem('from', JSON.stringify(obj))
      this.$router.push({
        path: '/pc/details',
        query: {
          id: item.id,
          channelCode
        },
      })
    },
    getXMYST () {
      channelcrumbs({
        channelCode: 'xmyst'
      }).then(res => {
        this.xmystSummary = res.data.summary
      })
    }
  },
  watch: {
    $route: {
      handler(to) {
        if (to) {
          this.bannerObj.banner = to.query.banner
          this.bannerObj.channelCode = to.query.channelCode
          if(to.query.channelCode === 'xmyst') {
            this.getXMYST()
          } else {
            this.xmystSummary = ''
          }
          if(sessionStorage.getItem('from') && window.location.href.includes(JSON.parse(sessionStorage.getItem('from')).tab)) {
            this.pagination.page = Number(JSON.parse(sessionStorage.getItem('from')).currPage)
            this.pagination.limit = Number(JSON.parse(sessionStorage.getItem('from')).pageSize)
            this.getNewsList()
            sessionStorage.removeItem('from')
          } else {
            this.pagination.page = 1
            this.getNewsList()
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
.wrap-title {
  font-size: 36px;
  font-weight: bold;
  margin: 60px 0;
  text-align: center;
}
.list-wrap {
  max-width: 1660px;
  min-width: 1360px;
  margin: auto;

  .desc {
    width: 1398px;
    color: #333333;
    font-size: 20px;
    text-align: center;
    line-height: 32px;
    margin: 0 auto 49px;

    ::v-deep span {
      text-align: center;
      display: block;
      &:nth-child(2) {
        width: 50%;
        @include ellipsis(50%);
        margin: auto;
      }
    }
  }
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
  .xmyst-list-box {
    width: 100%;
    height: 292px;
    padding: 34px 49px 34px 24px;
    display: flex;
    background: #F5F5F5;
    margin-bottom: 50px;
    cursor: pointer;

    .img {
      width: 160px;
      height: 224px;
      margin-right: 24px;
      flex-shrink: 0;
    }

    .text {
      .title {
        color: #333333;
        font-weight: bold;
        font-size: 24px;
        margin: 10px 0 27px;
      }
      .summary {
        font-size: 16px;
        color: #666666;
        @include ellipsisLn(2);
        margin: 0 0 65px;
        line-height: 28px;
        white-space: pre-wrap;
        text-indent: 2em;
      }
      .nav {
        display: flex;
        color: #666666;
        font-size: 16px;
        align-items: center;

        .time {
          margin-right: 16px;
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
  .xmgxc {
    opacity: 0;
    z-index: 10;
    position: absolute;
    height: 100%;
    top: 0;
    overflow: hidden;
  }
  .xmgxc-wrap {
    z-index: 99999;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #000;
    cursor: auto;

    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      z-index: 12;
    }
    .my-swiper {
      text-align: center;
      z-index: 10;

      .img-list {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .swiper-button {
      position: absolute;
      top: 50%;
      cursor: pointer;
      transform: translateY(-50%);
      color: #d8d8d8;
      z-index: 12;

      &:hover {
        color: #15A98D;
      }
    }
    .btn-left {
      left: 10px;
    }
    .btn-right {
      right: 10px;
    }
  }
  .dxmkpzs-wrap {
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
  .swzl-box-ul {
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
}
.no-data {
  width: 600px;
  margin: auto;
  img {
    width: 100%;
  }
}
</style>
