<template>
  <PCLayout>
    <div class="wrap">
      <PCBanner channelCode="kpjy" />
      <section-one />
      <section-two />
      <section-three />
      <section-four />
    </div>
  </PCLayout>
</template>

<script>
import sectionOne from './components/sectionOne.vue'
import sectionTwo from './components/sectionTwo.vue'
import sectionThree from './components/sectionThree.vue'
import sectionFour from './components/sectionFour.vue'
export default {
  name: 'baseDynamic',
  components: {
    sectionOne,
    sectionTwo,
    sectionThree,
    sectionFour
  },
  data () {
    return {
      bannerText: {
        title: '科普教育',
        desc: '提供科学、权威、准确的科普信息内容，让科技知识在网上和生活中流行',
        banner: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/education/banner.jpg'
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
