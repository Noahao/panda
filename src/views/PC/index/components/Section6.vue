<template>
  <div class="section6">
    <div class="btn-wrap" ref="pandaPopupMain">
      <div class="arrow-btn" ref="arrowBtnCont">
        <img src="http://file.daqsoft.com/uploadfile/server/geekui/panda/PC/arrow-btn_1666352755422.png" :class="['arrow', isOpenPopup && 'close']" @click.stop="openOrClosePopup" alt="" />
      </div>
      <div class="main">
        <div class="text">
          <p class="title">熊猫Live秀</p>
          <p class="desc">我喜欢在地上爬来爬去，滚来滚去，胖
            乎乎毛绒绒的样子还非常可爱。
            我的脚长得很粗壮，走起路来很吃力，笨得有点可爱。</p>
        </div>
        <div class="nav-wrap">
          <div class="list-box" v-for="(item, index) in list" :key="index" :class="{active: index === currentIndex}" @click="itemClick(item, index)">
            {{item.title}}
          </div>
        </div>
      </div>
    </div>
    <div class="seat-cont" ref="seatContMain"></div>
    <div class="video-wrap" ref="pandaVideoMain">
      <div class="img-box" v-if="!isPlay" :style="{'background-image': `url(${ backgroundImg })`, 'background-repeat': 'no-repeat', 'background-size': 'cover'}" @click="play">
        <div class="mask">
          <!--<img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/about/img05.png" @click="play" alt="" ref="playBtnCont" />-->
        </div>
      </div>
      <VideoPlay v-else :url="list[currentIndex] && list[currentIndex].summary" />
    </div>

    <!-- 遮罩层 -->
    <div class="fold-animate" ref="fold"></div>
  </div>
</template>

<script>
import { TweenMax, TimelineMax } from 'gsap'
import { getNewsList } from '@/service/apiList/common'
import VideoPlay from '@/components/PCComponents/PCVideoPlay.vue'
export default {
  name: 'SectionSix',
  components: {
    VideoPlay
  },
  data () {
    return {
      currentIndex: 1,
      list: [
        /*{
          name: '熊猫成年园'
        },
        {
          name: '熊猫母子园'
        },
        {
          name: '一号别墅'
        },
        {
          name: '熊猫幼稚园'
        },
        {
          name: '幼年熊猫园'
        },*/
      ],
      isPlay: false,
      // 需要用到的操作的 dom
      // 遮罩层的 dom
      fold: null,
      // 熊猫的弹框
      pandaPopupMain: null,
      seatContMain: null,
      //弹框是否被打开
      isOpenPopup: false,
      // 视频部分
      pandaVideoMain: null,
      // 左箭头
      arrowBtnCont: null,
      // 播放按钮
      playBtnCont: null,
      backgroundImg: ''
    }
  },
  created() {
    this.getNewsList()
  },
  mounted() {
    // 动画时，需要用到的 dom
    // start
    this.fold = this.$refs.fold
    this.pandaVideoMain = this.$refs.pandaVideoMain
    this.seatContMain = this.$refs.seatContMain
    this.pandaPopupMain = this.$refs.pandaPopupMain
    this.arrowBtnCont = this.$refs.arrowBtnCont
    this.playBtnCont = this.$refs.playBtnCont
    // end

    this.animateInit()
  },
  methods: {
    // 动画初始化
    animateInit () {
      const tl = new TimelineMax({
        onComplete: () => {
          this.play()
        },
      })

      tl.fromTo(this.fold, 1, {
        left: '100%'
      }, {
        left: '-100%'
      })

      tl.fromTo([this.arrowBtnCont, this.playBtnCont], 0.5, {
        opacity: 0
      }, {
        opacity: 1
      })
    },
    // 打开弹框动画
    openPopup() {
      TweenMax.fromTo(this.pandaPopupMain, 0.5, {
        left: '-328px'
      }, {
        left: '0'
      })

      TweenMax.fromTo(this.seatContMain, 0.5, {
        width: 0
      }, {
        width: '328px'
      })
    },

    // 关闭弹框动画
    closePopup() {
      TweenMax.fromTo(this.pandaPopupMain, 0.5, {
        left: '0'
      }, {
        left: '-328px'
      })

      TweenMax.fromTo(this.seatContMain, 0.5, {
        width: '328px'
      }, {
        width: '0'
      })
    },

    // 关闭弹框
    openOrClosePopup() {
      this.isOpenPopup = !this.isOpenPopup
      this.isOpenPopup ? this.openPopup() : this.closePopup()
    },

    itemClick(item, index) {
      this.isPlay = false
      this.currentIndex = index
      this.backgroundImg = item.imageUrls[0].url
    },
    getNewsList() {
      getNewsList({
        channelCode: 'xmLivex',
      }).then(res => {
        if (res.code === 0) {
          this.list = res.datas

          this.backgroundImg = this.list[this.currentIndex].imageUrls[0].url
        }
      })
    },
    play() {
      this.isPlay = !this.isPlay
    }
  }
}
</script>

<style lang="scss" scoped>
  .section6 {
    display: flex;
    width: 100%;
    height: 100%;
    // margin: 0;
    padding-bottom: 70px;
    overflow: hidden;
    margin-top: 70px;
    position: relative;
    .btn-wrap {
      position: absolute;
      top: 0;
      left: -328px;
      width: 328px;
      height: 100%;
      display: inline-block;
      background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/btn-bg.jpg') no-repeat;
      background-size: cover;
      z-index: 9;
      .arrow-btn {
        position: absolute;
        top: 50%;
        width: 40px;
        height: 165px;
        transform: translateY(-50%);
        right: -40px;
        background-image: url('http://file.daqsoft.com/uploadfile/server/geekui/panda/PC/arrow-cont.png');
        background-repeat: no-repeat;
        background-size: cover;
        .arrow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 10px;
          transition: transform 0.3s linear;
          cursor: pointer;
          &.close {
            transform: translate(-50%, -50%) rotate(-180deg);
          }
        }
      }
      .main {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .text {
          text-align: center;

          .title {
            font-weight: Bold;
            font-size: 40px;
            color: #333333;
          }
          .desc {
            font-size: 14px;
            color: #666666;
            width: 288px;
            margin: 30px auto 0;
          }
        }

        .nav-wrap {
          margin-top: 50px;
          .list-box {
            width: 160px;
            height: 44px;
            border: 1px solid #D5D5D5;
            text-align: center;
            line-height: 44px;
            margin: 0 auto 20px;
            cursor: pointer;
            color: #636363;
          }
          .active {
            background: #15A98D;
            border: 1px solid #15A98D;
            color: #ffffff;
          }
        }
      }
    }

    .seat-cont {
      width: 0;
      height: 100%;
      display: inline-block;
    }

    .video-wrap {
      position: relative;
      z-index: 8;
      flex: 1;
      display: inline-block;
      height: 100%;
      background-color: #000;
      .img-box {
        height: 100%;
        width: 100%;
        position: relative;
        cursor: pointer;

        .mask {
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.32);
          position: absolute;
          top: 0;
          left: 0;

          img {
            cursor: pointer;
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60px;
          }
        }
      }
      ::v-deep #videoPlayer {
        height: 100%;
      }
    }

    .fold-animate {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background-color: #15a98d;
      z-index: 9;
    }
  }
  @media screen and (min-width: 1920px) {
    .main {
      padding-top: 460px;
    }
  }
  @media screen and (max-width: 1920px) {
    .main {
      padding-top: 360px;
    }
  }
</style>
