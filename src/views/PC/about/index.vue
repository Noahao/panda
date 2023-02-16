<template>
  <PCLayout>
    <div class="wrap">
      <PCBanner channelCode="gywm" />
      <section-one />
      <section-two />
      <section-three />
    </div>
  </PCLayout>
</template>

<script>
import sectionOne from './components/sectionOne.vue'
import sectionTwo from './components/sectionTwo.vue'
import sectionThree from './components/sectionThree.vue'
export default {
  name: 'baseDynamic',
  components: {
    sectionOne,
    sectionTwo,
    sectionThree
  },
  data () {
    return {
      bannerText: {
        title: '关于我们',
        desc: '国宝的自然天堂，我们的世外桃源',
        banner: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/about/banner.jpg'
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
