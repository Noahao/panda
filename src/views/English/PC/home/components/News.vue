<template>
  <div class="news">
    <!-- ul -->
    <ul class="top wow fadeInUp" data-wow-iteration="1" data-wow-duration="2s">
      <li @click="$router.push(item.url1)" v-for="item in tab" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
    <div class="title wow fadeInUp" data-wow-iteration="0.5" data-wow-duration="2s">News&Events</div>
    <div class="content">
      <div class="tourist" @click="$router.push('/pc/list?channelCode=NewsCenter&tab=News1')">
        <MyIcon name="zuo" size="0.7rem" color="#fff" />
        <p>News center</p>
      </div>
      <ul class="right">
        <li @click="jumpDetails(item)" v-for="item in list" :key="item.id">
          <div class="title">{{ item.title }}</div>
          <div class="text">{{ item.summary }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getChannelSubset, getSimplifyList } from '@/service/apiList/common'
export default {
  name: 'NewsHome',
  data() {
    return {
      tab: [],
      list: [],
    }
  },
  created() {
    this.getSubset()
    this.getList()
  },
  methods: {
    async getSubset() {
      const res = await getChannelSubset({
        channelCode: 'PandaWorld',
      })
      if (res.code === 0) {
        this.tab = res.data.subset.filter((item) => {
          return item.channelCode !== 'Activities'
        })
      }
    },
    async getList() {
      const res = await getSimplifyList({
        channelCode: 'News1',
        pageSize: 3,
        currPage: 1,
      })
      if (res.code === 0) {
        this.list = res.datas
      }
    },

    // Ìø×ªÏêÇé
    jumpDetails(item) {
      this.$router.push({
        path: '/pc/details',
        query: {
          channelCode: 'NewsCenter',
          id: item.id,
          tab:'News1'
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.news {
  background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/en/bg111_1668567331962.png') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 16rem;
  padding-top: 1.99rem;
  .top {
    width: 9rem;
    display: flex;
    flex-wrap: wrap;
    margin: 0 0 1.55rem 9.5rem;
    li {
      font-weight: 400;
      font-size: 0.24rem;
      color: #fff;
      width: 3rem;
      position: relative;
      line-height: 1;
      padding-left: 0.2rem;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
      &::after {
        content: '';
        width: 0.06rem;
        height: 0.06rem;
        background: rgba(255, 255, 255, 1);
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      &:nth-child(n + 4) {
        margin-top: 0.96rem;
      }
    }
  }
  > .title {
    font-weight: 700;
    font-size: 1.4rem;
    color: #fff;
    line-height: 1;
    margin-left: 1.77rem;
  }
  .content {
    margin-left: 1.77rem;
    margin-top: 1.79rem;
    display: flex;
    align-items: center;
    .tourist {
      display: flex;
      align-items: center;
      cursor: pointer;
      p {
        font-size: 0.24rem;
        color: #fff;
        margin-left: 0.3rem;
      }
      &:hover {
        p {
          text-decoration: underline;
        }
      }
    }
    .right {
      margin-left: 5.39rem;
      li {
        cursor: pointer;
        width: 7.75rem;
        margin-bottom: 0.59rem;
        position: relative;
        padding-left: 0.2rem;
        &:last-child {
          margin: 0;
        }
        &:hover {
          .title {
            text-decoration: underline;
          }
        }
        &::after {
          content: '';
          width: 0.06rem;
          height: 0.06rem;
          background: rgba(255, 255, 255, 1);
          position: absolute;
          left: 0;
          top: 0.1rem;
        }
        .title {
          font-size: 0.24rem;
          color: #fff;
          @include ellipsis();
        }
        .text {
          font-size: 0.14rem;
          margin-top: 0.16rem;
          color: #ffffff;
          @include ellipsis();
        }
      }
    }
  }
}
</style>
