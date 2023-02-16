<template>
  <div class="section-four">
    <div class="title">便民服务</div>
    <div class="main">
      <div v-for="(item, index) in list" :key="index" class="list-box wow bounceInDown" :data-wow-delay="getDelay(index)" :class="{active: index === currentIndex}" @mouseenter="itemClick(item, index)" @click="jump(item)">
        <div class="img">
          <MyIcon :name="item.icon" size="42px" :style="{'color': index === currentIndex ? '#ffffff' : '#333333'}"/>
        </div>
        <div class="title">{{ item.title }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsList } from '@/service/apiList/common'
export default {
  name: 'sectionFour',
  inject: ['PCJumpDetails'],
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
  },
  data () {
    return {
      currentIndex: null,
      list: [
        {
          icon: 'jiangjiefuwu',
          hover: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/touristService/jjfw.png',
          title: '讲解服务',
          desc: '提供优质的讲解服务',
          channelCode: 'jjfw',
        },
        {
          icon: 'canyingouwu',
          hover: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/touristService/cygw-hover.png',
          title: '餐饮购物',
          desc: '参观之余把“熊猫”带回家',
          channelCode: 'cygw'
        },
        {
          icon: 'gonggongjiaotong',
          hover: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/touristService/ggjt.png',
          title: '公共交通',
          desc: '线路查询及交通线路工具',
          channelCode: 'ggjt'
        },
        {
          icon: 'youkexuzhi',
          hover: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/touristService/ykxz.png',
          title: '游客须知',
          desc: '无微不至的的贴心关怀',
          channelCode: 'ykxz'
        },
        {
          icon: 'shiwuzhaoling',
          hover: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/touristService/swzl.png',
          title: '失物招领',
          desc: '助人为乐的喜悦，失而复得的惊喜',
          channelCode: 'swzl',
          url: '/pc/generalList?channelCode=swzl&banner=ykfw'
        }
      ]
    }
  },
  methods: {
    itemClick (item, index) {
      if(this.currentIndex !== index) {
        this.currentIndex = index
      }
    },
    jump(item) {
      if(item.url) {
        this.$router.push(item.url)
      } else {
        getNewsList({
          channelCode: item.channelCode,
        }).then((res) => {
          if (res.code === 0 && res.datas) {
            try {
              this.PCJumpDetails(res.datas[0], 'ykfw')
            } catch (error) {
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
}
</script>

<style lang="scss" scoped>
.section-four {
  width: 100%;
  padding: 80px 0 80px;
  background: #ffffff;

  .title {
    font-weight: Bold;
    font-size: 40px;
    color: #333333;
    text-align: center;
    margin-bottom: 60px;
  }

  .main {
    max-width: 1660px;
    min-width: 1360px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    overflow: hidden;

    .list-box {
      cursor: pointer;
      width: 18%;
      max-width: 288px;
      min-width: 255px;
      height: 200px;
      background: #F5F5F5;
      text-align: center;

      .img {
        margin: 40px auto 0;
      }
      .title {
        font-weight: Bold;
        font-size: 24px;
        color: #333333;
        margin: 21px 0 15px;
      }
      .desc {
        font-weight: 500;
        color: #666666;
        font-size: 16px;
      }
    }
    .active {
      background: #15A98D;

      .title, .desc {
        color: #ffffff;
      }
    }
  }
}
</style>
