<template>
  <H5LayoutEn>
    <Banner />
    <!-- 背景图 -->
    <!-- <div class="img"></div> -->
    <div class="details">
      <div class="details-box">
        <TabList />
        <div class="content">
          <div class="title">{{ item.title }}</div>
          <div class="time" v-show="['NewsCenter'].includes($route.query.channelCode) || ['Activities'].includes($route.query.tab)">
            {{ item.publishTime }}
          </div>
          <div class="video" v-if="item.contentType === 'VIDEO'">
            <video :src="item.videoInfo.url" controls></video>
          </div>
          <div class="text" v-html="item.content"></div>

          <!-- 附件下载 -->
          <div class="enclosure" v-if="item.annex && item.annex.length">
            <ul>
              <li @click="download(data)" v-for="data in item.annex" :key="data.id">
                附件：{{ getEnclosure(data) }}
              </li>
            </ul>
          </div>
        </div>
        <AudioBox :list="item.audioInfo1" v-show="$route.query.tab === 'Music'" />
        <!-- 骨架屏 -->
        <TextSkeleton v-if="isSkeleton" :num="20" />
      </div>
    </div>
  </H5LayoutEn>
</template>

<script>
import { getDetail, getSimplifyList } from '@/service/apiList/common'
import TabList from '@/views/English/components/TabList.vue'
import Banner from '@/views/English/components/Banner.vue'
import TextSkeleton from '@/components/h5Skeleton/TextSkeleton.vue'
import AudioBox from '@/components/AudioBox.vue'
export default {
  name: 'DetailsIndex',
  components: {
    Banner,
    TabList,
    TextSkeleton,
    AudioBox,
  },
  data() {
    return {
      isSkeleton: false,
      isShow: ['NewsCenter'],
      item: {},
    }
  },
  computed: {
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
  watch: {
    $route: {
      handler(to) {
        // 列表过来的
        if (to.query.id) {
          this.getDetails(to.query.id)
          return
        }
        if(to.query.tab) {
          // 详情过来的
          getSimplifyList({
            channelCode: to.query.tab,
          }).then((res) => {
            if (res.code === 0) {
              try {
                this.getDetails(res.datas[0].id)
              } catch (error) {
                return ''
              }
            }
          })
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async getDetails(id) {
      this.item = {}
      this.isSkeleton = true
      const res = await getDetail({ id })
      if (res.code === 0) {
        this.item = res.data
        this.setStr(res.data.content)
        document.title = this.item.title
      }
      this.isSkeleton = false
    },
    setStr(text) {
      let str = text
      /* a标签新开窗口跳转 */
      // if(str) {
      //     str = text.replace(/\<a/gi, '<a target="_blank"') // eslint-disable-line
      // }
      // 英文不缩进
      str = str.replaceAll('text-indent: 2em;', '')
      // rem / 2
      this.item.content = str
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
.img {
  width: 7.5rem;
  height: calc(100vh - 1.2rem);
  position: sticky;
  top: 1.2rem;
  left: 0;
  z-index: -1;
}
.details {
  // padding-top: 0.49rem;
  // margin-top: calc(-100vh + 1.2rem);
  // min-height: calc(100vh - 3.7rem);
  height: 100%;
  padding-bottom: 0.64rem;
  &-box {
    padding: 0.58rem 0 0.32rem;
    width: 7.5rem;
    // min-height: calc(100vh - 1.2rem);
    height: 100%;
    border-radius: 0.3rem;
    background: rgba(255, 255, 255);
    .content {
      padding: 0 0.4rem;
    }
    .title {
      font-size: 0.4rem;
      font-weight: bold;
      margin-bottom: 0.3rem;
    }
    .time {
      margin-top: 0.2rem;
      font-size: 0.22rem;
      color: #666;
      margin-bottom: 0.3rem;
    }
    ::v-deep img {
      width: 100%;
      height: 100%;
    }
    ::v-deep video {
      width: 100% !important;
    }
    .text {
      word-wrap: break-word;
      font-family: 'Microsoft YaHei', Arial, Helvetica, sans-serif;
    }
    .enclosure {
      margin-top: 0.2rem;
      font-size: 0.32rem;
      word-wrap: break-word;
      color: #0000FF;
    }
  }
}
.video {
  video {
    width: 100%;
  }
}
</style>
