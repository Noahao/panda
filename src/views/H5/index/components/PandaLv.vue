<template>
  <div class="panda-lv">
    <TitleBox title="熊猫Live秀" />
    <div class="panda-lv-box">
      <div class="info">我喜欢在地上爬来爬去，滚来滚去，胖乎乎毛绒绒的样子还非常 可爱。我的脚长得很粗壮，走起路来很吃力，笨得有点可爱。</div>
      <div class="img" v-if="!isPlay">
        <img @click="play" :src="tabList.length && tabList[activeIndex].imageUrls[0].url || $Placeholder" alt="" />
      </div>
      <VideoPlay v-else :url="tabList[activeIndex] && tabList[activeIndex].summary" />
      <div class="tab">
        <div :class="{ acitve: activeIndex === index }" @click="tabClick(index)" v-for="(item, index) in tabList" :key="item.id">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsList } from '@/service/apiList/common'
import VideoPlay from '@/components/VideoPlay.vue'
import TitleBox from '@/views/H5/index/components/TitleBox.vue'
export default {
  name: 'PandaLv',
  components: {
    TitleBox,
    VideoPlay,
  },
  data() {
    return {
      tabList: [],
      activeIndex: 0,
      isPlay: false,
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
    tabClick(i) {
      this.activeIndex = i
      this.isPlay = false
    },
    async getNewsList() {
      const res = await getNewsList({
        channelCode: 'xmLivex',
      })
      if (res.code === 0) {
        this.tabList = res.datas
      }
    },
    play() {
      this.isPlay = !this.isPlay
    },
  },
}
</script>

<style lang="scss" scoped>
.panda-lv {
  margin-bottom: 0.79rem;
  &-box {
    padding: 0 0.32rem;
    .info {
      font-size: 0.24rem;
      color: #666666;
      line-height: 0.36rem;
    }
    .img {
      margin-top: 0.5rem;
      width: 100%;
      height: 3.87rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .tab {
      display: flex;
      flex-wrap: wrap;
      margin-top: 0.2rem;
      div {
        margin-top: 0.4rem;
        width: 2rem;
        height: 0.6rem;
        font-weight: 500;
        font-size: 0.24rem;
        color: #636363;
        border: 0.01rem solid #d5d5d5;
        text-align: center;
        line-height: 0.6rem;
        margin-right: 0.43rem;
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
      .acitve {
        background: #15a98d;
        border: 0.01rem solid #15a98d;
        color: #ffffff;
      }
    }
  }
}
</style>
