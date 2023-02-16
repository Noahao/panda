<template>
  <div class="section-one">
    <div class="title">爱心支持</div>
    <div class="main">
      <div class="desc" v-if="details.summary" v-html="getText(details.summary)"></div>
      <div class="btn-box">
        <div class="btn" v-for="(item, index) in tabList" :key="index" @click="jump(item, 'axzc')">
          <span>{{ item.title }}</span>
        </div>
      </div>
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
      details: {},
      tabList: [
        {
          title: '捐助我们',
          channelCode: 'jzwm',
        },
        {
          title: '爱心名录',
          channelCode: 'axml',
        },
      ]
    }
  },
  computed: {
    getText() {
      return (text) => {
        if (text && text.length > 69) {
          return `<span>${text.substring(0, 69)}</span><span>${text.substring(69, text.length)}</span> `
        }
        return `<span>${text}</span>`
      }
    },
  },
  mounted() {
    this.getChannelDetail()
  },
  methods: {
    // 爱心支持
    async getChannelDetail() {
      const res = await getChannelDetail({
        channelCode: 'axzc1',
      })
      if (res.code === 0) {
        this.details = res.data
      }
    },
    // 爱心名录
    async getTabList() {
      const res = await getNewsList({
        channelCode: 'axzc1',
        pageSize: 2,
        currPage: 1,
      })
      if (res.code === 0) {
        this.tabList = res.datas
      }
    },
    jump(item) {
      getNewsList({
        channelCode: item.channelCode,
      }).then((res) => {
        try {
          this.PCJumpDetails(res.datas[0], 'axzc')
        } catch (error) {
          return ''
        }
      })
    },
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
  }

  .main {
    max-width: 1660px;
    min-width: 1360px;
    margin: auto;

    .desc {
      color: #666666;
      font-size: 20px;
      text-align: center;
      margin: 40px 0;

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
    .btn-box {
      display: flex;
      justify-content: center;

      .btn {
        width: 180px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #ffffff;
        margin: 0 15px;
        font-size: 20px;
        cursor: pointer;

        &:first-child {
          background: #15A98D;
        }
        &:last-child {
          background: #FBB03F;
        }
        span {
          padding-bottom: 3px;
          border: 0;
        }
        &:hover {
          span {
            border-bottom: 1px solid #ffffff;
          }
        }
      }
    }
  }
}
</style>
