<template>
  <div class="section-two">
    <div class="picture-one" @click="objClick(leftObj)">
      <img :src="getUrl(leftObj.backgroundImg)" alt="" />
      <p class="text1">{{ leftObj.channelCode }}</p>
      <p class="text2">{{ strIntercept(leftObj.name) }}</p>
    </div>
    <div class="picture-two" @click="objClick(rightObj)">
      <img :src="getUrl(rightObj.backgroundImg)" alt="" />
      <p class="text1">{{ rightObj.channelCode }}</p>
      <p class="text2">{{ strIntercept(rightObj.name) }}</p>
    </div>
  </div>
</template>

<script>
import { getChannelDetail, channelcrumbs } from '@/service/apiList/common'
export default {
  name: 'SectionTwo',
  data() {
    return {
      leftObj: {},
      rightObj: {}
    }
  },
  computed: {
    getUrl() {
      return (url) => {
        if (url) {
          return url
        }
        return this.$Placeholder
      }
    },
    strIntercept() {
      return (item) => {
        try {
          return item.substring(0, item.indexOf('ги'))
        } catch (error) {
          return item
        }
      }
    }
  },
  mounted() {
    this.getChannelDetail1()
    this.getChannelDetail2()
  },
  methods: {
    async getChannelDetail1 () {
      const res = await getChannelDetail({ channelCode: 'research' })
      if (res.code === 0) {
        this.leftObj = res.data
      }
    },
    async getChannelDetail2 () {
      const res = await getChannelDetail({ channelCode: 'education' })
      if (res.code === 0) {
        this.rightObj = res.data
      }
    },
    objClick(item) {
      channelcrumbs({
        channelCode: item.channelCode
      }).then(res => {
        if(res.code === 0) {
          this.$router.push(res.data.url)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.section-two {
  padding: .8rem .4rem;

  .picture-one,.picture-two {
    position: relative;

    .text1 {
      font-family: 'Edwardian Script ITC';
      font-size: 1.2rem;
      color: rgba(238, 238, 238, 0.6);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: .4rem;
    }
    .text2 {
      font-size: .24rem;
      color: #ffffff;
      font-weight: bold;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: .34rem;
    }
  }
  .picture-one {
    margin-bottom: .6rem;
  }
}
</style>
