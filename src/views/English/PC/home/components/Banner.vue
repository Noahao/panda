<template>
  <div class="banner">
    <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/en/bg_1668567138099.png" alt="" />
    <div class="title wow fadeInUp" >
      <p>Welcome to Chengdu</p>
      <p>China Charm·Panda Cradle</p>
    </div>
    <div class="text wow fadeInUp">
      <p>The land of abundance, the hometown of pandas</p>
      <p>The natural paradise of national treasures, our paradise</p>
    </div>
    <!-- 图标 -->
    <div class="icon">
      <MyIcon name="xiala" color="#fff" size="70px" />
    </div>
    <!-- 右侧图标 -->
    <!-- <div class="logo">
      <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/en/LOGO标识.png" alt="" />
    </div> -->
    <!-- 轮播 -->
    <div class="shuffling">
      <div class="left">
        <div class="title">Panda Ambassador</div>
        <swiper class="my-swiper" data-wow-duration="2s" :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="item in bannerList" :key="item.id">
            <div class="box">
              <img :src="getUrl(item)" alt="" />
              <div class="shadow"></div>
              <div class="name">{{ item.title }}</div>
            </div>
          </swiper-slide>

          <template v-slot:pagination>
            <div v-show="bannerList.length" class="swiper-pagination" style="bottom: 0.16rem"></div>
          </template>
        </swiper>
      </div>
      <div class="right">
        <div class="line">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span>Booking</span>
        <MyIcon name="xiala2-copy" size="0.24rem" color="#fff" />
      </div>
    </div>
  </div>
</template>

<script>
import { getSimplifyList } from '@/service/apiList/common'
export default {
  name: 'HomeBanner',
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        loop: false,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        // 显示分页
        pagination: {
          el: '.swiper-pagination',
        },
      },
      bannerList: [],
    }
  },
  created() {
    this.getImg()
  },
  computed: {
    getUrl() {
      return (item) => {
        try {
          return item.imageUrls[0].url
        } catch (error) {
          return this.$Placeholder
        }
      }
    },
  },
  methods: {
    async getImg() {
      const res = await getSimplifyList({
        channelCode: 'xmds',
      })
      if (res.code === 0) {
        this.bannerList = res.datas
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  img {
    width: 100%;
    height: 100vh;
  }
  .title {
    position: absolute;
    top: 4.18rem;
    left: 1.77rem;
    font-weight: 700;
    font-size: 0.6rem;
    color: #fff;
    p {
      line-height: 1;
      &:last-child {
        margin-top: 0.3rem;
      }
    }
  }
  .text {
    position: absolute;
    top: 6.49rem;
    left: 1.77rem;
    font-size: 0.24rem;
    color: #fff;
    p {
      line-height: 1;
      &:last-child {
        margin-top: 0.15rem;
      }
    }
  }
  .icon {
    position: absolute;
    left: 1.77rem;
    bottom: 1rem;
    animation: test 1000ms infinite;
    -webkit-animation: test 1000ms infinite;
    @keyframes test {
      from {
        opacity: 1;
      }
      50% {
        opacity: 0.2;
      }
      to {
        opacity: 0.8;
      }
    }
  }
  .logo {
    position: absolute;
    right: 3.6rem;
    top: 2.39rem;
    img {
      width: 1.16rem;
      height: 1.16rem;
    }
  }
  .shuffling {
    position: absolute;
    bottom: 1rem;
    right: 1.19rem;
    display: flex;
    .left {
      position: relative;
      .title {
        font-weight: 700;
        font-size: 0.24rem;
        color: #fff;
        position: absolute;
        top: -0.4rem;
        left: 0;
      }
      .my-swiper {
        width: 3.8rem;
        height: 2.13rem;
        .box {
          width: 3.8rem;
          height: 2.13rem;
          // background: rgba(255, 255, 255, 0.4);
          position: relative;
          .shadow {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 3.8rem;
            height: 2.13rem;
            background: linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.4));
          }
          .name {
            line-height: 1;
            font-size: 0.24rem;
            color: #fff;
            position: absolute;
            z-index: 5;
            bottom: 0.23rem;
            left: 0.23rem;
          }
          img {
            width: 5rem;
            height: 2.8rem;
          }
        }
      }
    }
    .right {
      margin-left: 0.21rem;
      width: 2.13rem;
      height: 2.13rem;
      border: 0.01px solid #fff;
      font-size: 0.36rem;
      color: #fff;
      text-align: center;
      cursor: pointer;
      position: relative;
      span {
        display: block;
        font-weight: 700;
        // color: #fff;
        margin-top: 0.76rem;
      }
      &:hover {
        border: 0.01rem solid #fff;
        color: rgba(0, 0, 0, 0);
        // background: #15a98d;
        background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/index/qr-code.jpg') no-repeat;
        background-size: 100% 100%;
        .iconfont {
          opacity: 0;
        }
      }
      .line {
        width: 2.14rem;
        height: 2.14rem;
        position: absolute;
        top: -0.01rem;
        left: -0.01rem;
        div {
          position: absolute;
          &:nth-child(1) {
            bottom: 0;
            left: 0;
            width: 0.02rem;
            height: 0rem;
            background: #15a98d;
            animation: height 1.5s;
            animation-fill-mode: forwards;
            @keyframes height {
              from {
                height: 0;
              }
              to {
                height: 2.13rem;
              }
            }
          }
          &:nth-child(2) {
            top: 0;
            left: 0;
            width: 0;
            height: 0.02rem;
            background: #15a98d;
            animation: width 1.5s;
            animation-delay: 1.5s;
            animation-fill-mode: forwards;
            @keyframes width {
              from {
                width: 0rem;
              }
              to {
                width: 2.13rem;
              }
            }
          }
          &:nth-child(3) {
            top: 0;
            right: 0;
            width: 0.02rem;
            height: 0rem;
            background: #15a98d;
            background: #15a98d;
            animation: height 1.5s;
            animation-delay: 3s;
            animation-fill-mode: forwards;
            @keyframes height {
              from {
                height: 0rem;
              }
              to {
                height: 2.13rem;
              }
            }
          }
          &:nth-child(4) {
            bottom: 0;
            right: 0;
            width: 0rem;
            height: 0.02rem;
            background: #15a98d;
            animation: width 1.5s;
            animation-delay: 4.5s;
            animation-fill-mode: forwards;
            @keyframes width {
              from {
                width: 0rem;
              }
              to {
                width: 2.13rem;
              }
            }
          }
        }
      }
    }
  }
  .swiper-pagination {
    text-align: right;
    padding-right: 0.24rem;
    padding-bottom: 0.1rem;
  }
  ::v-deep .swiper-pagination-bullet-active {
    width: 0.1rem !important;
    height: 0.1rem !important;
    opacity: 1 !important;
    background: #fff !important;
  }
  ::v-deep .swiper-pagination-bullet {
    width: 0.06rem;
    height: 0.06rem;
    opacity: 0.5;
    margin-left: 0.06rem;
    background: #ffffff;
  }
}
</style>
