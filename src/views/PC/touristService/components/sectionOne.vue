<template>
  <div class="section-one">
    <div class="title" @click="jump('kfsj')">开放时间</div>
    <div class="main">
      <div class="tab-wrap">
        <div v-for="(item, index) in tabList" :key="index" class="list-box wow shake">
          <div class="top-line">
            <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/touristService/line.png" alt="" />
          </div>
          <div class="bottom-line">
            <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/touristService/line.png" alt="" />
          </div>
          <div class="time">{{ item.time }}</div>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
      <div class="desc" v-if="details" v-html="getText(details)"></div>
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
      tabList: [
        {
          time: '07:30~18:00',
          name: '开放时间'
        },
        {
          time: '17:00',
          name: '停止入园时间'
        },
        {
          time: '17:00',
          name: '停止售票时间'
        }
      ],
      details: '具体入园防疫政策见游客参观须知，参观全程请佩戴口罩并保持1米以上距离。'
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
  },
  methods: {
    jump(text) {
      getNewsList({
        channelCode: text,
      }).then((res) => {
        if (res.code === 0) {
          try {
            this.PCJumpDetails(res.datas[0], 'ykfw')
          } catch (error) {
            return ''
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.section-one {
  width: 100%;
  padding: 80px 0 60px;
  background: #ffffff;
  text-align: center;

  .title {
    font-weight: Bold;
    font-size: 40px;
    color: #333333;
    cursor: pointer;
    display: inline-block;
  }

  .main {
    max-width: 1660px;
    min-width: 1360px;
    margin: auto;
  }
  .tab-wrap {
    display: flex;
    margin: 55px 0;
    justify-content: space-between;

    .list-box {
      width: 400px;
      height: 187px;
      position: relative;
      text-align: center;
      overflow: hidden;

      .top-line, .bottom-line {
        width: 100%;
        left: 0;
        position: absolute;
        img {
          width: 100%;
        }
      }
      .top-line {
        top: 0;
      }
      .bottom-line {
        bottom: 0;
      }
      .time {
        color: #15A98D;
        font-size: 66px;
        font-weight: bold;
        margin: 43px 0 10px;
      }
      .name {
        font-size: 20px;
        color: #666666;
      }
    }
  }
  .desc {
    color: #333333;
    font-size: 20px;
    text-align: center;
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
  }
}

</style>
