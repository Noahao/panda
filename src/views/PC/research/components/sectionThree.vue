<template>
  <div class="section-three">
    <div class="title">学术交流</div>
    <!--<el-row type="flex" :justify="list.length ==3 ? 'space-between' : ''" class="main">
      <el-col :span="6" v-for="(item, index) in list" :key="index" class="list-box wow bounceInUp" :data-wow-delay="getDelay(index)" >
        <div @click="PCJumpDetails(item,'kybh')">
          <div class="img-box">
            <div class="img" :style="{ background: `url(${getUrl(item)}) center top no-repeat`, 'background-size': 'cover' }"></div>
          </div>
          <div class="text">
            <p class="title">{{ item.title }}</p>
            <p class="desc">{{ item.summary }}</p>
            <p class="time">{{ item.publishTime }}</p>
          </div>
        </div>
      </el-col>
    </el-row>-->
    <div class="desc" v-if="details.summary" v-html="getText(details.summary)"></div>
    <div class="img">
      <img :src="details.backgroundImg || $Placeholder" alt="" />
    </div>
    <div class="btn" @click="jump">查看更多</div>
  </div>
</template>

<script>
import { getChannelDetail, getNewsList } from '@/service/apiList/common'
export default {
  name: 'sectionThree',
  inject: ['PCJumpDetails'],
  data() {
    return {
      list: [],
      detailItem: '',
      details: ''
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
    getUrl() {
      return (list) => {
        try {
          return list.imageUrls[0].url
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
    }
  },
  mounted () {
    this.getChannelDetail()
  },
  methods: {
    /*async getNewsList() {
      const res = await getNewsList({
        channelCode: 'xsjl',
        pageSize: 3,
        currPage: 1,
      })
      if (res.code === 0) {
        this.list = res.datas
        console.log(this.list);
      }
    },*/
    // 爱心支持
    async getChannelDetail() {
      const res = await getChannelDetail({
        channelCode: 'xsjl',
      })
      if (res.code === 0) {
        this.details = res.data
      }
    },
    jump() {
      getNewsList({ channelCode: 'xsjl' }).then((res) => {
        if (res.code === 0) {
          try {
            this.PCJumpDetails(res.datas[0], 'kybh')
          } catch (error) {
            return ''
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.section-three {
  width: 100%;
  padding: 80px 0 80px;
  background: #ffffff;

  .title {
    font-weight: Bold;
    font-size: 40px;
    color: #333333;
    text-align: center;
    margin-bottom: 50px;
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
  .img {
    text-align: center;

    img {
      width: 1160px;
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
  .main {
    max-width: 1660px;
    min-width: 1360px;
    margin: auto !important;

    .list-box {
      width: 32%;
      max-width: 520px;
      min-width: 420px;
      height: 530px;
      cursor: pointer;

      &:nth-child(2) {
        margin: 0 60px;
      }
      &:hover {
        .text {
          .title {
            color: #15A98D;
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
          margin: 0;
        }
        .desc {
          color: #666666;
          font-size: 16px;
          margin: 21px 0 30px;
          height: 46px;
          line-height: 25px;
          @include ellipsisLn(2);
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
