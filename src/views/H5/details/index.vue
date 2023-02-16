<template>
  <H5Layout>
    <H5Banner :channelCode="channelCode" />
    <div class="crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="crumbsSecond && (crumbsSecond.name || crumbsSecond.title )"><a @click="$router.push(crumbsSecond.url)">{{ crumbsSecond.name || crumbsSecond.title }}</a></el-breadcrumb-item>
        <el-breadcrumb-item v-if="crumbsThird.name !== details.title"><a @click="$router.push(crumbsThird.url)">{{ crumbsThird.name || crumbsThird.title }}</a></el-breadcrumb-item>

        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div class="box">
        <div class="title">
          {{ details.title }}
        </div>
        <p class="time" v-if="isShow.includes(channelCode) || channelName.includes(details.channelName)">{{ details.publishTime }}</p>
      </div>
      <!-- 视频 -->
      <div class="video" v-if="details.contentType === 'VIDEO'">
        <video :src="details.videoInfo.url" controls></video>
      </div>
      <!-- 图集 -->
      <div v-if="details.channelName === '熊猫美术馆' && details.imageUrls && details.imageUrls.length" class="example-3d">
        <swiper ref="swiper" class="swiper" :options="swiperOption">
          <swiper-slide v-for="item in details.imageUrls" :key="item.id">
            <img :src="item.url || $Placeholder" alt="" />
          </swiper-slide>
        </swiper>
        <div class="name">{{ getTitle(details.imageUrls, details.imageUrls.length === 1 ? 0 : index) }}</div>
      </div>
      <div class="text" v-html="details.content"></div>
      <!-- 附件下载 -->
      <div class="enclosure" v-if="details.annex && details.annex.length">
        <ul>
          <li @click="download(item)" v-for="item in details.annex" :key="item.id">
            附件：{{ getEnclosure(item) }}
          </li>
        </ul>
      </div>
      <!-- 音乐播放器 -->
      <AudioBox :list="details.audioInfo1" @onAudioPlay="onAudioPlay" v-show="details.channelName === '熊猫音乐' && details.audioInfo1.length" />
    </div>

    <TextSkeleton v-if="isSkeleton" :num="20" />
    <BackTop />
  </H5Layout>
</template>

<script>
import { getDetail, channelcrumbs } from '@/service/apiList/common'
import TextSkeleton from '@/components/h5Skeleton/TextSkeleton.vue'
import BackTop from '@/components/BackTop.vue'
import AudioBox from '@/components/AudioBox.vue'
export default {
  name: 'detailsIndex',
  components: {
    TextSkeleton,
    BackTop,
    AudioBox,
  },
  data() {
    const fontSize = 50 * (window.outerWidth / 750)
    const _this = this
    return {
      details: {},
      isSkeleton: false,
      isShow: ['jddt'],
      channelName: ['科普动态', '熊猫活动', '要闻速递', '新闻动态', '职工之家'],
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        initialSlide: 1,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 1,
          stretch: fontSize * 3.5,
          depth: 100,
          modifier: 1,
        },
        on: {
          slideChange: function () {
            _this.index = this.activeIndex
          },
        },
      },
      index: 1,
      crumbsSecond: {},
      crumbsThird: {}
    }
  },
  watch: {
    $route: {
      handler(to) {
        if (to.query.id) {
          this.getDetail()
        }
      },
      immediate: true,
      deep: true,
      audioIndex: '',
    },
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    channelCode() {
      return this.$route.query.channelCode
    },
    getTitle() {
      return (list, index) => {
        try {
          return list[index].name.replace('.jpg', '') || list[index].name.replace('.png', '')
        } catch (error) {
          return this.details.title + '作品'
        }
      }
    },
    getEnclosure() {
      return (str) => {
        try {
          return str.split('/')[str.split('/').length - 1]
        } catch (error) {
          return str
        }

      }
    }
  },
  methods: {
    async getDetail() {
      this.isSkeleton = true
      const res = await getDetail({ id: this.id })
      if (res.code === 0) {
        document.title = res.data.title
        this.details = res.data
        this.details.audioInfo1 = res.data.audioInfo1.filter(item => {
          return item
        })

        if(sessionStorage.font === '繁體中文') {
          this.details.content = res.data.content.replace(/font-family/g, '')
        }
        this.getCrumds()
      }
      this.isSkeleton = false
    },
    onAudioPlay(index) {
      this.audioIndex = index
    },
    getQueryString(url) {
      let ItemArr = []
      let ItemObj = {}
      url
        .substring(url.lastIndexOf('?') + 1, url.length)
        .split('&')
        .map((item) => {
          ItemArr.push(item.split('='))
        })
      ItemArr.map((item) => {
        ItemObj[item[0]] = item[1]
      })
      return ItemObj
    },
    getCrumds() {
      let params = this.getQueryString(location.href)
      channelcrumbs({
        channelCode: params.channelCode
      }).then(res => {
        this.crumbsSecond = res.data

        if(params.channelCode === 'kpjy') {
          if(location.href.includes('kpzlk')) {
            this.crumbsThird = res.data.subset.filter(item => item.name === '科普资料库')[0]
          } else {
            this.crumbsThird = res.data.subset.filter(item => item.name === this.details.channelName)[0]
          }
        } else if (params.channelCode === 'djgz') {
          if(location.href.includes('ddjs')) {
            this.crumbsThird = res.data.subset.filter(item => item.name === '党的建设')[0]
          } else {
            this.crumbsThird = res.data.subset.filter(item => item.name === this.details.channelName)[0]
          }
        } else {
          this.crumbsThird = res.data.subset.filter(item => item.name === this.details.channelName)[0]
        }
      })
    },
    // 下载
    download(url) {
      let a = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('target', '_self')
      a.setAttribute('id', 'js_a')
      //防止反复添加
      if(document.getElementById('js_a')) {
        document.body.removeChild(document.getElementById('js_a'))
      }
      document.body.appendChild(a)
      a.click()
    }
  },
}
</script>

<style lang="scss" scoped>
.crumbs {
  width: 7.1rem;
  overflow: hidden;
  padding: 0.5rem 0 0  0.4rem;
  }
.content {
  padding: 0.4rem;
  .box {
    border-bottom: 0.01rem solid #e5e5e5;
    padding: 0.4rem;
    margin-bottom: 0.4rem;
    text-align: center;
    .title {
      font-weight: Bold;
      font-size: 0.36rem;
      line-height: 0.5rem;
      color: #333333;
    }
    .time {
      margin-top: 0.3rem;
      font-weight: 500;
      color: #999999;
      font-size: 0.2rem;
    }
  }
  .text {
    font-size: 0.32rem;
    // font-family: "微软雅黑";
    line-height: 0.64rem;
    ::v-deep img {
      width: 100% !important;
    }
    ::v-deep video {
      width: 100% !important;
    }
    ::v-deep span {
      img {
        display: flex;
      }
    }
  }
  .example-3d {
    width: 100%;
    // height: 3rem;
    margin-top: 0.4rem;
    // padding: 0 0.3rem;
    .name {
      text-align: center;
      padding: 0.4rem 0;
      margin-bottom: 0.4rem;
      font-size: 0.26rem;
      color: #333333;
      border-bottom: 0.01rem dashed #e5e5e5;
    }
  }
  .swiper {
    height: 100%;
    width: 100%;
    ::v-deep .swiper-wrapper {
      display: flex;
      align-items: center;
    }
    .swiper-slide-active {
      width: 5.3rem !important;
      height: 3.2rem !important;
    }
    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 5.3rem;
      height: 2rem;
      position: relative;
      &::after {
        content: '';
        width: 2.37rem;
        height: 0;
        border-radius: 40%;
        position: absolute;
        bottom: -0.2rem;
        box-shadow: 0px 0px 22px 3px #cfcfcf;
      }
      img {
        height: 100%;
        border: 0.01rem solid #e6e6e6;
      }
    }
  }
  .enclosure {
    margin-top: 0.2rem;
    font-size: 0.32rem;
    word-wrap: break-word;
    color: #0000FF;
  }
}
.video {
  video {
    width: 100%;
  }
}
</style>
