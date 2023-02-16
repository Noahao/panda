<template>
  <PCLayout>
    <div class="wrap">
      <PCBanner channelCode="xmg" />
      <section-one />
      <section-two />
    </div>
  </PCLayout>
</template>

<script>
import sectionOne from './components/sectionOne.vue'
import sectionTwo from './components/sectionTwo.vue'
export default {
  name: 'baseDynamic',
  components: {
    sectionOne,
    sectionTwo
  },
  data () {
    return {
      bannerText: {
        title: '熊猫谷',
        desc: '成都大熊猫繁育研究基地  都江堰野放繁育研究中心',
        banner: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/pandaValley/banner.jpg'
      }
    }
  }
}
</script>

<style scoped>
.wrap {
  padding-top: 70px;
}
</style>
