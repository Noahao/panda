<template>
  <div class="convenience">
    <div class="title">便民服务</div>
    <div class="list">
      <div class="item" @click="jump(item.channelCode)" v-for="item in list" :key="item.id">
        <MyIcon :name="item.icon" color="#333333" size="0.46rem" />
        <div class="title">{{ item.name }}</div>
        <div class="text">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsList } from '@/service/apiList/common'
export default {
  name: 'ConvenIence',
  inject: ['jumpDetails'],
  data() {
    return {
      list: [
        {
          icon: 'jiangjiefuwu',
          name: '讲解服务',
          text: '提供优质的讲解服务',
          channelCode: 'jjfw',
        },
        {
          icon: 'canyingouwu',
          name: '餐饮购物',
          text: '参观之余把“熊猫”带回家',
          channelCode: 'cygw',
        },
        {
          icon: 'gonggongjiaotong',
          name: '公共交通',
          text: '线路查询及交通线路工具',
          channelCode: 'ggjt',
        },
        {
          icon: 'youkexuzhi',
          name: '游客须知',
          text: '无微不至的的贴心关怀',
          channelCode: 'ykxz',
        },
        {
          icon: 'shiwuzhaoling',
          name: '失物招领',
          text: '助人为乐的喜悦，失而复得的惊喜',
          channelCode: 'swzl',
        },
      ],
    }
  },
  methods: {
    jump(text) {
      if(text === 'swzl') {
        this.$router.push('/h5/generalList?channelCode=swzl&banner=ykfw')
        return
      }
      getNewsList({
        channelCode: text,
      }).then((res) => {
        if (res.code === 0) {
          try {
            this.jumpDetails(res.datas[0], 'ykfw')
          } catch (error) {
            return ''
          }
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.convenience {
  height: 10.33rem;
  text-align: center;
  > .title {
    font-weight: Bold;
    font-size: 0.46rem;
    padding: 0.79rem 0 0.5rem;
  }
  .list {
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      width: 3.35rem;
      height: 2.4rem;
      background: rgba(245, 245, 245, 1);
      padding: 0.45rem 0;
      margin-bottom: 0.2rem;
      &:last-child {
        width: 100%;
      }
      .title {
        font-weight: Bold;
        line-height: 1;
        padding: 0.3rem 0 0.2rem;
        font-size: 0.26rem;
        color: #333333;
      }
      .text {
        line-height: 1;
        font-size: 0.24rem;
        color: #666666;
      }
    }
  }
}
</style>
