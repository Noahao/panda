<template>
  <div class="section-one">
    <div class="title">国内合作</div>
    <div class="main">
      <div class="left">
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/cooperation/map1.png" alt=""/>
      </div>
      <div class="right">
        <div v-for="(item, index) in list" :key="index" class="list-box">
          <p class="name">{{ item.name }}</p>
          <p class="time">{{ item.time }}</p>
        </div>
      </div>
    </div>
    <div class="more" @click="jump">查看更多</div>
  </div>
</template>

<script>
import { getNewsList } from '@/service/apiList/common'
export default {
  name: 'sectionOne.vue',
  inject: ['PCJumpDetails'],
  data() {
    return {
      list: [
        {
          name: '西宁野生动物园',
          time: '2019年6月'
        },
        {
          name: '黔灵山公园管理处',
          time: '2018年4月'
        },
        {
          name: '济南野生动物世界有限公司',
          time: '2017年10月'
        },
        {
          name: '云南野生动物园有限公司',
          time: '2016年4月'
        },
        {
          name: '鄂尔多斯野生动物园',
          time: '2016年9月'
        }
      ]
    }
  },
  methods: {
    // 跳转
    jump() {
      getNewsList({
        channelCode: 'gnhz',
      }).then((res) => {
        try {
          this.PCJumpDetails(res.datas[0], 'dwhz')
        } catch (error) {
          this.$message.error(error)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.section-one {
  width: 100%;
  height: 1040px;
  background-image: url("https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/cooperation/img10.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center bottom;
  position: relative;

  .title {
    font-weight: Bold;
    text-align: center;
    font-size: 40px;
    color: #333333;
    margin: 79px 0 69px;
  }
  .main {
    overflow: hidden;
    display: flex;
  }
  .left, .right {
    width: 50%;
  }
  .left {
    text-align: right;
  }
  .right {
    padding-left: 120px;
    padding-top: 60px;
    .list-box {
      position: relative;
      margin-bottom: 20px;
      padding-left: 20px;

      .name {
        color: #333333;
        font-size: 24px;
        margin-bottom: 8px;
      }
      .time {
        color: #999999;
        font-size: 18px;
      }

      &::before {
        content: '';
        width: 8px;
        height: 8px;
        background: #C1C1C1;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 12px;
      }
    }
  }
  .more {
    position: absolute;
    bottom: 249px;
    left: calc(50% - 90px);
    width: 180px;
    height: 50px;
    background: rgb(230, 230, 230);
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    color: #333333;
    cursor: pointer;

    &:hover {
      color: #ffffff;
      background: #15a98d;
    }
  }
}
</style>
