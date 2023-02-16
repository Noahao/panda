<template>
  <div class="section-three">
    <div class="title" @click="$router.push('/pc/baseDynamic/list?channelCode=jdhd')">焦点活动</div>
    <div class="main">
      <div v-for="(item, index) in list" :key="index"  @click="PCJumpDetails(item, 'jddt')" :data-wow-delay="getDelay(index)" class="list-box wow bounceInUp">
        <div class="img-box">
          <div class="img" :style="{'background': `url(${ getUrl(item) }) center top no-repeat`, 'background-size': 'cover'}"></div>
        </div>
        <div class="text">
          <p class="title">{{item.title}}</p>
          <p class="desc">{{getDesc(item.summary)}}</p>
          <p class="time">{{item.publishTime}}</p>
        </div>
      </div>
      <div class="more-btn-one" @click="$router.push('/pc/baseDynamic/list?channelCode=jdhd')">
        更多
        <MyIcon :name="'shuangjiantou'" size="10px"/>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsList } from '@/service/apiList/common'
export default {
  name: 'sectionThree',
  inject: ['PCJumpDetails'],
  data () {
    return {
      list: []
    }
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
    getDelay() {
      return (index) => {
        try {
          return `${index / 10}s`
        } catch (error) {
          return '0.1s'
        }
      }
    },
    getDesc() {
      return (desc) => {
        let reg = /\s+/g
        let trimStr = desc.replace(reg,'')
        return trimStr
      }
    }
  },
  mounted() {
    this.getNewsList()
  },
  methods: {
    async getNewsList() {
      const res = await getNewsList({
        channelCode: 'jdhd',
        pageSize: 3,
        currPage: 1,
      })
      if (res.code === 0) {
        this.list = res.datas
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section-three {
  width: 100%;
  padding: 80px 0;
  background: #ffffff;
  text-align: center;

  .title {
    display: inline-block;
    font-weight: Bold;
    font-size: 40px;
    color: #333333;
    text-align: center;
    margin-bottom: 50px;
    cursor: pointer;
  }

  .main {
    max-width: 1660px;
    min-width: 1360px;
    margin: auto;
    display: flex;
    justify-content: space-between;

    .list-box {
      width: 33%;
      max-width: 520px;
      min-width: 420px;
      cursor: pointer;
      text-align: left;

      &:hover {
        .text {
          .title {
            color: #15a98d;
          }
        }
        .img {
          transform: scale(1.2);
        }
      }

      .img-box {
        width: 100%;
        height: 300px;
        overflow: hidden;

        .img {
          width: 100%;
          height: 100%;
          transition: all .25s linear;
        }
      }
      .text {
        padding: 40px 40px 30px 30px;
        background: #F5F5F5;
        overflow: hidden;

        .title {
          color: #333333;
          font-size: 20px;
          font-weight: bold;
          text-align: left;
          @include ellipsisLn(1);
          transition: all .25s linear;
          margin-bottom: 0;
        }
        .desc {
          color: #666666;
          font-size: 16px;
          margin: 19px 0 20px;
          height: 47px;
          line-height: 26px;
          @include ellipsisLn(2);
          text-indent: 2em;
        }
        .time {
          color: #999999;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
