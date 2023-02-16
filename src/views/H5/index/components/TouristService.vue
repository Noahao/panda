<template>
  <div class="tourist-service">
    <TitleBox title="游客服务" path="/h5/touristService" />
    <!-- 二维码 -->
    <div class="code" @click="jump('pwfw')">
      <div class="code-box">
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/index/qr-code.jpg" alt="" />
      </div>
      <div class="text">立即扫码订票</div>
    </div>
    <!-- 开放时间 -->
    <div class="open-time">
      <div class="title" @click="jump('kfsj')">开放时间</div>
      <p class="text">具体入园防疫政策见游客参观须知，参观全程请佩戴口罩并保持1米以上距离。</p>
      <div class="time">
        <div>
          <div>7:30~18:00</div>
          <div>开放时间</div>
        </div>
        <div>
          <div>17:00</div>
          <div>停止入园</div>
        </div>
        <div>
          <div>17:00</div>
          <div>停止售票</div>
        </div>
      </div>
      <div class="title" @click="jump('ggcfw')">观光车服务</div>
      <p class="text">根据园区内实际情况，有可能会临时停止售票或调整运营路线，给您带来不便，敬请谅解。</p>
      <div class="operating">
        <div class="operating-box">
          <div>
            <p>7:30~18:00</p>
            <p>观光车运营时间</p>
          </div>
          <div>
            <p>17:30</p>
            <p>停止售票时间</p>
          </div>
        </div>
        <div class="text">观光车票价：30元/人（当日有效，不限制乘坐次数）
          <br/>
          新观光车免票人群：1.3米以下（含）儿童免票（不占座位）
        </div>
      </div>
    </div>
    <!-- 游客须知 -->
    <div class="tourists">
      <div :style="[{ background: list[index].color }]" v-for="(item, index) in list" :key="item.id" @click="jump(item.channelCode)">
        <div>
          <MyIcon :name="item.icon" size="0.43rem" />
        </div>
        {{ item.name }}
      </div>
    </div>
    <!-- 科研保护 -->
    <div class="protect">
      <div class="more-than">
        <div class="num">400</div>
        <div class="info">
          <p>余篇</p>
          <p>国际、国内知名期刊发表论文</p>
        </div>
      </div>
      <div class="more-than">
        <div class="num">70</div>
        <div class="info">
          <p>余项</p>
          <p>国家、省、市科技奖励</p>
        </div>
      </div>
      <div class="more-than">
        <div class="num">26</div>
        <div class="info">
          <p>项</p>
          <p>国家专利</p>
        </div>
      </div>
      <div class="box">
        <div style="background-image: url(https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/科研保护.png)" @click="$router.push('/h5/research')">
          <div class="icon">
            <MyIcon name="keyanbaohu" size="0.4rem" color="#FFFFFF" />
          </div>
          <div class="text">科研保护</div>
        </div>
        <div style="background-image: url(https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/科普教育.png)">
          <div class="icon" @click="$router.push('/h5/education')">
            <MyIcon name="kepujiaoyu" size="0.4rem" color="#FFFFFF" />
          </div>
          <div class="text">科普教育</div>
        </div>
        <div style="background-image: url(https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/熊猫文化.png)" @click="$router.push('/h5/pandaCulture')">
          <div class="icon">
            <MyIcon name="xiongmaowenhua" size="0.4rem" color="#FFFFFF" />
          </div>
          <div class="text">熊猫文化</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsList } from '@/service/apiList/common'
import TitleBox from '@/views/H5/index/components/TitleBox.vue'
export default {
  naem: 'TouristService',
  inject: ['jumpDetails'],
  components: {
    TitleBox,
  },
  data() {
    return {
      list: [
        {
          name: '游客须知',
          icon: 'youkexuzhi',
          color: '#FBB03F',
          channelCode: 'ykxz',
        },
        {
          name: '失物招领',
          icon: 'shiwuzhaoling',
          color: '#1FAE93',
          channelCode: 'swzl',
        },
        {
          name: '讲解服务',
          icon: 'jiangjiefuwu',
          color: '#00AEEF',
          channelCode: 'jjfw',
        },
        {
          name: '导览地图',
          icon: 'daolanditu',
          color: '#F15929',
          channelCode: 'dldt',
        },
        {
          name: '餐饮购物',
          icon: 'canyingouwu',
          color: '#2E9853',
          channelCode: 'cygw',
        },
        {
          name: '公共交通',
          icon: 'gonggongjiaotong',
          color: '#501A74',
          channelCode: 'ggjt',
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
.tourist-service {
  > .code {
    width: 2.88rem;
    margin: auto;
    > .code-box {
      width: 2.88rem;
      height: 2.88rem;
      padding: 0.14rem;
      background: rgba(0, 0, 0, 0.2);
      img {
        width: 100%;
      }
    }
    > .text {
      width: 2.88rem;
      height: 0.6rem;
      background: rgba(21, 169, 141, 1);
      font-weight: 500;
      font-size: 0.24rem;
      color: #ffffff;
      line-height: 0.6rem;
      text-align: center;
    }
  }
  > .open-time {
    padding: 0.6rem 0.3rem;
    text-align: center;
    .title {
      font-weight: Bold;
      font-size: 0.36rem;
      color: #15a98d;
    }
    > .text {
      margin-top: 0.3rem;
      font-size: 0.24rem;
      color: #666666;
      line-height: 0.40rem;
    }
    > .time {
      margin-top: 0.4rem;
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.6rem;
      > div {
        width: 2.06rem;
        height: 1.23rem;
        background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/图层706.png') no-repeat;
        background-size: 100%;
        > div {
          text-align: center;
          &:first-child {
            margin-top: 0.3rem;
            line-height: 1;
            font-family: PingFang SC;
            font-size: 0.3rem;
            color: #15a98d;
          }
          &:last-child {
            line-height: 1;
            margin-top: 0.11rem;
            font-family: PingFang SC;
            font-size: 0.2rem;
            color: #666666;
          }
        }
      }
    }
    .operating {
      margin: 0.39rem auto 0;
      width: 6.9rem;
      height: 3.07rem;
      background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/h5/bg图层7071.png') no-repeat;
      background-size: 100%;
      &-box {
        display: flex;
        div {
          margin-top: 0.3rem;
          width: 50%;
          height: 0.9rem;
          border-right: 0.01rem solid #8ed6c8;
          &:last-child {
            border: 0;
          }
          p {
            &:first-child {
              line-height: 1;
              font-size: 0.3rem;
              color: #15a98d;
              margin-top: 0.25rem;
            }
            &:last-child {
              line-height: 1;
              margin-top: 0.11rem;
              font-weight: 500;
              font-size: 0.2rem;
              color: #666666;
            }
          }
        }
      }
      > .text {
        padding: 0.4rem 0.3rem 0;
        font-size: 0.22rem;
        color: #f27852;
        line-height: 0.5rem;
      }
    }
  }
  > .tourists {
    padding: 0 0.29rem;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    > div {
      text-align: center;
      width: 2.3rem;
      height: 1.36rem;
      color: #ffffff;
      border-top: 0.01rem solid #fff;
      border-left: 0.01rem solid #fff;
      &:first-child {
        border-radius: 0.6rem 0 0 0;
      }
      &:last-child {
        border-radius: 0 0 0.6rem 0;
      }
      font-size: 0.24rem;
      div {
        margin: 0.28rem 0 0.16rem;
      }
      img {
        width: 0.4rem;
      }
    }
  }
  > .protect {
    margin-top: 0.79rem;
    padding: 1.23rem 0.3rem;
    width: 7.5rem;
    height: 12rem;
    background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/科研bg.png') no-repeat;
    background-size: 100%;
    > .more-than {
      display: flex;
      align-items: center;
      margin-bottom: 0.85rem;
      .num {
        font-weight: Bold;
        font-size: 0.72rem;
        color: #fff9f4;
        border-bottom: 0.04rem solid #fff;
      }
      .info {
        margin-left: 0.1rem;
        font-size: 0.2rem;
        color: #fff9f4;
        p {
          line-height: 1;
          margin-bottom: 0.08rem;
          &:last-child {
            margin: 0;
          }
        }
      }
    }
    .box {
      display: flex;
      justify-content: space-between;
      div {
        width: 2.1rem;
        height: 1.6rem;
        background-size: 100%;
        .icon {
          margin: 0.23rem auto 0.2rem;
          width: 0.72rem;
          height: 0.72rem;
          border-radius: 50%;
          border: 0.01rem dashed #fff;
          text-align: center;
          line-height: 0.72rem;
        }
        .text {
          text-align: center;
          font-weight: 500;
          font-size: 0.24rem;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
