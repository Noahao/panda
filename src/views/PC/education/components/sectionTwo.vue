<template>
  <div class="section-two" :style="{'background': `url(${ bg || $Placeholder }) center top no-repeat`, 'background-size': 'cover'}">
    <div class="main">
      <div class="title">“体验”、“互动”、“探索”</div>
      <div class="desc">了解大熊猫科研、保护，提升科学素养，培养科学精神。</div>
      <div class="list-wrap">
        <div v-for="(item, index) in list" :key="index" @click="jump(item)" class="list-box wow bounceInUp" :data-wow-delay="getDelay(index)">
          <div class="left">
            <div class="icon">
              <MyIcon :name="item.icon" size="42px" />
            </div>
          </div>
          <div class="right">
            <p class="title">{{ item.title }}</p>
            <p class="summary">{{ getDesc(item.summary) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sectionTwo',
  inject: ['PCJumpDetails'],
  data () {
    return {
      bg: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/education/img02.jpg',
      list: [
        {
          icon: 'kepuchangguan',
          title: '科普场馆',
          summary: '互动体验、场景复原',
          channelCode: 'kpcg',
        },
        {
          icon: 'huodongjieshao',
          title: '活动预约',
          summary: '在线预约丰富多彩的精彩活动',
          channelCode: 'hdyy',
        },
        {
          icon: 'zhiyuanzhezhijia',
          title: '志愿者之家',
          summary: '保护教育事业不可或缺的生力军',
          channelCode: 'zyzzj',
        },
        /*{
          icon: 'xiongmaoxiaoyouxi',
          title: '熊猫小游戏',
          summary: '玩趣味游戏，享科普知识',
          channelCode: 'xmxyx',
        }*/
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
    },
    getDesc() {
      return (desc) => {
        let reg = /\s+/g
        let trimStr = desc.replace(reg,'')
        return trimStr
      }
    }
  },
  methods: {
    // 跳转详情
    jump(item) {
      // if (item.title === '熊猫小游戏') {
      //   this.$router.push(`/pc/generalList?channelCode=${item.channelCode}&banner=kpjy`)
      //   return
      // }
      // getNewsList({ channelCode: item.channelCode }).then((res) => {
      //   if (res.code === 0) {
      //     try {
      //       this.PCJumpDetails(res.datas[0], 'kpjy')
      //     } catch (error) {
      //       return ''
      //     }
      //   }
      // })
      this.$router.push(`/pc/generalList?channelCode=${item.channelCode}&banner=kpjy`)
    }
  }
}
</script>

<style lang="scss" scoped>
.section-two {
  width: 100%;
  height: 760px;

  .main {
    max-width: 1660px;
    min-width: 1360px;
    margin: auto;
    overflow: hidden;
    color: #ffffff;

    .title {
      font-weight: Bold;
      font-size: 50px;
      text-align: left;
      margin: 176px 0 40px;
    }

    .desc {
      font-size: 30px;
      margin-bottom: 200px;
    }

    .list-wrap {
      width: 100%;
      display: flex;
      justify-content: space-between;
      overflow: hidden;

      .list-box {
        width: 33%;
        max-width: 475px;
        min-width: 300px;
        height: 140px;
        background: #ffffff;
        padding: 30px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: 0.25s all;

        &:hover {
          background: #15a98d;
          .left {
            .icon {
              i {
                color: #15a98d;
              }
            }
          }
          .right {
            .title {
              color: #ffffff;
            }
            .summary {
              color: #ffffff;
            }
          }
        }
        .left {
          margin-right: 20px;
          .icon {
            width: 80px;
            height: 80px;
            background: #F5F5F5;
            border-radius: 50%;
            position: relative;

            i {
              display: inline-block;
              position: absolute;
              top: 50%;
              left: 50%;
              color: #333333;
              transition: 0.25s all;
              transform: translate(-50%, -50%);
            }
          }
        }
        .right {
          .title {
            color: #333333;
            font-weight: bold;
            font-size: 24px;
            margin: 0 0 10px;
            transition: 0.25s all;
          }
          .summary {
            color: #666666;
            font-size: 16px;
            margin: 0;
            @include ellipsisLn(1);
            transition: 0.25s all;
          }
        }
      }
    }
  }
}
</style>
