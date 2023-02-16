<template>
  <div class="section4">
    <div class="left" ref="leftMain">
      <div class="title">
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/left-title.png" alt="" ref="service" />
      </div>
      <div class="book-tickets">
        <!-- <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/book-tickets.png" alt="" /> -->
        <div class="ticket-cont" ref="ticket">立即订票</div>
      </div>
      <div class="qr-img">
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/index/qr-code.jpg" alt="" ref="erweima" />
      </div>
    </div>
    <div class="right">
      <div class="right-first" ref="openTime">
        <div class="title">开放时间</div>
        <div class="desc">具体入园防疫政策见游客参观须知，参观全程请佩戴口罩并保持1米以上距离。</div>
        <div class="time-box">
          <div class="list-box">
            <div class="text">
              <p class="text-time">7:30~18:00</p>
              <p class="text-name">开放时间</p>
            </div>
          </div>
          <div class="list-box">
            <div class="text">
              <p class="text-time">17:00</p>
              <p class="text-name">停止入园</p>
            </div>
          </div>
          <div class="list-box">
            <div class="text">
              <p class="text-time">17:00</p>
              <p class="text-name">停止售票</p>
            </div>
          </div>
        </div>
      </div>
      <div class="right-second" ref="carService">
        <div class="title">观光车服务</div>
        <div class="desc">根据园区内实际情况，有可能会临时停止售票或调整运营路线，给您带来不便，敬请谅解。</div>
        <div class="time-box">
          <div class="list-box">
            <div class="text">
              <div class="top">
                <div>
                  <p class="text-time">7:30~18:00</p>
                  <p class="text-name">观光车运行时间</p>
                </div>
                <div>
                  <p class="text-time">17:30</p>
                  <p class="text-name">停止售票</p>
                </div>
              </div>
              <p class="text-desc">观光车票价：30 元/人（当日有效，不限制乘坐次数），观光车免票人群：1.3米以下（含）儿童免票（不占座位）。</p>
            </div>
          </div>
          <!--<div class="list-box">
            <div class="text">
              <p class="text-time">7:30~18:00</p>
              <p class="text-name">新区观光车运营时间</p>
              <p class="text-desc">停止售票：17:30，票价：30 元/人（当日有效，不限制乘坐次数）。</p>
            </div>
          </div>-->
        </div>
      </div>
      <div class="right-third" ref="introduce">
        <div v-for="(item, index) in thirdList" :key="index" class="third-list-box" :style="{ 'background-color': colorList[index] }" @click="jump(item)">
          <div class="img">
            <img :src="item.logo" alt="" />
          </div>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>

    <!-- 遮罩层 -->
    <div class="fold-animate" ref="fold"></div>

    <!-- 左边的云 -->
    <div :class="['left-cloud', cloudMoveCls && 'add-animate']">
      <img src="http://file.daqsoft.com/uploadfile/server/geekui/panda/PC/Section4-cloud-left.png" class="cloud-icon" />
    </div>
    <!-- 右边的云 -->
    <div :class="['right-cloud', cloudMoveCls && 'add-animate']">
      <img src="http://file.daqsoft.com/uploadfile/server/geekui/panda/PC/Section4-cloud-right.png" class="cloud-icon" />
    </div>
  </div>
</template>

<script>
import { getChannelSubset, getNewsList } from '@/service/apiList/common'
import { TimelineMax } from 'gsap'
export default {
  name: 'SectionFour',
  inject: ['PCJumpDetails'],
  data() {
    return {
      colorList: ['#FBB03F', '#1FAE93', '#00AEEF', '#F15929', '#2E9853', '#501A74'],
      thirdList: [],

      // 动画时，需要操作的 dom
      // 遮罩层的 dom
      fold: null,
      // 左边的 dom 区域
      leftMain: null,
      // 游客服务
      serviceMain: null,
      // 立即订票
      ticketMain: null,
      // 二维码
      erweimaMain: null,
      // 开放时间
      openTimeMain: null,
      // 观光车服务
      carServiceMain: null,
      // 景区介绍
      introduceMain: null,

      // 添加云彩动画的 class 动画属性
      cloudMoveCls: false
    }
  },
  created() {
    this.getChannelSubset()
  },
  mounted() {
    // 对要使用到的动画 dom 进行赋值
    // start
    this.fold = this.$refs.fold
    this.leftMain = this.$refs.leftMain
    // this.leftMain.style.opacity = 0
    this.serviceMain = this.$refs.service
    this.ticketMain = this.$refs.ticket
    this.erweimaMain = this.$refs.erweima
    this.openTimeMain = this.$refs.openTime
    this.carServiceMain = this.$refs.carService
    this.introduceMain = this.$refs.introduce
    // end
    this.animateInit()
  },
  methods: {
    jump(item) {
      getNewsList({
        channelCode: item.channelCode,
      }).then((res) => {
        if (res.code === 0) {
          let arr = this.thirdList.filter(item2 => item2.name === res.datas[0].channelName)
          try {
            this.PCJumpDetails(res.datas[0], arr[0].url1.substring(arr[0].url1.indexOf('channelCode=') + 12, arr[0].url1.length))
          } catch (error) {
            return ''
          }
        }
      })
    },
    // 动画初始化
    animateInit() {
      // 修正左边的出场方式
      const tl = new TimelineMax({
        onComplete: () => {
          this.cloudMoveCls = true
        }
      })
      tl.fromTo(
        this.fold,
        1,
        {
          left: '100%',
        },
        {
          left: '-100%',
          onComplete: () => {
            this.fold.style.display = 'none'
          },
        }
      )

      // 左边动画
      tl.fromTo(
        this.leftMain,
        0.5,
        {
          opacity: 0,
          transform: 'translateX(-400px)',
        },
        {
          opacity: 1,
          transform: 'translateX(0px)',
        },
        '-=0.1'
      )
      this.toTopDisplay(tl, this.serviceMain)
      this.toTopDisplay(tl, this.ticketMain)
      this.toTopDisplay(tl, this.erweimaMain)

      // 右边动画
      tl.fromTo(
        this.openTimeMain,
        0.6,
        {
          opacity: 0,
          transform: 'translateY(-40px)',
        },
        {
          opacity: 1,
          transform: 'translateY(0px)',
        }
      )

      tl.fromTo(
        this.carServiceMain,
        0.6,
        {
          opacity: 0,
          transform: 'translateY(-30px)',
        },
        {
          opacity: 1,
          transform: 'translateY(0px)',
        },
        '-=0.3'
      )

      tl.fromTo(
        this.introduceMain,
        0.6,
        {
          opacity: 0,
          transform: 'translateY(-20px)',
        },
        {
          opacity: 1,
          transform: 'translateY(0px)',
        },
        '-=0.2'
      )
    },

    /**
     * @description: 向上透明到显示的函数
     * @param {*} aniObj 当前动画执行的动画对象
     * @param {*} el 执行动画的 dom 元素
     */
    toTopDisplay(aniObj, el) {
      aniObj.fromTo(
        el,
        0.5,
        {
          opacity: 0,
          transform: 'translateY(20px)',
        },
        {
          opacity: 1,
          transform: 'translateY(0px)',
        }
      )
    },

    getChannelSubset() {
      getChannelSubset({
        channelCode: 'ykfw',
      }).then((res) => {
        if (res.code === 0) {
          this.thirdList = res.data.subset.filter((item) => item.logo)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.section4 {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  padding-top: 70px;
  background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/Section4-bg.png') no-repeat;
  background-size: cover;
  z-index: 0;

  .left {
    // width: 21%;
    width: 400px;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    // max-width: 400px;
    background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/section4-left-bg.jpg') no-repeat;
    background-size: cover;
    position: relative;
    z-index: 2;

    div {
      text-align: center;
    }
    .title {
      margin-top: 100px;

      img {
        width: 204px;
      }
    }
    .book-tickets {
      margin: 90px 0;
      cursor: pointer;
      .ticket-cont {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 96px;
        height: 156px;
        padding: 6px;
        margin: 0 auto;
        color: #ffd200;
        font-size: 24px;
        line-height: 36px;
        letter-spacing: 4.8px;
        z-index: 0;
        overflow: hidden;
        &::after {
          content: '';
          position: absolute;
          top: -20px;
          left: -50px;
          width: 200px;
          height: 200px;
          background-repeat: no-repeat;
          background-position: 0 0;
          background-image: conic-gradient(#fff, #fff 95%, transparent 95%);
          z-index: -2;
          animation: rotate 6s linear infinite;
        }
        &::before {
          content: '';
          position: absolute;
          top: 3px;
          left: 3px;
          width: 90px;
          height: 150px;
          background-color: #15a98d;
          z-index: -1;
        }
      }
    }

    .qr-img {
      width: 200px;
      margin: auto;

      img {
        width: 100%;
      }
    }
  }

  .right {
    // width: 79%;
    height: 100%;
    min-width: calc(100% - 400px);
    display: inline-block;
    overflow: hidden;
    position: relative;
    padding: 50px 0 0;
    z-index: 2;

    .right-first,
    .right-second {
      display: block;
      width: 1034px;
      margin: 30px auto 40px;

      .title {
        font-size: 36px;
        color: #15a98d;
        position: relative;
        font-weight: bold;
        text-align: left;

        &:before {
          position: absolute;
          top: 21px;
          left: -42px;
          content: '';
          width: 8px;
          height: 8px;
          border: 3px solid #15a98d;
          border-radius: 50%;
          font-weight: Bold;
        }
      }
      .desc {
        margin: 30px 0;
        font-size: 16px;
        color: #333333;
      }
    }

    .right-first {
      .time-box {
        .list-box {
          display: inline-block;
          margin-right: 40px;
          max-width: 235px;
          min-width: 208px;
          width: 27%;
          position: relative;
          height: 140px;
          overflow: hidden;
          background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/box2.png') round;
          background-size: cover;

          img {
            width: 100%;
          }
          .text {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            text-align: center;
            padding-top: 30px;

            &-time {
              font-size: 36px;
              color: #15a98d;
              font-weight: Bold;
              margin-bottom: 14px;
            }
            &-name {
              font-size: 16px;
              color: #333333;
            }
          }
        }
      }
    }

    .right-second {
      .time-box {
        text-align: left !important;
        .list-box {
          display: inline-block;
          max-width: 858px;
          min-width: 728px;
          width: 100%;
          height: 175px;
          overflow: hidden;
          background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/box3.png') round;
          background-size: cover;
          position: relative;

          &:first-child {
            margin-right: 40px;
          }
          img {
            width: 100%;
          }
          .text {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            text-align: center;
            padding-top: 30px;

            .top {
              display: flex;
              justify-content: center;

              div {
                margin: 0 100px;
              }
            }
            &-time {
              font-size: 36px;
              color: #15a98d;
              font-weight: Bold;
            }
            &-name {
              font-size: 16px;
              color: #333333;
              margin: 10px 0 20px;
            }
            &-desc {
              font-size: 16px;
              color: #f27852;
            }
          }
        }
      }
    }

    .right-third {
      width: 80%;
      display: flex;
      justify-content: center;
      margin: 60px auto 0;

      .third-list-box {
        width: 20%;
        height: 136px;
        text-align: center;
        margin-right: 1px;
        padding-top: 20px;
        cursor: pointer;
        opacity: 0.7;

        &:hover {
          opacity: 1;
        }
        &:first-child {
          border-radius: 60px 0 0 0;
        }
        &:last-child {
          border-radius: 0 0 60px 0;
        }
        .img {
          height: 40px;

          img {
            height: 100%;
            width: auto;
          }
        }
        p {
          font-size: 20px;
          color: #ffffff;
          margin-top: 20px;
        }
      }
    }
  }

  .fold-animate {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #15a98d;
    z-index: 6;
  }

  .left-cloud, .right-cloud {
    position: absolute;
    top: 100px;
    z-index: 0;
  }

  .left-cloud {
    left: 400px;
    &.add-animate {
      animation: leftCloud 10s linear infinite;
    }
    .cloud-icon {
      height: 432px;
      width: auto;
    }
  }

  .right-cloud {
    right: 0px;
    &.add-animate {
      animation: rightCloud 10s linear infinite;
    }
    .cloud-icon {
      height: 369px;
      width: auto;
    }
  }
}
@media screen and (min-width: 1921px) {
  .right-first {
    margin-top: 40px;
  }
  .right-second {
    margin: 60px auto 100px !important;
  }
}
@media screen and (max-width: 1920px) {
  .right-first {
    margin: 0;

    .desc {
      margin: 15px 0 !important;
    }
    .list-box {
      height: 125px !important;
    }
  }
  .right-second {
    margin: 20px 0;

    .desc {
      margin: 15px 0 !important;
    }
  }
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

@keyframes leftCloud {
  0% {
    left: 400px;
  }
  100% {
    left: -40%;
  }
}

@keyframes rightCloud {
  0% {
    right: 0px;
  }
  100% {
    right: -40%;
  }
}
</style>
