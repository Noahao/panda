<template>
  <div class="section-four">
    <div class="picture-one" @click="objClick(obj)">
      <img :src="getUrl(obj.backgroundImg)" alt="" />
      <p class="text1">{{ obj.channelCode }}</p>
      <p class="text2">{{ strIntercept(obj.name) }}</p>
    </div>
  </div>
</template>

<script>
import { getChannelDetail, channelcrumbs } from '@/service/apiList/common'
export default {
  name: 'SectionFour',
  data() {
    return {
      obj: {}
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
    this.getChannelDetail()
  },
  methods: {
    async getChannelDetail () {
      const res = await getChannelDetail({ channelCode: 'pandaCulture' })
      if (res.code === 0) {
        this.obj = res.data
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
.section-four {
  padding: .8rem .4rem;

  .picture-one {
    position: relative;

    .text1 {
      font-family: 'Edwardian Script ITC';
      width: 100%;
      font-size: 1rem;
      text-align: center;
      color: rgba(238, 238, 238, 0.6);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: .4rem;
      white-space: nowrap;
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
}
</style>
