<template>
  <div>
    <div class="music">
      <div class="music__main">
        <div :class="['music__main__cover', isPlay ? 'active' : '']">
          <img :src="images" />
        </div>
        <div class="music__play" v-if="!isPlay" @click="play">
          <!-- <i class="el-icon-video-play" ></i> -->
          <MyIcon name="bofang" class="cloud-icon" />
        </div>
        <div class="music__play" v-else @click="pause">
          <!-- <i class="el-icon-video-pause" ></i> -->
          <MyIcon name="zanting" class="cloud-icon" />
        </div>
        <div class="music__main__timeBar">
          <div class="music__name">
            <h3>{{ title }}</h3>
          </div>
          <div class="bar" ref="bar" @click="handClickBar">
            <div class="bar__slid" ref="slid" @click="handClickBar"></div>
          </div>
          <div class="time">
            <span>{{ realMusicTime }}</span>
            <span>{{ totalMusicTime }}</span>
          </div>
        </div>
      </div>
      <!-- <div class="music__btn">
              <i class="el-icon-refresh" @click="switchMusic"></i>
          </div> -->
      <div class="music__mask"></div>
      <audio ref="music" :src="src"></audio>
    </div>
    <div class="list-wrap" v-if="details.audioInfo1.length > 1">
      <div v-for="(item, index) in details.audioInfo1" :key="index" class="list-box" @click="audioClick(item, index)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AudioBox',
  props: {
    palyIndex: {
      type: [String, Number],
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    src: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    images: {
      type: String,
      default: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/testPic.jpg',
    },
    details: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isPlay: false,
      realMusicTime: '00:00',
      totalMusicTime: '00:00',
    }
  },
  mounted() {
    this.watchMusicTime()
    // console.log(this.src)
  },
  methods: {
    play() {
      this.$emit('onAudioPlay', this.index)
      this.isPlay = true
      this.music.play()
    },
    pause() {
      this.music.pause()
      this.isPlay = false
    },
    // 处理时间
    handlMusicTime() {
      // 用秒数来显示当前播放进度
      let timeDisplay = Math.floor(this.music.currentTime) // 获取实时时间
      // 分钟
      let minute = parseInt(timeDisplay / 60)
      if (minute < 10) {
        minute = '0' + minute
      }
      // 秒
      let second = Math.round(timeDisplay % 60)
      if (second < 10) {
        second = '0' + second
      }
      this.realMusicTime = minute + ':' + second
    },
    // 处理进度条
    handMusicBar() {
      let slid = this.$refs.slid
      let duration = this.music.duration
      let x = (this.music.currentTime / duration * 100).toFixed(2) + '%'
      slid.style.width = x
    },
    // 处理点击进度条事件
    handClickBar(e) {
      const barTotalWidth = this.bar.offsetWidth // bar 总宽度
      const rect = e.target.getBoundingClientRect() // 元素右边距离页面边距的距离 返回上下左右
      let length = e.pageX - rect.left
      this.music.currentTime = length / barTotalWidth * this.music.duration // 计算播放时间 位置百分比*总时间
      this.$nextTick(() => {
        this.music.play()
        this.isPlay = true
      })
    },
    // 切换歌曲
    switchMusic() {
      this.isPlay = false
      this.audioSrc = this.audioSrcs[Math.floor(Math.random() * 5)]
      this.music.load()
      // 文件下载完毕，如果不用等到全部下载完毕，可以用canplay事件
      this.music.addEventListener('canplay', () => {
        this.music.play()
        this.isPlay = true
      })
    },
    // 使用事件监听方式捕捉事件
    watchMusicTime() {
      this.music = this.$refs.music
      this.bar = this.$refs.bar
      this.music.addEventListener(
        'timeupdate',
        () => {
          this.handlMusicTime()
          this.$nextTick(() => {
            this.handMusicBar()
          })
        },
        false
      )
      // 播放完毕
      this.music.addEventListener('ended', () => {
        this.switchMusic() // 自动播放
      })
      // 捕获音频文件已准备完毕
      // 当媒体文件可以播放的时候会触发oncanplay事件,也可以用oncanplay
      this.$refs.music.oncanplay = () => {
        let time = this.music.duration
        // 分钟
        let minutes = parseInt(time / 60)
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        // 秒
        let seconds = Math.floor(time % 60)
        if (seconds < 10) {
          seconds = '0' + seconds
        }
        this.totalMusicTime = minutes + ':' + seconds
      }
    },
    audioClick(item, index) {
      this.$emit('audioClick', item, index)
    }
  },
  watch: {
    palyIndex: {
      // immediate: true,
      handler(newval, oldval) {
        if(newval !== oldval) {
          this.$refs.slid.style.width = 0
          this.isPlay = false
        }
      },
      deep: true
    },
  },
}
</script>

<style lang="scss" scoped>
@keyframes musicRotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.music {
  width: 660px;
  height: 152px;
  border-radius: 5px;
  position: relative;
  padding: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  margin: 60px auto 0;
  background: #f5f5f5;
  &__main {
    position: relative;
    display: flex;
    &__cover {
      width: 100px;
      height: 100px;
      overflow: hidden;
      border-radius: 50%;
      background-color: #dddddd;
      cursor: pointer;
      animation: musicRotate 10s linear infinite;
      animation-play-state: paused; // 暂定动画
      img {
        width: 100%;
        height: 100%;
        filter: blur(3px);
      }
      &.active {
        animation-play-state: running; // 运行动画
      }
    }
    .music__play {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 100%;
      cursor: pointer;
      .cloud-icon {
        border: 3px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        width: 60px;
        height: 60px;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    &__timeBar {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding-left: 20px;
      box-sizing: border-box;
      .music__name {
        display: flex;
        justify-content: space-between;
        h3 {
          font-size: 24px;
          color: #333;
        }
        span {
          font-size: 14px;
          color: #666;
        }
      }
      .time {
        display: flex;
        justify-content: space-between;
        color: #fff;
        span {
          font-size: 20px;
          color: #999;
          line-height: 1;
        }
      }
      .bar {
        height: 0.08rem;
        margin: 8px 0 0.1rem;
        background-color: #fbfbfb;
        border-radius: 8px;
        position: relative;
        border-radius: 8px;
        cursor: pointer;
        &__slid {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0;
          transition: width 0.3s;
          border-radius: 8px;
          background: #15A98D;
          &::after {
            position: absolute;
            content: '';
            width: 14px;
            height: 14px;
            background: #15A98D;
            border-radius: 50%;
            top: -2px;
            right: -2px;
          }
        }
      }
    }
  }
  &__btn {
    position: absolute;
    right: 0.3rem;
    top: 0.1rem;
    i {
      font-size: 0.18rem;
      color: #fff;
      cursor: pointer;
    }
  }
  &__mask {
    z-index: -2;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(0.15rem);
    opacity: 0.5;
    transition: all 0.8s;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    &::before {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: -1;
      content: '';
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
}
.list-wrap {
  width: 660px;
  margin: auto;
  padding: 10px 30px 20px;
  background: #f5f5f5;
  .list-box {
    font-size: 20px;
    cursor: pointer;
    color: #333333;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>
