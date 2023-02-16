<template>
  <div class="section-one">
    <div class="title">国内合作</div>
    <el-row type="flex" :justify="list.length == 3 ? 'space-between' : ''" class="main">
      <el-col :span="6" v-for="(item, index) in list" :key="index" class="list-box wow bounceInUp" :data-wow-delay="getDelay(index)">
        <div @click="PCJumpDetails(item,'kybh')">
          <div class="img-box">
            <div class="img" :style="{ background: `url(${ getUrl(item) }) center top no-repeat`, 'background-size': 'cover' }"></div>
          </div>
          <div class="text">
            <p class="title">{{ item.title }}</p>
            <p class="desc">{{ item.summary }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getNewsList } from '@/service/apiList/common'
export default {
  name: 'sectionOne',
  inject: ['PCJumpDetails'],
  data () {
    return {
      list: []
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
  mounted() {
    this.getNewsList()
  },
  methods: {
    async getNewsList() {
      const res = await getNewsList({
        channelCode: 'gnhz',
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
.section-one {
  width: 100%;
  padding: 80px 0;
  background: #ffffff;

  .title {
    font-weight: Bold;
    font-size: 40px;
    color: #333333;
    text-align: center;
    margin-bottom: 50px;
  }

  .main {
    max-width: 1660px;
    min-width: 1360px;
    margin: auto;

    .list-box {
      width: 32%;
      max-width: 520px;
      min-width: 420px;
      cursor: pointer;

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
      &:nth-child(2) {
        margin: 0 60px;
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
        padding: 40px 40px 40px 30px;
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
          margin: 19px 0 0;
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
