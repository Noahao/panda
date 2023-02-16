<template>
  <div class="section-four">
    <div class="main">
      <div class="left">
        <div class="title" @click="$router.push('/pc/generalList?channelCode=xmhd&banner=xmwh')">熊猫活动</div>
        <div class="desc">大型活动、名人明星来访，发现精彩城市生活。</div>
        <div class="left-list-wrap" v-if="list.length > 1">
          <div v-for="(item, index) in list.slice(1, 4)" :key="index" class="left-list-box wow bounceInLeft" :class="{active: index === currentIndex}" @click="PCJumpDetails(item, 'xmwh')" @mouseenter="itemEnter(item, index)" @mouseleave="itemLeave">
            <div class="title">{{ item.title }}</div>
            <div class="desc">{{ getDesc(item.summary) }}</div>
            <div class="time">
              <span v-if="index !== currentIndex">{{ item.publishTime }}</span>
              <img v-else src="https://file.daqsoft.com/uploadfile/server/geekui/panda/pandaCulture/right-btn.png" alt="" />
            </div>
          </div>
        </div>
        <div v-else class="left-list-wrap no-data">
          <img src="https://file.daqsoft.com/uploadfile/server/geekui/panad/01065f5c-b833-4a97-ad2b-404a2e506fc0.gif" alt="" />
        </div>
      </div>
      <div class="right wow bounceInRight" v-if="list.length">
        <div class="right-main" @click="PCJumpDetails(list[0], 'xmwh')">
          <div class="img" :style="{'background': `url(${ getUrl(list[0]) }) center center no-repeat`, 'background-size': 'cover'}"></div>
          <div class="right-text">
            <div class="title">{{ list[0].title }}</div>
            <div class="desc">{{ getDesc(list[0].summary) }}</div>
            <div class="time">{{ list[0].publishTime }}</div>
          </div>
        </div>
        <div class="more" @click="$router.push('/pc/generalList?channelCode=xmhd&banner=xmwh')">查看更多</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsList } from '@/service/apiList/common'
export default {
  name: 'sectionFour',
  inject: ['PCJumpDetails'],
  data () {
    return {
      list: [],
      currentIndex: 1,
      rightBg: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/pandaCulture/img11.jpg'
    }
  },
  computed: {
    getUrl() {
      return (list) => {
        try {
          return list.imageUrls[0].url
        } catch (error) {
          return this.$Placeholder
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
    itemEnter (item, index) {
      if(this.currentIndex !== index) {
        this.currentIndex = index
      }
    },
    itemLeave () {
      this.currentIndex = null
    },
    async getNewsList() {
      const res = await getNewsList({
        channelCode: 'xmhd',
        pageSize: 4,
        currPage: 1,
      })
      if (res.code === 0) {
        if (res.datas.length) {
          this.list = res.datas
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section-four {
  width: 100%;
  padding: 80px 0;
  background: #ffffff;

  .main {
    max-width: 1660px;
    min-width: 1360px;
    height: 605px;
    margin: auto;
    display: flex;
    justify-content: space-between;

    .left {
      width: 66%;
      max-width: calc(100% - 540px);
      min-width: calc(100% - 540px);
      overflow: hidden;

      .title {
        font-weight: Bold;
        color: #333333;
        font-size: 40px;
        cursor: pointer;
        display: inline-block;
      }
      .desc {
        font-weight: 500;
        color: #333333;
        font-size: 16px;
        margin: 38px 0 73px;
      }

      .left-list-wrap {

        .left-list-box {
          width: 100%;
          height: 140px;
          padding: 40px 0 0 30px;
          background: #F5F5F5;
          position: relative;
          cursor: pointer;

          .title {
            color: #333333;
            font-weight: bold;
            font-size: 20px;
            @include ellipsisLn(1);
            width: 80%;
            margin-bottom: 22px;
          }
          .desc {
            font-size: 16px;
            color: #666666;
            @include ellipsisLn(1);
            width: 80%;
            margin: 0;
            text-indent: 2em;
          }
          .time {
            position: absolute;
            right: 60px;
            top: 60px;
            color: #999999;
          }

          &:nth-child(2) {
            margin: 1px 0;
          }
        }
        .active {
          background: #15A98D;
          transition: all .25s;

          .title, .desc, .time {
            color: #ffffff;
            transition: all .25s;
          }
        }
      }

      .no-data {
        width: 400px;
        text-align: left;
        img {
          width: 100%;
        }
      }
    }
    .right {
      width: 33%;
      max-width: 480px;
      min-width: 420px;
      height: 100%;
      cursor: pointer;

      .right-main {
        height: calc(100% - 80px);

        &:hover {
          .right-text {
            .title {
              color: #15A98D;
            }
          }
        }
        .img {
          width: 100%;
          height: 300px;
        }
        .right-text {
          width: 100%;
          height: 225px;
          padding: 39px 27px 0 29px;
          background: #F5F5F5;

          .title {
            font-weight: Bold;
            color: #333333;
            font-size: 20px;
            transition: all .25s;
          }
          .desc {
            font-size: 16px;
            width: 100%;
            height: 46px;
            color: #666666;
            @include ellipsisLn(2);
            margin: 22px 0 39px;
            line-height: 25px;
            text-indent: 2em;
          }
          .time {
            font-size: 14px;
            color: #999999;
          }
        }
      }
      .more {
        height: 80px;
        width: 100%;
        line-height: 80px;
        text-align: center;
        background: #E6E6E6;
        color: #666666;
        font-weight: Bold;
        font-size: 16px;
        transition: all .25s;

        &:hover {
          color: #ffffff;
          background: #15A98D;
        }
      }
    }
  }
}
</style>
