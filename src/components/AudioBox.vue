<template>
  <div :style="{ width: width }" class="music" v-show="list.length">
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
          <h3>{{ audioSrc.name | getName }}</h3>
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
    <audio ref="music" :src="audioSrc.url"></audio>
    <div class="list">
      <div @click="switchMusic(i)" class="item" v-for="(item, i) in list" :key="item.id">
        <span>{{ item.name | getName }}</span>
        <span><MyIcon :name="isPlay && audioSrc.name === item.name ? 'zanting' : 'bofang'" size="0.14rem" color="#666" /></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AudioBox',
  props: {
    images: {
      type: String,
      default: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/testPic.jpg',
    },
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
    width: {
      type: String,
      default: '6.66rem',
    },
  },
  data() {
    return {
      isPlay: false,
      realMusicTime: '00:00',
      totalMusicTime: '00:00',
      audioSrc: {}, // ??ǰ????
      index: 0, // ??ǰ????
    }
  },
  filters: {
    getName(value) {
      try {
        return value.replace('.mp3', '')
      } catch (error) {
        return value
      }
    },
  },
  mounted() {
    this.watchMusicTime()
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
    // ????ʱ??
    handlMusicTime() {
      // ??????????ʾ??ǰ???Ž???
      let timeDisplay = Math.floor(this.music.currentTime) // ??ȡʵʱʱ??
      // ????
      let minute = parseInt(timeDisplay / 60)
      if (minute < 10) {
        minute = '0' + minute
      }
      // ??
      let second = Math.round(timeDisplay % 60)
      if (second < 10) {
        second = '0' + second
      }
      this.realMusicTime = minute + ':' + second
    },
    // ??????????
    handMusicBar() {
      let slid = this.$refs.slid
      let duration = this.music.duration
      let x = (this.music.currentTime / duration * 100).toFixed(2) + '%'
      slid.style.width = x
    },
    // ???????????????¼?
    handClickBar(e) {
      const barTotalWidth = this.bar.offsetWidth // bar ?ܿ???
      const rect = e.target.getBoundingClientRect() // Ԫ???ұ߾???ҳ???߾??ľ??? ????????????
      let length = e.pageX - rect.left
      this.music.currentTime = length / barTotalWidth * this.music.duration // ???㲥??ʱ?? λ?ðٷֱ?*??ʱ??
      this.$nextTick(() => {
        this.music.play()
        this.isPlay = true
      })
    },
    // ?л?????
    switchMusic(i) {
      this.index = i
      this.isPlay = false
      this.audioSrc = this.list[i]
      this.music.load()
      // ?ļ????????ϣ????????õȵ?ȫ?????????ϣ???????canplay?¼?
      this.music.addEventListener('canplay', () => {
        this.music.play()
        this.isPlay = true
      })
    },
    // ʹ???¼???????ʽ??׽?¼?
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
      // ????????
      this.music.addEventListener('ended', () => {
        let len = this.list.length - 1
        if (this.index >= len) {
          this.index = 0
        } else {
          this.index += 1
        }
        this.switchMusic(this.index) // ?Զ?????
      })
      // ??????Ƶ?ļ???׼??????
      // ??ý???ļ????Բ??ŵ?ʱ???ᴥ??oncanplay?¼?,Ҳ??????oncanplay
      this.$refs.music.oncanplay = () => {
        let time = this.music.duration
        // ????
        let minutes = parseInt(time / 60)
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        // ??
        let seconds = Math.floor(time % 60)
        if (seconds < 10) {
          seconds = '0' + seconds
        }
        this.totalMusicTime = minutes + ':' + seconds
      }
    },
  },
  watch: {
    list: {
      handler(value) {
        if (value.length) {
          this.audioSrc = value[this.index]
        }
      },
      deep: true,
      immediate: true,
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
  min-height: 1.52rem;
  border-radius: 0.05rem;
  position: relative;
  padding: 0.3rem;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.04);
  margin: 0.4rem auto 0;
  &__main {
    position: relative;
    display: flex;
    &__cover {
      width: 1rem;
      height: 1rem;
      overflow: hidden;
      border-radius: 50%;
      background-color: #dddddd;
      cursor: pointer;
      animation: musicRotate 10s linear infinite;
      animation-play-state: paused; // ?ݶ?????
      img {
        width: 100%;
        height: 100%;
        filter: blur(0.03rem);
      }
      &.active {
        animation-play-state: running; // ???ж???
      }
    }
    .music__play {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1rem;
      height: 100%;
      cursor: pointer;
      .cloud-icon {
        border: 0.03rem solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        width: 0.6rem;
        height: 0.6rem;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        font-size: 0.2rem;
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
      padding-left: 0.2rem;
      box-sizing: border-box;
      .music__name {
        display: flex;
        justify-content: space-between;
        h3 {
          font-size: 0.24rem;
          color: #333;
        }
        span {
          font-size: 0.14rem;
          color: #666;
        }
      }
      .time {
        display: flex;
        justify-content: space-between;
        color: #fff;
        span {
          font-size: 0.2rem;
          color: #999;
          line-height: 1;
        }
      }
      .bar {
        height: 0.08rem;
        margin: 0.08rem 0 0.1rem;
        background-color: #fbfbfb;
        border-radius: 0.08rem;
        position: relative;
        border-radius: 0.08rem;
        cursor: pointer;
        &__slid {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0;
          transition: width 0.3s;
          border-radius: 0.08rem;
          background: #15a98d;
          &::after {
            position: absolute;
            content: '';
            width: 0.12rem;
            height: 0.12rem;
            background: #15a98d;
            border-radius: 50%;
            top: -0.02rem;
            right: -0.02rem;
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
  }
}
.list {
  margin-top: 0.2rem;
  padding: 0.2rem;
  max-height: 4rem;
  overflow-y: auto;
  .item {
    color: #414141;
    margin-bottom: 0.2rem;
    display: flex;
    font-size: 0.28rem;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
      color: #15a98d;
    }
    &:last-child {
      margin: 0;
    }
  }
}
</style>
