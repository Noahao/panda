<template>
  <div class="section-one">
    <div class="title">玩转熊猫谷</div>
    <div class="main">
      <div class="classify">
        <div v-for="(item, index) in classifyList" :key="index" class="list-box wow bounceInDown" :data-wow-delay="getDelay(index)">
          <div class="num">{{ item.num }}</div>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
      <div class="main-desc">
        <div class="summary" v-if="details.summary" v-html="getText(details.summary)"></div>
        <span class="more" @click="jump('wzxmg')"> [ 查看更多 ] </span>
      </div>
      <div class="list-wrap">
        <div v-for="(item, index) in list" :key="index" class="list-box wow bounceInUp" :data-wow-delay="getDelay(index)">
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.desc }}</div>
          <div class="btn" @click="jump(item.jump)">
            <span v-if="item.status == 0">立即预订</span>
            <span v-if="item.status == 1">立即查看</span>
          </div>
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
      classifyList: [
        {
          name: '兽类',
          num: 21
        },
        {
          name: '鸟类',
          num: 131
        },
        {
          name: '植物',
          num: 515
        },
      ],
      details: {},
      list: [
        {
          title: '购票及预约',
          desc: '全面实现智慧化景区，提前购买门票或预约服务',
          status: 0,
          jump: 'gpjyy'
        },
        {
          title: '熊猫谷相册',
          desc: '发现多彩世界，开启行摄之旅',
          status: 1,
          jump: 'xmgxc'
        },
        {
          title: '地图导览',
          desc: '手绘地图别样精彩，带你一分钟了解游览攻略',
          status: 1,
          jump: 'dtdl'
        },
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
    this.getChannelDetail()
  },
  methods: {
    async getChannelDetail() {
      const res = await getChannelDetail({ channelCode: 'wzxmg' })
      if (res.code === 0) {
        this.details = res.data
      }
    },
    jump(text) {
      if(text === 'xmgxc') {
        this.$router.push('/pc/generalList?channelCode=xmgxc&banner=xmg')
        return
      }
      getNewsList({ channelCode: text }).then((res) => {
        if(res.code === 0 && res.datas) {
          try {
            this.PCJumpDetails(res.datas[0], 'xmg')
          } catch {
            this.$message({
              message: '敬请期待',
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: '敬请期待',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.section-one {
  width: 100%;
  padding: 80px 0;
  height: 760px;
  background: url("https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/pandaValley/img01.jpg") no-repeat;
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
      margin: 58px 0 38px;

      .list-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 90px;
        .num {
          color: #15A98D;
          font-weight: Bold;
          font-size: 60px;
        }
        .name {
          color: #666666;
          font-size: 16px;
        }
      }
    }

    .main-desc {
      color: #333333;
      font-size: 20px;
      text-align: center;
      margin-bottom: 58px;
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
      .more {
        display: inline-block;
        cursor: pointer;
      }
    }

    .list-wrap {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .list-box {
        width: 30%;
        max-width: 480px;
        min-width: 420px;
        height: 200px;
        cursor: pointer;
        padding: 40px 51px 30px;
        background: rgba(255, 255, 255, 0.7);
        overflow: hidden;

        .title {
          color: #333333;
          font-size: 24px;
          font-weight: bold;
          @include ellipsisLn(1);
        }
        .desc {
          color: #666666;
          text-align: center;
          font-size: 18px;
          margin: 17px 0 29px;
          @include ellipsisLn(1);
        }
        .btn {
          width: 120px;
          height: 36px;
          border-radius: 18px;
          border: 1px solid #B7B7B7;
          text-align: center;
          line-height: 36px;
          margin: auto;
          color: #666666;
          transition: all .25s;

          &:hover {
            border-color: #15A98D;
            background: #15A98D;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
