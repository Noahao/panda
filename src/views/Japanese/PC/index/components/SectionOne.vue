<template>
  <div class="section-one">
    <div class="logo">
      <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/Japanese/index/logo_1.png" alt="" class="logo1"/>
      <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/Japanese/index/logo_2.png" alt="" class="logo2 wow fadeInDown" data-wow-delay="1s"/>
    </div>
    <div class="flowers">
      <div class="left wow fadeInLeftBig">
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/flowers/left.png" alt="" />
      </div>
      <div class="center wow fadeInUpBig">
        <!--<img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/flowers/整体.png" alt="" class="img-wrap"/>-->
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/flowers/11.png" alt="" class="img11"/>
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/flowers/01_1668501398363.png" alt="" class="img01 flower-child"/>
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/flowers/02.png" alt="" class="img02 flower-child"/>
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/flowers/03.png" alt="" class="img03 flower-child"/>
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/flowers/04.png" alt="" class="img04 flower-child"/>
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/flowers/05.png" alt="" class="img05 flower-child"/>
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/flowers/06.png" alt="" class="img06 flower-child"/>
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/flowers/07_1668501448202.png" alt="" class="img07 flower-child"/>
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/flowers/08_1668501455630.png" alt="" class="img08 flower-child"/>
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/flowers/09_1668501462685.png" alt="" class="img09 flower-child"/>
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/flowers/10_1668501469311.png" alt="" class="img10 flower-child"/>
      </div>
      <div class="right wow fadeInRightBig">
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/flowers/right.png" alt="" />
      </div>
    </div>
    <div class="title-box">
      <div class="title">チャイナチャーム?パンダクレードル</div>
      <div class="desc">山々はデイジーでいっぱいで、青い水は鏡のようで、リンタオは破裂していて、鳥はうなり声を上げています</div>
    </div>
    <div class="nav-btn" @click="maskClick">
      <MyIcon name="caidan" class="caidan" color="rgba(255,255,255,0.7)" size="0.48rem"/>
    </div>
    <div class="head" v-if="list.length">
      <div class="bubble" v-for="(item, index) in list" :key="index">
        <img :src="(item.imageUrls.length && item.imageUrls[0].url) || $Placeholder" alt="" />
      </div>
    </div>
    <div class="down">
      <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/Japanese/index/down.png" alt="" />
    </div>
    <div class="mask" :class="{maskShow: maskShow}">
      <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/mask-logo.png" alt="" class="mask-logo" />
      <div class="mask-wrap">
        <div v-for="(item, index) in headList" :key="index" class="mask-list-box">
          <span>{{ strIntercept(item.name) }}</span>
          <div class="mask-list-child" v-if="item.subset.length">
            <p v-for="(item2, index2) in item.subset" :key="index2" @click.stop="itemClick(item2)">{{ strIntercept(item2.name) }}</p>
          </div>
        </div>
      </div>
      <MyIcon @click="back" name="guanbi-" class="back" color="#666666" size="30px"/>
    </div>
  </div>
</template>

<script>
import { channelcrumbs, getNewsList } from '@/service/apiList/common'
export default {
  name: 'sectionOne',
  data () {
    return {
      maskShow: false,
      showList: ['axzc1', 'xcdxm', 'gaxmfxax', 'jdxcp', 'lxwm'],
      headList: [],
      list: []
    }
  },
  inject: ['PCJumpDetails'],
  computed: {
    strIntercept() {
      return (item) => {
        try {
          return item.substring(0, item.indexOf('（'))
        } catch (error) {
          return item
        }
      }
    }
  },
  mounted () {
    this.getNewsList()
  },
  methods: {
    maskClick () {
      this.getChannelcrumbs()
      this.maskShow = true
    },
    back () {
      this.maskShow = false
    },
    getChannelcrumbs() {
      channelcrumbs({ channelCode: 'xmjdgw' }).then(res => {
        if (res.code === 0) {
          this.$nextTick(() => {
            this.headList = res.data.subset
            this.headList.unshift({
              name: 'トップページ',
              url1: '/pc/home',
              subset: []
            })
          })
        }
      })
    },
    // 熊猫大使头像
    async getNewsList() {
      const res = await getNewsList({
        channelCode: 'xmds',
        pageSize: 10,
        currPage: 1,
      })
      if (res.code === 0) {
        this.list = res.datas
        /*for(let i = 0; i < 3; i++) {
          this.list.push(res.datas[0])
        }*/
      }
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
    itemClick(item) {
      this.maskShow = false
      if (item.url1 && item.url1.includes('?details')) {
        const params = this.getQueryString(item.url1)
        getNewsList({ channelCode: params.details }).then((res) => {
          try {
            if (res.datas.length === 0) {
              this.$message({
                message: '敬请期待！',
                type: 'warning'
              })
              return
            }
            this.PCJumpDetails(res.datas[0], params.channelCode)
          } catch (error) {
            return ''
          }
        })
        return
      }
      if (item.url1) {
        this.$router.push(item.url1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section-one {
  width: 100%;
  height: 100vh;
  background-image: url("https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/Japanese/index/bg1_2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  position: relative;
  overflow: hidden;

  .logo {
    display: inline-block;
    position: absolute;
    top: .6rem;
    left: .6rem;

    .logo1 {
      width: 0.44rem;
    }
    .logo2 {
      width: 0.9rem;
      position: absolute;
      left: 0.13rem;
      top: 0.74rem;
    }
  }
  .flowers {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;

    .left {
      position: absolute;
      left: 0;
      bottom: 0
    }
    .center {
      position: absolute;
      left: calc(50% - 3.2rem);
      bottom: 0;
      width: 6.45rem;
      .flower-child {
        position: absolute;
        transform-origin: bottom center;
      }
      .img11 {
        position: relative;
        z-index: 99;
        width: 100%;
      }
      .img01 {
        z-index: 8;
        width: 1.19rem;
        right: 1.8rem;
        bottom: 0.9rem;
        animation: swing 2s ease infinite alternate;
      }
      .img02 {
        z-index: 8;
        right: 2.5rem;
        bottom: 0.8rem;
        width: 1.68rem;
        animation: swing 1.5s ease infinite alternate;
      }
      .img03 {
        z-index: 3;
        left: 0.9rem;
        bottom: 0.3rem;
        width: 1.16rem;
        animation: swing 1.2s ease infinite alternate;
      }
      .img04 {
        z-index: 5;
        left: 1.1rem;
        bottom: 0.3rem;
        width: 1.06rem;
        animation: swing 1.5s ease infinite alternate;
      }
      .img05 {
        z-index: 1;
        left: 1.8rem;
        bottom: 0.3rem;
        width: 0.8rem;
        animation: swing 1.7s ease infinite alternate;
      }
      .img06 {
        z-index: 9;
        left: 2.2rem;
        bottom: 0.3rem;
        width: 1.11rem;
        animation: swing 1.2s ease infinite alternate;
      }
      .img07 {
        z-index: 9;
        right: 1.8rem;
        bottom: 0.1rem;
        width: 1.03rem;
        animation: swing 1.4s ease infinite alternate;
      }
      .img08 {
        z-index: 9;
        right: 1.5rem;
        bottom: 0.1rem;
        width: 1.12rem;
        animation: swing 1.3s ease infinite alternate;
      }
      .img09 {
        z-index: 9;
        right: 0.8rem;
        bottom: 0.1rem;
        width: 1.52rem;
        animation: swing 1.9s ease infinite alternate;
      }
      .img10 {
        z-index: 9;
        right: 0.5rem;
        bottom: 0.1rem;
        width: 1.72rem;
        animation: swing 1.6s ease infinite alternate;
      }
      @keyframes swing{
        from{
          transform: rotate(-5deg);
        }
        to{
          transform: rotate(5deg);
        }
      }
    }
    .right {
      position: absolute;
      right: 0;
      bottom: 0
    }
  }
  .title-box {
    position: absolute;
    bottom: 3.63rem;
    text-align: center;
    width: 100%;
    margin: auto;
    z-index: 111;
    .title {
      font-size: .6rem;
      color: #ffffff;
    }
    .desc {
      font-size: .24rem;
      margin-top: .4rem;
      color: rgba(255, 255, 255, 0.8);
    }
  }
  .nav-btn {
    position: absolute;
    top: .6rem;
    right: .6rem;
    cursor: pointer;

    &:hover {
      i {
        color: #15a98d !important;
      }
    }
  }
  .down {
    height: .6rem;
    position: absolute;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
    bottom: .41rem;
    z-index: 10001;
    animation: upDown 1s ease-in infinite;

    img {
      height: 100%;
    }
  }
  @keyframes upDown {
    0% {
      transform: translateY(0rem);
    }
    100% {
      transform: translateY(0.2rem);
    }
  }
  .head {
    position: absolute;
    bottom: 2.5rem;
    right: 9.5rem;
    z-index: 99;
    > div {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      text-align: center;
    }
    .bubble {
      animation: bubbleOne 12s ease-in infinite;
      line-height: 1.25rem;
      border-radius: 50%;
      height: 1.25rem;
      width: 1.25rem;
      left: 5.8rem;
      position: absolute;
      top: -1rem;
      pointer-events: none;
      opacity: 0;
      transition: all 400ms ease;
      img {
        width: 1.1rem;
        height: 1.1rem;
        border-radius: 50%;
      }
    }
    .bubble:nth-child(2n) {
      animation-name: bubbleFour;
      transform-origin: right center;
      animation-delay: 1s;
    }
    .bubble:nth-child(3n) {
      animation-name: bubbleOne;
      transform-origin: left center;
      animation-delay: 2s;
    }
    .bubble:nth-child(4n) {
      animation-name: bubbleFour;
      transform-origin: right center;
      animation-delay: 3s;
    }
    .bubble:nth-child(5n) {
      animation-name: bubbleOne;
      transform-origin: left center;
      animation-delay: 4s;
    }
    .bubble:nth-child(6n) {
      animation-name: bubbleFour;
      transform-origin: right center;
      animation-delay: 5s;
    }
    .bubble:nth-child(7n) {
      animation-name: bubbleOne;
      transform-origin: left center;
      animation-delay: 6s;
    }
    .bubble:nth-child(8n) {
      animation-name: bubbleFour;
      transform-origin: right center;
      animation-delay: 7s;
    }
    .bubble:nth-child(9n) {
      animation-name: bubbleOne;
      transform-origin: left center;
      animation-delay: 8s;
    }
    .bubble:nth-child(10n) {
      animation-name: bubbleFour;
      transform-origin: right center;
      animation-delay: 9s;
    }
    @keyframes bubbleOne {
      0% {
        transform: scale(1) translateX(0) translateY(2rem);
        opacity: 0;
      }
      10% {
        transform: scale(1) translateX(0) translateY(2rem);
        opacity: 1;
      }
      50% {
        transform: scale(0.5) translateY(0.5);
        opacity: 0.5;
      }
      100% {
        transform: scale(0) translateY(0);
        opacity: 0;
      }
    }
    @keyframes bubbleFour {
      0% {
        transform: scale(1) translateY(2rem);
        opacity: 0;
      }
      10% {
        transform: scale(1) translateX(0) translateY(2rem);
        opacity: 1;
      }
      50% {
        transform: scale(0) translateY(0.5);
        opacity: 0.5;
      }
      100% {
        transform: scale(0) translateY(0);
        opacity: 0;
      }
    }
  }
  .maskShow {
    height: 100vh !important;
    opacity: 1 !important;
    transition: all .25s;
    visibility: visible !important;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 0;
    background-image: url("https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/mask-bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0;
    transition: all .25s;
    visibility: hidden;
    z-index: 99999;

    .back {
      position: absolute;
      top: 30px;
      right: 30px;
      cursor: pointer;
      transition: all .25s;

      &:hover {
        transform: rotateZ(180deg);
      }
    }
    .mask-logo {
      display: block;
      margin: 100px auto;
      width: 440px;
    }
    .mask-wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      text-align: center;

      .mask-list-box {
        color: #333333;
        font-size: 20px;
        font-weight: bold;
        margin: 0 20px;

        .mask-list-child {
          color: #666666;
          font-weight: 500;
          font-size: 16px;
          margin-top: 30px;
          cursor: pointer;

          p {
            margin-top: 10px;
            &:hover {
              color: #15A98D;
            }
          }
        }
      }
    }
  }
}
</style>
