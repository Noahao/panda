<template>
  <div class="section-three">
    <div class="title">职工之家</div>
    <div class="main">
      <div v-for="(item, index) in list" :key="index" @click="PCJumpDetails(item, 'djgz')" class="list-box wow bounceInUp" :data-wow-delay="getDelay(index)">
        <p class="title">{{ item.title }}</p>
        <p class="desc">{{ getDesc(item.summary) }}</p>
        <p class="time">{{ item.publishTime }}</p>
      </div>
      <div class="more-btn-one" @click="$router.push('/pc/generalList?channelCode=zgzj&banner=djgz')">
        更多
        <MyIcon :name="'shuangjiantou'" size="10px"/>
      </div>
    </div>
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
    this.getHome()
  },
  methods: {
    // 职工之家
    async getHome() {
      const res = await getNewsList({
        channelCode: 'zgzj',
        pageSize: 4,
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
    display: flex;
    justify-content: space-between;

    .list-box {
      width: 33%;
      max-width: 520px;
      min-width: 420px;
      height: 230px;
      cursor: pointer;
      padding: 40px 40px 30px 30px;
      background: #F5F5F5;
      overflow: hidden;

      &:hover {
        .title {
          color: #15A98D;
        }
      }
      .title {
        color: #333333;
        font-size: 20px;
        font-weight: bold;
        text-align: left;
        @include ellipsisLn(1);
        transition: all .25s;
        margin-bottom: 0;
      }
      .desc {
        color: #666666;
        font-size: 16px;
        margin: 31px 0 33px;
        line-height: 25px;
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
</style>
