<template>
  <div class="section-three">
    <div class="title">组织机构</div>
    <div class="main">
      <div class="main-desc">{{ desc }}</div>

      <div class="list-wrap">
        <div v-for="(item, index) in list" :key="index" :style="{'background': colorList[index]}" @click="jump"
             class="list-box wow" :data-wow-delay="getDelay(index)" :class="index < 3 ? 'bounceInLeft' : 'bounceInRight'">
          <div class="name">{{ item.name }}</div>
          <div class="desc">{{ item.summary }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getChannelSubset, getNewsList } from '@/service/apiList/common'
export default {
  name: 'sectionOne',
  inject: ['PCJumpDetails'],
  data () {
    return {
      desc: '成都市公园城市建设管理局管理的副局级公益二类事业单位。设主任1名（副局级）、专职副书记1名（正处级）、副主任4名（正处级）\n' +
        '成都大熊猫繁育研究基地内设机构6个，分别为：',
      list: [],
      colorList: [
        'rgba(241,89,41,0.8)',
        'rgba(31,174,147,0.8)',
        'rgba(80,26,116,0.8)',
        'rgba(0,174,239,0.8)',
        'rgba(251,176,63,0.8)',
        'rgba(46,152,83,0.8)'
      ]
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
    }
  },
  mounted() {
    this.getNewsList()
  },
  methods: {
    jump() {
      getNewsList({
        channelCode: 'zzjg',
      }).then((res) => {
        try {
          this.PCJumpDetails(res.datas[0], 'gywm')
        } catch (error) {
          return ''
        }
      })
    },
    async getNewsList() {
      const res = await getChannelSubset({ channelCode: 'zzjg' })
      if (res.code === 0) {
        this.list = res.data.subset
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
  }

  .main {
    max-width: 1660px;
    min-width: 1360px;
    margin: auto;

    .main-desc {
      white-space: pre-wrap;
      margin: 39px 0 59px;
      font-size: 20px;
      text-align: center;
      color: #666666;
      line-height: 32px;
    }

    .list-wrap {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .list-box {
        width: 32%;
        max-width: 520px;
        min-width: 420px;
        margin-bottom: 20px;
        height: 190px;
        padding: 50px 38px 0 50px;
        color: #ffffff;
        border-radius: 95px;
        cursor: pointer;

        .name {
          font-weight: bold;
          font-size: 20px;
          margin-bottom: 20px;
        }
        .desc {
          font-size: 16px;
          line-height: 30px;
          @include ellipsisLn(2);
        }
      }
    }
  }
}
</style>
