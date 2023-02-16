<template>
  <div class="section-one">
    <div class="title">基地简介</div>
    <div class="main">
      <div class="classify">
        <div class="list-box wow bounceInUp" v-for="(item, index) in classifyList" :key="index">
          <div class="num-box">
            <span class="num">{{ item.num }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
      <div class="desc" v-if="details.summary" v-html="getText(details.summary)"></div>
      <div class="swiper-wrap" v-if="list.length">
        <swiper :options="linkSwiperOptions">
          <swiper-slide v-for="(item, index) in list" :key="index">
            <div class="box">
              <div class="img-box">
                <img class="cloud-img" :src="item.url || $Placeholder"/>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="swiper-button btn-left">
          <MyIcon :name="'xianxingzuojiantou'" size="60px"/>
        </div>
        <div class="swiper-button btn-right">
          <MyIcon :name="'xianxingyoujiantou'" size="60px"/>
        </div>
      </div>
      <div class="btn" @click="PCJumpDetails(moreObj, 'gywm')">查看更多</div>
    </div>
  </div>
</template>

<script>
import { getChannelDetail, getNewsList } from '@/service/apiList/common'
export default {
  name: 'sectionOne',
  inject: ['PCJumpDetails'],
  data () {
    return {
      classifyList: [
        {
          name: '基地成立',
          unit: '年',
          num: 1987
        },
        {
          name: '占地面积',
          unit: '亩',
          num: 3570
        },
        {
          name: '大熊猫种群数量',
          unit: '只',
          num: 215
        },
      ],
      moreObj: {},
      details: {},
      linkSwiperOptions: {
        effect: 'coverflow',
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        navigation: {
          prevEl: '.btn-left',
          nextEl: '.btn-right',
        },
        coverflowEffect: {
          rotate: 30,
          stretch: 100,
          depth: 280,
          modifier: 1,
          slideShadows: false
        },
      },
      list: [

      ]
    }
  },
  computed: {
    getText() {
      return (text) => {
        if (text && text.length > 69) {
          return `<span>${text.substring(0, 69)}</span><span>${text.substring(69, text.length)}</span>`
        }
        return `<span>${text}</span>`
      }
    },
  },
  mounted() {
    this.getChannelDetail()
    this.getNewsList()
  },
  methods: {
    async getChannelDetail() {
      const { code, data } = await getChannelDetail({ channelCode: 'jdjj' })
      if (code === 0) {
        this.details = data
      }
    },
    async getNewsList() {
      const res = await getNewsList({ channelCode: 'jdjj' })
      if (res.code === 0) {
        try {
          this.list = res.datas[0].imageUrls
          this.moreObj = res.datas[0]
        } catch (error) {
          this.list = []
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section-one {
  width: 100%;
  padding: 80px 0;
  min-height: 850px;
  max-height: 1250px;
  background: url("https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/about/img03.jpg") no-repeat;
  background-size: cover;

  .title {
    font-weight: Bold;
    font-size: 40px;
    color: #333333;
    text-align: center;
  }

  .main {
    max-width: 1660px;
    min-width: 1360px;
    margin: auto;

    .classify {
      display: flex;
      justify-content: center;
      margin: 50px 0 49px;

      .list-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 90px;
        .num-box {
          color: #15A98D;
          .num {
            font-weight: Bold;
            font-size: 60px;
          }
          .unit {
            font-size: 16px;
            position: relative;
            bottom: 2px;
          }
        }
        .name {
          color: #666666;
          font-size: 16px;
        }
      }
    }

    .desc {
      color: #333333;
      font-size: 20px;
      text-align: center;
      margin-bottom: 49px;
      line-height: 32px;

      ::v-deep span {
        text-align: center;
        display: block;
        &:nth-child(2) {
          width: 50%;
          @include ellipsis(50%);
          margin: auto;
        }
      }
    }

    .swiper-wrap {
      width: 60%;
      min-width: 1020px;
      max-width: 1200px;
      margin: auto;
      position: relative;

      .swiper-slide {
        width: 390px;
      }

      .box {
        width: 390px;

        img {
          width: 100%;
        }
      }
      .swiper-button {
        position: absolute;
        top: 50%;
        cursor: pointer;
        transform: translateY(-50%);
        color: #d8d8d8;

        &:hover {
          color: #15A98D;
        }
      }
      .btn-left {
        left: -100px;
      }
      .btn-right {
        right: -100px;
      }
    }

    .btn {
      width: 180px;
      height: 50px;
      margin: 50px auto 0;
      text-align: center;
      color: #666666;
      line-height: 50px;
      font-size: 20px;
      background: #e6e6e6;
      cursor: pointer;
      transition: all .25s;

      &:hover {
        background: #15A98D;
        color: #ffffff;
      }
    }
  }
}
</style>
