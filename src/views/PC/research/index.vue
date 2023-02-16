<template>
  <PCLayout>
    <div class="wrap">
      <PCBanner channelCode="kybh" />
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
  name: 'researchIndex',
  components: {
    sectionOne,
    sectionTwo,
    sectionThree
  },
  data () {
    return {
      bannerText: {
        title: '科研保护',
        desc: '坚持走“保护促发展，发展促保护”的可持续发展之路',
        banner: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/research/banner.jpg'
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
