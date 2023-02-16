<template>
  <div class="section-five wow fadeInUpBig" @click="objClick(obj)">
    <div class="img" :style="{'background-image': 'url(' + getUrl('https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/img07.jpg') + ')','background-size': 'cover','background-repeat': 'no-repeat',}"></div>
    <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/img07_1668419001452.png" alt="" class="flowers" />
    <p class="title">{{ obj.channelCode }}</p>
    <p class="name">{{ strIntercept(obj.name) }}</p>
  </div>
</template>

<script>
import { getChannelDetail, channelcrumbs } from '@/service/apiList/common'
export default {
  name: 'SectionFive',
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
          this.$router.push(res.data.url1)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.section-five {
  width: 100%;
  height: 8rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  .img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    transition: all .25s;
  }
  .flowers {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .title {
    font-family: 'Edwardian Script ITC';
    text-align: center;
    font-size: 2rem;
    color: rgba(238, 238, 238, 0.8);
    position: absolute;
    top: 2.85rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .name {
    font-size: 0.32rem;
    position: absolute;
    top: 4.85rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    border-bottom: 2px solid transparent;
    left: 50%;
    transform: translateX(-50%);
  }
  &:hover {
    .img {
      transform: scale(1.1);
    }
    .name {
      border-bottom-color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
