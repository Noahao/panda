<template>
  <div class="dynamic-box">
    <div class="dynamic">
      <!-- <div class="title">{{ details.channelName }}</div> -->
      <div class="title-box">
        <div class="title">{{ details.channelName }}</div>
        <div class="more" @click="jumpDetails(details, 'dwzj')">
          <span>查看更多</span>
          <MyIcon name="shuangjiantou" size="0.18rem" />
        </div>
      </div>
      <div class="text">
        <p>
          {{ details.summary }}
        </p>
      </div>
      <div class="tab">
        <div v-for="item in tab" :key="item.id">
          <div class="icon">
            <MyIcon :name="item.icon" size="0.46rem" color="#fff" />
          </div>
          <div class="name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <!-- 疾病防治 -->
    <div class="disease">
      <div @click="jump(item)" class="item" :style="{ backgroundImage: 'url(' + item.backgroundImg + ')' }" v-for="item in list" :key="item.id">
        <div class="title">{{ item.name }}</div>
        <div class="box">
          <div>
            <p class="text">{{ item.summary }}</p>
          </div>
          <MyIcon name="yuanquanjiantou" size="0.4rem" color="#fff" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsList, getChannelDetail } from '@/service/apiList/common'
export default {
  name: 'DynaMic',
  inject: ['jumpDetails'],
  components: {},
  data() {
    return {
      tab: [
        // {
        //   name: '分布板块',
        //   icon: 'fenbubankuai',
        // },
        {
          name: '常用竹（笋）',
          icon: 'touweizhulei',
        },
        {
          name: '大熊猫丰容',
          icon: 'daxiongmaofengfu',
        },
        {
          name: '动物训练',
          icon: 'dongwuxunlian',
        },
      ],
      details: {},
      list: [],
    }
  },
  created() {
    this.getNewsList()
    this.hospital()
  },
  methods: {
    async getNewsList() {
      const res = await getNewsList({
        channelCode: 'sydt',
        pageSize: 1,
        currPage: 1,
      })
      if (res.code === 0) {
        if (res.datas && res.datas.length) {
          this.details = res.datas[0]
        }
      }
    },
    async hospital() {
      const p1 = getChannelDetail({
        channelCode: 'jbfz',
      }).then((res) => {
        return res.data
      })
      const p2 = getChannelDetail({
        channelCode: 'xmyy',
      }).then((res) => {
        return res.data
      })
      Promise.all([p1, p2]).then((res) => {
        try {
          this.list = res
        } catch (error) {
          this.list = []
        }
      })
    },
    jump(item) {
      getNewsList({
        channelCode: item.channelCode,
      }).then((res) => {
        if (res.code === 0) {
          try {
            this.jumpDetails(res.datas[0], 'dwzj')
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
.dynamic-box {
  .dynamic {
    margin-top: 0.4rem;
    background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/饲养动态banner.png') no-repeat;
    background-size: 100%;
    width: 7.5rem;
    height: 5.2rem;
    padding: 0.98rem 0 0 0.3rem;
    .title-box {
      padding-right: 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.3rem;
      > .title {
        font-weight: Bold;
        font-size: 0.4rem;
        color: #ffffff;
      }
      > .more {
        font-weight: 500;
        font-size: 0.24rem;
        color: #ffffff;
        display: flex;
        align-items: center;
        &:hover {
          color: #15a98d;
        }
        .shuangjiantou {
          margin-top: 0.02rem;
          margin-left: 0.05rem;
        }
      }
    }
    // > .title {
    //   font-weight: Bold;
    //   font-size: 0.4rem;
    //   color: #ffffff;
    //   margin-bottom: 0.3rem;
    // }
    > .text {
      width: 6.8rem;
      font-size: 0.24rem;
      line-height: 0.36rem;
      color: #ffffff;
    }
    > .tab {
      margin: 0.4rem 0;
      display: flex;
      text-align: center;
      > div {
        margin-right: 0.5rem;
      }
      .icon {
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        line-height: 0.9rem;
      }
      .name {
        margin-top: 0.26rem;
        font-weight: 500;
        line-height: 1;
        font-size: 0.2rem;
        color: #fff;
      }
    }
  }
  .disease {
    padding: 0.79rem 0.3rem;
    .item {
      width: 6.9rem;
      height: 3.2rem;
      padding: 0.59rem 0.31rem;
      margin-bottom: 0.6rem;
      &:last-child {
        margin-bottom: 0;
      }
      .title {
        font-weight: Bold;
        font-size: 0.4rem;
        color: #fff;
        line-height: 1;
      }
      .box {
        display: flex;
        justify-content: space-between;
        margin-top: 0.6rem;
        border-bottom: 0.01rem solid #ffffff;
        padding-bottom: 0.3rem;
        .text {
          width: 5.5rem;
          font-size: 0.2rem;
          line-height: 0.4rem;
          color: #fff;
        }
        .info {
          line-height: 1;
          margin-top: 0.15rem;
          font-size: 0.2rem;
          color: #fff;
        }
      }
    }
  }
}
</style>
