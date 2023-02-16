<template>
  <div class="propaganda-video">
    <!-- 基地宣传片 -->
    <img class="img" @click="playVideo" :src="details.backgroundImg || $Placeholder" alt="" />
    <div class="title">组织机构</div>
    <p class="text">成都市公园城市建设管理局管理的副局级公益二类事业单位</p>
    <div class="flex">
      <div class="flex-box">
        <div>设主任1名</div>
        <div>（副局级）</div>
      </div>
      <div class="flex-box">
        <div>专职副书记1名</div>
        <div>（正处级）</div>
      </div>
      <div class="flex-box">
        <div>副主任4名</div>
        <div>（正处级）</div>
      </div>
    </div>
    <p class="text">成都大熊猫繁育研究基地内设机构6个 <br />分别为：</p>
    <div class="list" @click="jump">
      <div :class="['item', `bg${i + 1}`]" v-for="(item, i) in list" :key="item.id">
        <div class="title">{{ item.name }}</div>
        <div class="text">{{ item.summary }}</div>
      </div>
    </div>

    <VideoPlay :url="videoUrl" :show.sync="show" />
  </div>
</template>

<script>
import { getNewsList, getChannelDetail, getChannelSubset } from '@/service/apiList/common'
import VideoPlay from './VideoPlay.vue'
export default {
  name: 'PropagandaVideo',
  inject: ['jumpDetails'],
  components: {
    VideoPlay,
  },
  data() {
    return {
      list: [],
      details: {},
      videoUrl: '',
      show: false,
    }
  },
  created() {
    this.getChannelSubset()
    this.getChannelDetail()
  },
  methods: {
    async getChannelSubset() {
      const res = await getChannelSubset({ channelCode: 'zzjg' })
      if (res.code === 0) {
        this.list = res.data.subset
      }
    },
    // 获取视频
    async playVideo() {
      const res = await getNewsList({ channelCode: 'jdxcp', pageSize: 6, currPage: 1 })

      if (res.code === 0) {
        try {
          this.show = true
          this.videoUrl = res.datas[0].video.url
          // window.location.href = res.datas[0].video.url
        } catch (error) {
          this.videoUrl = ''
        }
      }
    },
    async getChannelDetail() {
      const res = await getChannelDetail({ channelCode: 'jdxcp' })
      if (res.code === 0) {
        this.details = res.data
      }
    },
    jump() {
      getNewsList({
        channelCode: 'zzjg',
      }).then((res) => {
        try {
          this.jumpDetails(res.datas[0], 'gywm')
        } catch (error) {
          return ''
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.propaganda-video {
  > .img {
    width: 100%;
  }
  > .title {
    font-weight: Bold;
    font-size: 0.46rem;
    color: #333333;
    text-align: center;
    padding: 0.79rem 0 0.5rem;
  }
  > .text {
    font-weight: 500;
    font-size: 0.24rem;
    text-align: center;
    line-height: 0.36rem;
    color: #333333;
  }
  > .flex {
    display: flex;
    justify-content: space-around;
    padding: 0.59rem 0.3rem;
    .flex-box {
      text-align: center;
      div {
        &:first-child {
          font-size: 0.24rem;
          color: #333333;
        }
        &:last-child {
          margin-top: 0.16rem;
          font-size: 0.2rem;
          color: #666;
        }
      }
    }
  }
  > .list {
    margin: 0.49rem 0.3rem 0.82rem;
    > .item {
      padding: 0.35rem 0.5rem;
      border-radius: 0.5rem;
      margin-bottom: 0.4rem;
      opacity: 0.8;
      color: #fff;
      .title {
        font-size: 0.26rem;
        font-weight: Bold;
        line-height: 1;
      }
      .text {
        text-indent: 0.48rem;
        margin-top: 0.3rem;
        font-size: 0.24rem;
        line-height: 0.36rem;
      }
    }
    .bg1 {
      background: #f15929;
    }
    .bg2 {
      background: #1fae93;
    }
    .bg3 {
      background: #501a74;
    }
    .bg4 {
      background: #00aeef;
    }
    .bg5 {
      background: #fbb03f;
    }
    .bg6 {
      background: #2e9853;
    }
  }
}
</style>
