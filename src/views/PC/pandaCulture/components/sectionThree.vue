<template>
  <div class="section-three">
    <div class="main">
      <div class="list-one">
        <div v-for="(item, index) in listOne" :key="index" class="list-box wow bounceInUp" :data-wow-delay="getDelay(index)" :class="{active: index === currentIndex}" @click="tabClick(item)" @mouseenter="itemClick(item, index)">
          <div class="img">
            <!--<img :src="currentIndex !== index ? item.icon : item.hover" alt="" />-->
            <MyIcon :name="item.summary" size="42px" :style="{'color': index === currentIndex ? '#ffffff' : '#333333'}"/>
          </div>
          <div class="title">{{ item.name }}</div>
          <div class="left-right-line" v-if="currentIndex == index">
            <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/pandaCulture/left-right-line.png" alt="" />
          </div>
        </div>
      </div>
      <!--<div class="list-two">
        <div v-for="(item, index) in listTwo" :key="index" class="list-box wow bounceInUp" :data-wow-delay="getDelay(index)" @click="PCJumpDetails(item, 'xmwh')">
          <div class="img" :style="{'background': `url(${ getUrl(item) }) center top no-repeat`, 'background-size': 'cover'}"></div>
          <div class="text">
            <div class="title">{{ item.title }}</div>
          </div>
        </div>
      </div>-->
      <el-row type="flex" class="list-two wow bounceInUp" v-if="listTwo.length">
        <el-col :span="6" v-for="(item, index) in listTwo" :key="index" class="list-box" :data-wow-delay="getDelay(index)">
          <div @click="PCJumpDetails(item, 'xmwh')">
            <div class="img" :style="{'background-image': `url(${ item.cover || $Placeholder })`, 'background-repeat': 'no-repeat', 'background-size': 'cover'}"></div>
            <div class="text">
              <div class="title">{{ item.title }}</div>
            </div>
          </div>
          <div class="xmbz" v-if="listOne[currentIndex].channelCode === 'xmbz'">
            <img :src="item2.url" :preview="index" :large="item2.url || $Placeholder" v-for="item2 in item.imageUrls" :key="item2.id" />
          </div>
        </el-col>
      </el-row>
      <div v-else class="list-two no-data">
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panad/01065f5c-b833-4a97-ad2b-404a2e506fc0.gif" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { getChannelSubset, getNewsList, getSimplifyList } from '@/service/apiList/common'
export default {
  name: 'sectionOne',
  inject: ['PCJumpDetails'],
  data () {
    return {
      currentIndex: 0,
      listOne: [],
      listTwo: []
    }
  },
  computed: {
    getUrl() {
      return (list) => {
        try {
          return list.imageUrls[0].url
        } catch (error) {
          return this.$Placeholder
        }
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
    this.getChannelSubset()
    // this.getNewsList()
  },
  methods: {
    async getChannelSubset() {
      getChannelSubset({
        channelCode: 'xmwh',
      }).then(res => {
        if (res.code === 0 && res.data.subset) {
          this.listOne = res.data.subset.filter((item) => {
            return item.name !== 'ÐÜÃ¨»î¶¯' && item.name !== 'ÐÜÃ¨ÒÕÊõÍÅ' && item.name !== '¹Ù·½¶¶Òô'
          })
          getSimplifyList({
            channelCode: this.listOne[this.currentIndex].channelCode,
            pageSize: 3,
            currPage: 1
          }).then(res => {
            this.listTwo = res.datas
          })
        }
      })
    },
    async getNewsList() {
      const res = await getNewsList({
        channelCode: 'xmsp',
        pageSize: 3,
        currPage: 1,
      })
      if (res.code === 0) {
        this.listTwo = res.datas
      }
    },
    itemClick (item, index) {
      if(this.currentIndex !== index) {
        this.currentIndex = index
        getSimplifyList({
          channelCode: item.channelCode,
          pageSize: 3,
          currPage: 1
        }).then(res => {
          this.listTwo = res.datas
          this.$previewRefresh()
        })
      }
    },
    tabClick(item) {
      if (item.url1 && item.url1.includes('?details')) {
        const params = this.getQueryString(item.url1)
        getNewsList({ channelCode: params.details }).then((res) => {
          try {
            this.PCJumpDetails(res.datas[0], params.channelCode)
          } catch (error) {
            this.$message({
              message: '¾´ÇëÆÚ´ý£¡',
              type: 'warning'
            })
          }
        })
        return ''
      } else if(item.url1 && !item.url1.includes('?details')) {
        this.$router.push(item.url1)
      } else {
        this.$message({
          message: '¾´ÇëÆÚ´ý£¡',
          type: 'warning'
        })
      }
      /*getNewsList({ channelCode: item.channelCode }).then((res) => {
        if(res.code === 0 && res.datas) {
          try {
            this.PCJumpDetails(res.datas[0], 'xmwh')
          } catch (error) {
            this.$message({
              message: '¾´ÇëÆÚ´ý',
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: '¾´ÇëÆÚ´ý',
            type: 'warning'
          })
        }
      })*/
    }
  }
}
</script>

<style lang="scss" scoped>
.section-three {
  width: 100%;
  padding: 60px 0 80px;
  background: #F5F5F5;

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


    .list-one {
      height: 140px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .list-box {
        cursor: pointer;
        width: 18%;
        max-width: 288px;
        min-width: 255px;
        height: 140px;
        background: #ffffff;
        text-align: center;
        padding: 31px 0 0;
        transition: all 0.25s;

        .img {
          margin: 0 auto 21px;
          width: 50px;
        }
        .title {
          font-weight: Bold;
          font-size: 24px;
          color: #333333;
        }
      }
      .active {
        background: rgba(21,169,141,1);
        height: 300px;
        position: relative;
        .title {
          color: #ffffff;
        }
        .left-right-line {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 77px;
        }
        &::before{
          position: absolute;
          content: '';
          width: 0;
          height: 0;
          border-left: 9px solid transparent;
          border-right: 9px solid transparent;
          border-top: 12px solid rgba(21,169,141,1);
          bottom: -11px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }

    .list-two {
      margin-top: 70px;

      .img {
        height: 300px;
      }

      .list-box {
        width: 33%;
        max-width: 520px;
        min-width: 420px;
        height: 400px;
        cursor: pointer;
        background: #ffffff;
        position: relative;

        &:nth-child(2) {
          margin: 0 60px;
        }
        .img {
          width: 100%;
        }
        .text {
          padding: 43px 0 37px 29px;

          .title {
            margin: 0;
            text-align: left;
            color: #333333;
            font-size: 20px;
            transition: all 0.25s;
          }
        }
        .xmbz {
          opacity: 0;
          z-index: 10;
          position: absolute;
          height: 100%;
          top: 0;
          overflow: hidden;
        }

        &:hover {
          .title {
            color: rgba(21,169,141,1);
          }
        }
      }
    }
    .no-data {
      height: 400px;
      text-align: center;
      img {
        height: 100%;
      }
    }
  }
}
</style>
