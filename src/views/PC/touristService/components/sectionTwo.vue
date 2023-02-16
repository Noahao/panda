<template>
  <div class="section-two">
    <div class="main">
      <div class="left wow bounceInLeft" :style="{'background': `url(${ leftBg || $Placeholder}) center top no-repeat`, 'background-size': 'cover'}" @click="jump('pwfw')">
        <div class="title">票务服务</div>
        <div class="desc">景区已经全面实现智慧化，提前购买门票或预约服务，可避免在高峰期间的排队困扰。</div>
        <div class="bottom-text">
          <div class="bottom-text-left">
            <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/touristService/qrCode.png" alt="" />
          </div>
          <div class="bottom-text-right">
            <p>全价门票：55元/人，半价门票：27元/人</p>
            <p>打开微信扫一扫，扫码立即预订。</p>
          </div>
        </div>
      </div>
      <div class="right wow bounceInRight" :style="{'background': `url(${ rightBg || $Placeholder }) center top no-repeat`, 'background-size': 'cover'}" @click="jump('ggcfw')">
        <div class="title">观光车服务</div>
        <div class="desc">根据园区内实际情况，有可能会临时停止售票或调整运营路线，给您带来不便，敬请谅解。</div>
        <div class="bottom-text">
          <div class="bottom-text-left">
            <p>观光车运行时间：7：30—18：00，停止售票：17：30</p>
            <p>观光车票价：30元/人（当日有效，不限制乘坐次数）</p>
            <p>观光车免票人群：1.3米以下（含）儿童免票（不占座位）</p>
          </div>
          <div class="bottom-text-right">
            <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/touristService/qrCode3.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsList } from '@/service/apiList/common'
export default {
  name: 'sectionTwo',
  data () {
    return {
      leftBg: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/touristService/left-bg.png',
      rightBg: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/touristService/right-bg.png',
    }
  },
  inject: ['PCJumpDetails'],
  methods: {
    jump(text) {
      getNewsList({
        channelCode: text,
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
</script>

<style lang="scss" scoped>
.section-two {
  width: 100%;
  margin-bottom: 80px;

  .main {
    max-width: 1660px;
    min-width: 1360px;
    margin: auto;
    display: flex;

    .left, .right {
      width: 50%;
      height: 480px;
      padding: 70px 50px 45px 60px;
      cursor: pointer;

      .title {
        font-weight: Bold;
        font-size: 40px;
      }
      .desc {
        font-weight: 500;
        font-size: 16px;
        margin: 38px 0 50px;
      }
      .bottom-text {
        display: flex;
      }
    }
    .left {
      color: #ffffff;

      .bottom-text-left {
        width: 220px;
        img {
          width: 100%;
        }
      }
      .bottom-text-right {
        font-weight: 500;
        font-size: 24px;
        padding-left: 30px;
        p {
          margin: 40px 0;
        }
      }
    }
    .right {
      .title {
        color: #333333;
      }
      .desc {
        color: #666666;
      }

      .bottom-text-left {
        color: #15A98D;
        font-weight: 500;
        font-size: 18px;
        p {
          margin: 30px 0;
        }
      }
      .bottom-text-right {
        width: 220px;
        margin-left: 20px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
